import convert from "./convert.js";
import { toLV03, toLV95 } from "./toCH.js";
import { fromLV03, fromLV95 } from "./fromCH.js";

export const LV03toWGS = convert(fromLV03);
export const LV95toWGS = convert(fromLV95);
export const WGStoLV03 = convert(toLV03);
export const WGStoLV95 = convert(toLV95);

export default {
  LV03toWGS,
  LV95toWGS,
  WGStoLV03,
  WGStoLV95,
};
