import { CryptoFunctionService } from "../abstractions/cryptoFunction.service";
import { DecryptService as DecryptServiceAbstraction } from "../abstractions/decrypt.service";
import { LogService } from "../abstractions/log.service";
import { EncryptionType } from "../enums/encryptionType";
import { Utils } from "../misc/utils";
import { EncArrayBuffer } from "../models/domain/encArrayBuffer";
import { EncString } from "../models/domain/encString";
import { SymmetricCryptoKey } from "../models/domain/symmetricCryptoKey";

export class DecryptService implements DecryptServiceAbstraction {
  constructor(
    private cryptoFunctionService: CryptoFunctionService,
    private logService: LogService
  ) {}

  async decryptToBytes(encString: EncString, key: SymmetricCryptoKey): Promise<ArrayBuffer> {
    const iv = Utils.fromB64ToArray(encString.iv).buffer;
    const data = Utils.fromB64ToArray(encString.data).buffer;
    const mac = encString.mac ? Utils.fromB64ToArray(encString.mac).buffer : null;
    const decipher = await this.aesDecryptToBytes(encString.encryptionType, data, iv, mac, key);
    if (decipher == null) {
      return null;
    }

    return decipher;
  }

  async decryptToUtf8(encString: EncString, key: SymmetricCryptoKey): Promise<string> {
    return await this.aesDecryptToUtf8(
      encString.encryptionType,
      encString.data,
      encString.iv,
      encString.mac,
      key
    );
  }

  async decryptFromBytes(encBuf: EncArrayBuffer, key: SymmetricCryptoKey): Promise<ArrayBuffer> {
    if (encBuf == null) {
      throw new Error("no encBuf.");
    }

    return await this.aesDecryptToBytes(
      encBuf.encryptionType,
      encBuf.ctBytes.buffer,
      encBuf.ivBytes.buffer,
      encBuf.macBytes != null ? encBuf.macBytes.buffer : null,
      key
    );
  }

  private async aesDecryptToUtf8(
    encType: EncryptionType,
    data: string,
    iv: string,
    mac: string,
    key: SymmetricCryptoKey
  ): Promise<string> {
    if (key == null) {
      throw new Error("No key provided for decryptToUtf8");
    }

    if (key.macKey != null && mac == null) {
      this.logService.error("mac required.");
      return null;
    }

    if (key.encType !== encType) {
      this.logService.error("encType unavailable.");
      return null;
    }

    const fastParams = this.cryptoFunctionService.aesDecryptFastParameters(data, iv, mac, key);
    if (fastParams.macKey != null && fastParams.mac != null) {
      const computedMac = await this.cryptoFunctionService.hmacFast(
        fastParams.macData,
        fastParams.macKey,
        "sha256"
      );
      const macsEqual = await this.cryptoFunctionService.compareFast(fastParams.mac, computedMac);
      if (!macsEqual) {
        this.logService.error("mac failed.");
        return null;
      }
    }

    return this.cryptoFunctionService.aesDecryptFast(fastParams);
  }

  private async aesDecryptToBytes(
    encType: EncryptionType,
    data: ArrayBuffer,
    iv: ArrayBuffer,
    mac: ArrayBuffer,
    key: SymmetricCryptoKey
  ): Promise<ArrayBuffer> {
    if (key == null) {
      throw new Error("No key provided for aesDecryptToBytes");
    }

    if (key.macKey != null && mac == null) {
      return null;
    }

    if (key.encType !== encType) {
      return null;
    }

    if (key.macKey != null && mac != null) {
      const macData = new Uint8Array(iv.byteLength + data.byteLength);
      macData.set(new Uint8Array(iv), 0);
      macData.set(new Uint8Array(data), iv.byteLength);
      const computedMac = await this.cryptoFunctionService.hmac(
        macData.buffer,
        key.macKey,
        "sha256"
      );
      if (computedMac === null) {
        return null;
      }

      const macsMatch = await this.cryptoFunctionService.compare(mac, computedMac);
      if (!macsMatch) {
        this.logService.error("mac failed.");
        return null;
      }
    }

    return await this.cryptoFunctionService.aesDecrypt(data, iv, key.encKey);
  }
}
