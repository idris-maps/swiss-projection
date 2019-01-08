"use strict";
// https://www.swisstopo.admin.ch/content/swisstopo-internet/en/online/calculation-services/_jcr_content/contentPar/tabs/items/documents_publicatio/tabPar/downloadlist/downloadItems/19_1467104393233.download/ch1903wgs84_e.pdf
Object.defineProperty(exports, "__esModule", { value: true });
// Convert the projection coordinates E (easting) and N (northing) in LV95 into the civilian system (Bern = 0 / 0) and express in the unit [1000 km]
var getY2FromE = function (E) { return (E - 2600000) / 1000000; };
var getX2FromN = function (N) { return (N - 1200000) / 1000000; };
// Convert the projection coordinates y and x in LV03 into the civilian system (Bern = 0 / 0) and express in the unit [1000 km]
var getY2FromY = function (y) { return (y - 600000) / 1000000; };
var getX2FromX = function (x) { return (x - 200000) / 1000000; };
// Calculate longitude λ and latitude φ in the unit [10000"]
var getLambda = function (y2, x2) {
    return 2.6779094
        + 4.728982 * y2
        + 0.791484 * y2 * x2
        + 0.1306 * y2 * Math.pow(x2, 2)
        - 0.0436 * Math.pow(y2, 3);
};
var getPhi = function (y2, x2) {
    return 16.9023892
        + 3.238272 * x2
        - 0.270978 * Math.pow(y2, 2)
        - 0.002528 * Math.pow(x2, 2)
        - 0.0447 * Math.pow(y2, 2) * x2
        - 0.0140 * Math.pow(x2, 3);
};
// Convert longitude and latitude to the unit [°]
var toDegrees = function (n) { return n * 100 / 36; };
var round = function (n) { return Math.round(n * 1000000) / 1000000; };
exports.fromLV03 = function (_a) {
    var y = _a[0], x = _a[1];
    var y2 = getY2FromY(y);
    var x2 = getX2FromX(x);
    return [
        round(toDegrees(getLambda(y2, x2))),
        round(toDegrees(getPhi(y2, x2))),
    ];
};
exports.fromLV95 = function (_a) {
    var E = _a[0], N = _a[1];
    var y2 = getY2FromE(E);
    var x2 = getX2FromN(N);
    return [
        round(toDegrees(getLambda(y2, x2))),
        round(toDegrees(getPhi(y2, x2))),
    ];
};
