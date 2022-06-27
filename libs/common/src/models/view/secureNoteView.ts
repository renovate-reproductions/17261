import { Utils } from "@bitwarden/common/misc/utils";

import { SecureNoteType } from "../../enums/secureNoteType";
import { SecureNote } from "../domain/secureNote";

import { ItemView } from "./itemView";

export class SecureNoteView extends ItemView {
  type: SecureNoteType = null;

  constructor(n?: SecureNote) {
    super();
    if (!n) {
      return;
    }

    this.type = n.type;
  }

  get subTitle(): string {
    return null;
  }

  static fromJSON(obj: any): SecureNoteView {
    return Utils.copyToNewObject(
      obj,
      {
        type: null,
      },
      SecureNoteView
    );
  }
}
