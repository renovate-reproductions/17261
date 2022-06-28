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
    const ph = Utils.copyToNewObject(
      obj,
      {
        password: null,
      },
      PasswordHistoryView
    );

    ph.lastUsedDate = obj.lastUsedDate == null ? null : new Date(obj.lastUsedDate);

    return ph;
  }
}
