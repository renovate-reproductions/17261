import { PasswordHistoryView } from "@bitwarden/common/models/view/passwordHistoryView";

describe("PasswordHistoryView", () => {
  it("fromJSON hydrates new view object", () => {
    const testValues = {
      lastUsedDate: new Date(),
      password: "mySecretPass",
    };

    const parsed = JSON.parse(JSON.stringify(testValues));
    const actual = PasswordHistoryView.fromJSON(parsed);

    const expected = new PasswordHistoryView();
    Object.assign(expected, testValues);

    expect(actual).toEqual(expected);
    expect(actual).toBeInstanceOf(PasswordHistoryView);
  });
});
