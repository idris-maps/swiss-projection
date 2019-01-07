import {
  convertLine,
  convertMultiPolygon,
  convertPoint,
  convertPolygon,
} from './convertCoordinates'

import {
  Geometry,
  GeometryLine,
  GeometryMultiLine,
  GeometryMultiPoint,
  GeometryMultiPolygon,
  GeometryPoint,
  GeometryPolygon,
} from './types'

const isPointGeometry = (geom: Geometry): geom is GeometryPoint =>
  geom.type === 'Point'

const isLineGeometry = (geom: Geometry): geom is GeometryLine =>
  geom.type === 'LineString'

const isPolygonGeometry = (geom: Geometry): geom is GeometryPolygon =>
  geom.type === 'Polygon'

const isMultiPointGeometry = (geom: Geometry): geom is GeometryMultiPoint =>
  geom.type === 'MultiPoint'

const isMultiLineGeometry = (geom: Geometry): geom is GeometryMultiLine =>
  geom.type === 'MultiLineString'

const isMultiPolygonGeometry = (geom: Geometry): geom is GeometryMultiPolygon =>
  geom.type === 'MultiPolygon'

export default (converter: Function) =>
  (geom: Geometry): Geometry => {
    if (isPointGeometry(geom)) {
      return {
        ...geom,
        coordinates: convertPoint(converter)(geom.coordinates),
      }
    }
    if (isLineGeometry(geom)) {
      return {
        ...geom,
        coordinates: convertLine(converter)(geom.coordinates),
      }
    }
    if (isPolygonGeometry(geom)) {
      return {
        ...geom,
        coordinates: convertPolygon(converter)(geom.coordinates),
      }
    }
    if (isMultiPointGeometry(geom)) {
      return {
        ...geom,
        coordinates: convertLine(converter)(geom.coordinates),
      }
    }
    if (isMultiLineGeometry(geom)) {
      return {
        ...geom,
        coordinates: convertPolygon(converter)(geom.coordinates),
      }
    }
    if (isMultiPolygonGeometry(geom)) {
      return {
        ...geom,
        coordinates: convertMultiPolygon(converter)(geom.coordinates),
      }
    }
    return geom
  }