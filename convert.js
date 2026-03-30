import convertGeoJson from "./convertGeoJson.js";
import convertGeometry from "./convertGeometry.js";
import convertCoordinatesDefault, { isCoords } from "./convertCoordinates.js";

/**
 * @typedef {Object} GeoJsonObject
 * @property {string} type
 *
 * @typedef {GeoJsonObject & { geometry: Object, properties: Object|null }} Feature
 * @typedef {GeoJsonObject & { features: Feature[] }} FeatureCollection
 * @typedef {GeoJsonObject & { coordinates: number[] }} Point
 * @typedef {GeoJsonObject & { coordinates: number[][] }} LineString
 * @typedef {GeoJsonObject & { coordinates: number[][][] }} Polygon
 * @typedef {GeoJsonObject & { coordinates: number[][][][] }} MultiPolygon
 * @typedef {GeoJsonObject & { coordinates: number[][] }} MultiPoint
 * @typedef {GeoJsonObject & { coordinates: number[][][][] }} MultiLineString
 * @typedef {GeoJsonObject & { geometries: Object[] }} GeometryCollection
 * @typedef {Feature|FeatureCollection} GeoJSON
 * @typedef {Point|LineString|Polygon|MultiPoint|MultiLineString|MultiPolygon|GeometryCollection} Geometry
 */

/**
 * @param {*} o
 * @returns {o is Feature | FeatureCollection}
 */
const isGeoJson = (o) =>
  o.type && (o.type === "Feature" || o.type === "FeatureCollection");

/**
 * @param {*} o
 * @returns {o is Geometry | GeometryCollection}
 */
const isGeometry = (o) =>
  o.type && (
    o.type === "Point" ||
    o.type === "LineString" ||
    o.type === "Polygon" ||
    o.type === "MultiPoint" ||
    o.type === "MultiLineString" ||
    o.type === "MultiPolygon" ||
    o.type === "GeometryCollection"
  );

/**
 * @template T
 * @param {Function} converter
 * @returns {(toConvert: T) => T}
 */
export default (converter) => (toConvert) => {
  if (isGeoJson(toConvert)) {
    return convertGeoJson(converter)(toConvert);
  }
  if (isGeometry(toConvert)) {
    return convertGeometry(converter)(toConvert);
  }
  if (isCoords(toConvert)) {
    return convertCoordinatesDefault(converter)(toConvert);
  }
  return toConvert;
};
