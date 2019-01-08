// https://www.swisstopo.admin.ch/content/swisstopo-internet/en/online/calculation-services/_jcr_content/contentPar/tabs/items/documents_publicatio/tabPar/downloadlist/downloadItems/19_1467104393233.download/ch1903wgs84_e.pdf

// Convert the ellipsoidal latitudes φ and longitudes λ into arcseconds ["]

const toSeconds = (angle: number): number => {
  const degrees = Math.floor(angle)
  const minutesFloat = (angle - degrees) * 60
  const minutes = Math.floor(minutesFloat)
  const seconds = (minutesFloat - minutes) * 60
  return seconds + minutes * 60 + degrees * 3600
}

const getPhi = (latitude: number): number => toSeconds(latitude)
const getLambda = (longitude: number): number => toSeconds(longitude)

// Calculate the auxiliary values (differences of latitude and longitude relative to Bern in the unit[10000"]):

const getPhi2 = (phi: number): number => (phi - 169028.66) / 10000
const getLambda2 = (lambda: number): number => (lambda - 26782.5) / 10000

// Calculate projection coordinates in LV95

const getEasting = (phi2: number, lambda2: number): number =>
  2600072.37
  + 211455.93 * lambda2
  - 10938.51 * lambda2 * phi2
  - 0.36 * lambda2 * Math.pow(phi2, 2)
  - 44.54 * Math.pow(lambda2, 3)

const getNorthing = (phi2: number, lambda2: number): number =>
  1200147.07
  + 308807.95 * phi2
  + 3745.25 * Math.pow(lambda2, 2)
  + 76.63 * Math.pow(phi2, 2)
  - 194.56 * Math.pow(lambda2, 2) * phi2
  + 119.79 * Math.pow(phi2, 3)

// Calculate projection coordinates in LV03

const getY = (phi2: number, lambda2: number): number =>
  getEasting(phi2, lambda2) - 2000000

const getX = (phi2: number, lambda2: number): number =>
  getNorthing(phi2, lambda2) - 1000000

export const toLV95 = ([longitude, latitude]: number[]): number[] => {
  const phi2 = getPhi2(getPhi(latitude))
  const lambda2 = getLambda2(getLambda(longitude))
  return [
    Math.round(getEasting(phi2, lambda2)),
    Math.round(getNorthing(phi2, lambda2)),
  ]
}

export const toLV03 = ([longitude, latitude]: number[]): number[] => {
  const phi2 = getPhi2(getPhi(latitude))
  const lambda2 = getLambda2(getLambda(longitude))
  return [
    Math.round(getY(phi2, lambda2)),
    Math.round(getX(phi2, lambda2)),
  ]
}