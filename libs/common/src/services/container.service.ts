import { CryptoService } from "../abstractions/crypto.service";
import { DecryptService } from "../abstractions/decrypt.service";

export class ContainerService {
  constructor(private cryptoService: CryptoService, private decryptService: DecryptService) {}

  // deprecated, use attachToGlobal instead
  attachToWindow(win: any) {
    this.attachToGlobal(win);
  }

  attachToGlobal(global: any) {
    if (!global.bitwardenContainerService) {
      global.bitwardenContainerService = this;
    }
  }

  getCryptoService(): CryptoService {
    return this.cryptoService;
  }

  getDecryptService(): DecryptService {
    return this.decryptService;
  }
}
