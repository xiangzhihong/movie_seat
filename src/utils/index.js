import tools from './tool';
import {navigate, navigationRef} from './rootNavigation';
import AESUtils from './AESUtils';

export function isNumber(n) {
  return typeof n === 'number' && !isNaN(n) && isFinite(n);
}
export const delay = ms => new Promise(res => setTimeout(res, ms));
export {tools, navigate, navigationRef, AESUtils};
