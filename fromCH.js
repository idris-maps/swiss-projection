// @ts-check

/**
 * https://www.swisstopo.admin.ch/content/swisstopo-internet/en/online/calculation-services/_jcr_content/contentPar/tabs/items/documents_publicatio/tabPar/downloadlist/downloadItems/19_1467104393233.download/ch1903wgs84_e.pdf
 */

/**
 * @param {number} E
 * @returns {number}
 */
const getY2FromE = (E) => (E - 2600000) / 1000000;

/**
 * @param {number} N
 * @returns {number}
 */
const getX2FromN = (N) => (N - 1200000) / 1000000;

/**
 * @param {number} y
 * @returns {number}
 */
const getY2FromY = (y) => (y - 600000) / 1000000;

/**
 * @param {number} x
 * @returns {number}
 */
const getX2FromX = (x) => (x - 200000) / 1000000;

/**
 * @param {number} y2
 * @param {number} x2
 * @returns {number}
 */
const getLambda = (y2, x2) =>
  2.6779094 +
  4.728982 * y2 +
  0.791484 * y2 * x2 +
  0.1306 * y2 * Math.pow(x2, 2) -
  0.0436 * Math.pow(y2, 3);

/**
 * @param {number} y2
 * @param {number} x2
 * @returns {number}
 */
const getPhi = (y2, x2) =>
  16.9023892 +
  3.238272 * x2 -
  0.270978 * Math.pow(y2, 2) -
  0.002528 * Math.pow(x2, 2) -
  0.0447 * Math.pow(y2, 2) * x2 -
  0.0140 * Math.pow(x2, 3);

/**
 * @param {number} n
 * @returns {number}
 */
const toDegrees = (n) => n * 100 / 36;

/**
 * @param {number} n
 * @returns {number}
 */
const round = (n) => Math.round(n * 1000000) / 1000000;

/**
 * @param {[number, number]} coords
 * @returns {[number, number]}
 */
export const fromLV03 = ([y, x]) => {
  const y2 = getY2FromY(y);
  const x2 = getX2FromX(x);
  return [
    round(toDegrees(getLambda(y2, x2))),
    round(toDegrees(getPhi(y2, x2))),
  ];
};

/**
 * @param {[number, number]} coords
 * @returns {[number, number]}
 */
export const fromLV95 = ([E, N]) => {
  const y2 = getY2FromE(E);
  const x2 = getX2FromN(N);
  return [
    round(toDegrees(getLambda(y2, x2))),
    round(toDegrees(getPhi(y2, x2))),
  ];
};
