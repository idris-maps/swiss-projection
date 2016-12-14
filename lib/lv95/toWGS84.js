var conv = require('../conv').lv95ToWgs
var geojson = require('../geojson')

exports.point = function(pt, rnd) {
	return conv(pt, rnd)
}

exports.GeoJSON = function(geo, rnd) {
	return geojson(geo, rnd, conv, 'wgs')
}

