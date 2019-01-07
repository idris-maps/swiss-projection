import {
  CoordLine,
  CoordMultiPolygon,
  CoordPoint,
  CoordPolygon,
} from './types'

export const convertPoint = (converter: Function) =>
  (point: CoordPoint): CoordPoint =>
    converter(point)

export const convertLine = (converter: Function) =>
  (line: CoordLine): CoordLine =>
    line.map(convertPoint(converter))

export const convertPolygon = (converter: Function) =>
  (polygon: CoordPolygon): CoordPolygon =>
    polygon.map(convertLine(converter))

export const convertMultiPolygon = (converter: Function) =>
  (multipolygon: CoordMultiPolygon): CoordMultiPolygon =>
    multipolygon.map(convertPolygon(converter))