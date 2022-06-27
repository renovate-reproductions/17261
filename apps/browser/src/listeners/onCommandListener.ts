import { StateFactory } from "@bitwarden/common/factories/stateFactory";
import { GlobalState } from "@bitwarden/common/models/domain/globalState";
import { CipherService } from "@bitwarden/common/services/cipher.service";
import { ConsoleLogService } from "@bitwarden/common/services/consoleLog.service";
import { SettingsService } from "@bitwarden/common/services/settings.service";
import { StateMigrationService } from "@bitwarden/common/services/stateMigration.service";
import { WebCryptoFunctionService } from "@bitwarden/common/services/webCryptoFunction.service";

import { AutoFillActiveTabCommand } from "../commands/AutoFillActiveTabCommand";
import { Account } from "../models/account";
import { StateService as AbstractStateService } from "../services/abstractions/state.service";
import AutofillService from "../services/autofill.service";
import { BrowserCryptoService } from "../services/browserCrypto.service";
import BrowserStorageService from "../services/browserMemoryStorage.service";
import BrowserPlatformUtilsService from "../services/browserPlatformUtils.service";
import { StateService } from "../services/state.service";

export const onCommandListener = async (command: string, tab: chrome.tabs.Tab) => {
  console.log("onCommand", {
    command,
    tab,
  });
  switch (command) {
    case "autofill_login":
      await doAutoFillLogin(tab);
      break;
    default:
      console.error("Unknown command:", command);
  }
};

const doAutoFillLogin = async (tab: chrome.tabs.Tab): Promise<void> => {
  const browserStorageService = new BrowserStorageService();

  const secureStorageService = new BrowserStorageService();

  const stateFactory = new StateFactory(GlobalState, Account);

  const stateMigrationService = new StateMigrationService(
    browserStorageService,
    secureStorageService,
    stateFactory
  );

  const logService = new ConsoleLogService(false);

  const stateService: AbstractStateService = new StateService(
    browserStorageService,
    secureStorageService,
    null, // AbstractStorageService
    logService,
    stateMigrationService,
    stateFactory
  );

  await stateService.init();

  const cryptoFunctionService = new WebCryptoFunctionService(global);

  const platformUtils = new BrowserPlatformUtilsService(
    null, // MessagingService
    stateService,
    null, // clipboardWriteCallback,
    null // biometricCallback
  );

  const cryptoService = new BrowserCryptoService(
    cryptoFunctionService,
    null, // AbstractEncryptService
    platformUtils,
    logService,
    stateService
  );

  const settingsService = new SettingsService(stateService);

  const cipherService = new CipherService(
    cryptoService, // CryptoService
    settingsService,
    null, // ApiService
    null, // FileUploadService
    null, // I18nService
    null, // () => SearchService
    logService,
    stateService
  );

  const autofillService = new AutofillService(
    cipherService,
    stateService,
    null, // TotpService
    null, // EventService
    logService // LogService
  );

  const command = new AutoFillActiveTabCommand(autofillService);
  await command.doAutoFillActiveTabCommand(tab);

  console.log("autofill_login finished");
};
