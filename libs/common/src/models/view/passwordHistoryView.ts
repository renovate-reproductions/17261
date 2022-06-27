import { Utils } from "@bitwarden/common/misc/utils";

import { Password } from "../domain/password";

import { View } from "./view";

export class PasswordHistoryView implements View {
  password: string = null;
  lastUsedDate: Date = null;

  constructor(ph?: Password) {
    if (!ph) {
      return;
    }

    this.lastUsedDate = ph.lastUsedDate;
  }

  static fromJSON(obj: any): PasswordHistoryView {
    return Utils.copyToNewObject(
      obj,
      {
        password: null,
        lastUsedDate: null,
      },
      PasswordHistoryView
    );
  }
}
