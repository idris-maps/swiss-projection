import convertGeometry from './convertGeometry'

import {
  Collection,
  GeoJson,
  Feature,
} from './types'

const isFeature = (o: GeoJson): o is Feature =>
  o.type && o.type === 'Feature'

const isCollection = (o: GeoJson): o is Collection =>
  o.type && o.type === 'FeatureCollection'

const convertFeature = (converter: Function) =>
  (feature: Feature): Feature => ({
    ...feature,
    geometry: convertGeometry(converter)(feature.geometry)
  })

export default (converter: Function) => (geojson: GeoJson): GeoJson => {
  if (isFeature(geojson)) {
    return convertFeature(converter)(geojson)
  }
  if (isCollection(geojson)) {
    return {
      ...geojson,
      features: geojson.features.map(convertFeature(converter))
    }
  }
  return geojson
}