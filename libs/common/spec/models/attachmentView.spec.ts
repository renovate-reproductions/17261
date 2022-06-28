import { SymmetricCryptoKey } from "@bitwarden/common/models/domain/symmetricCryptoKey";
import { AttachmentView } from "@bitwarden/common/models/view/attachmentView";

jest.mock("@bitwarden/common/models/domain/symmetricCryptoKey");

describe("AttachmentView", () => {
  beforeEach(() => {
    (SymmetricCryptoKey as any).mockClear();
  });

  it("serializes and deserializes", () => {
    const attachment = new AttachmentView();
    attachment.id = "1234";
    attachment.url = "http://example.com";
    attachment.size = "1000";
    attachment.sizeName = "kb";
    attachment.fileName = "my filename";
    attachment.key = new SymmetricCryptoKey(null);

    jest.spyOn(SymmetricCryptoKey.prototype, "toJSON").mockImplementation(() => "not null value");

    jest.spyOn(SymmetricCryptoKey, "fromJSON").mockImplementation(() => attachment.key);

    const stringify = JSON.stringify(attachment);

    const newAttachment = AttachmentView.fromJSON(JSON.parse(stringify));
    expect(newAttachment).toEqual(attachment);
    expect(newAttachment).toBeInstanceOf(AttachmentView);

    expect(SymmetricCryptoKey.fromJSON).toHaveBeenCalledTimes(1);
  });
});
