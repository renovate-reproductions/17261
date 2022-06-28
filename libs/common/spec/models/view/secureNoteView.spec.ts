import { SecureNoteType } from "@bitwarden/common/enums/secureNoteType";
import { SecureNoteView } from "@bitwarden/common/models/view/secureNoteView";

describe("SecureNoteView", () => {
  it("serializes and deserializes", () => {
    const secureNote = new SecureNoteView();
    secureNote.type = SecureNoteType.Generic;

    const stringified = JSON.stringify(secureNote);
    const newSecureNote = SecureNoteView.fromJSON(JSON.parse(stringified));

    expect(newSecureNote).toEqual(secureNote);
    expect(newSecureNote).toBeInstanceOf(SecureNoteView);
  });
});
