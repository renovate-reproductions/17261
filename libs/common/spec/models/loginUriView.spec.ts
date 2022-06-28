import { UriMatchType } from "@bitwarden/common/enums/uriMatchType";
import { LoginUriView } from "@bitwarden/common/models/view/loginUriView";

describe("LoginUriView", () => {
  it("serializes and deserializes", () => {
    const uri = new LoginUriView();
    uri.match = UriMatchType.Host;
    uri.uri = "http://example.com/login";

    const stringified = JSON.stringify(uri);
    const newUri = LoginUriView.fromJSON(JSON.parse(stringified));

    expect(newUri).toEqual(uri);
    expect(newUri).toBeInstanceOf(LoginUriView);
  });
});
