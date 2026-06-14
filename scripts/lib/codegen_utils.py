"""Shared helpers for wiki audit scripts and other codegen runners."""

from __future__ import annotations

import re
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
DOC_ROOT = ROOT / "doc"


def _normalize_newlines(text: str) -> str:
    return text.replace("\r\n", "\n")


def read_git_file_at_ref(repo: Path, ref: str, relpath: str) -> str:
    """Return file text from ``git show <ref>:<relpath>`` in *repo*."""
    posix = relpath.replace("\\", "/")
    result = subprocess.run(
        ["git", "-C", str(repo), "show", f"{ref}:{posix}"],
        capture_output=True,
        text=True,
        check=False,
    )
    if result.returncode != 0:
        raise RuntimeError(
            f"git show {ref}:{posix} failed: {result.stderr.strip()}"
        )
    return result.stdout


def list_git_files_at_ref(repo: Path, ref: str, relpath: str) -> list[str]:
    """Return posix paths tracked under *relpath* at *ref* (recursive)."""
    posix = relpath.replace("\\", "/")
    result = subprocess.run(
        ["git", "-C", str(repo), "ls-tree", "-r", "--name-only", ref, "--", posix],
        capture_output=True,
        text=True,
        check=False,
    )
    if result.returncode != 0:
        raise RuntimeError(
            f"git ls-tree {ref}:{posix} failed: {result.stderr.strip()}"
        )
    return [line.strip() for line in result.stdout.splitlines() if line.strip()]


def _prepare_text_for_path(path: Path, content: str) -> str:
    text = _normalize_newlines(content)
    if path.suffix == ".md":
        try:
            path.resolve().relative_to(DOC_ROOT.resolve())
        except ValueError:
            return text
        from lib.normalize_common import normalize_full_text

        return normalize_full_text(text)
    return text


def write_if_changed(path: Path, content: str) -> bool:
    normalized = _prepare_text_for_path(path, content)
    if path.exists() and _normalize_newlines(path.read_text(encoding="utf-8")) == normalized:
        return False
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(normalized, encoding="utf-8", newline="\n")
    return True


def is_stale(path: Path, content: str) -> bool:
    normalized = _prepare_text_for_path(path, content)
    if not path.exists():
        return True
    return _normalize_newlines(path.read_text(encoding="utf-8")) != normalized


def brace_content(text: str, open_brace: int) -> str:
    depth = 0
    for i in range(open_brace, len(text)):
        if text[i] == "{":
            depth += 1
        elif text[i] == "}":
            depth -= 1
            if depth == 0:
                return text[open_brace + 1 : i]
    raise RuntimeError("Unbalanced braces in enum block")


def enum_body(text: str, typedef_name: str) -> str:
    """Find enum members for typedef enum {...} T, enum {...}; typedef ... T, or enum T {...}."""
    for m in re.finditer(r"typedef\s+enum\s*\{", text):
        open_brace = m.end() - 1
        body = brace_content(text, open_brace)
        after = text[open_brace + len(body) + 2 :].lstrip()
        if re.match(rf"{re.escape(typedef_name)}\s*;", after):
            return body

    alias = re.compile(rf"(?:;\s*)?typedef\s+[\w\s]+\s+{re.escape(typedef_name)}\s*;")
    for m in re.finditer(r"\benum\s*\{", text):
        if text[max(0, m.start() - 8) : m.start()].rstrip().endswith("typedef"):
            continue
        open_brace = m.end() - 1
        body = brace_content(text, open_brace)
        after = text[open_brace + len(body) + 2 :].lstrip()
        if alias.match(after):
            return body

    tagged = re.compile(rf"\benum\s+{re.escape(typedef_name)}\s*\{{")
    if m := tagged.search(text):
        open_brace = m.end() - 1
        return brace_content(text, open_brace)

    raise RuntimeError(f"Could not find enum for typedef {typedef_name}")
