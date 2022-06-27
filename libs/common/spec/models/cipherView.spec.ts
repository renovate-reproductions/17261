import { UriMatchType } from "@bitwarden/common/enums/uriMatchType";
import { CipherView } from "@bitwarden/common/models/view/cipherView";
import { LoginUriView } from "@bitwarden/common/models/view/loginUriView";

import { AttachmentView } from "../../src/models/view/attachmentView";

jest.mock("../../src/models/view/attachmentView");

const primitiveFields = {
  id: "myId",
  folderId: "folderId",
  organizationId: "organizationId",
};

describe("CipherView", () => {
  let cipherView: CipherView;

  beforeEach(() => {
    (AttachmentView as any).mockClear();

    cipherView = new CipherView();
    Object.assign(cipherView, primitiveFields);
  });

  it("serializes", () => {
    // cipherView.attachments = [new AttachmentView(), new AttachmentView()];

    // const actual = JSON.stringify(cipherView);

    // expect(cipherView.attachments[0].toJSON).toHaveBeenCalledTimes(1);
    // expect(cipherView.attachments[1].toJSON).toHaveBeenCalledTimes(1);

    // expect(actual).toEqual(JSON.stringify(primitiveFields));

    const uri = new LoginUriView();
    uri.match = UriMatchType.Domain;
    uri.uri = "test";

    const parsed = JSON.parse(JSON.stringify(uri));
    expect(parsed).toEqual({
      match: UriMatchType.Domain,
      uri: "test",
    });
  });

  // it("deserializes", () => {

  //   const stringify = JSON.stringify(cipherView);
  //   const actual = CipherView.fromJSON(stringify)
  //   expect(actual).toEqual(primitiveFields)
  // });
});
