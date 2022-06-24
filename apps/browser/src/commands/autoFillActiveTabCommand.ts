import { AutofillService } from "src/services/abstractions/autofill.service";

export class AutoFillActiveTabCommand {
  constructor(private autofillService: AutofillService) {}

  async doAutoFillActiveTabCommand(tab: chrome.tabs.Tab) {
    await this.autofillService.doAutoFillActiveTab(
      [
        {
          frameId: tab.id,
          tab: tab,
          details: {} as any, // TODO: NO!
        },
      ],
      true
    );
  }
}
