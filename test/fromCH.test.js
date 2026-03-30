import { assert } from "https://deno.land/std@0.208.0/assert/assert.ts";
import { fromLV03, fromLV95 } from "../fromCH.js";

const lng = 7.438633;
const lat = 46.951082;

/**
 * @param {number} actual
 * @param {number} expected
 * @returns {boolean}
 */
const isCloseEnough = (actual, expected) =>
  Math.abs(actual - expected) < 0.00001;

Deno.test("fromLV03", () => {
  const r = fromLV03([600000, 200000]);
  assert(isCloseEnough(r[0], lng));
  assert(isCloseEnough(r[1], lat));
});

Deno.test("fromLV95", () => {
  const r = fromLV95([2600000, 1200000]);
  assert(isCloseEnough(r[0], lng));
  assert(isCloseEnough(r[1], lat));
});
