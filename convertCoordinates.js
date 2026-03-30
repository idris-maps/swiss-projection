/**
 * @typedef {{ type: string }} GeoJsonObject
 * @typedef {GeoJsonObject & { coordinates: number[] }} Point
 * @typedef {GeoJsonObject & { coordinates: number[][] }} LineString
 * @typedef {GeoJsonObject & { coordinates: number[][][] }} Polygon
 * @typedef {GeoJsonObject & { coordinates: number[][][][] }} MultiPolygon
 * @typedef {GeoJsonObject & { coordinates: number[][] }} MultiPoint
 * @typedef {GeoJsonObject & { coordinates: number[][][][] }} MultiLineString
 * @typedef {GeoJsonObject & { geometries: (Point|LineString|Polygon|MultiPoint|MultiLineString|MultiPolygon)[] }} GeometryCollection
 * @typedef {GeoJsonObject & { geometry: Point|LineString|Polygon|MultiPoint|MultiLineString|MultiPolygon|GeometryCollection|null, properties: Object|null }} Feature
 * @typedef {GeoJsonObject & { features: Feature[] }} FeatureCollection
 * @typedef {Point|LineString|Polygon|MultiPoint|MultiLineString|MultiPolygon|GeometryCollection|Feature|FeatureCollection} GeoJSON
 * @typedef {number[]} Position
 * @typedef {Position} PointCoords
 * @typedef {Position[]} LineCoords
 * @typedef {LineCoords[]} PolygonCoords
 * @typedef {PolygonCoords[]} MultiPolygonCoords
 * @typedef {number | PointCoords | LineCoords | PolygonCoords | MultiPolygonCoords} Coords
 */

/**
 * @param {*} value
 * @returns {boolean}
 */
const isNumber = (value) => !isNaN(Number(value));

/**
 * @param {Coords} c
 * @returns {c is PointCoords}
 */
const isPoint = (c) => {
  if (!Array.isArray(c)) return false;
  return isNumber(c[0]) && isNumber(c[1]);
};

/**
 * @param {Coords} c
 * @returns {c is LineCoords}
 */
const isLine = (c) => Array.isArray(c) && isPoint(c[0]);

/**
 * @param {Coords} c
 * @returns {c is PolygonCoords}
 */
const isPolygon = (c) => Array.isArray(c) && isLine(c[0]);

/**
 * @param {Coords} c
 * @returns {c is MultiPolygonCoords}
 */
const isMultiPolygon = (c) => Array.isArray(c) && isPolygon(c[0]);

/**
 * @param {*} c
 * @returns {c is Coords}
 */
export const isCoords = (c) =>
  isPoint(c) || isLine(c) || isPolygon(c) || isMultiPolygon(c);

/**
 * @param {Function} converter
 * @returns {(point: PointCoords) => PointCoords}
 */
export const convertPoint = (converter) => (point) => converter(point);

/**
 * @param {Function} converter
 * @returns {(line: LineCoords) => LineCoords}
 */
export const convertLine = (converter) => (line) =>
  line.map(convertPoint(converter));

/**
 * @param {Function} converter
 * @returns {(polygon: PolygonCoords) => PolygonCoords}
 */
export const convertPolygon = (converter) => (polygon) =>
  polygon.map(convertLine(converter));

/**
 * @param {Function} converter
 * @returns {(multipolygon: MultiPolygonCoords) => MultiPolygonCoords}
 */
export const convertMultiPolygon = (converter) => (multipolygon) =>
  multipolygon.map(convertPolygon(converter));

/**
 * @param {Function} converter
 * @returns {(coordinates: Coords) => Coords}
 */
export default (converter) => (coordinates) => {
  if (isPoint(coordinates)) return convertPoint(converter)(coordinates);
  if (isLine(coordinates)) return convertLine(converter)(coordinates);
  if (isPolygon(coordinates)) return convertPolygon(converter)(coordinates);
  if (isMultiPolygon(coordinates)) {
    return convertMultiPolygon(converter)(coordinates);
  }
  return coordinates;
};
