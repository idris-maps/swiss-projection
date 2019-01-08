import test from 'tape'
import convert from '../convert'
import { fromLV95 } from '../fromCH'
import * as data from './data'

const convertFromLV95 = convert<any>(fromLV95)

const isWgsPoint = ([lng, lat]: number[]): boolean =>
  // is in switzerland
  lng > 5 && lng < 10 && lat > 40 && lat < 50

const isWgsLine = (line: number[][]): boolean =>
  !line.map(isWgsPoint).includes(false)

const isWgsPolygon = (polygon: number[][][]): boolean =>
  !polygon.map(isWgsLine).includes(false)

test('covert featureCollection', t => {
  const res = convertFromLV95(data.collection)
  t.same(res.type, 'FeatureCollection', 'should return collection')
  t.same(res.features.length, data.collection.features.length, 'should return same number of features')
  t.end()
})

test('convert feature with polygon', t => {
  const res = convertFromLV95(data.baselPolygonFeature)
  t.same(res.type, 'Feature', 'should return a feature')
  t.same(res.properties, data.baselPolygonFeature.properties, 'with unchanged properties')
  t.true(isWgsPolygon(res.geometry.coordinates), 'should return a wgs geometry')
  t.end()
})

test('convert feature with point', t => {
  const res = convertFromLV95(data.yverdonPointFeature)
  t.same(res.type, 'Feature', 'should return a feature')
  t.same(res.properties, data.yverdonPointFeature.properties, 'with unchanged properties')
  t.true(isWgsPoint(res.geometry.coordinates), 'should return a wgs geometry')
  t.end()
})

test('convert geometry collection', t => {
  const res = convertFromLV95(data.geometryCollection)
  t.same(res.type, 'GeometryCollection')
  t.same(res.geometries.length, data.geometryCollection.geometries.length, 'should return same number of geometries')
  t.end()
})

test('convert polygon geometry', t => {
  const res = convertFromLV95(data.polygonGeometry)
  t.same(res.type, 'Polygon', 'should return a point geometry')
  t.true(isWgsPolygon(res.coordinates), 'should return a wgs polygon')
  t.end()
})

test('convert point geometry', t => {
  const res = convertFromLV95(data.pointGeometry)
  t.same(res.type, 'Point', 'should return a point geometry')
  t.true(isWgsPoint(res.coordinates), 'should return a wgs point')
  t.end()
})