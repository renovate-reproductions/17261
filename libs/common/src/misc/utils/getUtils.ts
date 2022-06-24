import { AbstractEncodingUtils } from "./abstractEncodingUtils";
import { BrowserEncodingUtils } from "./browserUtils";

export const getEncodingUtils = (): AbstractEncodingUtils => {
  // TODO: Determine platform here
  return new BrowserEncodingUtils();
};
