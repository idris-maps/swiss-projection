import { CoordPoint } from './types'

// https://www.swisstopo.admin.ch/content/swisstopo-internet/en/online/calculation-services/_jcr_content/contentPar/tabs/items/documents_publicatio/tabPar/downloadlist/downloadItems/19_1467104393233.download/ch1903wgs84_e.pdf

// Convert the projection coordinates E (easting) and N (northing) in LV95 into the civilian system (Bern = 0 / 0) and express in the unit [1000 km]

const getY2FromE = (E: number): number => (E - 2600000) / 1000000
const getX2FromN = (N: number): number => (N - 1200000) / 1000000

// Convert the projection coordinates y and x in LV03 into the civilian system (Bern = 0 / 0) and express in the unit [1000 km]

const getY2FromY = (y: number): number => (y - 600000) / 1000000
const getX2FromX = (x: number): number => (x - 200000) / 1000000

// Calculate longitude λ and latitude φ in the unit [10000"]

const getLambda = (y2: number, x2: number): number =>
  2.6779094
  + 4.728982 * y2
  + 0.791484 * y2 * x2
  + 0.1306 * y2 * Math.pow(x2, 2)
  - 0.0436 * Math.pow(y2, 3)

const getPhi = (y2: number, x2: number): number =>
  16.9023892
  + 3.238272 * x2
  - 0.270978 * Math.pow(y2, 2)
  - 0.002528 * Math.pow(x2, 2)
  - 0.0447 * Math.pow(y2, 2) * x2
  - 0.0140 * Math.pow(x2, 3)

// Convert longitude and latitude to the unit [°]

const toDegrees = (n: number): number => n * 100 / 36

const round = (n: number): number => Math.round(n * 1000000) / 1000000

export const fromLV03 = ([y, x]: CoordPoint): CoordPoint => {
  const y2 = getY2FromY(y)
  const x2 = getX2FromX(x)
  return [
    round(toDegrees(getLambda(y2, x2))),
    round(toDegrees(getPhi(y2, x2))),
  ]
}

export const fromLV95 = ([E, N]: CoordPoint): CoordPoint => {
  const y2 = getY2FromE(E)
  const x2 = getX2FromN(N)
  return [
    round(toDegrees(getLambda(y2, x2))),
    round(toDegrees(getPhi(y2, x2))),
  ]
}