import { EncryptionType } from "@bitwarden/common/enums/encryptionType";

export class EncArrayBuffer {
  ctBytes: Uint8Array = null; // cipher text bytes
  ivBytes: Uint8Array = null;
  macBytes: Uint8Array = null;
  encryptionType: EncryptionType = null;

  constructor(public buffer: ArrayBuffer) {
    const encBytes = new Uint8Array(this.buffer);
    this.encryptionType = encBytes[0];

    switch (this.encryptionType) {
      case EncryptionType.AesCbc128_HmacSha256_B64:
      case EncryptionType.AesCbc256_HmacSha256_B64:
        if (encBytes.length <= 49) {
          // 1 + 16 + 32 + ctLength
          return null;
        }

        this.ivBytes = encBytes.slice(1, 17);
        this.macBytes = encBytes.slice(17, 49);
        this.ctBytes = encBytes.slice(49);
        break;
      case EncryptionType.AesCbc256_B64:
        if (encBytes.length <= 17) {
          // 1 + 16 + ctLength
          return null;
        }

        this.ivBytes = encBytes.slice(1, 17);
        this.ctBytes = encBytes.slice(17);
        break;
      default:
        return null;
    }
  }
}
