import { PasswordHistoryView } from "@bitwarden/common/models/view/passwordHistoryView";

describe("PasswordHistoryView", () => {
  it("serializes and deserializes", () => {
    const ph = new PasswordHistoryView();
    ph.lastUsedDate = new Date();
    ph.password = "mySecretPass";

    const stringified = JSON.stringify(ph);
    const newPh = PasswordHistoryView.fromJSON(JSON.parse(stringified));

    expect(newPh).toEqual(ph);
    expect(newPh).toBeInstanceOf(PasswordHistoryView);
  });
});
