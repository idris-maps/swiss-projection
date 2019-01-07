export type CoordPoint = [number, number]

export type CoordLine = CoordPoint[]

export type CoordPolygon = CoordLine[]

export type CoordMultiPolygon = CoordPolygon[]

export type Coordinates = CoordPoint
  | CoordLine
  | CoordPolygon
  | CoordMultiPolygon

export interface GeometryPoint {
  type: 'Point'
  coordinates: CoordPoint
}

export interface GeometryLine {
  type: 'LineString'
  coordinates: CoordLine
}

export interface GeometryMultiPoint {
  type: 'MultiPoint'
  coordinates: CoordLine
}

export interface GeometryPolygon {
  type: 'Polygon'
  coordinates: CoordPolygon
}

export interface GeometryMultiLine {
  type: 'MultiLineString'
  coordinates: CoordPolygon
}

export interface GeometryMultiPolygon {
  type: 'MultiPolygon'
  coordinates: CoordMultiPolygon
}

export type Geometry = GeometryPoint
  | GeometryLine
  | GeometryMultiPoint
  | GeometryPolygon
  | GeometryMultiLine
  | GeometryMultiPolygon

export interface Feature {
  type: 'Feature'
  geometry: Geometry
  [key: string]: any
}

export interface Collection {
  type: 'FeatureCollection'
  features: Feature[]
}

export type GeoJson = Feature | Collection

export type ToConvert = GeoJson
  | Geometry
  | Coordinates