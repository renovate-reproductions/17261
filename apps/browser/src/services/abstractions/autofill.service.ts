import { CipherView } from "@bitwarden/common/models/view/cipherView";

import AutofillPageDetails from "../../models/autofillPageDetails";

export interface PageDetail {
  frameId: number;
  tab: chrome.tabs.Tab;
  details: AutofillPageDetails;
}

export interface AutoFillOptions {
  cipher: CipherView;
  pageDetails: PageDetail[];
  doc?: typeof window.document;
  skipUsernameOnlyFill?: boolean;
  onlyEmptyFields?: boolean;
  onlyVisibleFields?: boolean;
  fillNewPassword?: boolean;
  skipLastUsed?: boolean;
}

export abstract class AutofillService {
  getFormsWithPasswordFields: (pageDetails: AutofillPageDetails) => any[];
  doAutoFill: (options: AutoFillOptions) => Promise<string>;
  doAutoFillActiveTab: (pageDetails: PageDetail[], fromCommand: boolean) => Promise<string>;
}
