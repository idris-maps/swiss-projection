# swiss-projection

Convert from LV03(EPSG:21781) and LV95(EPSG:2056) to WGS84(EPSG:4326)

Uses the algorithm from [Approximate formulas for the transformation between Swiss projection coordinates and WGS84](https://www.swisstopo.admin.ch/content/swisstopo-internet/en/online/calculation-services/_jcr_content/contentPar/tabs/items/documents_publicatio/tabPar/downloadlist/downloadItems/19_1467104393233.download/ch1903wgs84_e.pdf) (PDF).

## Usage

```javascript
import {
  LV03toWGS,
  LV95toWGS,
  WGStoLV03,
  WGStoLV95,
} from 'swiss-projection'
```

Takes any GeoJSON `FeatureCollection`, `Feature` or `Geometry` as well as `coordinates`

### Examples

* `Feature`

```javascript
const bs_lv95 = {"type":"Feature","properties":{"KTNR":12,"KTNAME":"Basel-Stadt"},"geometry":{"type":"Polygon","coordinates":[[[2618243,1270052],[2616262,1267990],[2614711,1267840],[2614602,1267872],[2613766,1265748],[2613671,1265408],[2611744,1263231],[2611346,1263338],[2610925,1264472],[2608775,1265954],[2608770,1268212],[2611314,1271031],[2613986,1269877],[2615583,1271829],[2618243,1270052]]]}}

const bs_wgs = LV95toWGS(bs_lv95)
// {"type":"Feature","properties":{"KTNR":12,"KTNAME":"Basel-Stadt"},"geometry":{"type":"Polygon","coordinates":[[[7.68112,47.580912],[7.654713,47.562419],[7.6341,47.561106],[7.632653,47.561397],[7.621479,47.542312],[7.620207,47.539256],[7.594557,47.519714],[7.589275,47.520683],[7.583714,47.530889],[7.555192,47.54425],[7.55517,47.564558],[7.589046,47.589872],[7.624531,47.579442],[7.645826,47.596962],[7.68112,47.580912]]]}}
```

* `Geometry`

```javascript
const polygon_lv95 = {"type":"Polygon","coordinates":[[[2618243,1270052],[2616262,1267990],[2614711,1267840],[2614602,1267872],[2613766,1265748],[2613671,1265408],[2611744,1263231],[2611346,1263338],[2610925,1264472],[2608775,1265954],[2608770,1268212],[2611314,1271031],[2613986,1269877],[2615583,1271829],[2618243,1270052]]]}

const polygon_wgs = LV95toWGS(polygon_lv95)
// {"type":"Polygon","coordinates":[[[7.68112,47.580912],[7.654713,47.562419],[7.6341,47.561106],[7.632653,47.561397],[7.621479,47.542312],[7.620207,47.539256],[7.594557,47.519714],[7.589275,47.520683],[7.583714,47.530889],[7.555192,47.54425],[7.55517,47.564558],[7.589046,47.589872],[7.624531,47.579442],[7.645826,47.596962],[7.68112,47.580912]]]}
```

* `coordinates`

```javascript
const coordinates_lv95 = [[[2618243,1270052],[2616262,1267990],[2614711,1267840],[2614602,1267872],[2613766,1265748],[2613671,1265408],[2611744,1263231],[2611346,1263338],[2610925,1264472],[2608775,1265954],[2608770,1268212],[2611314,1271031],[2613986,1269877],[2615583,1271829],[2618243,1270052]]]

const coordinates_wgs = LV95toWGS(coordinates_lv95)
// [[[7.68112,47.580912],[7.654713,47.562419],[7.6341,47.561106],[7.632653,47.561397],[7.621479,47.542312],[7.620207,47.539256],[7.594557,47.519714],[7.589275,47.520683],[7.583714,47.530889],[7.555192,47.54425],[7.55517,47.564558],[7.589046,47.589872],[7.624531,47.579442],[7.645826,47.596962],[7.68112,47.580912]]]
```

## CLI usage

To be used with [`ndjson-cli`](https://github.com/mbostock/ndjson-cli)

```
npm install swiss-projection -g
```

scripts:

* `lv03ToWgs`
* `lv95ToWgs`
* `wgsToLv03`
* `wgsToLv95`


## Example

```
curl https://raw.githubusercontent.com/idris-maps/swiss-geodata-2018/master/data/cantons.json \
  | ndjson-split 'd.features' \
  | lv95ToWgs
```