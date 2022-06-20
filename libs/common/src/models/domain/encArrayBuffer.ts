import { EncryptionType } from "@bitwarden/common/enums/encryptionType";

export class EncArrayBuffer {
  constructor(public buffer: ArrayBuffer) {}

  get encryptionType(): EncryptionType {
    return this.parseBytes?.encryptionType;
  }

  get ivBytes(): Uint8Array {
    return this.parseBytes?.ivBytes;
  }

  get macBytes(): Uint8Array {
    return this.parseBytes?.macBytes;
  }

  // Cipher Text
  get ctBytes(): Uint8Array {
    return this.parseBytes?.ctBytes;
  }

  private get parseBytes(): {
    encryptionType: EncryptionType;
    ivBytes: Uint8Array;
    macBytes: Uint8Array;
    ctBytes: Uint8Array;
  } {
    const encBytes = new Uint8Array(this.buffer);

    const encryptionType = encBytes[0];

    switch (encryptionType) {
      case EncryptionType.AesCbc128_HmacSha256_B64:
      case EncryptionType.AesCbc256_HmacSha256_B64:
        if (encBytes.length <= 49) {
          // 1 + 16 + 32 + ctLength
          return null;
        }

        return {
          encryptionType: encryptionType,
          ivBytes: encBytes.slice(1, 17),
          macBytes: encBytes.slice(17, 49),
          ctBytes: encBytes.slice(49),
        };

      case EncryptionType.AesCbc256_B64:
        if (encBytes.length <= 17) {
          // 1 + 16 + ctLength
          return null;
        }

        return {
          encryptionType: encryptionType,
          ivBytes: encBytes.slice(1, 17),
          macBytes: null,
          ctBytes: encBytes.slice(17),
        };

      default:
        return null;
    }
  }
}
