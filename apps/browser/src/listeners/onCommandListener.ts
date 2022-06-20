import { StateFactory } from "jslib-common/factories/stateFactory";
import { GlobalState } from "jslib-common/models/domain/globalState";
import { StateService } from "jslib-common/services/state.service";
import { StateMigrationService } from "jslib-common/services/stateMigration.service";

import AutofillService from "src/services/autofill.service";

import { Account } from "../models/account";
import { BackgroundConsoleLogService } from "../services/backgroundConsoleLog.service";
import BrowserStorageService from "../services/browserStorage.service";

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

  const logService = new BackgroundConsoleLogService();

  const stateService = new StateService(
    browserStorageService,
    secureStorageService,
    logService,
    stateMigrationService,
    new StateFactory(GlobalState, Account)
  );

  await stateService.init();

  // cipherService

  console.log("autofill_login inited");
};
