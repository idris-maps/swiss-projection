import convertGeoJson from './convertGeoJson'
import convertGeometry from './convertGeometry'

import {
  Feature,
  FeatureCollection,
  Geometry,
  GeometryCollection,
} from './geojson'

const isGeoJson = (o: any): o is Feature | FeatureCollection =>
  o.type && (o.type === 'Feature' || o.type === 'FeatureCollection')

const isGeometry = (o: any): o is Geometry | GeometryCollection =>
  o.type && (
    o.type === 'Point'
    || o.type === 'LineString'
    || o.type === 'Polygon'
    || o.type === 'MultiPoint'
    || o.type === 'MultiLineString'
    || o.type === 'MultiPolygon'
    || o.type === 'GeometryCollection'
  )

export default <T>(converter: Function) =>
  (toConvert: T): T => {
    if (isGeoJson(toConvert)) {
      // @ts-ignore
      return convertGeoJson(converter)(toConvert)
    }
    if (isGeometry(toConvert)) {
      // @ts-ignore
      return convertGeometry(converter)(toConvert)
    }
    return toConvert
  }