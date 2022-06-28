import { LoginUriView } from "@bitwarden/common/models/view/loginUriView";
import { LoginView } from "@bitwarden/common/models/view/loginView";

jest.mock("@bitwarden/common/models/view/loginUriView");

describe("LoginView", () => {
  beforeEach(() => {
    (LoginUriView as any).mockClear();
  });

  it("serializes and deserializes", () => {
    const login = new LoginView();
    login.username = "myUsername";
    login.password = "myPassword";
    login.totp = "totpSeed";
    login.autofillOnPageLoad = true;
    login.passwordRevisionDate = new Date();
    login.uris = ["uri1", "uri2", "uri3"] as any;

    const mockFromJson = (key: string) => (key + "fromJSON") as any;
    jest.spyOn(LoginUriView, "fromJSON").mockImplementation(mockFromJson);

    const stringified = JSON.stringify(login);
    const newLogin = LoginView.fromJSON(JSON.parse(stringified));

    expect(newLogin).toEqual({
      ...login,
      uris: ["uri1fromJSON", "uri2fromJSON", "uri3fromJSON"],
    });
    expect(newLogin).toBeInstanceOf(LoginView);
  });
});
