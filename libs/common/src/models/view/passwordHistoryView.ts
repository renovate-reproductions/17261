import { Utils } from "@bitwarden/common/misc/utils";

import { Password } from "../domain/password";

import { View } from "./view";

const propertyMap: any = {
  password: null,
  lastUsedDate: null,
};
export class PasswordHistoryView implements View {
  password: string = null;
  lastUsedDate: Date = null;

  constructor(ph?: Password) {
    if (!ph) {
      return;
    }

    this.lastUsedDate = ph.lastUsedDate;
  }

  toJSON(): string {
    const obj = Utils.copyToNewObject(this, propertyMap);
    return JSON.stringify(obj);
  }

  static fromJSON(obj: any): PasswordHistoryView {
    return Utils.copyToNewObject(obj, propertyMap, PasswordHistoryView);
  }
}
