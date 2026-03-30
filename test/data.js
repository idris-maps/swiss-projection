/**
 * @typedef {Object} PointGeometry
 * @property {"Point"} type
 * @property {number[]} coordinates
 */

/**
 * @typedef {Object} PolygonGeometry
 * @property {"Polygon"} type
 * @property {number[][][]} coordinates
 */

/**
 * @typedef {Object} BaselFeature
 * @property {"Feature"} type
 * @property {{KTNR: number, KTNAME: string}} properties
 * @property {PolygonGeometry} geometry
 */

/**
 * @typedef {Object} YverdonFeature
 * @property {"Feature"} type
 * @property {{name: string}} properties
 * @property {PointGeometry} geometry
 */

/**
 * @typedef {Object} FeatureCollection
 * @property {"FeatureCollection"} type
 * @property {(BaselFeature|YverdonFeature)[]} features
 */

/**
 * @typedef {Object} GeometryCollection
 * @property {"GeometryCollection"} type
 * @property {(PolygonGeometry|PointGeometry)[]} geometries
 */

/** @type {BaselFeature} */
export const baselPolygonFeature = {
  type: "Feature",
  properties: {
    KTNR: 12,
    KTNAME: "Basel-Stadt",
  },
  geometry: {
    type: "Polygon",
    coordinates: [
      [
        [2618243, 1270052],
        [2616262, 1267990],
        [2614711, 1267840],
        [2614602, 1267872],
        [2613766, 1265748],
        [2613671, 1265408],
        [2611744, 1263231],
        [2611346, 1263338],
        [2610925, 1264472],
        [2608775, 1265954],
        [2608770, 1268212],
        [2611314, 1271031],
        [2613986, 1269877],
        [2615583, 1271829],
        [2618243, 1270052],
      ],
    ],
  },
};

/** @type {YverdonFeature} */
export const yverdonPointFeature = {
  type: "Feature",
  properties: {
    name: "Yverdon",
  },
  geometry: {
    type: "Point",
    coordinates: [2539070, 1181442],
  },
};

/** @type {FeatureCollection} */
export const collection = {
  type: "FeatureCollection",
  features: [
    baselPolygonFeature,
    yverdonPointFeature,
  ],
};

/** @type {PolygonGeometry} */
export const polygonGeometry = baselPolygonFeature.geometry;

/** @type {PointGeometry} */
export const pointGeometry = yverdonPointFeature.geometry;

/** @type {GeometryCollection} */
export const geometryCollection = {
  type: "GeometryCollection",
  geometries: [
    polygonGeometry,
    pointGeometry,
  ],
};
