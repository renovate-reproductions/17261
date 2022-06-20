import { StateService } from "jslib-common/abstractions/state.service";

export class AutoFillActiveTabCommand {
  constructor(private stateService: StateService) {}

  async doAutoFillActiveTabCommand(tab: chrome.tabs.Tab) {
    // get cipher for tab

    const canAccessPremium = await this.stateService.getCanAccessPremium();
  }
}
