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
    login.uris = [new LoginUriView()];

    jest
      .spyOn(LoginUriView.prototype, "toJSON")
      .mockImplementation(() => ({ mock: "not null value" }));
    jest.spyOn(LoginUriView, "fromJSON").mockImplementation(() => login.uris[0]);

    const stringified = JSON.stringify(login);
    const newLogin = LoginView.fromJSON(JSON.parse(stringified));

    expect(newLogin).toEqual(login);
    expect(newLogin).toBeInstanceOf(LoginView);
  });
});
