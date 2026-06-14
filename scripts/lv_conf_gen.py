#!/usr/bin/env python3
"""Generate lv_conf.cpp, lv_conf.ts, lv_conf.stub.ts, style_prop.ts, and lv_types.ts from LVGL headers and manifests."""

from __future__ import annotations

import argparse
import json
import re
import sys
from dataclasses import dataclass
from pathlib import Path
from typing import Any

_SCRIPTS = Path(__file__).resolve().parent
if str(_SCRIPTS) not in sys.path:
    sys.path.insert(0, str(_SCRIPTS))

from lib.codegen_utils import ROOT, enum_body, is_stale, write_if_changed

GEN_SCRIPT = "scripts/lv_conf_gen.py"
DEFAULT_LV_CONF_CPP = ROOT / "src/render/native/core/lv_conf/lv_conf.cpp"
SCRIPTS_DATA = ROOT / "scripts/data"
DEFAULT_LV_CONF_MANIFEST = SCRIPTS_DATA / "lv_conf_manifest.json"
DEFAULT_LV_CONF_TS = ROOT / "src/render/react/core/lv_conf.ts"
DEFAULT_LV_CONF_STUB_TS = ROOT / "src/render/react/core/lv_conf.stub.ts"
DEFAULT_CPP_LV_SYMBOL_MAP_JSON = SCRIPTS_DATA / "cpp_lv_symbol_mapping.json"
TRANSITION_COMPARE_JSON = SCRIPTS_DATA / "transition_lvgl_compare.json"
LV_STYLE_SETTER_C_SOURCES = (ROOT / "deps/lvgl/src/misc/lv_style_gen.c",)
LV_STYLE_REGISTER_PROP_SOURCES = (
    ROOT / "src/render/native/core/lv_conf/lv_style_prop_extend.cpp",
)
REG_STYLE_PROP_ASSIGN_RE = re.compile(
    r"^\s*(LV_STYLE_\w+)\s*=\s*lv(?:js)?_style_register_prop\s*\("
)
STYLE_PROP_TS = ROOT / "src/render/react/core/style_prop.ts"
ENUM_ALIAS_TS = ROOT / "src/render/react/core/lv_types.ts"
EXTEND_H = ROOT / "src/render/native/core/lv_conf/lv_style_prop_extend.h"
EXTEND_CPP = ROOT / "src/render/native/core/lv_conf/lv_style_prop_extend.cpp"
ANIM_PATH_H = ROOT / "src/render/native/core/lv_conf/lv_anim_path.h"
ANIM_PATH_CPP = ROOT / "src/render/native/core/lv_conf/lv_anim_path.cpp"

ALIAS_KEY_RE = re.compile(r"^[A-Za-z_][A-Za-z0-9_-]*$")


def ts_property_key(name: str) -> str:
    if "-" in name:
        return json.dumps(name, ensure_ascii=False)
    return name
PREPROC_RE = re.compile(r"^\s*#\s*(if|ifdef|ifndef|endif|else|elif)\b")
MEMBER_START_RE = re.compile(r"^\s*(_?[A-Z][A-Z0-9_]*)\s*(?:=[^,]*)?,?\s*")

# Object-like macro only: the name must be followed by whitespace or end-of-line,
# so function-like macros (e.g. LV_STYLE_PROP_ID_MASK(prop)) are skipped.
OBJECT_DEFINE_RE = re.compile(r"^\s*#\s*define\s+([A-Z][A-Z0-9_]*)(?=\s|$)")
# Manifest "symbols" resolve to an object-like #define or a typed extern decl.
SYMBOL_DECL_RE = re.compile(
    r"^\s*(?:#\s*define\s+([A-Z][A-Z0-9_]*)\b"
    r"|extern\s+(?:lv_style_prop_t|uint16_t|uint32_t)\s+([A-Z][A-Z0-9_]*)\s*;)"
)
SECTION_DOC_COMMENT_RE = re.compile(r"^\s*/\*\*\s*(.+?)\s*\*/\s*$")
BLOCK_SECTION_COMMENT_RE = re.compile(r"^\s*/\*[^/!].*?\*/\s*$")
TRAILING_COMMENT_RE = re.compile(r"/\*(.+?)\*/\s*$")

CommentLines = list[str]


@dataclass
class EnumMemberComment:
    section_comment: list[str] | None = None
    doc: list[str] | None = None
    blank_before: bool = False


def load_manifest(path: Path) -> dict[str, Any]:
    return json.loads(path.read_text(encoding="utf-8"))


def parse_comment_lines(raw: str) -> CommentLines:
    lines: CommentLines = []
    for line in raw.splitlines():
        line = line.strip()
        if line.startswith("/**"):
            line = line[3:]
        elif line.startswith("/*"):
            line = line[2:]
        if line.startswith("/**<"):
            line = line[4:]
        if line.endswith("*/"):
            line = line[:-2]
        if line.startswith("*"):
            line = line[1:]
        line = line.strip()
        if line.startswith("<"):
            line = line[1:].lstrip()
        if line:
            lines.append(line)
    return lines


def render_ts_comment(lines: CommentLines, indent: str = "") -> list[str]:
    if len(lines) == 1:
        return [f"{indent}/** {lines[0]} */"]
    out = [f"{indent}/**"]
    for line in lines:
        out.append(f"{indent} * {line}")
    out.append(f"{indent} */")
    return out


def trailing_comment(line: str) -> CommentLines | None:
    if m := TRAILING_COMMENT_RE.search(line):
        lines = parse_comment_lines(m.group(0))
        return lines or None
    return None


def extract_comment(lines: list[str], start: int) -> tuple[CommentLines | None, int]:
    first = lines[start]
    if "/**" not in first:
        return None, start

    parts: list[str] = [first[first.index("/**") :]]
    i = start
    while i < len(lines):
        if "*/" in lines[i]:
            parsed = parse_comment_lines("\n".join(parts))
            return parsed or None, i
        i += 1
        if i < len(lines):
            parts.append(lines[i])
    raise RuntimeError(f"Unterminated comment at enum line {start + 1}")


def is_block_section_comment(stripped: str) -> bool:
    return bool(
        (SECTION_DOC_COMMENT_RE.match(stripped) or BLOCK_SECTION_COMMENT_RE.match(stripped))
        and not MEMBER_START_RE.match(stripped)
    )


@dataclass
class ParsedMember:
    name: str
    doc: CommentLines | None
    section: CommentLines | None
    blank_before: bool
    numeric_value: int | None = None
    explicit_expr: str | None = None


def extract_enum_explicit_value(member_line: str) -> str | None:
    if "=" not in member_line:
        return None
    value = member_line.split("=", 1)[1].strip()
    if "/*" in value:
        value = value.split("/*", 1)[0]
    if "//" in value:
        value = value.split("//", 1)[0]
    if "," in value:
        value = value.split(",", 1)[0]
    value = value.strip()
    return value or None


ENUM_SYM = r"_?[A-Z][A-Z0-9_]*"


def lookup_enum_symbol(
    name: str,
    values: dict[str, int],
    defines: dict[str, str] | None,
) -> int:
    if name in values:
        return values[name]
    if defines and name in defines:
        return eval_define_expr(defines[name], defines)
    raise RuntimeError(f"unknown enum symbol {name!r}")


def resolve_enum_value_expr(
    expr: str,
    values: dict[str, int],
    *,
    defines: dict[str, str] | None = None,
) -> int:
    expr = expr.strip()
    if re.fullmatch(r"0x[0-9A-Fa-f]+", expr):
        return int(expr, 16)
    if re.fullmatch(r"\d+", expr):
        return int(expr)
    if m := re.fullmatch(r"(?:\(\s*)?1\s*<<\s*(\d+)\s*(?:\))?", expr):
        return 1 << int(m.group(1))
    if "|" in expr:
        total = 0
        for part in expr.split("|"):
            total |= resolve_enum_value_expr(part.strip(), values, defines=defines)
        return total
    if m := re.fullmatch(rf"({ENUM_SYM})\s*\+\s*(\d+)", expr):
        try:
            base = lookup_enum_symbol(m.group(1), values, defines)
        except RuntimeError as exc:
            raise RuntimeError(
                f"enum value {expr!r} references {m.group(1)!r} before it is defined"
            ) from exc
        return base + int(m.group(2))
    if re.fullmatch(ENUM_SYM, expr):
        return lookup_enum_symbol(expr, values, defines)
    raise RuntimeError(f"unsupported enum value expression: {expr!r}")


def try_resolve_enum_value(
    expr: str,
    values: dict[str, int],
    *,
    defines: dict[str, str] | None = None,
) -> int | None:
    try:
        return resolve_enum_value_expr(expr, values, defines=defines)
    except RuntimeError:
        return None


def parse_enum_members(
    raw_text: str,
    typedef: str,
    renames: dict[str, str],
    *,
    capture_trailing: bool,
    defines: dict[str, str] | None = None,
) -> list[ParsedMember]:
    """Parse exported enum members with their leading/section/trailing comments.

    Members whose C name starts with ``_`` are skipped unless renamed. When
    ``capture_trailing`` is set, inline ``/* ... */`` comments on a member line
    are kept as the member's doc (otherwise only ``/** ... */`` blocks count).
    """
    members: list[ParsedMember] = []
    pending_section: CommentLines | None = None
    pending_blanks = 0
    body_lines = enum_body(raw_text, typedef).splitlines()
    i = 0
    enum_values: dict[str, int] = {}
    next_implicit = 0

    def exported(name: str) -> bool:
        return not name.startswith("_") or name in renames

    def add(
        name: str,
        doc: CommentLines | None,
        explicit: str | None = None,
    ) -> None:
        nonlocal pending_section, pending_blanks, next_implicit
        if explicit is not None:
            numeric_value = try_resolve_enum_value(explicit, enum_values, defines=defines)
            if numeric_value is not None:
                enum_values[name] = numeric_value
                next_implicit = numeric_value + 1
            else:
                numeric_value = next_implicit
                enum_values[name] = numeric_value
                next_implicit = numeric_value + 1
        else:
            numeric_value = next_implicit
            enum_values[name] = numeric_value
            next_implicit = numeric_value + 1
        members.append(
            ParsedMember(
                name,
                doc,
                pending_section,
                pending_blanks > 0 and bool(members),
                numeric_value,
                explicit,
            )
        )
        pending_section = None
        pending_blanks = 0

    while i < len(body_lines):
        stripped = body_lines[i].strip()
        if not stripped:
            pending_blanks += 1
            i += 1
            continue
        if PREPROC_RE.match(stripped):
            i += 1
            continue

        if is_block_section_comment(stripped):
            pending_section = parse_comment_lines(stripped) or None
            i += 1
            continue

        if stripped.startswith("/**") and not MEMBER_START_RE.match(stripped):
            doc, end = extract_comment(body_lines, i)
            if end + 1 < len(body_lines) and (
                m := MEMBER_START_RE.match(body_lines[end + 1].strip())
            ):
                if exported(m.group(1)):
                    member_line = body_lines[end + 1].strip()
                    add(
                        m.group(1),
                        doc,
                        extract_enum_explicit_value(member_line),
                    )
                i = end + 2
            else:
                i = end + 1
            continue

        if not (m := MEMBER_START_RE.match(stripped)):
            i += 1
            continue

        name = m.group(1)
        if not exported(name):
            i += 1
            continue

        doc = trailing_comment(body_lines[i]) if capture_trailing else None
        end = i
        if doc is None and "/**" in stripped:
            doc, end = extract_comment(body_lines, i)
        add(name, doc, extract_enum_explicit_value(stripped))
        i = end + 1

    return members


@dataclass
class Entry:
    js_name: str
    c_name: str
    comment: EnumMemberComment | None = None
    ts_literal: int | None = None
    explicit_expr: str | None = None


@dataclass
class Section:
    name: str
    header: str
    entries: list[Entry]
    guard: str | None = None
    doc: CommentLines | None = None


@dataclass
class AliasMapItem:
    key: str
    lv_name: str
    section_comment: str | None = None
    doc: CommentLines | None = None
    blank_before: bool = False


def normalize_doc(value: object, *, context: str) -> CommentLines | None:
    if value is None:
        return None
    if isinstance(value, str):
        return [value]
    if isinstance(value, list):
        if not value or not all(isinstance(line, str) for line in value):
            raise RuntimeError(f"{context}: doc must be a non-empty string or list of strings")
        return value
    raise RuntimeError(f"{context}: doc must be a string or list of strings")


def load_cpp_lv_symbol_raw() -> list[dict[str, Any]]:
    raw = load_manifest(DEFAULT_CPP_LV_SYMBOL_MAP_JSON).get("raw")
    if not isinstance(raw, list) or not raw:
        raise RuntimeError(
            f"{DEFAULT_CPP_LV_SYMBOL_MAP_JSON.name}: missing or empty raw "
            "(run cpp_lv_symbol_mapping.py)"
        )
    return raw


def load_css_extend_symbols() -> list[str]:
    raw = load_cpp_lv_symbol_raw()
    symbols = sorted(
        {
            row["cpp_lv_symbol"]
            for row in raw
            if not row.get("slots") and row.get("cpp_lv_symbol")
        }
    )
    if not symbols:
        raise RuntimeError(
            f"{DEFAULT_CPP_LV_SYMBOL_MAP_JSON.name}: no obj_dispatch css symbols in raw "
            "(run cpp_lv_symbol_mapping.py)"
        )
    return symbols


def render_extend_h(symbols: list[str]) -> str:
    lines = [
        "/**",
        " * Virtual lv_style_prop_t ids for CSS handler batch dispatch.",
        " * Not registered with LVGL style storage and must not be passed to lv_style_set_prop.",
        " * Registered at runtime via lvgljs_style_css_prop_init (see lv_style_prop_extend.cpp).",
        " * Auto-generated by scripts/lv_conf_gen.py - do not edit by hand.",
        " */",
        "#ifndef LVGLJS_LV_STYLE_PROP_EXTEND_H",
        "#define LVGLJS_LV_STYLE_PROP_EXTEND_H",
        "",
        "#include <lvgl.h>",
        "",
        "#ifdef __cplusplus",
        "extern \"C\" {",
        "#endif",
        "",
    ]
    for symbol in symbols:
        lines.append(f"extern lv_style_prop_t {symbol};")
    lines += [
        "",
        "lv_style_prop_t lvjs_style_register_prop(void);",
        "void lvgljs_style_css_prop_init(void);",
        "",
        "#ifdef __cplusplus",
        "}",
        "#endif",
        "",
        "#endif",
        "",
    ]
    return "\n".join(lines)


def render_extend_cpp(symbols: list[str]) -> str:
    lines = [
        "/* Auto-generated by scripts/lv_conf_gen.py - do not edit by hand. */",
        "",
        '#include "lv_style_prop_extend.h"',
        "",
    ]
    for symbol in symbols:
        lines.append(f"lv_style_prop_t {symbol};")
    lines += [
        "",
        "void lvgljs_style_css_prop_init(void)",
        "{",
    ]
    for symbol in symbols:
        lines.append(
            f"    {symbol} = lvjs_style_register_prop();"
        )
    lines += ["}", ""]
    return "\n".join(lines)


def parse_symbols(raw_text: str, names: list[str]) -> list[Entry]:
    """Resolve manifest symbols: #define or extern (lv_style_prop_t / uint16_t / uint32_t)."""
    wanted = set(names)
    found: dict[str, Entry] = {}
    for line in raw_text.splitlines():
        if m := SYMBOL_DECL_RE.match(line):
            sym = m.group(1) or m.group(2)
            if sym in wanted:
                found[sym] = Entry(sym, sym)
    missing = [n for n in names if n not in found]
    if missing:
        raise RuntimeError(
            f"Missing #define or extern symbol: {', '.join(missing)}"
        )
    return [found[n] for n in names]


def detect_extern_symbols(raw_text: str, c_type: str) -> list[Entry]:
    """Auto-detect every `extern <c_type> NAME;` in the header (source order)."""
    rx = re.compile(rf"^\s*extern\s+{re.escape(c_type)}\s+([A-Z][A-Z0-9_]*)\s*;")
    names: list[str] = []
    seen: set[str] = set()
    for line in raw_text.splitlines():
        if m := rx.match(line):
            name = m.group(1)
            if name not in seen:
                seen.add(name)
                names.append(name)
    if not names:
        raise RuntimeError(f"No 'extern {c_type}' declarations found in header")
    return [Entry(n, n) for n in names]


def detect_define_symbols(raw_text: str, prefix: str) -> list[Entry]:
    """Auto-detect every object-like `#define <prefix>...` macro (source order)."""
    names: list[str] = []
    seen: set[str] = set()
    for line in raw_text.splitlines():
        if m := OBJECT_DEFINE_RE.match(line):
            name = m.group(1)
            if name.startswith(prefix) and name not in seen:
                seen.add(name)
                names.append(name)
    if not names:
        raise RuntimeError(f"No object-like '#define {prefix}*' macros found in header")
    return [Entry(n, n) for n in names]


def parse_enum(raw_text: str, typedef: str, renames: dict[str, str]) -> list[Entry]:
    defines = parse_object_defines(raw_text)
    return [
        Entry(
            renames.get(mem.name, mem.name),
            mem.name,
            EnumMemberComment(mem.section, mem.doc, mem.blank_before),
            ts_literal=mem.numeric_value,
            explicit_expr=mem.explicit_expr,
        )
        for mem in parse_enum_members(
            raw_text,
            typedef,
            renames,
            capture_trailing=True,
            defines=defines,
        )
    ]


def build_register_prop_literals(last_built_in: int) -> dict[str, int]:
    """Fake TS literals from lv_style_register_prop / lvjs_style_register_prop order."""
    counter = last_built_in
    literals: dict[str, int] = {}
    for path in LV_STYLE_REGISTER_PROP_SOURCES:
        if not path.is_file():
            raise RuntimeError(f"missing lv_style_register_prop source: {path}")
        for line in path.read_text(encoding="utf-8").splitlines():
            if m := REG_STYLE_PROP_ASSIGN_RE.match(line):
                counter += 1
                symbol = m.group(1)
                if symbol in literals and literals[symbol] != counter:
                    raise RuntimeError(
                        f"conflicting register_prop literal for {symbol!r} in {path}"
                    )
                literals[symbol] = counter
    return literals


def assign_fake_literals_for_unregistered_runtime(
    sections: list[Section],
    literals: dict[str, int],
) -> None:
    """Assign sequential fake ids for runtime-section props without lv_style_register_prop."""
    counter = max(literals.values(), default=0)
    for section_name in LV_STYLE_PROP_RUNTIME_SECTION_NAMES:
        for entry in section_by_name(sections, section_name).entries:
            if entry.js_name in LV_STYLE_PROP_REGISTRY_EXCLUDE:
                continue
            if entry.js_name in literals:
                continue
            counter += 1
            literals[entry.js_name] = counter


def build_lv_style_prop_literal_map(sections: list[Section]) -> dict[str, int]:
    """Fake lv_style_prop_t literal types for LvStyleProp (TS-only; runtime values from lv_conf)."""
    lv_prop_names = {entry.js_name for entry in collect_lv_style_prop_entries(sections)}
    literals: dict[str, int] = {}
    last_built_in: int | None = None
    sec = section_by_name(sections, "lv_style_prop_t")
    for entry in sec.entries:
        if entry.c_name in ("LV_STYLE_LAST_BUILT_IN_PROP",):
            if entry.ts_literal is not None:
                last_built_in = entry.ts_literal
        if entry.ts_literal is None or entry.js_name not in lv_prop_names:
            continue
        if entry.js_name in literals and literals[entry.js_name] != entry.ts_literal:
            raise RuntimeError(
                f"conflicting ts literal for {entry.js_name!r}: "
                f"{literals[entry.js_name]!r} vs {entry.ts_literal!r}"
            )
        literals[entry.js_name] = entry.ts_literal

    if last_built_in is None:
        last_built_in = literals.get("LV_STYLE_LAST_BUILT_IN_PROP")
    if last_built_in is not None:
        for symbol, value in build_register_prop_literals(last_built_in).items():
            if symbol not in lv_prop_names:
                continue
            if symbol in literals and literals[symbol] != value:
                raise RuntimeError(
                    f"conflicting ts literal for {symbol!r}: "
                    f"builtin {literals[symbol]!r} vs register_prop {value!r}"
                )
            literals[symbol] = value
        assign_fake_literals_for_unregistered_runtime(sections, literals)

    return literals


def format_lv_style_prop_ref(js_name: str, ts_literal: int | None) -> str:
    if ts_literal is not None:
        return f"lv.{js_name} as {ts_literal}"
    raise RuntimeError(f"missing fake lv_style_prop literal for LvStyleProp.{js_name}")


def section_has_comments(sec: Section) -> bool:
    if sec.doc:
        return True
    return any(
        e.comment
        and (e.comment.doc or e.comment.section_comment or e.comment.blank_before)
        for e in sec.entries
    )


def render_cpp_comment(lines: CommentLines, indent: str = "    ") -> list[str]:
    if len(lines) == 1:
        return [f"{indent}/* {lines[0]} */"]
    out = [f"{indent}/*"]
    for line in lines:
        out.append(f"{indent} * {line}")
    out.append(f"{indent} */")
    return out


def append_comment_lines(
    lines: list[str],
    comment: CommentLines | None,
    *,
    cpp: bool,
    indent: str = "    ",
) -> None:
    if not comment:
        return
    if cpp:
        lines.extend(render_cpp_comment(comment, indent))
    else:
        lines.extend(render_ts_comment(comment))


def section_marker(sec: Section, kind: str) -> str:
    return f"{sec.name} {kind} - {sec.header}"


def emit_entry_comments(
    lines: list[str],
    entry: Entry,
    current_section: CommentLines | None,
    emitted: bool,
    *,
    cpp: bool,
) -> CommentLines | None:
    comment = entry.comment
    if not comment:
        return current_section

    need_section = comment.section_comment and comment.section_comment != current_section
    if emitted and (comment.blank_before or need_section):
        lines.append("")
    if need_section:
        append_comment_lines(lines, comment.section_comment, cpp=cpp)
        current_section = comment.section_comment
    append_comment_lines(lines, comment.doc, cpp=cpp)
    return current_section


def load_sections(manifest: dict) -> list[Section]:
    lvgl_root = manifest["lvgl_root"]
    sections: list[Section] = []
    seen: set[str] = set()

    for spec in manifest["sections"]:
        if spec.get("function_prefix"):
            continue
        header_rel = spec["header"]
        if spec.get("project_root") == "repo":
            header_path = ROOT / header_rel
        else:
            header_path = ROOT / lvgl_root / header_rel
        raw_text = header_path.read_text(encoding="utf-8")
        guard = spec.get("guard")
        section_label = spec.get("name") or spec.get("enum_typedef") or "symbols"
        doc = normalize_doc(spec.get("doc"), context=f"section {section_label!r}")

        if "symbols" in spec:
            entries = parse_symbols(raw_text, spec["symbols"])
        elif extern_type := spec.get("extern_type"):
            entries = detect_extern_symbols(raw_text, extern_type)
        elif define_prefix := spec.get("define_prefix"):
            entries = detect_define_symbols(raw_text, define_prefix)
        elif typedef := spec.get("enum_typedef"):
            renames = spec.get("renames", {})
            entries = parse_enum(raw_text, typedef, renames)
        else:
            raise RuntimeError(
                f"Section {header_rel!r} needs symbols, extern_type, "
                "define_prefix, enum_typedef, or function_prefix"
            )

        for e in entries:
            if e.js_name in seen:
                raise RuntimeError(f"Duplicate exported constant: {e.js_name}")
            seen.add(e.js_name)

        name = spec.get("name") or spec.get("enum_typedef") or "symbols"
        header_label = header_rel if spec.get("project_root") == "repo" else f"{lvgl_root}/{header_rel}"
        sections.append(Section(name, header_label, entries, guard, doc))

    return sections


def render_cpp(sections: list[Section]) -> str:
    lines = [
        "/* Auto-generated by scripts/lv_conf_gen.py - do not edit by hand. */",
        "",
        '#include "./lv_conf.hpp"',
        "",
        "static void set_int_prop(JSContext* ctx, JSValue obj, const char* name, int32_t value) {",
        "    JS_SetPropertyStr(ctx, obj, name, JS_NewInt32(ctx, value));",
        "}",
        "",
        "void Native_lv_conf_Init(JSContext* ctx, JSValue& ns) {",
        "    JSValue obj = JS_NewObject(ctx);",
        "",
    ]
    for i, sec in enumerate(sections):
        if i:
            lines.append("")
        if sec.doc:
            append_comment_lines(lines, sec.doc, cpp=True)
        lines.append(f"    /* {section_marker(sec, 'begin')} */")
        if sec.guard:
            lines.append(f"#if {sec.guard}")
        current_section: CommentLines | None = None
        emitted = False
        for e in sec.entries:
            if section_has_comments(sec):
                current_section = emit_entry_comments(
                    lines, e, current_section, emitted, cpp=True
                )
            lines.append(f'    set_int_prop(ctx, obj, "{e.js_name}", {e.c_name});')
            emitted = True
        if sec.guard:
            lines.append("#endif")
        lines.append(f"    /* {section_marker(sec, 'end')} */")
    lines += ['    JS_SetPropertyStr(ctx, ns, "lv_conf", obj);', "}"]
    return "\n".join(lines) + "\n"


def render_ts(sections: list[Section]) -> str:
    lines = [
        "// Auto-generated by scripts/lv_conf_gen.py - do not edit by hand.",
        "",
        'import { GetBridge } from "./bridge";',
        "",
        "const lv_conf = GetBridge().NativeRender.lv_conf;",
        "",
        "/** Read once at module load; hot paths use these plain numbers. */",
        "",
    ]
    for i, sec in enumerate(sections):
        if i:
            lines.append("")
        if sec.doc:
            append_comment_lines(lines, sec.doc, cpp=False)
        lines.append(f"// {section_marker(sec, 'begin')}")
        current_section: CommentLines | None = None
        emitted = False
        for e in sec.entries:
            if section_has_comments(sec):
                current_section = emit_entry_comments(
                    lines, e, current_section, emitted, cpp=False
                )
            lines.append(f"export const {e.js_name} = lv_conf.{e.js_name};")
            emitted = True
        lines.append(f"// {section_marker(sec, 'end')}")
    return "\n".join(lines) + "\n"


MACRO_NAME = r"_?[A-Z][A-Z0-9_]*"
OBJECT_DEFINE_VALUE_RE = re.compile(
    rf"^\s*#\s*define\s+({MACRO_NAME})(?=\s|$)\s+(.+?)(?:\s*/\*.*)?$"
)


def parse_object_defines(raw_text: str) -> dict[str, str]:
    defines: dict[str, str] = {}
    for line in raw_text.splitlines():
        stripped = line.strip()
        if not stripped.startswith("#define"):
            continue
        if m := OBJECT_DEFINE_VALUE_RE.match(stripped):
            name, expr = m.group(1), m.group(2).strip()
            if "//" in expr:
                expr = expr.split("//", 1)[0].strip()
            defines[name] = expr
    return defines


def expand_define_expr(expr: str, defines: dict[str, str], *, seen: set[str] | None = None) -> str:
    if seen is None:
        seen = set()
    expr = expr.strip()
    while expr.startswith("(") and expr.endswith(")"):
        inner = expr[1:-1].strip()
        if inner.count("(") == expr.count("(") - 1:
            expr = inner
        else:
            break
    expr = re.sub(r"\(\w+\)", "", expr)
    if re.fullmatch(r"-?0x[0-9A-Fa-f]+", expr):
        return expr
    if re.fullmatch(r"-?\d+[uUlL]*", expr):
        return re.sub(r"[uUlL]+$", "", expr)
    if re.fullmatch(MACRO_NAME, expr):
        if expr in seen:
            raise RuntimeError(f"circular #define while expanding {expr!r}")
        if expr not in defines:
            raise RuntimeError(f"unknown #define symbol {expr!r}")
        seen.add(expr)
        return expand_define_expr(defines[expr], defines, seen=seen)

    changed = True
    while changed:
        changed = False

        def replace_symbol(match: re.Match[str]) -> str:
            nonlocal changed
            name = match.group(0)
            if name not in defines:
                return name
            changed = True
            if name in seen:
                raise RuntimeError(f"circular #define while expanding {name!r}")
            expanded = expand_define_expr(defines[name], defines, seen={*seen, name})
            return f"({expanded})"

        expr = re.sub(rf"\b{MACRO_NAME}\b", replace_symbol, expr)
    return expr


def eval_define_expr(expr: str, defines: dict[str, str]) -> int:
    expanded = expand_define_expr(expr, defines)
    expanded = re.sub(r"\b0x([0-9A-Fa-f]+)\b", lambda m: str(int(m.group(1), 16)), expanded)
    expanded = re.sub(r"\b(\d+)[uUlL]+\b", r"\1", expanded)
    if not re.fullmatch(r"[\d\s()+\-*/%|&^~<<>>.]+", expanded):
        raise RuntimeError(f"unsupported #define expression after expansion: {expanded!r}")
    return int(eval(expanded, {"__builtins__": {}}, {}))  # noqa: S307


@dataclass
class StubGroup:
    comment: str
    entries: list[tuple[str, int]]


STUB_FAKE_VALUE_START = 1


def try_resolve_stub_entry(
    entry: Entry,
    *,
    section_values: dict[str, int],
    defines: dict[str, str],
) -> int | None:
    """Return a stub literal when the value is easy to resolve from headers."""
    if entry.explicit_expr is not None:
        try:
            return resolve_enum_value_expr(
                entry.explicit_expr,
                section_values,
                defines=defines,
            )
        except RuntimeError:
            if entry.ts_literal is not None:
                return entry.ts_literal
            return None
    if entry.c_name in defines:
        try:
            return eval_define_expr(defines[entry.c_name], defines)
        except RuntimeError:
            return None
    if entry.ts_literal is not None:
        return entry.ts_literal
    return None


def resolve_lv_coord_max(
    manifest: dict[str, Any],
    sections: list[Section],
) -> int:
    lvgl_root = manifest["lvgl_root"]
    section_by_name = {sec.name: sec for sec in sections}
    for spec in manifest["sections"]:
        symbols = spec.get("symbols") or []
        if "LV_COORD_MAX" not in symbols:
            continue
        section_label = spec.get("name") or "symbols"
        sec = section_by_name[section_label]
        header_path = (
            ROOT / spec["header"]
            if spec.get("project_root") == "repo"
            else ROOT / lvgl_root / spec["header"]
        )
        defines = parse_object_defines(header_path.read_text(encoding="utf-8"))
        for entry in sec.entries:
            if entry.js_name != "LV_COORD_MAX":
                continue
            val = try_resolve_stub_entry(entry, section_values={}, defines=defines)
            if val is not None:
                return val
        if "LV_COORD_MAX" in defines:
            try:
                return eval_define_expr(defines["LV_COORD_MAX"], defines)
            except RuntimeError:
                pass
    print(
        "lv_conf stub: could not resolve LV_COORD_MAX; "
        f"using fake value {STUB_FAKE_VALUE_START}",
        flush=True,
    )
    return STUB_FAKE_VALUE_START


def is_lv_conf_stub_section(spec: dict[str, Any]) -> bool:
    """Sections exported to lv_conf that should also appear in lv_conf.stub.ts."""
    if spec.get("function_prefix") or spec.get("define_prefix") or spec.get("extern_type"):
        return False
    if spec.get("name") == "lv_style_prop_t":
        return False
    return bool(spec.get("enum_typedef") or spec.get("symbols"))


def build_lv_conf_stub_groups(
    manifest: dict[str, Any],
    sections: list[Section],
    style_literals: dict[str, int],
) -> list[StubGroup]:
    """Build lv_conf.stub.ts groups: required coord + LV_STYLE_*, then all lv_conf enum/symbol sections."""
    lvgl_root = manifest["lvgl_root"]
    section_by_name = {sec.name: sec for sec in sections}
    header_defines: dict[str, dict[str, str]] = {}
    merged: dict[str, int] = {}

    def defines_for_header(header_rel: str, project_root: str | None) -> dict[str, str]:
        cache_key = f"{project_root or lvgl_root}:{header_rel}"
        if cache_key not in header_defines:
            header_path = (
                ROOT / header_rel
                if project_root == "repo"
                else ROOT / lvgl_root / header_rel
            )
            header_defines[cache_key] = parse_object_defines(
                header_path.read_text(encoding="utf-8")
            )
        return header_defines[cache_key]

    groups: list[StubGroup] = []

    coord_max = resolve_lv_coord_max(manifest, sections)
    merged["LV_COORD_MAX"] = coord_max
    groups.append(StubGroup("required: LV_COORD_MAX (lv_conf_macros.ts)", [("LV_COORD_MAX", coord_max)]))

    style_entries = sorted(style_literals.items())
    if not style_entries:
        raise RuntimeError("lv_conf stub requires LV_STYLE_* literals from style_prop.ts")
    for name, value in style_entries:
        if not name.startswith("LV_STYLE_"):
            raise RuntimeError(f"unexpected non-style literal in stub map: {name!r}")
        merged[name] = value
    groups.append(
        StubGroup(
            "required: LV_STYLE_* (style_prop.ts `as N` literals)",
            style_entries,
        )
    )

    for spec in manifest["sections"]:
        if not is_lv_conf_stub_section(spec):
            continue
        resolve_from_header = spec.get("stub") is True
        section_label = spec.get("name") or spec.get("enum_typedef") or "symbols"
        sec = section_by_name[section_label]
        defines = (
            defines_for_header(spec["header"], spec.get("project_root"))
            if resolve_from_header
            else {}
        )
        section_values: dict[str, int] = {}
        section_entries: list[tuple[str, int]] = []
        faked: list[str] = []
        fake_next = STUB_FAKE_VALUE_START
        for entry in sec.entries:
            if entry.js_name in merged:
                continue
            if resolve_from_header:
                val = try_resolve_stub_entry(
                    entry,
                    section_values=section_values,
                    defines=defines,
                )
                if val is None:
                    val = fake_next
                    fake_next += 1
                    faked.append(entry.js_name)
            else:
                val = fake_next
                fake_next += 1
            section_values[entry.c_name] = val
            section_entries.append((entry.js_name, val))
            merged[entry.js_name] = val
        if section_entries:
            header_label = (
                spec["header"]
                if spec.get("project_root") == "repo"
                else f"{lvgl_root}/{spec['header']}"
            )
            mode = "header" if resolve_from_header else "fake"
            groups.append(
                StubGroup(
                    f"stub ({mode}): {section_label} - {header_label}",
                    section_entries,
                )
            )
        if faked:
            print(
                f"lv_conf stub: faked {len(faked)} unresolvable symbol(s) "
                f"in section {section_label!r}: {', '.join(faked)}",
                flush=True,
            )

    missing_style = sorted(set(style_literals) - set(merged))
    if missing_style:
        raise RuntimeError(
            "lv_conf stub missing required LV_STYLE_* keys: "
            + ", ".join(missing_style)
        )
    return groups


def render_lv_conf_stub(groups: list[StubGroup]) -> str:
    lines = [
        "/**",
        " * Auto-generated by scripts/lv_conf_gen.py - do not edit by hand.",
        " *",
        " * Numeric lv_conf fallbacks for Node specs (see lv.setup.spec.ts).",
        " * Required: LV_COORD_MAX, all LV_STYLE_* (pairs with style_prop.ts).",
        " * Enum/symbol sections: \"stub\": true resolves from headers; otherwise faked from 1 per section.",
        " */",
        "export const SPEC_LV_CONF_STUB: Record<string, number> = {",
    ]
    for i, group in enumerate(groups):
        if i:
            lines.append("")
        lines.append(f"  // {group.comment}")
        for name, value in group.entries:
            lines.append(f"  {name}: {value},")
    lines.append("};")
    lines.append("")
    return "\n".join(lines)


@dataclass
class AnimPathEntry:
    symbol: str
    key: str
    index: int


@dataclass
class FunctionArraySection:
    spec: dict[str, Any]
    header_label: str
    entries: list[AnimPathEntry]


def detect_function_symbols(raw_text: str, prefix: str) -> list[str]:
    escaped = re.escape(prefix)
    rx = re.compile(rf"^\s*(?:int32_t|lv_coord_t)\s+({escaped}[A-Za-z0-9_]+)\s*\(")
    names: list[str] = []
    seen: set[str] = set()
    for line in raw_text.splitlines():
        if m := rx.match(line):
            name = m.group(1)
            if name not in seen:
                seen.add(name)
                names.append(name)
    if not names:
        raise RuntimeError(f"No functions with prefix {prefix!r} found in header")
    return names


def load_function_array_sections(manifest: dict[str, Any]) -> list[FunctionArraySection]:
    lvgl_root = manifest["lvgl_root"]
    sections: list[FunctionArraySection] = []
    for spec in manifest["sections"]:
        prefix = spec.get("function_prefix")
        if not prefix:
            continue
        if not isinstance(prefix, str) or not prefix:
            raise RuntimeError(
                f"section {spec.get('name')!r}: function_prefix must be a non-empty string"
            )
        export_cpp = spec.get("export_cpp_array")
        alias = spec.get("alias") or {}
        export_ts = alias.get("export")
        if not export_cpp or not export_ts:
            raise RuntimeError(
                f"section {spec.get('name')!r}: function_prefix needs "
                "export_cpp_array and alias.export"
            )
        header_rel = spec["header"]
        header_label = (
            header_rel
            if spec.get("project_root") == "repo"
            else f"{lvgl_root}/{header_rel}"
        )
        if spec.get("project_root") == "repo":
            header_path = ROOT / header_rel
        else:
            header_path = ROOT / lvgl_root / header_rel
        raw_text = header_path.read_text(encoding="utf-8")
        symbols = detect_function_symbols(raw_text, prefix)
        exclude = set(alias.get("exclude") or [])
        entries: list[AnimPathEntry] = []
        seen_keys: set[str] = set()
        index = 0
        for symbol in symbols:
            if symbol in exclude:
                continue
            key = alias_lv_name_to_key(symbol, alias, context=export_ts)
            if key in seen_keys:
                raise RuntimeError(f"{export_ts}: duplicate anim path key {key!r}")
            seen_keys.add(key)
            entries.append(AnimPathEntry(symbol=symbol, key=key, index=index))
            index += 1
        if not entries:
            raise RuntimeError(f"{export_ts}: no function array entries after exclude")
        sections.append(FunctionArraySection(spec=spec, header_label=header_label, entries=entries))
    return sections


def render_anim_path_h(spec: dict[str, Any], entries: list[AnimPathEntry]) -> str:
    array_name = spec["export_cpp_array"]
    alias = spec.get("alias") or {}
    doc = alias.get("doc") or spec.get("doc") or "LVGL animation path callbacks"
    lines = [
        "/* Auto-generated by scripts/lv_conf_gen.py - do not edit by hand. */",
        "#pragma once",
        "",
        "#include <lvgl.h>",
        "",
        f"/* {doc} */",
        f"extern const lv_anim_path_cb_t {array_name}[];",
        "extern const size_t LV_ANIM_PATH_COUNT;",
        "",
    ]
    return "\n".join(lines)


def render_anim_path_cpp(
    spec: dict[str, Any], entries: list[AnimPathEntry], header_label: str
) -> str:
    array_name = spec["export_cpp_array"]
    alias = spec.get("alias") or {}
    doc = alias.get("doc") or spec.get("doc") or "LVGL animation path callbacks"
    lines = [
        "/* Auto-generated by scripts/lv_conf_gen.py - do not edit by hand. */",
        "",
        "#include <lvgl.h>",
        "",
        f"/* {doc} - {header_label} */",
        f"extern const lv_anim_path_cb_t {array_name}[] = {{",
    ]
    for entry in entries:
        lines.append(f"    &{entry.symbol},")
    lines += [
        "};",
        "",
        f"extern const size_t LV_ANIM_PATH_COUNT = sizeof({array_name}) / sizeof({array_name}[0]);",
        "",
    ]
    return "\n".join(lines)


def render_anim_path_ts(spec: dict[str, Any], entries: list[AnimPathEntry], header_label: str) -> list[str]:
    alias = spec.get("alias") or {}
    export = alias["export"]
    doc = alias.get("doc") or export
    type_name = alias.get("type_name")
    lines = [
        f"// {export} - {header_label}",
        f"/** {doc} */",
        f"export const {export} = {{",
    ]
    for entry in entries:
        lines.append(f"  {ts_property_key(entry.key)}: {entry.index},")
    lines.append("} as const;")
    if type_name:
        lines.append("")
        lines.append(f"export type {type_name} = keyof typeof {export};")
    return lines


def load_transition_compare_entries() -> list[dict[str, Any]]:
    data = json.loads(TRANSITION_COMPARE_JSON.read_text(encoding="utf-8"))
    entries = data.get("entries")
    if not isinstance(entries, list) or not entries:
        raise RuntimeError(f"{TRANSITION_COMPARE_JSON} has no entries")
    return entries


def validate_transition_entries(entries: list[dict[str, Any]]) -> None:
    seen_keys: set[str] = set()
    for entry in entries:
        trans_key = entry.get("trans_key")
        if not entry.get("match"):
            raise RuntimeError(
                f"transition compare entry {trans_key!r} has match=false"
            )
        if not entry.get("lv_symbol"):
            raise RuntimeError(
                f"transition compare entry {trans_key!r} has no lv_symbol"
            )
        if not trans_key:
            raise RuntimeError("transition compare entry missing trans_key")
        if trans_key in seen_keys:
            raise RuntimeError(f"duplicate transition property key {trans_key!r}")
        seen_keys.add(trans_key)


def load_transition_typo_hints(manifest: dict[str, Any]) -> dict[str, str]:
    transition = manifest.get("transition") or {}
    typo_hints = transition.get("typoHints") or {}
    if not isinstance(typo_hints, dict):
        raise RuntimeError("lv_conf_manifest transition.typoHints must be an object")
    result: dict[str, str] = {}
    for typo, canonical in typo_hints.items():
        if not isinstance(typo, str) or not isinstance(canonical, str):
            raise RuntimeError("transition.typoHints keys and values must be strings")
        if typo in result:
            raise RuntimeError(f"duplicate transition typo hint {typo!r}")
        result[typo] = canonical
    return result


def validate_transition_typo_hints(
    typo_hints: dict[str, str],
    entries: list[dict[str, Any]],
) -> None:
    trans_keys = {entry["trans_key"] for entry in entries}
    for typo, canonical in typo_hints.items():
        if typo not in trans_keys:
            raise RuntimeError(
                f"transition typo hint {typo!r} missing from transition_lvgl_compare.json"
            )
        if typo == canonical:
            raise RuntimeError(
                f"transition typo hint {typo!r} must differ from canonical {canonical!r}"
            )


@dataclass(frozen=True)
class TransitionAliasMaps:
    """style: trans.ts legacy -> cpp/style canonical; css_camel: camelCase cpp -> CSS hyphen."""

    style: dict[str, str]
    css_camel: dict[str, str]

    @property
    def css_camel_by_trans(self) -> dict[str, str]:
        return {css_key: camel_key for camel_key, css_key in self.css_camel.items()}


def hyphen_to_camel(key: str) -> str:
    parts = key.split("-")
    if len(parts) == 1:
        return key
    head, *tail = parts
    return head + "".join(
        part[:1].upper() + part[1:] if len(part) > 1 else part.upper()
        for part in tail
    )


def is_css_camel_alias_pair(trans_key: str, cpp_key: str) -> bool:
    return "-" in trans_key and hyphen_to_camel(trans_key) == cpp_key


def build_cpp_keys_by_symbol(cpp_raw: list[dict[str, Any]]) -> dict[str, list[str]]:
    cpp_by_symbol: dict[str, list[str]] = {}
    for row in cpp_raw:
        if row.get("status") != "REAL":
            continue
        symbol = row.get("cpp_lv_symbol")
        cpp_key = row.get("cpp_key")
        if not symbol or not cpp_key:
            continue
        cpp_by_symbol.setdefault(symbol, []).append(cpp_key)
    return cpp_by_symbol


def pick_canonical_cpp_key(cpp_keys: list[str], trans_key: str) -> str:
    candidates = [key for key in cpp_keys if key != trans_key]
    if not candidates:
        raise RuntimeError(
            f"no canonical cpp_key for legacy transition key {trans_key!r}"
        )
    non_pct = [key for key in candidates if not key.endswith("_pct")]
    pool = non_pct if non_pct else candidates
    if len(pool) == 1:
        return pool[0]
    return sorted(pool)[0]


def build_transition_aliases(
    entries: list[dict[str, Any]],
    cpp_raw: list[dict[str, Any]],
) -> TransitionAliasMaps:
    cpp_by_symbol = build_cpp_keys_by_symbol(cpp_raw)
    style: dict[str, str] = {}
    css_camel: dict[str, str] = {}
    for entry in entries:
        trans_key = entry["trans_key"]
        cpp_keys = cpp_by_symbol.get(entry["lv_symbol"], [])
        if not cpp_keys or trans_key in cpp_keys:
            continue
        canonical = pick_canonical_cpp_key(cpp_keys, trans_key)
        if is_css_camel_alias_pair(trans_key, canonical):
            existing = css_camel.get(canonical)
            if existing is not None and existing != trans_key:
                raise RuntimeError(
                    f"conflicting CSS key for camelCase alias {canonical!r}: "
                    f"{existing!r} vs {trans_key!r}"
                )
            css_camel[canonical] = trans_key
            continue
        existing = style.get(trans_key)
        if existing is not None and existing != canonical:
            raise RuntimeError(
                f"conflicting canonical cpp_key for transition alias {trans_key!r}: "
                f"{existing!r} vs {canonical!r}"
            )
        style[trans_key] = canonical
    return TransitionAliasMaps(style=style, css_camel=css_camel)


def validate_transition_aliases(
    alias_maps: TransitionAliasMaps,
    entries: list[dict[str, Any]],
    cpp_raw: list[dict[str, Any]],
) -> None:
    trans_by_key = {entry["trans_key"]: entry for entry in entries}
    real_cpp_keys = {
        row["cpp_key"]: row for row in cpp_raw if row.get("status") == "REAL"
    }
    for legacy, canonical in alias_maps.style.items():
        if legacy not in trans_by_key:
            raise RuntimeError(
                f"transition alias legacy {legacy!r} missing from transition_lvgl_compare.json"
            )
        if canonical not in real_cpp_keys:
            raise RuntimeError(
                f"transition alias canonical {canonical!r} missing from cpp_lv_symbol_mapping.json"
            )
        trans_symbol = trans_by_key[legacy]["lv_symbol"]
        cpp_symbol = real_cpp_keys[canonical]["cpp_lv_symbol"]
        if trans_symbol != cpp_symbol:
            raise RuntimeError(
                f"transition alias {legacy!r} -> {canonical!r} lv_symbol mismatch: "
                f"{trans_symbol} vs {cpp_symbol}"
            )
    for camel_key, css_key in alias_maps.css_camel.items():
        if css_key not in trans_by_key:
            raise RuntimeError(
                f"CSS camelCase alias {css_key!r} missing from transition_lvgl_compare.json"
            )
        if camel_key not in real_cpp_keys:
            raise RuntimeError(
                f"CSS camelCase alias {camel_key!r} missing from cpp_lv_symbol_mapping.json"
            )
        if not is_css_camel_alias_pair(css_key, camel_key):
            raise RuntimeError(
                f"CSS camelCase alias pair {camel_key!r} <-> {css_key!r} is invalid"
            )
        trans_symbol = trans_by_key[css_key]["lv_symbol"]
        cpp_symbol = real_cpp_keys[camel_key]["cpp_lv_symbol"]
        if trans_symbol != cpp_symbol:
            raise RuntimeError(
                f"CSS camelCase alias {camel_key!r} -> {css_key!r} lv_symbol mismatch: "
                f"{cpp_symbol} vs {trans_symbol}"
            )


LV_STYLE_PROP_SECTION_NAMES = (
    "lv_style_prop_t",
    "lv_style_prop_t_extend_css",
)

# CSS props: fake literal types from lv_style_register_prop simulation.
LV_STYLE_PROP_RUNTIME_SECTION_NAMES = frozenset({
    "lv_style_prop_t_extend_css",
})

# Sentinel ids from lv_style.h; still exported on lv_conf, not real style props.
LV_STYLE_PROP_REGISTRY_EXCLUDE = frozenset({
    "LV_STYLE_PROP_INV",
    "LV_STYLE_PROP_ANY",
    "LV_STYLE_PROP_CONST",
    "LV_STYLE_LAST_BUILT_IN_PROP",
    "LV_STYLE_NUM_BUILT_IN_PROPS",
})

STYLE_VALUE_FIELD_TO_KIND = {
    "num": "Num",
    "color": "Color",
    "ptr": "Ptr",
}

VALUE_KIND_TO_TS = {
    "Num": "StylePropValueKind.Num",
    "Color": "StylePropValueKind.Color",
    "Ptr": "StylePropValueKind.Ptr",
    "CSS": "StylePropValueKind.CSS",
}

LV_STYLE_VALUE_FIELD_RE = re.compile(r"\.(num|color|ptr)\s*=")
LV_STYLE_SET_PROP_RE = re.compile(
    r"lv_style_set_prop\s*\([^,]+,\s*(LV_STYLE_\w+)\s*,"
)


def parse_lv_style_setter_value_kinds(path: Path) -> dict[str, str]:
    """Map LV_STYLE_* symbols to value kinds from lv_style_set_* in an LVGL .c file."""
    text = path.read_text(encoding="utf-8")
    kinds: dict[str, str] = {}
    for part in re.split(r"(?=void\s+lv_style_set_)", text):
        if not part.startswith("void lv_style_set_"):
            continue
        field_match = LV_STYLE_VALUE_FIELD_RE.search(part)
        prop_match = LV_STYLE_SET_PROP_RE.search(part)
        if not field_match or not prop_match:
            continue
        symbol = prop_match.group(1)
        kind = STYLE_VALUE_FIELD_TO_KIND[field_match.group(1)]
        if symbol in kinds and kinds[symbol] != kind:
            raise RuntimeError(
                f"{path}: conflicting value kind for {symbol}: "
                f"{kinds[symbol]!r} vs {kind!r}"
            )
        kinds[symbol] = kind
    return kinds


def load_lv_style_setter_value_kinds(
    sources: tuple[Path, ...] = LV_STYLE_SETTER_C_SOURCES,
) -> dict[str, str]:
    """Merge value kinds from lv_style_gen.c, lv_flex.c, and lv_grid.c."""
    merged: dict[str, str] = {}
    for path in sources:
        for symbol, kind in parse_lv_style_setter_value_kinds(path).items():
            if symbol in merged and merged[symbol] != kind:
                raise RuntimeError(
                    f"conflicting value kind for {symbol}: "
                    f"{merged[symbol]!r} in prior source vs {kind!r} in {path}"
                )
            merged[symbol] = kind
    return merged


def resolve_lv_style_prop_value_kind(
    symbol: str,
    setter_kinds: dict[str, str],
) -> str:
    if symbol in setter_kinds:
        return setter_kinds[symbol]
    if symbol.startswith("LV_STYLE_CSS_"):
        return "CSS"
    raise RuntimeError(
        f"no StylePropValueKind for {symbol!r}; "
        f"add lv_style_set_* in lv_style_gen.c / lv_flex.c / lv_grid.c "
        f"or register as LV_STYLE_CSS_*"
    )


def build_lv_style_prop_value_kinds(
    lv_prop_names: list[str],
    setter_kinds: dict[str, str],
) -> dict[str, str]:
    kinds: dict[str, str] = {}
    for symbol in lv_prop_names:
        kinds[symbol] = resolve_lv_style_prop_value_kind(symbol, setter_kinds)
    return kinds


def iter_lv_style_prop_entries(
    sections: list[Section],
) -> list[tuple[Entry, str]]:
    out: list[tuple[Entry, str]] = []
    for name in LV_STYLE_PROP_SECTION_NAMES:
        for entry in section_by_name(sections, name).entries:
            if entry.js_name not in LV_STYLE_PROP_REGISTRY_EXCLUDE:
                out.append((entry, name))
    return out


def collect_lv_style_prop_entries(sections: list[Section]) -> list[Entry]:
    return [entry for entry, _ in iter_lv_style_prop_entries(sections)]


def cpp_row_lv_symbol(row: dict[str, Any]) -> str:
    symbol = row.get("cpp_lv_symbol")
    if symbol:
        return symbol
    slots = row.get("slots") or []
    if slots:
        return slots[0]["lv_symbol"]
    raise RuntimeError(f"cpp_lv_symbol_mapping row {row.get('cpp_key')!r} has no lv symbol")


def render_lv_style_prop_block(
    entries: list[tuple[Entry, str]],
    lv_style_literals: dict[str, int],
) -> list[str]:
    lines = [
        "/** Mirrors C `lv_style_prop_t`; values from lv_conf at module load. */",
        "export const LvStyleProp = {",
    ]
    for entry, _section_name in entries:
        literal = lv_style_literals.get(entry.js_name)
        lines.append(
            f"  {entry.js_name}: {format_lv_style_prop_ref(entry.js_name, literal)},"
        )
    lines += [
        "} as const;",
        "",
        "export type LvStylePropId = (typeof LvStyleProp)[keyof typeof LvStyleProp];",
        "",
    ]
    return lines


def render_style_prop_intm_block(
    raw: list[dict[str, Any]],
    lv_prop_names: set[str],
) -> list[str]:
    lines = [
        "/** CSS property / handler group name -> lv_style prop id (batch path). */",
        "export const NATIVE_STYLE_PROP_INTM = {",
    ]
    for row in raw:
        symbol = cpp_row_lv_symbol(row)
        if symbol not in lv_prop_names:
            raise RuntimeError(
                f"NATIVE_STYLE_PROP_INTM: {row['cpp_key']!r} maps to unknown {symbol!r}"
            )
        lines.append(f"  {ts_property_key(row['cpp_key'])}: LvStyleProp.{symbol},")
    lines += [
        "} as const;",
        "",
        "export type NativeStylePropIntmKey = keyof typeof NATIVE_STYLE_PROP_INTM;",
        "",
    ]
    return lines


def render_prop_value_kind_block(
    lv_prop_names: list[str],
    setter_kinds: dict[str, str],
) -> list[str]:
    symbol_kinds = build_lv_style_prop_value_kinds(lv_prop_names, setter_kinds)
    lines = [
        "/** Value kind per prop id (TS-only; C++ infers tag from batch value object keys). */",
        "export const LvStylePropKindMap: Record<LvStylePropId, StylePropValueKind> = {",
    ]
    for symbol in lv_prop_names:
        kind = symbol_kinds[symbol]
        ts_kind = VALUE_KIND_TO_TS.get(kind)
        if not ts_kind:
            raise RuntimeError(f"unknown value_kind {kind!r} for {symbol}")
        lines.append(f"  [LvStyleProp.{symbol}]: {ts_kind},")
    lines += ["} as const;", ""]
    return lines


def render_transition_prop_block(
    entries: list[dict[str, Any]],
    alias_maps: TransitionAliasMaps,
    typo_hints: dict[str, str],
) -> list[str]:
    sorted_entries = sorted(entries, key=lambda item: item["trans_id"])
    lines = ["export const TRANSITION_PROP = {"]

    prev_group: int | None = None
    for entry in sorted_entries:
        trans_id = entry["trans_id"]
        group = trans_id >> 4
        if prev_group is None or group != prev_group:
            lines.append(f"  /*Group {group}*/")
        prev_group = group
        lv_value = f"LvStyleProp.{entry['lv_symbol']}"
        trans_key = entry["trans_key"]
        if trans_key in typo_hints:
            canonical = typo_hints[trans_key]
            lines.append(f"  {ts_property_key(canonical)}: {lv_value},")
            lines.append(
                f"  {ts_property_key(trans_key)}: {lv_value}, "
                "// trans.ts typo workaround"
            )
        elif trans_key in alias_maps.style:
            canonical = alias_maps.style[trans_key]
            lines.append(f"  {ts_property_key(canonical)}: {lv_value},")
            lines.append(
                f"  {ts_property_key(trans_key)}: {lv_value}, // alias"
            )
        elif trans_key in alias_maps.css_camel_by_trans:
            camel_key = alias_maps.css_camel_by_trans[trans_key]
            lines.append(f"  {ts_property_key(trans_key)}: {lv_value},")
            lines.append(
                f"  {ts_property_key(camel_key)}: {lv_value}, // alias"
            )
        else:
            lines.append(f"  {ts_property_key(trans_key)}: {lv_value},")

    lines += ["} as const;", ""]

    lines += [
        "/** REAL alias legacy names; warn but lookup via TRANSITION_PROP. */",
        "export const TRANSITION_PROP_ALIAS = {",
    ]
    for entry in sorted_entries:
        trans_key = entry["trans_key"]
        if trans_key not in alias_maps.style:
            continue
        lines.append(
            "  {legacy}: {canonical},".format(
                legacy=ts_property_key(trans_key),
                canonical=json.dumps(alias_maps.style[trans_key]),
            )
        )
    lines += ["} as const;", ""]

    lines += [
        "/** trans.ts typos; warn but lookup via TRANSITION_PROP. */",
        "export const TRANSITION_TYPO_HINTS = {",
    ]
    for entry in sorted_entries:
        trans_key = entry["trans_key"]
        if trans_key not in typo_hints:
            continue
        lines.append(
            "  {legacy}: {canonical},".format(
                legacy=ts_property_key(trans_key),
                canonical=json.dumps(typo_hints[trans_key]),
            )
        )
    lines += ["} as const;", ""]

    return lines


def build_style_prop_ts(
    manifest: dict[str, Any],
    sections: list[Section],
    lv_style_literals: dict[str, int],
) -> str:
    cpp_raw = load_cpp_lv_symbol_raw()
    lv_prop_entries = iter_lv_style_prop_entries(sections)
    lv_prop_names = [entry.js_name for entry, _ in lv_prop_entries]

    entries = load_transition_compare_entries()
    validate_transition_entries(entries)
    alias_maps = build_transition_aliases(entries, cpp_raw)
    validate_transition_aliases(alias_maps, entries, cpp_raw)
    typo_hints = load_transition_typo_hints(manifest)
    validate_transition_typo_hints(typo_hints, entries)

    lines = [
        f"// Auto-generated by {GEN_SCRIPT} - do not edit by hand.",
        "// Registry: LvStyleProp, NATIVE_STYLE_PROP_INTM, LvStylePropKindMap, TRANSITION_PROP, "
        "TRANSITION_PROP_ALIAS, TRANSITION_TYPO_HINTS",
        "",
        'import * as lv from "./lv_conf";',
        'import { StylePropValueKind } from "./style_prop_value_kind";',
        "",
    ]
    setter_kinds = load_lv_style_setter_value_kinds()
    lines += render_lv_style_prop_block(lv_prop_entries, lv_style_literals)
    lines += render_prop_value_kind_block(lv_prop_names, setter_kinds)
    lines += render_style_prop_intm_block(cpp_raw, set(lv_prop_names))
    lines += render_transition_prop_block(entries, alias_maps, typo_hints)
    return "\n".join(lines)


def alias_lv_name_to_key(lv_name: str, alias: dict[str, Any], *, context: str) -> str:
    """Map an lv_conf symbol to a TS alias-map key using manifest alias config."""
    key_renames = alias.get("renames") or {}
    if not isinstance(key_renames, dict):
        raise RuntimeError(f"{context}: alias.renames must be an object")
    key = key_renames.get(lv_name, lv_name)
    if prefix := alias.get("strip_prefix"):
        if not isinstance(prefix, str) or not prefix:
            raise RuntimeError(f"{context}: strip_prefix must be a non-empty string")
        if not key.startswith(prefix):
            raise RuntimeError(
                f"{context}: {lv_name!r} key {key!r} does not start with strip_prefix {prefix!r}"
            )
        key = key[len(prefix) :]
    if suffix := alias.get("strip_suffix"):
        if not isinstance(suffix, str) or not suffix:
            raise RuntimeError(f"{context}: strip_suffix must be a non-empty string")
        if not key.endswith(suffix):
            raise RuntimeError(
                f"{context}: {lv_name!r} key {key!r} does not end with strip_suffix {suffix!r}"
            )
        key = key[: -len(suffix)]
    if alias.get("to_lowercase"):
        key = key.lower()
    if alias.get("underscore_to_hyphen"):
        key = key.replace("_", "-")
    if not key:
        raise RuntimeError(f"{context}: alias key for {lv_name!r} is empty after transforms")
    if not ALIAS_KEY_RE.match(key):
        raise RuntimeError(
            f"{context}: alias key {key!r} from {lv_name!r} is not a valid TS identifier"
        )
    return key


def section_by_name(sections: list[Section], name: str) -> Section:
    for sec in sections:
        if sec.name == name:
            return sec
    raise RuntimeError(f"No lv_conf section loaded for name {name!r}")


def parse_header_alias_items(
    raw_text: str,
    typedef: str,
    renames: dict[str, str],
    alias: dict[str, Any],
    *,
    context: str,
) -> list[AliasMapItem]:
    items: list[AliasMapItem] = []
    for mem in parse_enum_members(raw_text, typedef, renames, capture_trailing=False):
        lv_name = renames.get(mem.name, mem.name)
        section = " ".join(mem.section) if mem.section else None
        items.append(
            AliasMapItem(
                alias_lv_name_to_key(lv_name, alias, context=context),
                lv_name,
                section,
                mem.doc,
                mem.blank_before,
            )
        )
    return items


def collect_alias_items(
    spec: dict[str, Any],
    manifest: dict[str, Any],
    sections: list[Section],
) -> tuple[list[AliasMapItem], str]:
    alias = spec["alias"]
    export = alias["export"]
    typedef = spec.get("enum_typedef")
    if not isinstance(typedef, str):
        raise RuntimeError(f"{export}: alias needs enum_typedef on section")

    section_name = spec.get("name") or typedef
    lvgl_root = manifest["lvgl_root"]
    header_rel = spec["header"]
    header_label = (
        header_rel
        if spec.get("project_root") == "repo"
        else f"{lvgl_root}/{header_rel}"
    )

    source = alias.get("source", "lv_conf")
    exclude = set(alias.get("exclude") or [])

    if source == "header":
        if spec.get("project_root") == "repo":
            header_path = ROOT / header_rel
        else:
            header_path = ROOT / lvgl_root / header_rel
        raw_text = header_path.read_text(encoding="utf-8")
        items = parse_header_alias_items(
            raw_text,
            typedef,
            spec.get("renames", {}),
            alias,
            context=export,
        )
    elif source == "lv_conf":
        sec = section_by_name(sections, section_name)
        items = [
            AliasMapItem(
                alias_lv_name_to_key(e.js_name, alias, context=export),
                e.js_name,
            )
            for e in sec.entries
            if e.js_name not in exclude
        ]
    else:
        raise RuntimeError(f"{export}: unknown alias source {source!r}")

    if not items:
        raise RuntimeError(f"{export}: no entries after exclude filter")
    return items, header_label


def render_alias_map(
    export: str, doc: str, header: str, items: list[AliasMapItem]
) -> list[str]:
    documented = any(
        item.doc or item.section_comment or item.blank_before for item in items
    )
    lines = [
        f"// {export} - {header}",
        f"/** {doc} */",
        f"export const {export} = {{",
    ]

    current_section: str | None = None
    emitted = False
    for item in items:
        if documented:
            need_section = item.section_comment and item.section_comment != current_section
            if emitted and (item.blank_before or need_section):
                lines.append("")
            if need_section:
                lines.append(f"  /** {item.section_comment} */")
                current_section = item.section_comment
            if item.doc:
                lines.extend(render_ts_comment(item.doc, indent="  "))
        lines.append(f"  {ts_property_key(item.key)}: lv_conf.{item.lv_name},")
        emitted = True

    lines.append("} as const;")
    return lines


def build_enum_alias_ts(
    manifest: dict[str, Any],
    sections: list[Section],
    function_arrays: dict[str, FunctionArraySection],
) -> tuple[str, int]:
    lines = [
        f"// Auto-generated by {GEN_SCRIPT} - do not edit by hand.",
        "// Source: scripts/data/lv_conf_manifest.json",
        "",
        'import * as lv_conf from "./lv_conf";',
        "",
    ]
    total = 0
    emitted = False
    for spec in manifest["sections"]:
        if spec.get("function_prefix"):
            fa = function_arrays[spec["name"]]
            if emitted:
                lines.append("")
            lines.extend(render_anim_path_ts(fa.spec, fa.entries, fa.header_label))
            total += len(fa.entries)
            emitted = True
            continue
        alias = spec.get("alias")
        if not alias:
            continue
        items, header = collect_alias_items(spec, manifest, sections)
        export = alias["export"]
        doc = alias.get("doc") or export
        type_name = alias.get("type_name")
        if type_name is not None and not isinstance(type_name, str):
            raise RuntimeError(f"{export}: alias.type_name must be a string")
        if emitted:
            lines.append("")
        lines.extend(render_alias_map(export, doc, header, items))
        if type_name:
            lines.append("")
            lines.append(f"export type {type_name} = keyof typeof {export};")
        total += len(items)
        emitted = True
    lines.append("")
    return "\n".join(lines), total


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true", help="Exit 1 if outputs are stale.")
    args = parser.parse_args()

    try:
        manifest = load_manifest(DEFAULT_LV_CONF_MANIFEST)
        css_symbols = load_css_extend_symbols()
        sections = load_sections(manifest)
        lv_style_literals = build_lv_style_prop_literal_map(sections)
        function_array_sections = load_function_array_sections(manifest)
        function_arrays = {fa.spec["name"]: fa for fa in function_array_sections}
        enum_alias_ts, alias_count = build_enum_alias_ts(
            manifest, sections, function_arrays
        )
        lv_conf_stub_groups = build_lv_conf_stub_groups(
            manifest, sections, lv_style_literals
        )
        outputs = [
            (EXTEND_H, render_extend_h(css_symbols)),
            (EXTEND_CPP, render_extend_cpp(css_symbols)),
            (DEFAULT_LV_CONF_CPP, render_cpp(sections)),
            (DEFAULT_LV_CONF_TS, render_ts(sections)),
            (DEFAULT_LV_CONF_STUB_TS, render_lv_conf_stub(lv_conf_stub_groups)),
            (
                STYLE_PROP_TS,
                build_style_prop_ts(manifest, sections, lv_style_literals),
            ),
            (ENUM_ALIAS_TS, enum_alias_ts),
        ]
        for fa in function_array_sections:
            if fa.spec["name"] != "lv_anim_path":
                raise RuntimeError(
                    f"unsupported function_prefix section {fa.spec['name']!r}; "
                    "only lv_anim_path output path is implemented"
                )
            outputs += [
                (ANIM_PATH_H, render_anim_path_h(fa.spec, fa.entries)),
                (
                    ANIM_PATH_CPP,
                    render_anim_path_cpp(fa.spec, fa.entries, fa.header_label),
                ),
            ]
    except (RuntimeError, ValueError, KeyError, json.JSONDecodeError) as exc:
        print(exc, file=sys.stderr)
        return 1

    if args.check:
        if any(is_stale(path, content) for path, content in outputs):
            print(
                f"lv_conf outputs are out of date; run: python {GEN_SCRIPT}",
                file=sys.stderr,
            )
            return 1
        print("lv_conf outputs are up to date")
    else:
        wrote_any = False
        for path, content in outputs:
            if write_if_changed(path, content):
                wrote_any = True
                print(f"Wrote {path.relative_to(ROOT)}")
        if not wrote_any:
            print("lv_conf outputs are up to date")

    n = sum(len(s.entries) for s in sections)
    alias_maps = sum(1 for spec in manifest["sections"] if spec.get("alias"))
    print(f"Exported {n} constants in {len(sections)} sections")
    print(f"Mapped {alias_count} constants in {alias_maps} alias map(s)")
    if function_array_sections:
        n_funcs = sum(len(fa.entries) for fa in function_array_sections)
        print(f"Generated {n_funcs} function array callback(s)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
