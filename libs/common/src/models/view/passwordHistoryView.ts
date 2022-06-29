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
    const view = new PasswordHistoryView();
    view.password = obj.password;
    view.lastUsedDate = obj.lastUsedDate == null ? null : new Date(obj.lastUsedDate);

    return view;
  }
}
