"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tape_1 = __importDefault(require("tape"));
var fromCH_1 = require("../src/fromCH");
var lng = 7.438633;
var lat = 46.951082;
var isCloseEnough = function (actual, expected) {
    return Math.abs(actual - expected) < 0.00001;
};
tape_1.default('fromLV03', function (t) {
    var r = fromCH_1.fromLV03([600000, 200000]);
    t.true(isCloseEnough(r[0], lng));
    t.true(isCloseEnough(r[1], lat));
    t.end();
});
tape_1.default('fromLV95', function (t) {
    var r = fromCH_1.fromLV95([2600000, 1200000]);
    t.true(isCloseEnough(r[0], lng));
    t.true(isCloseEnough(r[1], lat));
    t.end();
});
