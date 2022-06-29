import { SymmetricCryptoKey } from "@bitwarden/common/models/domain/symmetricCryptoKey";
import { AttachmentView } from "@bitwarden/common/models/view/attachmentView";

jest.mock("@bitwarden/common/models/domain/symmetricCryptoKey");

describe("AttachmentView", () => {
  beforeEach(() => {
    (SymmetricCryptoKey as any).mockClear();
  });

  it("fromJSON hydrates new view object", () => {
    const testValues = {
      id: "1234",
      url: "http://example.com",
      size: "1000",
      sizeName: "kb",
      fileName: "my filename",
      key: "encKey" as any,
    };

    jest
      .spyOn(SymmetricCryptoKey, "fromJSON")
      .mockImplementation((key: string) => (key + "fromJSON") as any);

    const actual = AttachmentView.fromJSON(testValues);

    const expected = new AttachmentView();
    Object.assign(expected, testValues, { key: "encKeyfromJSON" });

    expect(actual).toEqual(expected);
    expect(actual).toBeInstanceOf(AttachmentView);
  });
});
