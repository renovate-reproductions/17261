import { AbstractEncodingUtils } from "./abstractEncodingUtils";
import { BrowserEncodingUtils } from "./browserEncodingUtils";

function determineEncodingUtils(): AbstractEncodingUtils {
  console.log("Creating Encoding Utils");
  return new BrowserEncodingUtils();
}

export const encodingUtils = determineEncodingUtils();
