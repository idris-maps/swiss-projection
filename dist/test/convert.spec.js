"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var tape_1 = __importDefault(require("tape"));
var convert_1 = __importDefault(require("../src/convert"));
var fromCH_1 = require("../src/fromCH");
var data = __importStar(require("./data"));
var convertFromLV95 = convert_1.default(fromCH_1.fromLV95);
var isWgsPoint = function (_a) {
    var lng = _a[0], lat = _a[1];
    // is in switzerland
    return lng > 5 && lng < 10 && lat > 40 && lat < 50;
};
var isWgsLine = function (line) {
    return !line.map(isWgsPoint).includes(false);
};
var isWgsPolygon = function (polygon) {
    return !polygon.map(isWgsLine).includes(false);
};
tape_1.default('covert featureCollection', function (t) {
    var res = convertFromLV95(data.collection);
    t.same(res.type, 'FeatureCollection', 'should return collection');
    t.same(res.features.length, data.collection.features.length, 'should return same number of features');
    t.end();
});
tape_1.default('convert feature with polygon', function (t) {
    var res = convertFromLV95(data.baselPolygonFeature);
    t.same(res.type, 'Feature', 'should return a feature');
    t.same(res.properties, data.baselPolygonFeature.properties, 'with unchanged properties');
    t.true(isWgsPolygon(res.geometry.coordinates), 'should return a wgs geometry');
    t.end();
});
tape_1.default('convert feature with point', function (t) {
    var res = convertFromLV95(data.yverdonPointFeature);
    t.same(res.type, 'Feature', 'should return a feature');
    t.same(res.properties, data.yverdonPointFeature.properties, 'with unchanged properties');
    t.true(isWgsPoint(res.geometry.coordinates), 'should return a wgs geometry');
    t.end();
});
tape_1.default('convert geometry collection', function (t) {
    var res = convertFromLV95(data.geometryCollection);
    t.same(res.type, 'GeometryCollection');
    t.same(res.geometries.length, data.geometryCollection.geometries.length, 'should return same number of geometries');
    t.end();
});
tape_1.default('convert polygon geometry', function (t) {
    var res = convertFromLV95(data.polygonGeometry);
    t.same(res.type, 'Polygon', 'should return a point geometry');
    t.true(isWgsPolygon(res.coordinates), 'should return a wgs polygon');
    t.end();
});
tape_1.default('convert point geometry', function (t) {
    var res = convertFromLV95(data.pointGeometry);
    t.same(res.type, 'Point', 'should return a point geometry');
    t.true(isWgsPoint(res.coordinates), 'should return a wgs point');
    t.end();
});
