import { HashPurpose } from "../enums/hashPurpose";
import { KdfType } from "../enums/kdfType";
import { KeySuffixOptions } from "../enums/keySuffixOptions";
import { EncArrayBuffer } from "../models/domain/encArrayBuffer";
import { EncString } from "../models/domain/encString";
import { SymmetricCryptoKey } from "../models/domain/symmetricCryptoKey";
import { ProfileOrganizationResponse } from "../models/response/profileOrganizationResponse";
import { ProfileProviderOrganizationResponse } from "../models/response/profileProviderOrganizationResponse";
import { ProfileProviderResponse } from "../models/response/profileProviderResponse";
import { AttachmentView } from "../models/view/attachmentView";

export abstract class CryptoService {
  // Set keys
  setKey: (key: SymmetricCryptoKey) => Promise<any>;
  setKeyHash: (keyHash: string) => Promise<void>;
  setEncKey: (encKey: string) => Promise<void>;
  setEncPrivateKey: (encPrivateKey: string) => Promise<void>;
  setOrgKeys: (
    orgs: ProfileOrganizationResponse[],
    providerOrgs: ProfileProviderOrganizationResponse[]
  ) => Promise<void>;
  setProviderKeys: (orgs: ProfileProviderResponse[]) => Promise<void>;

  // Get keys
  getKey: (keySuffix?: KeySuffixOptions, userId?: string) => Promise<SymmetricCryptoKey>;
  getKeyFromStorage: (keySuffix: KeySuffixOptions, userId?: string) => Promise<SymmetricCryptoKey>;
  getKeyHash: () => Promise<string>;
  compareAndUpdateKeyHash: (masterPassword: string, key: SymmetricCryptoKey) => Promise<boolean>;
  getEncKey: (key?: SymmetricCryptoKey) => Promise<SymmetricCryptoKey>;
  getPublicKey: () => Promise<ArrayBuffer>;
  getPrivateKey: () => Promise<ArrayBuffer>;
  getFingerprint: (userId: string, publicKey?: ArrayBuffer) => Promise<string[]>;
  getOrgKeys: () => Promise<Map<string, SymmetricCryptoKey>>;
  getOrgKey: (orgId: string) => Promise<SymmetricCryptoKey>;
  getProviderKey: (providerId: string) => Promise<SymmetricCryptoKey>;

  // New key getters: to refactor
  getKeyForDecryptionAttachment: (
    orgId: string,
    attachment: AttachmentView,
    encArrayBuffer: EncArrayBuffer
  ) => Promise<SymmetricCryptoKey>;
  getKeyForDecryption: (
    encryptedThing: EncString | EncArrayBuffer,
    orgId?: string
  ) => Promise<SymmetricCryptoKey>;

  // Has keys
  hasKey: () => Promise<boolean>;
  hasKeyInMemory: (userId?: string) => Promise<boolean>;
  hasKeyStored: (keySuffix?: KeySuffixOptions, userId?: string) => Promise<boolean>;
  hasEncKey: () => Promise<boolean>;

  // Clear keys
  clearKey: (clearSecretStorage?: boolean, userId?: string) => Promise<any>;
  clearKeyHash: () => Promise<any>;
  clearEncKey: (memoryOnly?: boolean, userId?: string) => Promise<any>;
  clearKeyPair: (memoryOnly?: boolean, userId?: string) => Promise<any>;
  clearOrgKeys: (memoryOnly?: boolean, userId?: string) => Promise<any>;
  clearProviderKeys: (memoryOnly?: boolean) => Promise<any>;
  clearPinProtectedKey: () => Promise<any>;
  clearKeys: (userId?: string) => Promise<any>;
  toggleKey: () => Promise<any>;

  // Make keys
  makeKey: (
    password: string,
    salt: string,
    kdf: KdfType,
    kdfIterations: number
  ) => Promise<SymmetricCryptoKey>;
  makeKeyFromPin: (
    pin: string,
    salt: string,
    kdf: KdfType,
    kdfIterations: number,
    protectedKeyCs?: EncString
  ) => Promise<SymmetricCryptoKey>;
  makeShareKey: () => Promise<[EncString, SymmetricCryptoKey]>;
  makeKeyPair: (key?: SymmetricCryptoKey) => Promise<[string, EncString]>;
  makePinKey: (
    pin: string,
    salt: string,
    kdf: KdfType,
    kdfIterations: number
  ) => Promise<SymmetricCryptoKey>;
  makeSendKey: (keyMaterial: ArrayBuffer) => Promise<SymmetricCryptoKey>;
  hashPassword: (
    password: string,
    key: SymmetricCryptoKey,
    hashPurpose?: HashPurpose
  ) => Promise<string>;
  makeEncKey: (key: SymmetricCryptoKey) => Promise<[SymmetricCryptoKey, EncString]>;
  remakeEncKey: (
    key: SymmetricCryptoKey,
    encKey?: SymmetricCryptoKey
  ) => Promise<[SymmetricCryptoKey, EncString]>;
  validateKey: (key: SymmetricCryptoKey) => Promise<boolean>;

  // Encrypt
  // TODO: move to encryptService
  encrypt: (plainValue: string | ArrayBuffer, key?: SymmetricCryptoKey) => Promise<EncString>;
  encryptToBytes: (plainValue: ArrayBuffer, key?: SymmetricCryptoKey) => Promise<EncArrayBuffer>;
  rsaEncrypt: (data: ArrayBuffer, publicKey?: ArrayBuffer) => Promise<EncString>;

  // Helpers
  // TODO: where does this belong?
  randomNumber: (min: number, max: number) => Promise<number>;
}
