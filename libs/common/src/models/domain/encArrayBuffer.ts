import { EncryptionType } from "@bitwarden/common/enums/encryptionType";

export class EncArrayBuffer {
  encType: EncryptionType = null;
  ctBytes: Uint8Array = null;
  ivBytes: Uint8Array = null;
  macBytes: Uint8Array = null;

  constructor(public buffer: ArrayBuffer) {
    const encBytes = new Uint8Array(buffer);

    this.encType = encBytes[0];

    switch (this.encType) {
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
