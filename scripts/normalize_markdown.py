#!/usr/bin/env python3
"""Normalize punctuation in repo text sources for consistent ASCII-friendly content.

Scopes (default):
  - doc/**/*.md (entire file)
  - src/**/*.md (entire file)
  - src/**/*.{ts,cpp,h,hpp} (comments only: // and /* */)

Rules (see lib/normalize_common.py):
  - U+2014 em dash and U+2013 en dash -> ASCII hyphen (-)
  - U+2192 arrow and UTF-8/Latin-1 mojibake (e.g. U+00A1 U+00FA) -> ASCII "->"
  - Ellipsis mojibake (e.g. U+00A1 U+00AD) and U+2026 -> ASCII "..."
  - Shared byte and Unicode punctuation fixes with normalize_commit_msg.py

Usage:
  python scripts/normalize_markdown.py          # write fixes
  python scripts/normalize_markdown.py --check  # CI: exit 1 if any file would change
"""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

_SCRIPTS = Path(__file__).resolve().parent
if str(_SCRIPTS) not in sys.path:
    sys.path.insert(0, str(_SCRIPTS))

from lib.normalize_common import (
    ROOT,
    normalize_newlines,
    apply_byte_fixes,
    decode_text_bytes,
    normalize_full_text,
    normalize_span,
)

DOC_ROOT = ROOT / "doc"
SRC_ROOT = ROOT / "src"
DEFAULT_ROOTS = (DOC_ROOT, SRC_ROOT)

DOC_GLOBS = ("*.md",)
SRC_GLOBS = ("*.md", "*.ts", "*.cpp", "*.h", "*.hpp")
COMMENT_ONLY_SUFFIXES = frozenset({".ts", ".cpp", ".h", ".hpp"})


def globs_for_root(root: Path) -> tuple[str, ...]:
    if root.resolve() == DOC_ROOT.resolve():
        return DOC_GLOBS
    if root.resolve() == SRC_ROOT.resolve():
        return SRC_GLOBS
    return tuple(dict.fromkeys(DOC_GLOBS + SRC_GLOBS))


def comment_only_file(path: Path) -> bool:
    return path.suffix in COMMENT_ONLY_SUFFIXES


def _skip_quoted(text: str, i: int, quote: str) -> int:
    i += 1
    n = len(text)
    while i < n:
        ch = text[i]
        if ch == "\\":
            i += 2
            continue
        if ch == quote:
            return i + 1
        i += 1
    return n


def normalize_comments_in_text(text: str) -> str:
    """Rewrite only // and /* */ comment spans; leave code and strings unchanged."""
    out: list[str] = []
    i = 0
    n = len(text)
    while i < n:
        if text.startswith("/*", i):
            start = i
            i += 2
            while i < n - 1 and text[i : i + 2] != "*/":
                i += 1
            if i < n - 1:
                i += 2
            else:
                i = n
            out.append(normalize_span(text[start:i]))
        elif text.startswith("//", i):
            start = i
            i += 2
            while i < n and text[i] not in "\r\n":
                i += 1
            out.append(normalize_span(text[start:i]))
        elif text[i] in "\"'`":
            j = _skip_quoted(text, i, text[i])
            out.append(text[i:j])
            i = j
        else:
            j = i + 1
            while j < n:
                if text.startswith("/*", j) or text.startswith("//", j) or text[j] in "\"'`":
                    break
                j += 1
            out.append(text[i:j])
            i = j
    return "".join(out)


def normalize_file_content(raw: bytes, path: Path) -> str | None:
    if comment_only_file(path):
        text = normalize_comments_in_text(raw.decode("latin-1"))
        return normalize_newlines(text)
    raw = apply_byte_fixes(raw)
    return normalize_full_text(decode_text_bytes(raw))


def on_disk_text(raw: bytes, path: Path) -> str | None:
    if comment_only_file(path):
        return normalize_newlines(raw.decode("latin-1"))
    return normalize_newlines(decode_text_bytes(raw))


def write_normalized(path: Path, normalized: str) -> None:
    if comment_only_file(path):
        path.write_bytes(normalized.encode("latin-1"))
    else:
        path.write_text(normalized, encoding="utf-8", newline="\n")


def iter_target_files(roots: list[Path]) -> list[Path]:
    seen: set[Path] = set()
    out: list[Path] = []
    for root in roots:
        for pattern in globs_for_root(root):
            for path in sorted(root.rglob(pattern)):
                if path.is_file() and path not in seen:
                    seen.add(path)
                    out.append(path)
    return sorted(out)


def check_or_write(roots: list[Path], *, check: bool) -> int:
    files = iter_target_files(roots)
    stale: list[str] = []
    for path in files:
        raw = path.read_bytes()
        normalized = normalize_file_content(raw, path)
        current = on_disk_text(raw, path)
        if normalized is None or current is None or normalized != current:
            stale.append(path.relative_to(ROOT).as_posix())
            if not check:
                if normalized is not None:
                    write_normalized(path, normalized)

    roots_label = ", ".join(r.relative_to(ROOT).as_posix() for r in roots)
    if check:
        if stale:
            print(
                "text needs normalization (run: python scripts/normalize_markdown.py):",
                file=sys.stderr,
            )
            for name in stale:
                print(f"  {name}", file=sys.stderr)
            return 1
        print(f"text OK ({len(files)} files under {roots_label})")
        return 0

    if stale:
        print(f"normalized {len(stale)} file(s):")
        for name in stale:
            print(f"  {name}")
    else:
        print(f"text already normalized ({len(files)} files under {roots_label})")
    return 0


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--check",
        action="store_true",
        help="Fail if any target file would change (CI gate)",
    )
    parser.add_argument(
        "--root",
        type=Path,
        action="append",
        dest="roots",
        metavar="DIR",
        help=f"Root directory (repeatable; default: {', '.join(r.relative_to(ROOT).as_posix() for r in DEFAULT_ROOTS)})",
    )
    args = parser.parse_args()
    roots = [r.resolve() for r in (args.roots or list(DEFAULT_ROOTS))]
    for root in roots:
        if not root.is_dir():
            print(f"{root}: not a directory", file=sys.stderr)
            return 1
    return check_or_write(roots, check=args.check)


if __name__ == "__main__":
    raise SystemExit(main())
