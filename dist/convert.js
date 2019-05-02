"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var convertGeoJson_1 = __importDefault(require("./convertGeoJson"));
var convertGeometry_1 = __importDefault(require("./convertGeometry"));
var convertCoordinates_1 = __importDefault(require("./convertCoordinates"));
var convertCoordinates_2 = require("./convertCoordinates");
var isGeoJson = function (o) {
    return o.type && (o.type === 'Feature' || o.type === 'FeatureCollection');
};
var isGeometry = function (o) {
    return o.type && (o.type === 'Point'
        || o.type === 'LineString'
        || o.type === 'Polygon'
        || o.type === 'MultiPoint'
        || o.type === 'MultiLineString'
        || o.type === 'MultiPolygon'
        || o.type === 'GeometryCollection');
};
exports.default = (function (converter) {
    return function (toConvert) {
        if (isGeoJson(toConvert)) {
            // @ts-ignore
            return convertGeoJson_1.default(converter)(toConvert);
        }
        if (isGeometry(toConvert)) {
            // @ts-ignore
            return convertGeometry_1.default(converter)(toConvert);
        }
        if (convertCoordinates_2.isCoords(toConvert)) {
            // @ts-ignore
            return convertCoordinates_1.default(converter)(toConvert);
        }
        return toConvert;
    };
});
