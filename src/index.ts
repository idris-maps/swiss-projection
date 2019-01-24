import convert from './convert'
import { toLV03, toLV95 } from './toCH'
import { fromLV03, fromLV95 } from './fromCH'

export const LV03toWGS = convert(fromLV03)
export const LV95toWGS = convert(fromLV95)
export const WGStoLV03 = convert(toLV03)
export const WGStoLV95 = convert(toLV95)

export default {
  LV03toWGS,
  LV95toWGS,
  WGStoLV03,
  WGStoLV95,
}