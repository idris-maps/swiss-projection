// @ts-check

/**
 * https://www.swisstopo.admin.ch/content/swisstopo-internet/en/online/calculation-services/_jcr_content/contentPar/tabs/items/documents_publicatio/tabPar/downloadlist/downloadItems/19_1467104393233.download/ch1903wgs84_e.pdf
 */

/**
 * @param {number} angle
 * @returns {number}
 */
const toSeconds = (angle) => {
  const degrees = Math.floor(angle);
  const minutesFloat = (angle - degrees) * 60;
  const minutes = Math.floor(minutesFloat);
  const seconds = (minutesFloat - minutes) * 60;
  return seconds + minutes * 60 + degrees * 3600;
};

/**
 * @param {number} latitude
 * @returns {number}
 */
const getPhi = (latitude) => toSeconds(latitude);

/**
 * @param {number} longitude
 * @returns {number}
 */
const getLambda = (longitude) => toSeconds(longitude);

/**
 * @param {number} phi
 * @returns {number}
 */
const getPhi2 = (phi) => (phi - 169028.66) / 10000;

/**
 * @param {number} lambda
 * @returns {number}
 */
const getLambda2 = (lambda) => (lambda - 26782.5) / 10000;

/**
 * @param {number} phi2
 * @param {number} lambda2
 * @returns {number}
 */
const getEasting = (phi2, lambda2) =>
  2600072.37 +
  211455.93 * lambda2 -
  10938.51 * lambda2 * phi2 -
  0.36 * lambda2 * Math.pow(phi2, 2) -
  44.54 * Math.pow(lambda2, 3);

/**
 * @param {number} phi2
 * @param {number} lambda2
 * @returns {number}
 */
const getNorthing = (phi2, lambda2) =>
  1200147.07 +
  308807.95 * phi2 +
  3745.25 * Math.pow(lambda2, 2) +
  76.63 * Math.pow(phi2, 2) -
  194.56 * Math.pow(lambda2, 2) * phi2 +
  119.79 * Math.pow(phi2, 3);

/**
 * @param {number} phi2
 * @param {number} lambda2
 * @returns {number}
 */
const getY = (phi2, lambda2) => getEasting(phi2, lambda2) - 2000000;

/**
 * @param {number} phi2
 * @param {number} lambda2
 * @returns {number}
 */
const getX = (phi2, lambda2) => getNorthing(phi2, lambda2) - 1000000;

/**
 * @param {[number, number]} coords
 * @returns {[number, number]}
 */
export const toLV95 = ([longitude, latitude]) => {
  const phi2 = getPhi2(getPhi(latitude));
  const lambda2 = getLambda2(getLambda(longitude));
  return [
    Math.round(getEasting(phi2, lambda2)),
    Math.round(getNorthing(phi2, lambda2)),
  ];
};

/**
 * @param {[number, number]} coords
 * @returns {[number, number]}
 */
export const toLV03 = ([longitude, latitude]) => {
  const phi2 = getPhi2(getPhi(latitude));
  const lambda2 = getLambda2(getLambda(longitude));
  return [
    Math.round(getY(phi2, lambda2)),
    Math.round(getX(phi2, lambda2)),
  ];
};
