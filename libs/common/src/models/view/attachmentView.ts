import { Utils } from "@bitwarden/common/misc/utils";

import { Attachment } from "../domain/attachment";
import { SymmetricCryptoKey } from "../domain/symmetricCryptoKey";

import { View } from "./view";

const propertyMap: any = {
  id: null,
  url: null,
  size: null,
  sizeName: null,
  filename: null,
};

export class AttachmentView implements View {
  id: string = null;
  url: string = null;
  size: string = null;
  sizeName: string = null;
  fileName: string = null;
  key: SymmetricCryptoKey = null;

  constructor(a?: Attachment) {
    if (!a) {
      return;
    }

    this.id = a.id;
    this.url = a.url;
    this.size = a.size;
    this.sizeName = a.sizeName;
  }

  get fileSize(): number {
    try {
      if (this.size != null) {
        return parseInt(this.size, null);
      }
    } catch {
      // Invalid file size.
    }
    return 0;
  }

  toJSON() {
    return Utils.copyToNewObject(this, propertyMap);
  }

  static fromJSON(obj: any): AttachmentView {
    const view = Utils.copyToNewObject(obj, propertyMap, AttachmentView);

    view.key = obj.key == null ? null : SymmetricCryptoKey.fromJSON(obj.key);
    return view;
  }
}
