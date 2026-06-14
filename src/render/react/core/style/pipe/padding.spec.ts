import assert from "node:assert/strict";
import { describe, it } from "node:test";

import "../../lv.setup.spec";
import { runPipe } from "../pipe.harness";
import { PaddingStyle } from "./padding";

describe("PaddingStyle pipe", () => {
  it("pushes individual padding sides", () => {
    const map = runPipe(PaddingStyle, {
      "padding-left": 4,
      "padding-top": "8px",
      "padding-right": 4,
      "padding-bottom": 8,
    });
    assert.equal(map.get("padding-left"), 4);
    assert.equal(map.get("padding-top"), 8);
    assert.equal(map.get("padding-right"), 4);
    assert.equal(map.get("padding-bottom"), 8);
  });

  it("expands one-value padding shorthand to all sides", () => {
    const map = runPipe(PaddingStyle, { padding: 10 });
    assert.equal(map.get("padding-left"), 10);
    assert.equal(map.get("padding-top"), 10);
    assert.equal(map.get("padding-right"), 10);
    assert.equal(map.get("padding-bottom"), 10);
  });

  it("expands two-value padding shorthand (vertical horizontal)", () => {
    const map = runPipe(PaddingStyle, { padding: "8 16" });
    assert.equal(map.get("padding-top"), 8);
    assert.equal(map.get("padding-bottom"), 8);
    assert.equal(map.get("padding-left"), 16);
    assert.equal(map.get("padding-right"), 16);
  });

  it("expands four-value padding shorthand (top right bottom left)", () => {
    const map = runPipe(PaddingStyle, { padding: "1 2 3 4" });
    assert.equal(map.get("padding-top"), 1);
    assert.equal(map.get("padding-right"), 2);
    assert.equal(map.get("padding-bottom"), 3);
    assert.equal(map.get("padding-left"), 4);
  });

  it("expands three-value padding shorthand (top horizontal bottom)", () => {
    const map = runPipe(PaddingStyle, { padding: "8 16 24" });
    assert.equal(map.get("padding-top"), 8);
    assert.equal(map.get("padding-right"), 16);
    assert.equal(map.get("padding-bottom"), 24);
    assert.equal(map.get("padding-left"), 16);
  });

  it("individual sides override invalid padding shorthand", () => {
    const map = runPipe(PaddingStyle, {
      "padding-left": 5,
      padding: "not-a-size",
    });
    assert.equal(map.get("padding-left"), 5);
    assert.equal(map.get("padding-top"), undefined);
  });
});
