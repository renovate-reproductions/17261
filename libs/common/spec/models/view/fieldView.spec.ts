import { FieldType } from "@bitwarden/common/enums/fieldType";
import { LoginLinkedId } from "@bitwarden/common/enums/linkedIdType";
import { FieldView } from "@bitwarden/common/models/view/fieldView";

describe("FieldView", () => {
  it("fromJSON hydrates new view object", () => {
    const testValues = {
      name: "myFieldName",
      value: "myValue",
      type: FieldType.Hidden,
      newField: true,
      showValue: true,
      showCount: true,
      linkedId: LoginLinkedId.Password,
    };

    const actual = FieldView.fromJSON(testValues);

    const expected = new FieldView();
    Object.assign(expected, testValues);

    expect(actual).toEqual(expected);
    expect(actual).toBeInstanceOf(FieldView);
  });
});
