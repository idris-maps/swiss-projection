import { Position } from './geojson'

type PointCoords = Position
type LineCoords = Position[]
type PolygonCoords = Position[][]
type MultiPolygonCoords = Position[][][]
type Coords = number | PointCoords | LineCoords | PolygonCoords | MultiPolygonCoords

const isNumber = (value: any): boolean =>
  !isNaN(Number(value))

const isPoint = (c: Coords): c is PointCoords => {
  if (!Array.isArray(c)) { return false }
  return isNumber(c[0]) && isNumber(c[1])
}

const isLine = (c: Coords): c is LineCoords =>
  Array.isArray(c) && isPoint(c[0])

const isPolygon = (c: Coords): c is PolygonCoords =>
  Array.isArray(c) && isLine(c[0])

const isMultiPolygon = (c: Coords): c is MultiPolygonCoords =>
  Array.isArray(c) && isPolygon(c[0])

export const isCoords = (c: any): c is Coords =>
  isPoint(c) || isLine(c) || isPolygon(c) || isMultiPolygon(c)

export const convertPoint = (converter: Function) =>
  (point: PointCoords): PointCoords =>
    converter(point)

export const convertLine = (converter: Function) =>
  (line: LineCoords): LineCoords =>
    line.map(convertPoint(converter))

export const convertPolygon = (converter: Function) =>
  (polygon: PolygonCoords): PolygonCoords =>
    polygon.map(convertLine(converter))

export const convertMultiPolygon = (converter: Function) =>
  (multipolygon: MultiPolygonCoords): MultiPolygonCoords =>
    multipolygon.map(convertPolygon(converter))

export default (converter: Function) =>
  (coordinates: Coords): Coords => {
    if (isPoint(coordinates)) { return convertPoint(converter)(coordinates) }
    if (isLine(coordinates)) { return convertLine(converter)(coordinates) }
    if (isPolygon(coordinates)) { return convertPolygon(converter)(coordinates) }
    if (isMultiPolygon(coordinates)) { return convertMultiPolygon(converter)(coordinates) }
    return coordinates
  }