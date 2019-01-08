import test from 'tape'
import { toLV03, toLV95 } from '../src/toCH'

const lngLat: [number, number] = [ 7.438633, 46.951082 ]

test('toLV03', t => {
  const [y, x] = toLV03(lngLat)
  t.same(y, 600000)
  t.same(x, 200000)
  t.end()
})

test('toLV95', t => {
  const [E, N] = toLV95(lngLat)
  t.same(E, 2600000)
  t.same(N, 1200000)
  t.end()
})
