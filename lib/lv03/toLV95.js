var conv = require('../conv').lv03ToLv95
var geojson = require('../geojson')

exports.point = function(pt, rnd) {
	return conv(pt, rnd)
}

exports.GeoJSON = function(geo, rnd) {
	return geojson(geo, rnd, conv, 'lv95')
}
