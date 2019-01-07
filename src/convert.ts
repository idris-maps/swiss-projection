import convertGeoJson from './convertGeoJson'
import convertGeometry from './convertGeometry'

import {
  ToConvert,
  GeoJson,
  Geometry,
} from './types'

const isGeoJson = (o: ToConvert): o is GeoJson =>
  o.type && (o.type === 'Feature' || o.type === 'FeatureCollection')

const isGeometry = (o: ToConvert): o is Geometry =>
  o.type && (
    o.type === 'Point'
    || o.type === 'LineString'
    || o.type === 'Polygon'
    || o.type === 'MultiPoint'
    || o.type === 'MultiLineString'
    || o.type === 'MultiPolygon'
  )

export default (converter: Function) =>
  (toConvert: ToConvert): ToConvert => {
    if (isGeoJson(toConvert)) {
      return convertGeoJson(converter)(toConvert)
    }
    if (isGeometry(toConvert)) {
      return convertGeometry(converter)(toConvert)
    }
    return toConvert
  }