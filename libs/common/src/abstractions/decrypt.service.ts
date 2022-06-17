import { EncArrayBuffer } from "../models/domain/encArrayBuffer";
import { EncString } from "../models/domain/encString";
import { SymmetricCryptoKey } from "../models/domain/symmetricCryptoKey";

export abstract class DecryptService {
  decryptToBytes: (encString: EncString, key: SymmetricCryptoKey) => Promise<ArrayBuffer>;
  decryptToUtf8: (encString: EncString, key: SymmetricCryptoKey) => Promise<string>;
  decryptFromBytes: (encBuf: EncArrayBuffer, key: SymmetricCryptoKey) => Promise<ArrayBuffer>;
}
