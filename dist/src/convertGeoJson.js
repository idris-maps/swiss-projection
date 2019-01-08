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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var convertGeometry_1 = __importDefault(require("./convertGeometry"));
var isFeature = function (o) {
    return o.type && o.type === 'Feature';
};
var isCollection = function (o) {
    return o.type && o.type === 'FeatureCollection';
};
var convertFeature = function (converter) {
    return function (feature) { return (__assign({}, feature, { geometry: convertGeometry_1.default(converter)(feature.geometry) })); };
};
exports.default = (function (converter) { return function (geojson) {
    if (isFeature(geojson)) {
        return convertFeature(converter)(geojson);
    }
    if (isCollection(geojson)) {
        return __assign({}, geojson, { features: geojson.features.map(convertFeature(converter)) });
    }
    return geojson;
}; });
