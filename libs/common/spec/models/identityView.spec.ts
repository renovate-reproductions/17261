import { IdentityView } from "@bitwarden/common/models/view/identityView";

describe("IdentityView", () => {
  it("serializes and deserializes", () => {
    const identity = new IdentityView();
    identity.title = "Mr";
    identity.firstName = "First";
    identity.middleName = "Middle";
    identity.lastName = "Last";
    identity.address1 = "123";
    identity.address2 = "Fake St";
    identity.address3 = "Business Park";
    identity.city = "Sydney";
    identity.state = "NSW";
    identity.postalCode = "2000";
    identity.country = "Australia";
    identity.company = "Bitwarden";
    identity.email = "example@ex.com";
    identity.phone = "1234";
    identity.ssn = "09876";
    identity.username = "myUsername0";
    identity.passportNumber = "A12387";
    identity.licenseNumber = "asdf";

    const stringified = JSON.stringify(identity);
    const newIdentity = IdentityView.fromJSON(JSON.parse(stringified));

    expect(newIdentity).toEqual(identity);
    expect(newIdentity).toBeInstanceOf(IdentityView);
  });
});
