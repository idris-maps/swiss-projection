import { default as test } from 'tape'
import { fromLV03, fromLV95 } from '../src/fromCH'

const lng = 7.438633
const lat = 46.951082

const isCloseEnough = (actual: number, expected: number): boolean =>
  Math.abs(actual - expected) < 0.00001

test('fromLV03', t => {
  const r = fromLV03([600000, 200000])
  t.true(isCloseEnough(r[0], lng))
  t.true(isCloseEnough(r[1], lat))
  t.end()
})

test('fromLV95', t => {
  const r = fromLV95([2600000, 1200000])
  t.true(isCloseEnough(r[0], lng))
  t.true(isCloseEnough(r[1], lat))
  t.end()
})
