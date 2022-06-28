import { CardView } from "@bitwarden/common/models/view/cardView";

describe("CardView", () => {
  it("serializes and deserializes", () => {
    const card = new CardView();
    card.cardholderName = "my cardholder name";
    card.expMonth = "08";
    card.expYear = "2030";
    card.code = "123";
    card.brand = "ExampleCard Co";
    card.number = "1234 5678 9101";

    const stringify = JSON.stringify(card);
    const newCard = CardView.fromJSON(JSON.parse(stringify));

    expect(newCard).toEqual(card);
    expect(newCard).toBeInstanceOf(CardView);
  });
});
