import {
  convertLine,
  convertMultiPolygon,
  convertPoint,
  convertPolygon,
} from "./convertCoordinates.js";

/**
 * @typedef {{ type: string }} GeoJsonObject
 * @typedef {GeoJsonObject & { coordinates: number[] }} Point
 * @typedef {GeoJsonObject & { coordinates: number[][] }} LineString
 * @typedef {GeoJsonObject & { coordinates: number[][][] }} Polygon
 * @typedef {GeoJsonObject & { coordinates: number[][][][] }} MultiPolygon
 * @typedef {GeoJsonObject & { coordinates: number[][] }} MultiPoint
 * @typedef {GeoJsonObject & { coordinates: number[][][][] }} MultiLineString
 * @typedef {GeoJsonObject & { geometries: (Point|LineString|Polygon|MultiPoint|MultiLineString|MultiPolygon)[] }} GeometryCollection
 * @typedef {Point|LineString|Polygon|MultiPoint|MultiLineString|MultiPolygon|GeometryCollection} Geometry
 */

/**
 * @param {Geometry | GeometryCollection} geom
 * @returns {geom is GeometryCollection}
 */
const isGeometryCollection = (geom) =>
  geom.type && geom.type === "GeometryCollection";

/**
 * @param {Geometry | GeometryCollection} geom
 * @returns {geom is Point}
 */
const isPointGeometry = (geom) => geom.type && geom.type === "Point";

/**
 * @param {Geometry | GeometryCollection} geom
 * @returns {geom is LineString}
 */
const isLineGeometry = (geom) => geom.type && geom.type === "LineString";

/**
 * @param {Geometry | GeometryCollection} geom
 * @returns {geom is Polygon}
 */
const isPolygonGeometry = (geom) => geom.type && geom.type === "Polygon";

/**
 * @param {Geometry | GeometryCollection} geom
 * @returns {geom is MultiPoint}
 */
const isMultiPointGeometry = (geom) => geom.type && geom.type === "MultiPoint";

/**
 * @param {Geometry | GeometryCollection} geom
 * @returns {geom is MultiLineString}
 */
const isMultiLineGeometry = (geom) =>
  geom.type && geom.type === "MultiLineString";

/**
 * @param {Geometry | GeometryCollection} geom
 * @returns {geom is MultiPolygon}
 */
const isMultiPolygonGeometry = (geom) =>
  geom.type && geom.type === "MultiPolygon";

/**
 * @param {Function} converter
 * @returns {(geom: Geometry) => Geometry}
 */
const convertGeometryInner = (converter) => (geom) => {
  if (isPointGeometry(geom)) {
    return {
      ...geom,
      coordinates: convertPoint(converter)(geom.coordinates),
    };
  }
  if (isLineGeometry(geom)) {
    return {
      ...geom,
      coordinates: convertLine(converter)(geom.coordinates),
    };
  }
  if (isPolygonGeometry(geom)) {
    return {
      ...geom,
      coordinates: convertPolygon(converter)(geom.coordinates),
    };
  }
  if (isMultiPointGeometry(geom)) {
    return {
      ...geom,
      coordinates: convertLine(converter)(geom.coordinates),
    };
  }
  if (isMultiLineGeometry(geom)) {
    return {
      ...geom,
      coordinates: convertPolygon(converter)(geom.coordinates),
    };
  }
  if (isMultiPolygonGeometry(geom)) {
    return {
      ...geom,
      coordinates: convertMultiPolygon(converter)(geom.coordinates),
    };
  }
  return geom;
};

/**
 * @param {Function} converter
 * @returns {(geom: Geometry | GeometryCollection) => Geometry | GeometryCollection}
 */
export default (converter) => (geom) => {
  if (isGeometryCollection(geom)) {
    return {
      ...geom,
      geometries: geom.geometries.map(convertGeometryInner(converter)),
    };
  }
  return convertGeometryInner(converter)(geom);
};
