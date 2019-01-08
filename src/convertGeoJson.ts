import convertGeometry from './convertGeometry'

import {
  FeatureCollection,
  GeoJSON,
  Feature,
} from './geojson.d'

const isFeature = (o: GeoJSON): o is Feature =>
  o.type && o.type === 'Feature'

const isCollection = (o: GeoJSON): o is FeatureCollection =>
  o.type && o.type === 'FeatureCollection'

const convertFeature = (converter: Function) =>
  (feature: Feature): Feature => ({
    ...feature,
    geometry: convertGeometry(converter)(feature.geometry)
  })

export default (converter: Function) => (geojson: GeoJSON): GeoJSON => {
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