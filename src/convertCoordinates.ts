export const convertPoint = (converter: Function) =>
  (point: number[]): number[] =>
    converter(point)

export const convertLine = (converter: Function) =>
  (line: number[][]): number[][] =>
    line.map(convertPoint(converter))

export const convertPolygon = (converter: Function) =>
  (polygon: number[][][]): number[][][] =>
    polygon.map(convertLine(converter))

export const convertMultiPolygon = (converter: Function) =>
  (multipolygon: number[][][][]): number[][][][] =>
    multipolygon.map(convertPolygon(converter))