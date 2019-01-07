import { default as test } from 'tape'
import { toLV03, toLV95 } from '../src/toCH'

const lngLat: [number, number] = [ 7.438633, 46.951082 ]

test('toLV03', t => {
  const [y, x] = toLV03(lngLat)
  t.same(y, 600000)
  t.same(x, 200000)
  t.end()
})

test('toLV95', t => {
  const [y, x] = toLV95(lngLat)
  t.same(y, 2600000)
  t.same(x, 1200000)
  t.end()
})
