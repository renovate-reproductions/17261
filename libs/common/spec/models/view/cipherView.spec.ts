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
  beforeEach(() => {
    (LoginView as any).mockClear();
    (AttachmentView as any).mockClear();
    (FieldView as any).mockClear();
    (PasswordHistoryView as any).mockClear();
  });

  it("serializes and deserializes", () => {
    const cipher = new CipherView();
    cipher.id = "myId";
    cipher.organizationId = "myOrgId";
    cipher.folderId = "myFolderId";
    cipher.name = "my Cipher";
    cipher.notes = "lorem ipsum";
    cipher.type = CipherType.Login;
    cipher.favorite = true;
    cipher.organizationUseTotp = true;
    cipher.edit = true;
    cipher.viewPassword = false;
    cipher.localData = { lastUsedDate: "123" };
    cipher.login = new LoginView();
    cipher.attachments = [new AttachmentView(), new AttachmentView()];
    cipher.fields = [new FieldView(), new FieldView()];
    cipher.passwordHistory = [new PasswordHistoryView(), new PasswordHistoryView()];
    cipher.collectionIds = ["collection1", "collection2"];
    cipher.revisionDate = new Date();
    cipher.deletedDate = new Date();
    cipher.reprompt = CipherRepromptType.Password;

    jest.spyOn(LoginView, "fromJSON").mockImplementation(() => cipher.login);
    jest.spyOn(AttachmentView, "fromJSON").mockImplementation(() => cipher.attachments[0]);
    jest.spyOn(FieldView, "fromJSON").mockImplementation(() => cipher.fields[0]);
    jest.spyOn(PasswordHistoryView, "fromJSON").mockImplementation(() => cipher.passwordHistory[0]);

    const stringified = JSON.stringify(cipher);

    const newCipher = CipherView.fromJSON(JSON.parse(stringified));

    expect(newCipher).toEqual(cipher);
    expect(newCipher).toBeInstanceOf(CipherView);
  });
});
