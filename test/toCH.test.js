import { assertEquals } from "https://deno.land/std@0.208.0/assert/assert_equals.ts";
import { toLV03, toLV95 } from "../toCH.js";

/**
 * @param {[number, number]} lngLat
 */
const lngLat = [7.438633, 46.951082];

Deno.test("toLV03", () => {
  const [y, x] = toLV03(lngLat);
  assertEquals(y, 600000);
  assertEquals(x, 200000);
});

Deno.test("toLV95", () => {
  const [E, N] = toLV95(lngLat);
  assertEquals(E, 2600000);
  assertEquals(N, 1200000);
});
