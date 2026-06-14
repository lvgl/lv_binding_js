import assert from "node:assert/strict";
import { describe, it } from "node:test";

import "../lv.setup.spec";
import { LV_SIZE_CONTENT, lv_pct } from "../lv_conf_macros";
import {
  NormalizeBoolean,
  NormalizeCoord,
  NormalizeDeg,
  NormalizeEnum,
  NormalizeEnumDefault,
  NormalizeFlexGrow,
  NormalizeGridCellPos,
  NormalizeGridCellSpan,
  NormalizeOpacity,
  NormalizePositivePx,
  NormalizePx,
  NormalizeScale,
  NormalizeTime,
} from "./util";

const ALIGN_MAP = { left: 1, center: 2, right: 3 } as const;

describe("nullish and NaN contract", () => {
  it("maps null, undefined, and NaN to null", () => {
    for (const fn of [
      NormalizePx,
      NormalizePositivePx,
      NormalizeDeg,
      NormalizeCoord,
      NormalizeTime,
      NormalizeScale,
      NormalizeOpacity,
    ]) {
      assert.equal(fn(null), null);
      assert.equal(fn(undefined), null);
      assert.equal(fn(Number.NaN), null);
    }
  });

  it("maps empty and whitespace-only strings to null", () => {
    for (const fn of [NormalizePx, NormalizeDeg, NormalizeTime, NormalizeScale]) {
      assert.equal(fn(""), null);
      assert.equal(fn("   "), null);
    }
  });
});

describe("number vs string path consistency", () => {
  it("NormalizePositivePx rejects negatives on both paths", () => {
    assert.equal(NormalizePositivePx(-1), null);
    assert.equal(NormalizePositivePx("-1"), null);
    assert.equal(NormalizePositivePx("-1px"), null);
    assert.equal(NormalizePositivePx(10), 10);
    assert.equal(NormalizePositivePx("10"), 10);
    assert.equal(NormalizePositivePx("10px"), 10);
  });

  it("NormalizePx allows signed values on both paths", () => {
    assert.equal(NormalizePx(-3), -3);
    assert.equal(NormalizePx("-3"), -3);
    assert.equal(NormalizePx("-3px"), -3);
    assert.equal(NormalizePx(3.5), 3.5);
    assert.equal(NormalizePx("3.5px"), 3.5);
  });

  it("NormalizeCoord rejects negatives on both paths", () => {
    assert.equal(NormalizeCoord(-5), null);
    assert.equal(NormalizeCoord("-5"), null);
    assert.equal(NormalizeCoord("-5px"), null);
    assert.equal(NormalizeCoord("-5%"), null);
    assert.equal(NormalizeCoord(50), 50);
    assert.equal(NormalizeCoord("50"), 50);
    assert.equal(NormalizeCoord("50px"), 50);
    assert.equal(NormalizeCoord("50%"), lv_pct(50));
  });

  it("NormalizeOpacity applies same rules to number and string", () => {
    assert.equal(NormalizeOpacity(-0.3), 0);
    assert.equal(NormalizeOpacity("-0.3"), 0);
    assert.equal(NormalizeOpacity(0.5), 127);
    assert.equal(NormalizeOpacity("0.5"), 127);
    assert.equal(NormalizeOpacity(2), 255);
    assert.equal(NormalizeOpacity("2"), 255);
  });

  it("NormalizeScale applies same rules to number and string", () => {
    assert.equal(NormalizeScale(1.5), 384);
    assert.equal(NormalizeScale("1.5"), 384);
    assert.equal(NormalizeScale(-1), -256);
    assert.equal(NormalizeScale("-1"), -256);
  });

  it("NormalizeDeg applies same rules to number and string", () => {
    assert.equal(NormalizeDeg(45), 45);
    assert.equal(NormalizeDeg("45"), 45);
    assert.equal(NormalizeDeg("45deg"), 45);
    assert.equal(NormalizeDeg(-0.5), -0.5);
    assert.equal(NormalizeDeg("-.5deg"), -0.5);
  });

  it("NormalizeTime: numbers are ms; strings need suffix or unitless fallback", () => {
    assert.equal(NormalizeTime(500), 500);
    assert.equal(NormalizeTime("500"), 500);
    assert.equal(NormalizeTime("500ms"), 500);
    assert.equal(NormalizeTime("5.1s"), 5100);
    // 5.1 as number is 5.1 ms, not seconds
    assert.equal(NormalizeTime(5.1), 5.1);
    assert.equal(NormalizeTime(-250), -250);
    assert.equal(NormalizeTime("-.25s"), -250);
  });
});

describe("NormalizePx / NormalizePositivePx", () => {
  it("parses px strings with optional suffix", () => {
    assert.equal(NormalizePx(10), 10);
    assert.equal(NormalizePx("10px"), 10);
    assert.equal(NormalizePx("10"), 10);
    assert.equal(NormalizePx("-3.5px"), -3.5);
    assert.equal(NormalizePx(".5px"), 0.5);
  });

  it("rejects garbage and non-px strings", () => {
    assert.equal(NormalizePx("foo10px"), null);
    assert.equal(NormalizePx("10%"), null);
    assert.equal(NormalizePx(null), null);
  });

  it("excludeNegative on NormalizePositivePx", () => {
    assert.equal(NormalizePositivePx("10"), 10);
    assert.equal(NormalizePositivePx(-1), null);
    assert.equal(NormalizePositivePx("-10px"), null);
    assert.equal(NormalizePositivePx(".5px"), 0.5);
  });
});

describe("NormalizeDeg (RE_NUM_DEG)", () => {
  // Before refactor: /([^deg]+)(deg)?/ - unanchored, no trim.
  // Now: anchored with trim; supports CSS decimals like ".5deg".
  it("parses numbers and deg strings", () => {
    assert.equal(NormalizeDeg(90), 90);
    assert.equal(NormalizeDeg("90deg"), 90);
    assert.equal(NormalizeDeg("90"), 90);
    assert.equal(NormalizeDeg("-45deg"), -45);
    assert.equal(NormalizeDeg(".5deg"), 0.5);
    assert.equal(NormalizeDeg("-.5deg"), -0.5);
  });

  it("rejects invalid deg strings", () => {
    assert.equal(NormalizeDeg("foo"), null);
    assert.equal(NormalizeDeg("90degextra"), null);
    assert.equal(NormalizeDeg(null), null);
  });
});

describe("NormalizeCoord", () => {
  it("handles auto, numbers, px, and percent", () => {
    assert.equal(NormalizeCoord("auto"), LV_SIZE_CONTENT);
    assert.equal(NormalizeCoord("50px"), 50);
    assert.equal(NormalizeCoord("50"), 50);
    assert.equal(NormalizeCoord("50%"), lv_pct(50));
  });

  it("requires % suffix for percent strings", () => {
    assert.equal(NormalizeCoord("50"), 50);
  });

  it("excludes negative numbers and px/percent strings", () => {
    assert.equal(NormalizeCoord(-10), null);
    assert.equal(NormalizeCoord("-10px"), null);
    assert.equal(NormalizeCoord("-10%"), null);
  });

  it("parses decimal percent with required suffix", () => {
    assert.equal(NormalizeCoord("50.5%"), lv_pct(50.5));
    assert.equal(NormalizeCoord(".5%"), lv_pct(0.5));
  });

  it("trims auto before matching", () => {
    assert.equal(NormalizeCoord(" auto "), LV_SIZE_CONTENT);
  });
});

describe("NormalizeTime", () => {
  it("parses numbers as ms and integer suffix strings", () => {
    assert.equal(NormalizeTime(500), 500);
    assert.equal(NormalizeTime(0), 0);
    assert.equal(NormalizeTime("500ms"), 500);
    assert.equal(NormalizeTime("5s"), 5000);
    assert.equal(NormalizeTime("0s"), 0);
  });

  it("parses decimal seconds and converts to ms", () => {
    assert.equal(NormalizeTime("5.1s"), 5100);
    assert.equal(NormalizeTime("0.1s"), 100);
    assert.equal(NormalizeTime(".5s"), 500);
    assert.equal(NormalizeTime("-.25s"), -250);
  });

  it("parses decimal ms without scaling", () => {
    assert.equal(NormalizeTime("5.1ms"), 5.1);
    assert.equal(NormalizeTime("0.5ms"), 0.5);
    assert.equal(NormalizeTime(".25ms"), 0.25);
  });

  it("tries ms before s so 100ms is not treated as seconds", () => {
    assert.equal(NormalizeTime("100ms"), 100);
    assert.equal(NormalizeTime("5.1ms"), 5.1);
  });

  it("falls back to unitless strings as ms", () => {
    assert.equal(NormalizeTime("500"), 500);
    assert.equal(NormalizeTime(".5"), 0.5);
    assert.equal(NormalizeTime("5.1"), 5.1);
  });

  it("trims decimal time strings", () => {
    assert.equal(NormalizeTime("  5.1s  "), 5100);
    assert.equal(NormalizeTime("  0.1s  "), 100);
    assert.equal(NormalizeTime("  2.5ms  "), 2.5);
  });

  it("rejects invalid time strings", () => {
    assert.equal(NormalizeTime("500x"), null);
    assert.equal(NormalizeTime("5.1sx"), null);
    assert.equal(NormalizeTime("ms500"), null);
    assert.equal(NormalizeTime(null), null);
  });
});

describe("NormalizeScale", () => {
  it("parses unitless values and maps to LVGL zoom", () => {
    assert.equal(NormalizeScale(0), 0);
    assert.equal(NormalizeScale(1), 256);
    assert.equal(NormalizeScale("1.5"), 384);
    assert.equal(NormalizeScale(".5"), 128);
    assert.equal(NormalizeScale(-1), -256);
  });

  it("rejects suffixed strings", () => {
    assert.equal(NormalizeScale("1.5px"), null);
    assert.equal(NormalizeScale("1.5deg"), null);
  });
});

describe("string trim (parseSuffixed)", () => {
  it("trims leading and trailing whitespace before parse", () => {
    assert.equal(NormalizePx("  10px  "), 10);
    assert.equal(NormalizePositivePx("  12  "), 12);
    assert.equal(NormalizeDeg("  90deg  "), 90);
    assert.equal(NormalizeCoord("  50px  "), 50);
    assert.equal(NormalizeCoord("  50%  "), lv_pct(50));
    assert.equal(NormalizeTime("  500ms  "), 500);
    assert.equal(NormalizeTime("  5s  "), 5000);
    assert.equal(NormalizeTime("  500  "), 500);
    assert.equal(NormalizeScale("  1.5  "), 384);
    assert.equal(NormalizeOpacity("  0.5  "), 127);
  });
});

describe("NormalizeOpacity", () => {
  it("parses 0-1 factors into LV_OPA range", () => {
    assert.equal(NormalizeOpacity(0.5), 127);
    assert.equal(NormalizeOpacity("0.5"), 127);
    assert.equal(NormalizeOpacity(".5"), 127);
    assert.equal(NormalizeOpacity(0), 0);
    assert.equal(NormalizeOpacity(1), 255);
    assert.equal(NormalizeOpacity(2), 255);
    assert.equal(NormalizeOpacity("2"), 255);
  });

  it("clamps non-positive values to 0", () => {
    assert.equal(NormalizeOpacity(-0.5), 0);
    assert.equal(NormalizeOpacity("-0.5"), 0);
  });

  it("floors fractional opacity to LV_OPA integer", () => {
    assert.equal(NormalizeOpacity(0.999), 254);
    assert.equal(NormalizeOpacity("0.999"), 254);
  });

  it("rejects invalid opacity strings", () => {
    assert.equal(NormalizeOpacity("50%"), null);
    assert.equal(NormalizeOpacity(null), null);
  });
});

describe("NormalizeEnum", () => {
  it("maps known keys and returns null for unknown", () => {
    assert.equal(NormalizeEnum(ALIGN_MAP, "left"), 1);
    assert.equal(NormalizeEnum(ALIGN_MAP, "center"), 2);
    assert.equal(NormalizeEnum(ALIGN_MAP, "unknown"), null);
    assert.equal(NormalizeEnum(ALIGN_MAP, null), null);
    assert.equal(NormalizeEnum(ALIGN_MAP, undefined), null);
    assert.equal(NormalizeEnum(ALIGN_MAP, Number.NaN), null);
  });

  it("maps known string keys from the map", () => {
    const MAP = { flex: "flex", none: "none" } as const;
    assert.equal(NormalizeEnum(MAP, "flex"), "flex");
    assert.equal(NormalizeEnum(MAP, "invalid"), null);
    assert.equal(NormalizeEnum(MAP, null), null);
  });
});

describe("NormalizeEnumDefault", () => {
  it("returns default when key is missing", () => {
    assert.equal(NormalizeEnumDefault(ALIGN_MAP, "left", 0), 1);
    assert.equal(NormalizeEnumDefault(ALIGN_MAP, "missing", 99), 99);
    assert.equal(NormalizeEnumDefault(ALIGN_MAP, null, 42), 42);
    assert.equal(NormalizeEnumDefault(ALIGN_MAP, Number.NaN, 42), 42);
  });
});

describe("NormalizeFlexGrow", () => {
  it("allows 0 and positive integers", () => {
    assert.equal(NormalizeFlexGrow(0), 0);
    assert.equal(NormalizeFlexGrow(1), 1);
    assert.equal(NormalizeFlexGrow(2), 2);
  });

  it("parses unitless numeric strings", () => {
    assert.equal(NormalizeFlexGrow("0"), 0);
    assert.equal(NormalizeFlexGrow("2"), 2);
  });

  it("rejects negative and non-integer values", () => {
    assert.equal(NormalizeFlexGrow(-1), null);
    assert.equal(NormalizeFlexGrow(1.5), null);
    assert.equal(NormalizeFlexGrow("1.5"), null);
    assert.equal(NormalizeFlexGrow(null), null);
    assert.equal(NormalizeFlexGrow(Number.NaN), null);
  });
});

describe("NormalizeGridCellPos", () => {
  it("allows non-negative integers and numeric strings", () => {
    assert.equal(NormalizeGridCellPos(0), 0);
    assert.equal(NormalizeGridCellPos(3), 3);
    assert.equal(NormalizeGridCellPos("2"), 2);
  });

  it("rejects negative and non-integer values", () => {
    assert.equal(NormalizeGridCellPos(-1), null);
    assert.equal(NormalizeGridCellPos(1.5), null);
    assert.equal(NormalizeGridCellPos(null), null);
  });
});

describe("NormalizeGridCellSpan", () => {
  it("allows positive integers and numeric strings", () => {
    assert.equal(NormalizeGridCellSpan(1), 1);
    assert.equal(NormalizeGridCellSpan("3"), 3);
  });

  it("rejects zero, negative, and non-integer values", () => {
    assert.equal(NormalizeGridCellSpan(0), null);
    assert.equal(NormalizeGridCellSpan(-1), null);
    assert.equal(NormalizeGridCellSpan(1.5), null);
  });
});

describe("NormalizeBoolean", () => {
  it("coerces to boolean", () => {
    assert.equal(NormalizeBoolean(true), true);
    assert.equal(NormalizeBoolean(false), false);
    assert.equal(NormalizeBoolean(null), false);
    assert.equal(NormalizeBoolean(undefined), false);
  });
});
