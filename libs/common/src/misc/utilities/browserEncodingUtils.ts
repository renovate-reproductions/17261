import { AbstractEncodingUtils } from "./abstractEncodingUtils";
/**
 * This class is for only browser specific implementations.
 * It should not use Buffer since that is a node implementation.
 * If the method does not make use of this.global it should probably be implemented
 * on AbstractUtils
 */
export class BrowserEncodingUtils extends AbstractEncodingUtils {
  private global: typeof global | typeof window;

  constructor() {
    super();
    this.global = global || window;
    if (!this.global) {
      throw new Error("This service in not supported on the current platform.");
    }
  }

  fromUrlB64ToUtf8(urlB64Str: string): string {
    return this.fromB64ToUtf8(super.fromUrlB64ToB64(urlB64Str));
  }

  fromB64ToUtf8(b64Str: string): string {
    return this.global.decodeURIComponent(this.global.escape(this.global.atob(b64Str)));
  }

  fromB64ToArray(str: string): Uint8Array {
    const binaryString = this.global.btoa(str);
    return this.toArray(binaryString);
  }

  fromBufferToB64(buffer: ArrayBuffer): string {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return this.global.btoa(binary);
  }

  private toArray(input: string): Uint8Array {
    const inputBytes = new Uint8Array(input.length);
    for (let i = 0; i < input.length; i++) {
      inputBytes[i] = input.charCodeAt(i);
    }
    return inputBytes;
  }
}
