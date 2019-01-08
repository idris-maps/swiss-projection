"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertPoint = function (converter) {
    return function (point) {
        return converter(point);
    };
};
exports.convertLine = function (converter) {
    return function (line) {
        return line.map(exports.convertPoint(converter));
    };
};
exports.convertPolygon = function (converter) {
    return function (polygon) {
        return polygon.map(exports.convertLine(converter));
    };
};
exports.convertMultiPolygon = function (converter) {
    return function (multipolygon) {
        return multipolygon.map(exports.convertPolygon(converter));
    };
};
