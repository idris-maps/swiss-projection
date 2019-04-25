"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var convert_1 = __importDefault(require("./convert"));
var toCH_1 = require("./toCH");
var fromCH_1 = require("./fromCH");
exports.LV03toWGS = convert_1.default(fromCH_1.fromLV03);
exports.LV95toWGS = convert_1.default(fromCH_1.fromLV95);
exports.WGStoLV03 = convert_1.default(toCH_1.toLV03);
exports.WGStoLV95 = convert_1.default(toCH_1.toLV95);
exports.default = {
    LV03toWGS: exports.LV03toWGS,
    LV95toWGS: exports.LV95toWGS,
    WGStoLV03: exports.WGStoLV03,
    WGStoLV95: exports.WGStoLV95,
};
