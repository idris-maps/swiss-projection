"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isNumber = function (value) {
    return !isNaN(Number(value));
};
var isPoint = function (c) {
    if (!Array.isArray(c)) {
        return false;
    }
    return isNumber(c[0]) && isNumber(c[1]);
};
var isLine = function (c) {
    return Array.isArray(c) && isPoint(c[0]);
};
var isPolygon = function (c) {
    return Array.isArray(c) && isLine(c[0]);
};
var isMultiPolygon = function (c) {
    return Array.isArray(c) && isPolygon(c[0]);
};
exports.isCoords = function (c) {
    return isPoint(c) || isLine(c) || isPolygon(c) || isMultiPolygon(c);
};
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
exports.default = (function (converter) {
    return function (coordinates) {
        if (isPoint(coordinates)) {
            return exports.convertPoint(converter)(coordinates);
        }
        if (isLine(coordinates)) {
            return exports.convertLine(converter)(coordinates);
        }
        if (isPolygon(coordinates)) {
            return exports.convertPolygon(converter)(coordinates);
        }
        if (isMultiPolygon(coordinates)) {
            return exports.convertMultiPolygon(converter)(coordinates);
        }
        return coordinates;
    };
});
