"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var convertCoordinates_1 = require("./convertCoordinates");
var isGeometryCollection = function (geom) {
    return geom.type && geom.type === 'GeometryCollection';
};
var isPointGeometry = function (geom) {
    return geom.type && geom.type === 'Point';
};
var isLineGeometry = function (geom) {
    return geom.type && geom.type === 'LineString';
};
var isPolygonGeometry = function (geom) {
    return geom.type && geom.type === 'Polygon';
};
var isMultiPointGeometry = function (geom) {
    return geom.type && geom.type === 'MultiPoint';
};
var isMultiLineGeometry = function (geom) {
    return geom.type && geom.type === 'MultiLineString';
};
var isMultiPolygonGeometry = function (geom) {
    return geom.type && geom.type === 'MultiPolygon';
};
var convertGeometry = function (converter) {
    return function (geom) {
        if (isPointGeometry(geom)) {
            return __assign({}, geom, { coordinates: convertCoordinates_1.convertPoint(converter)(geom.coordinates) });
        }
        if (isLineGeometry(geom)) {
            return __assign({}, geom, { coordinates: convertCoordinates_1.convertLine(converter)(geom.coordinates) });
        }
        if (isPolygonGeometry(geom)) {
            return __assign({}, geom, { coordinates: convertCoordinates_1.convertPolygon(converter)(geom.coordinates) });
        }
        if (isMultiPointGeometry(geom)) {
            return __assign({}, geom, { coordinates: convertCoordinates_1.convertLine(converter)(geom.coordinates) });
        }
        if (isMultiLineGeometry(geom)) {
            return __assign({}, geom, { coordinates: convertCoordinates_1.convertPolygon(converter)(geom.coordinates) });
        }
        if (isMultiPolygonGeometry(geom)) {
            return __assign({}, geom, { coordinates: convertCoordinates_1.convertMultiPolygon(converter)(geom.coordinates) });
        }
        return geom;
    };
};
exports.default = (function (converter) {
    return function (geom) {
        if (isGeometryCollection(geom)) {
            return __assign({}, geom, { geometries: geom.geometries.map(convertGeometry(converter)) });
        }
        return convertGeometry(converter)(geom);
    };
});
