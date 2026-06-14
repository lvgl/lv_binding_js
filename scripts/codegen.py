#!/usr/bin/env python3
"""Run all codegen validators and generators (yarn run gen:all / gen:all:check)."""

from __future__ import annotations

import argparse
import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SCRIPTS = Path(__file__).resolve().parent


def _report_subprocess_failure(step: str, exc: subprocess.CalledProcessError) -> None:
    cmd = exc.cmd if isinstance(exc.cmd, (list, tuple)) else [exc.cmd]
    print(
        f"\ncodegen failed at: {step}",
        f"  exit code: {exc.returncode}",
        f"  command: {' '.join(str(part) for part in cmd)}",
        f"  cwd: {ROOT}",
        sep="\n",
        file=sys.stderr,
        flush=True,
    )


def _run_typecheck() -> None:
    """Type-check src/ (tsc --noEmit via package.json typecheck script)."""
    for runner in ("yarn", "npm"):
        exe = shutil.which(runner)
        if not exe:
            continue
        cmd = [exe, "run", "typecheck"]
        print(f"+ {' '.join(cmd)}", flush=True)
        try:
            subprocess.run(cmd, cwd=ROOT, check=True)
        except subprocess.CalledProcessError as exc:
            _report_subprocess_failure("typecheck", exc)
            raise SystemExit(exc.returncode) from None
        return
    raise RuntimeError("yarn or npm required to run typecheck")


def _run(script: str, *args: str) -> None:
    script_path = ROOT / script if ("/" in script or "\\" in script) else SCRIPTS / script
    if not script_path.is_file():
        print(f"Script {script} not found, skipping", flush=True)
        return

    cmd = [sys.executable, str(script_path), *args]
    print(f"+ {' '.join(cmd)}", flush=True)
    try:
        subprocess.run(cmd, cwd=ROOT, check=True)
    except subprocess.CalledProcessError as exc:
        _report_subprocess_failure(script, exc)
        raise SystemExit(exc.returncode) from None


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--check",
        action="store_true",
        help="CI mode: verify outputs are up to date (no writes)",
    )
    args = parser.parse_args()
    check_flag = ("--check",) if args.check else ()
    _run("doc/wiki/transition_lvgl_compare.py", *check_flag)
    _run("doc/wiki/cpp_lv_symbol_mapping.py", *check_flag)
    _run("lv_conf_gen.py", *check_flag)

    # typecheck should after code generation.
    _run_typecheck()
    # normalize_markdown.py need always to be executed at last
    _run("normalize_markdown.py", *check_flag)

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
