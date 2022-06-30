import { Component, Input } from "@angular/core";

@Component({
  selector: "bit-modal-container",
  templateUrl: "./modal-container.component.html",
})
export class ModalContainerComponent {
  // Controls the size of the bit modal displayed. Needs to be implemented.
  @Input("modalSize") modalSize: "small" | "default" | "large";
}
