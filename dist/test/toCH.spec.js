"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tape_1 = __importDefault(require("tape"));
var toCH_1 = require("../src/toCH");
var lngLat = [7.438633, 46.951082];
tape_1.default('toLV03', function (t) {
    var _a = toCH_1.toLV03(lngLat), y = _a[0], x = _a[1];
    t.same(y, 600000);
    t.same(x, 200000);
    t.end();
});
tape_1.default('toLV95', function (t) {
    var _a = toCH_1.toLV95(lngLat), E = _a[0], N = _a[1];
    t.same(E, 2600000);
    t.same(N, 1200000);
    t.end();
});
