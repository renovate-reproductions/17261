import { FieldType } from "@bitwarden/common/enums/fieldType";
import { LoginLinkedId } from "@bitwarden/common/enums/linkedIdType";
import { FieldView } from "@bitwarden/common/models/view/fieldView";

describe("FieldView", () => {
  it("serializes and deserializes", () => {
    const field = new FieldView();
    field.name = "myFieldName";
    field.value = "myValue";
    field.type = FieldType.Hidden;
    field.newField = true;
    field.showValue = true;
    field.showCount = true;
    field.linkedId = LoginLinkedId.Password;

    const stringified = JSON.stringify(field);
    const newField = FieldView.fromJSON(JSON.parse(stringified));

    expect(newField).toEqual(field);
    expect(newField).toBeInstanceOf(FieldView);
  });
});
