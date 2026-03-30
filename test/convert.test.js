import { assertEquals } from "https://deno.land/std@0.208.0/assert/assert_equals.ts";
import { assert } from "https://deno.land/std@0.208.0/assert/assert.ts";
import convert from "../convert.js";
import { fromLV95 } from "../fromCH.js";
import * as data from "./data.js";

const convertFromLV95 = convert(fromLV95);

/**
 * @param {[number, number]} coords
 * @returns {boolean}
 */
const isWgsPoint = (coords) => {
  const [lng, lat] = coords;
  return lng > 5 && lng < 10 && lat > 40 && lat < 50;
};

/**
 * @param {number[][]} line
 * @returns {boolean}
 */
const isWgsLine = (line) => !line.map(isWgsPoint).includes(false);

/**
 * @param {number[][][]} polygon
 * @returns {boolean}
 */
const isWgsPolygon = (polygon) => !polygon.map(isWgsLine).includes(false);

Deno.test("convert featureCollection", () => {
  const res = convertFromLV95(data.collection);
  assertEquals(res.type, "FeatureCollection");
  assertEquals(res.features.length, data.collection.features.length);
});

Deno.test("convert feature with polygon", () => {
  const res = convertFromLV95(data.baselPolygonFeature);
  assertEquals(res.type, "Feature");
  assertEquals(res.properties, data.baselPolygonFeature.properties);
  assert(isWgsPolygon(res.geometry.coordinates));
});

Deno.test("convert feature with point", () => {
  const res = convertFromLV95(data.yverdonPointFeature);
  assertEquals(res.type, "Feature");
  assertEquals(res.properties, data.yverdonPointFeature.properties);
  assert(isWgsPoint(res.geometry.coordinates));
});

Deno.test("convert geometry collection", () => {
  const res = convertFromLV95(data.geometryCollection);
  assertEquals(res.type, "GeometryCollection");
  assertEquals(
    res.geometries.length,
    data.geometryCollection.geometries.length,
  );
});

Deno.test("convert polygon geometry", () => {
  const res = convertFromLV95(data.polygonGeometry);
  assertEquals(res.type, "Polygon");
  assert(isWgsPolygon(res.coordinates));
});

Deno.test("convert point geometry", () => {
  const res = convertFromLV95(data.pointGeometry);
  assertEquals(res.type, "Point");
  assert(isWgsPoint(res.coordinates));
});

Deno.test("convert point coordinates", () => {
  const res = convertFromLV95(data.pointGeometry.coordinates);
  assert(isWgsPoint(res));
});

Deno.test("convert polygon coordinates", () => {
  const res = convertFromLV95(data.polygonGeometry.coordinates);
  assert(isWgsPolygon(res));
});
