import {
  convertLine,
  convertMultiPolygon,
  convertPoint,
  convertPolygon,
} from './convertCoordinates'

import {
  Geometry,
  GeometryCollection,
  Point,
  LineString,
  Polygon,
  MultiLineString,
  MultiPoint,
  MultiPolygon,
} from './geojson'

const isGeometryCollection = (geom: Geometry | GeometryCollection): geom is GeometryCollection =>
  geom.type && geom.type === 'GeometryCollection'

const isPointGeometry = (geom: Geometry | GeometryCollection): geom is Point =>
  geom.type && geom.type === 'Point'

const isLineGeometry = (geom: Geometry | GeometryCollection): geom is LineString =>
  geom.type && geom.type === 'LineString'

const isPolygonGeometry = (geom: Geometry | GeometryCollection): geom is Polygon =>
  geom.type && geom.type === 'Polygon'

const isMultiPointGeometry = (geom: Geometry | GeometryCollection): geom is MultiPoint =>
  geom.type && geom.type === 'MultiPoint'

const isMultiLineGeometry = (geom: Geometry | GeometryCollection): geom is MultiLineString =>
  geom.type && geom.type === 'MultiLineString'

const isMultiPolygonGeometry = (geom: Geometry | GeometryCollection): geom is MultiPolygon =>
  geom.type && geom.type === 'MultiPolygon'

const convertGeometry = (converter: Function) =>
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

export default (converter: Function) =>
  (geom: Geometry | GeometryCollection): Geometry | GeometryCollection => {
    if (isGeometryCollection(geom)) {
      return { ...geom, geometries: geom.geometries.map(convertGeometry(converter)) }
    }
    return convertGeometry(converter)(geom)
  }