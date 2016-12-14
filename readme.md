# swiss-projection

Convert points and GeoJSON objects between LV03(EPSG:21781), LV95(EPSG:2056) and WGS84(EPSG:4326).

## Install

### NPM

```
$ npm install swiss-projection
```

```
var ch = require('swiss-projection')
```

### Browser

Download [swiss-proj.min.js](https://raw.githubusercontent.com/idris-maps/swiss-projection/master/dist/swiss-proj.min.js)

```
<script src="swiss-proj.min.js"></script>
```

The library is accessible through the global variable ```ch```.

## Usage

```
ch.<input-projection>.to<output-projection>.point([<x>,<y>], <round>)
// or 
ch.<input-projection>.to<output-projection>.GeoJSON(<geojson-object>, <round>)
```

```<round>``` is a boolean (defaults to ```false```). If ```true```, the result will be rounded to closest integer for results in LV03 or LV95 and to 0.000001 in WGS.

### Example 1: LV03 point to WGS84

```
ch.lv03.toWgs.point([600000, 200000])

// returns
// [ 7.4386329497797306, 46.95108228114304 ]

ch.lv03.toWgs.point([600000, 200000], true)

// returns
// [ 7.438633, 46.951082 ]
```

### Exemple 2: WGS GeoJSON feature to LV95

```
var feature = {
	type: 'Feature', properties: {}, geometry: { type: 'Point', coordinates: [7.438633, 46.951082] }
}

ch.wgs.toLv95.GeoJSON(feature, true)

// returns

//{ type: 'Feature',
// properties: {},
// geometry: {
//  type: 'Point',
//  coordinates: [ 2600000, 1200000 ] 
// },
// crs: {
//  type: 'name',
//  properties: { name: 'urn:ogc:def:crs:EPSG::2056' } 
// } 
//}
```

This method works for both ```FeatureCollection``` and ```Feature```.






