"""Shared punctuation and encoding normalization for normalize_*.py scripts."""

from __future__ import annotations

from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]


def normalize_newlines(text: str) -> str:
    text = text.replace("\r\n", "\n").replace("\r", "\n")
    lines = [line.rstrip() for line in text.split("\n")]
    if not lines or (len(lines) == 1 and lines[0] == ""):
        return ""
    return "\n".join(lines).rstrip() + "\n"

BYTE_FIXES: list[tuple[bytes, bytes]] = [
    (b"\xe2\x80\x94", b"-"),  # UTF-8 em dash
    (b"\xe2\x80\x93", b"-"),  # UTF-8 en dash
    (b"\xe2\x80\x9c", b'"'),  # UTF-8 left double quote
    (b"\xe2\x80\x9d", b'"'),  # UTF-8 right double quote
    (b"\xe2\x80\x98", b"'"),  # UTF-8 left single quote
    (b"\xe2\x80\x99", b"'"),  # UTF-8 right single quote
    (b"\xe2\x80\xa6", b"..."),  # UTF-8 ellipsis
    (b"\xc2\xa0", b" "),  # UTF-8 NBSP
    (b"\xe2\x80\x3f", b"-"),  # truncated UTF-8 em dash (?) in repo sources
    (b"\xe2\x86\x3f", b"->"),  # truncated UTF-8 arrow (?) in repo sources
    (b"2\xa8C", b"2-"),
    (b"\xa1\xaa", b"-"),  # Latin-1 mojibake for em dash
    (b"\xa1\xb0", b"'"),
    (b"\xa1\xaf", b"'"),
    (b"\xa1\xc0", b'"'),
    (b"\xa1\xb1", b'"'),
    (b"\xa1\xad", b"..."),
    (b"\xa1\xfa", b"->"),
    (b"\xc2\xa1\xc2\xad", b"..."),  # UTF-8 mojibake for ellipsis (U+00A1 U+00AD)
    (b"\xc2\xa1\xc3\xba", b"->"),  # UTF-8 mojibake for arrow (U+00A1 U+00FA)
    (b"\xe2\x86\x92", b"->"),  # UTF-8 rightwards arrow
    (b"\x96", b"-"),  # CP1252 en dash in otherwise-ASCII sources
    (b"\x97", b"-"),  # CP1252 em dash in otherwise-ASCII sources
]

CHAR_REPLACEMENTS: list[tuple[str, str]] = [
    ("\u2014", "-"),
    ("\u2013", "-"),
    ("\u2212", "-"),
    ("\u2018", "'"),
    ("\u2019", "'"),
    ("\u201a", "'"),
    ("\u201b", "'"),
    ("\u201c", '"'),
    ("\u201d", '"'),
    ("\u201e", '"'),
    ("\u201f", '"'),
    ("\u2032", "'"),
    ("\u2033", '"'),
    ("\u2026", "..."),
    ("\u00a0", " "),
    ("\ufeff", ""),
    ("\u00a1\u00aa", "-"),
    ("\u00a1\u00b0", "'"),
    ("\u00a1\u00af", "'"),
    ("\u00a1\u00c0", '"'),
    ("\u00a1\u00b1", '"'),
    ("\u00a1\u00ad", "..."),
    ("\u00a1\u00fa", "->"),
    ("\u2192", "->"),
    ("\u2194", "<->"),
    ("\u2193", "v"),  # down arrow (diagrams)
    ("\u25ba", ">"),  # BLACK RIGHT-POINTING POINTER
    ("\u25b6", ">"),  # BLACK RIGHT-POINTING TRIANGLE
]


def apply_byte_fixes(raw: bytes) -> bytes:
    for old, new in BYTE_FIXES:
        raw = raw.replace(old, new)
    return raw


def apply_char_replacements(text: str) -> str:
    for old, new in CHAR_REPLACEMENTS:
        text = text.replace(old, new)
    return text


def apply_byte_fixes_to_text(text: str) -> str:
    """Apply byte fixes on a Latin-1 round-trip (comment spans in source files)."""
    raw = text.encode("latin-1")
    for old, new in BYTE_FIXES:
        raw = raw.replace(old, new)
    return raw.decode("latin-1")


def decode_text_bytes(raw: bytes) -> str:
    try:
        return raw.decode("utf-8")
    except UnicodeDecodeError:
        return raw.decode("latin-1")


def decode_text_bytes_labeled(raw: bytes) -> tuple[str, str]:
    try:
        return raw.decode("utf-8"), "UTF-8"
    except UnicodeDecodeError:
        return raw.decode("latin-1"), "ISO-8859-1"


def strip_control_chars(text: str) -> str:
    return "".join(ch for ch in text if ch in "\t\n" or ord(ch) >= 32)


def remaining_non_ascii(text: str) -> list[str]:
    return sorted({f"U+{ord(ch):04X}" for ch in text if ord(ch) > 127})


def normalize_span(text: str) -> str:
    """Normalize a comment span or other Latin-1-decoded text fragment."""
    return apply_byte_fixes_to_text(apply_char_replacements(text))


def normalize_full_text(text: str) -> str:
    """Normalize an entire UTF-8 text file (markdown, etc.)."""
    text = apply_char_replacements(text)
    return normalize_newlines(text)


def normalize_commit_message(raw: bytes) -> tuple[str, str]:
    """Normalize a commit message file; fail if non-ASCII remains."""
    raw = apply_byte_fixes(raw)
    text, source_encoding = decode_text_bytes_labeled(raw)
    text = apply_char_replacements(text)
    text = strip_control_chars(text)
    text = normalize_newlines(text)
    bad = remaining_non_ascii(text)
    if bad:
        raise ValueError(
            "Non-ASCII characters remain after normalization: " + ", ".join(bad)
        )
    return text, source_encoding
