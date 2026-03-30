import convertGeometry from "./convertGeometry.js";

/**
 * @typedef {{ type: string }} GeoJsonObject
 * @typedef {GeoJsonObject & { coordinates: number[] }} Point
 * @typedef {GeoJsonObject & { geometry: Point }} Feature
 * @typedef {GeoJsonObject & { features: Feature[] }} FeatureCollection
 * @typedef {Feature|FeatureCollection} GeoJSON
 */

/**
 * @param {GeoJSON} o
 * @returns {o is Feature}
 */
const isFeature = (o) => o.type && o.type === "Feature";

/**
 * @param {GeoJSON} o
 * @returns {o is FeatureCollection}
 */
const isCollection = (o) => o.type && o.type === "FeatureCollection";

/**
 * @param {Function} converter
 * @returns {(feature: Feature) => Feature}
 */
const convertFeature = (converter) => (feature) => ({
  ...feature,
  geometry: convertGeometry(converter)(feature.geometry),
});

/**
 * @param {Function} converter
 * @returns {(geojson: GeoJSON) => GeoJSON}
 */
export default (converter) => (geojson) => {
  if (isFeature(geojson)) {
    return convertFeature(converter)(geojson);
  }
  if (isCollection(geojson)) {
    return {
      ...geojson,
      features: geojson.features.map(convertFeature(converter)),
    };
  }
  return geojson;
};
