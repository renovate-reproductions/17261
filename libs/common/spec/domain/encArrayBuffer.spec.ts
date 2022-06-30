import { EncryptionType } from "@bitwarden/common/enums/encryptionType";
import { EncArrayBuffer } from "@bitwarden/common/models/domain/encArrayBuffer";

import { makeStaticByteArray } from "../utils";

describe("encArrayBuffer", () => {
  describe("parses the buffer", () => {
    it("with AesCbc128_HmacSha256_B64", () => {
      const encType = EncryptionType.AesCbc128_HmacSha256_B64;
      const iv = makeStaticByteArray(16, 10);
      const mac = makeStaticByteArray(32, 20);
      const cipherText = makeStaticByteArray(20, 30);

      const array = new Uint8Array(1 + iv.byteLength + mac.byteLength + cipherText.byteLength);
      array.set([encType]);
      array.set(iv, 1);
      array.set(mac, 1 + iv.byteLength);
      array.set(cipherText, 1 + iv.byteLength + mac.byteLength);

      const actual = new EncArrayBuffer(array.buffer);

      expect(actual.encType).toEqual(encType);
      expect(actual.ivBytes).toEqual(iv);
      expect(actual.macBytes).toEqual(mac);
      expect(actual.ctBytes).toEqual(cipherText);
    });

    it("with AesCbc256_B64", () => {
      const encType = EncryptionType.AesCbc256_B64;
      const iv = makeStaticByteArray(16, 10);
      const cipherText = makeStaticByteArray(20, 30);

      const array = new Uint8Array(1 + iv.byteLength + cipherText.byteLength);
      array.set([encType]);
      array.set(iv, 1);
      array.set(cipherText, 1 + iv.byteLength);

      const actual = new EncArrayBuffer(array.buffer);

      expect(actual.encType).toEqual(encType);
      expect(actual.ivBytes).toEqual(iv);
      expect(actual.ctBytes).toEqual(cipherText);
      expect(actual.macBytes).toBeNull();
    });
  });
});
