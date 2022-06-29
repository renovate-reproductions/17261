import { LoginUriView } from "@bitwarden/common/models/view/loginUriView";
import { LoginView } from "@bitwarden/common/models/view/loginView";

jest.mock("@bitwarden/common/models/view/loginUriView");

const testValues = {
  username: "myUsername",
  password: "myPassword",
  totp: "totpSeed",
  autofillOnPageLoad: true,
  uris: ["uri1", "uri2", "uri3"],
  passwordRevisionDate: new Date(),
};

describe("LoginView", () => {
  beforeEach(() => {
    (LoginUriView as any).mockClear();
  });

  it("fromJSON hydrates new view object", () => {
    const parsedFromJson = {
      ...testValues,
      passwordRevisionDate: testValues.passwordRevisionDate.toISOString(),
    };
    jest
      .spyOn(LoginUriView, "fromJSON")
      .mockImplementation((key: string) => (key + "fromJSON") as any);

    const login = LoginView.fromJSON(parsedFromJson);

    expect(login).toEqual({
      ...testValues,
      uris: ["uri1fromJSON", "uri2fromJSON", "uri3fromJSON"],
    });
    expect(login).toBeInstanceOf(LoginView);
  });
});
