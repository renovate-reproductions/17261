import { CipherRepromptType } from "@bitwarden/common/enums/cipherRepromptType";
import { CipherType } from "@bitwarden/common/enums/cipherType";
import { AttachmentView } from "@bitwarden/common/models/view/attachmentView";
import { CardView } from "@bitwarden/common/models/view/cardView";
import { CipherView } from "@bitwarden/common/models/view/cipherView";
import { FieldView } from "@bitwarden/common/models/view/fieldView";
import { LoginView } from "@bitwarden/common/models/view/loginView";
import { PasswordHistoryView } from "@bitwarden/common/models/view/passwordHistoryView";

jest.mock("@bitwarden/common/models/view/loginView");
jest.mock("@bitwarden/common/models/view/attachmentView");
jest.mock("@bitwarden/common/models/view/fieldView");
jest.mock("@bitwarden/common/models/view/passwordHistoryView");

describe("CipherView", () => {
  const obj = {
    id: "myId",
    organizationId: "myOrgId",
    folderId: "myFolderId",
    name: "my Cipher",
    notes: "lorem ipsum",
    type: CipherType.Login,
    favorite: true,
    organizationUseTotp: true,
    edit: true,
    viewPassword: false,
    localData: { lastUsedDate: "123" },
    login: "myLogin",
    attachments: ["attachment1", "attachment2"],
    fields: ["field1", "field2"],
    passwordHistory: ["ph1", "ph2", "ph3"],
    collectionIds: ["collection1", "collection2"],
    revisionDate: new Date(),
    deletedDate: new Date(),
    reprompt: CipherRepromptType.Password,
  };

  beforeEach(() => {
    (LoginView as any).mockClear();
    (AttachmentView as any).mockClear();
    (FieldView as any).mockClear();
    (PasswordHistoryView as any).mockClear();
  });

  it("toJSON() creates object for serialization", () => {
    const cipher = new CipherView();
    Object.assign(cipher, obj);

    expect(cipher.toJSON()).toEqual(obj);
  });

  it("fromJSON() populates from deserialized object", () => {
    const expected = new CipherView();
    Object.assign(expected, obj);

    const mockCtor = (key: string) => key as any;
    jest.spyOn(LoginView, "fromJSON").mockImplementation(mockCtor);
    jest.spyOn(AttachmentView, "fromJSON").mockImplementation(mockCtor);
    jest.spyOn(FieldView, "fromJSON").mockImplementation(mockCtor);
    jest.spyOn(PasswordHistoryView, "fromJSON").mockImplementation(mockCtor);

    const newCipher = CipherView.fromJSON(obj);

    expect(newCipher).toEqual(expected);
    expect(newCipher).toBeInstanceOf(CipherView);
  });
});
