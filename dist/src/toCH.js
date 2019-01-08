"use strict";
// https://www.swisstopo.admin.ch/content/swisstopo-internet/en/online/calculation-services/_jcr_content/contentPar/tabs/items/documents_publicatio/tabPar/downloadlist/downloadItems/19_1467104393233.download/ch1903wgs84_e.pdf
Object.defineProperty(exports, "__esModule", { value: true });
// Convert the ellipsoidal latitudes φ and longitudes λ into arcseconds ["]
var toSeconds = function (angle) {
    var degrees = Math.floor(angle);
    var minutesFloat = (angle - degrees) * 60;
    var minutes = Math.floor(minutesFloat);
    var seconds = (minutesFloat - minutes) * 60;
    return seconds + minutes * 60 + degrees * 3600;
};
var getPhi = function (latitude) { return toSeconds(latitude); };
var getLambda = function (longitude) { return toSeconds(longitude); };
// Calculate the auxiliary values (differences of latitude and longitude relative to Bern in the unit[10000"]):
var getPhi2 = function (phi) { return (phi - 169028.66) / 10000; };
var getLambda2 = function (lambda) { return (lambda - 26782.5) / 10000; };
// Calculate projection coordinates in LV95
var getEasting = function (phi2, lambda2) {
    return 2600072.37
        + 211455.93 * lambda2
        - 10938.51 * lambda2 * phi2
        - 0.36 * lambda2 * Math.pow(phi2, 2)
        - 44.54 * Math.pow(lambda2, 3);
};
var getNorthing = function (phi2, lambda2) {
    return 1200147.07
        + 308807.95 * phi2
        + 3745.25 * Math.pow(lambda2, 2)
        + 76.63 * Math.pow(phi2, 2)
        - 194.56 * Math.pow(lambda2, 2) * phi2
        + 119.79 * Math.pow(phi2, 3);
};
// Calculate projection coordinates in LV03
var getY = function (phi2, lambda2) {
    return getEasting(phi2, lambda2) - 2000000;
};
var getX = function (phi2, lambda2) {
    return getNorthing(phi2, lambda2) - 1000000;
};
exports.toLV95 = function (_a) {
    var longitude = _a[0], latitude = _a[1];
    var phi2 = getPhi2(getPhi(latitude));
    var lambda2 = getLambda2(getLambda(longitude));
    return [
        Math.round(getEasting(phi2, lambda2)),
        Math.round(getNorthing(phi2, lambda2)),
    ];
};
exports.toLV03 = function (_a) {
    var longitude = _a[0], latitude = _a[1];
    var phi2 = getPhi2(getPhi(latitude));
    var lambda2 = getLambda2(getLambda(longitude));
    return [
        Math.round(getY(phi2, lambda2)),
        Math.round(getX(phi2, lambda2)),
    ];
};
