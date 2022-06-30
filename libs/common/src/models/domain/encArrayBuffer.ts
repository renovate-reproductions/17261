import { EncryptionType } from "@bitwarden/common/enums/encryptionType";

export class EncArrayBuffer {
  encType: EncryptionType = null;

  private _ctBytes: ArrayBuffer = null;
  private _ivBytes: ArrayBuffer = null;
  private _macBytes: ArrayBuffer = null;

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

        this._ivBytes = encBytes.slice(1, 17).buffer;
        this._macBytes = encBytes.slice(17, 49).buffer;
        this._ctBytes = encBytes.slice(49).buffer;
        break;
      case EncryptionType.AesCbc256_B64:
        if (encBytes.length <= 17) {
          // 1 + 16 + ctLength
          return null;
        }

        this._ivBytes = encBytes.slice(1, 17).buffer;
        this._ctBytes = encBytes.slice(17).buffer;
        break;
      default:
        return null;
    }
  }

  get ivBytes() {
    return this._ivBytes == null ? null : new Uint8Array(this._ivBytes);
  }

  get macBytes() {
    return this._macBytes == null ? null : new Uint8Array(this._macBytes);
  }

  get ctBytes() {
    return this._ctBytes == null ? null : new Uint8Array(this._ctBytes);
  }
}
