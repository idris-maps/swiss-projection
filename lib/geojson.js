module.exports = function(geo, rnd, conv, n) {
	var notValid = 'ERROR: First argument needs to be a "Feature" or a "FeatureCollection"'
	if(geo.type) {
		if(geo.type === 'FeatureCollection') {
			var collection = col(geo, rnd, conv)
			addCrs(collection, n)
			return collection
		} else if(geo.type === 'Feature') {
			var feature = feat(geo, rnd, conv)
			addCrs(feature, n)
			return feature
		} else {
			console.log(notValid)
		}
	} else { console.log(notValid) }
}

function col(collection, rnd, conv) {
	var feats = []
	collection.features.forEach(function(f) {
		var newF = feat(f, rnd, conv)
		if(newF) { feats.push(newF) }
	})
	return {
		type: 'FeatureCollection',
		features: feats
	}
}

function feat(f, rnd, conv) {
	if(isGeom(f)) {
		var c = f.geometry.coordinates
		var t = f.geometry.type
		var p = f.properties
		return feature(p, t, convCoords(c, rnd, conv))
	} else {
		return null
	} 
}

function convCoords(c, rnd, conv) {
	if(c.constructor === Array && !isNaN(c[0])) { return conv(c, rnd) }
	else if(c[0].constructor === Array && !isNaN(c[0][0])) {
		var cc = []
		c.forEach(function(pt) { cc.push(conv(pt, rnd)) })
		return cc
	} 
	else if(c[0][0].constructor === Array && !isNaN(c[0][0][0])) {
		var ccc = []
		c.forEach(function(coords0) {
			var cc = []
			coords0.forEach(function(pt) { cc.push(conv(pt, rnd)) }) 
			ccc.push(cc) 
		})
		return ccc
	} 
	else if(c[0][0][0].constructor === Array && !isNaN(c[0][0][0][0])) {
		var cccc = []
		c.forEach(function(coords0) {
			var ccc = []
			coords0.forEach(function(coords1) { 
				var cc = []
				coords1.forEach(function(pt) {
					cc.push(conv(pt, rnd))
				})
				ccc.push(cc)
			}) 
			cccc.push(ccc) 
		})
		return cccc
	}
}

function isGeom(f) {
	if(f) {
		if(f.geometry) {
			if(f.geometry.type && f.geometry.coordinates) {
				return true
			} else { return false }
		} else { return false }
	} else { return null }
}

function feature(properties, geoType, coords) {
	return {
		type: 'Feature',
		properties: properties,
		geometry: {
			type: geoType,
			coordinates: coords
		}
	}
}

function addCrs(geo, n) {
	var code = { 'lv03': '21781', 'lv95': '2056', 'wgs': '4326' }
	geo.crs = {
		type: 'name',
		properties: {
			name: 'urn:ogc:def:crs:EPSG::' + code[n]
		}
	}
}

