var proj4 = require('proj4')


var lv03 = '+proj=somerc +lat_0=46.95240555555556 +lon_0=7.439583333333333 +k_0=1 +x_0=600000 +y_0=200000 +ellps=bessel +towgs84=674.4,15.1,405.3,0,0,0,0 +units=m +no_defs'
var lv95 = '+proj=somerc +lat_0=46.95240555555556 +lon_0=7.439583333333333 +k_0=1 +x_0=2600000 +y_0=1200000 +ellps=bessel +towgs84=674.374,15.056,405.346,0,0,0,0 +units=m +no_defs'
var wgs84 = '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs'

exports.wgsToLv03 = function(pt, rnd) {
	var r = proj4(wgs84,lv03,pt)
	if(rnd) { return simplCH(r) }
	else { return r }
}

exports.wgsToLv95 = function(pt, rnd) {
	var r = proj4(wgs84,lv95,pt)
	if(rnd) { return simplCH(r) }
	else { return r }
}

exports.lv03ToWgs = function(pt, rnd) {
	var r = proj4(lv03, wgs84, pt)
	if(rnd) { return simplW(r) }
	else { return r }
}

exports.lv03ToLv95 = function(pt, rnd) {
	var r = proj4(lv03, lv95, pt)
	if(rnd) { return simplCH(r) }
	else { return r }
}

exports.lv95ToWgs = function(pt, rnd) {
	var r = proj4(lv95, wgs84, pt)
	if(rnd) { return simplW(r) }
	else { return r }
}

exports.lv95ToLv03 = function(pt, rnd) {
	var r = proj4(lv95, lv03, pt)
	if(rnd) { return simplCH(r) }
	else { return r }
}

function simplCH(pt) {
	return [Math.round(pt[0]), Math.round(pt[1])]
}

function simplW(pt) {
	return [
		Math.round(pt[0] * 1000000)/1000000,
		Math.round(pt[1] * 1000000)/1000000
	]
}
