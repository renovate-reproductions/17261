import { Component, Input, ViewChild, Renderer2, ElementRef, HostListener } from "@angular/core";

type ModalSizes = "small" | "default" | "large";

@Component({
  selector: "bit-modal",
  templateUrl: "./modal.component.html",
})
export class ModalComponent {
  @Input("modalSize") modalSize: ModalSizes = "default";

  @ViewChild("bitModalInvoke") bitModalInvoke: ElementRef;
  @ViewChild("bitModal") bitModal: ElementRef;

  // Handle keyboard escape from modal
  @HostListener("keydown", ["$event"])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key == "Escape" && this.showModal) {
      console.log("detected escape key closing modal.");
      this.toggleModal();
    }
  }

  constructor(private renderer: Renderer2) {
    this.renderer.listen("window", "click", (e: Event) => {
      if (
        e.target !== this.bitModalInvoke.nativeElement &&
        this.showModal &&
        e.target !== this.bitModal.nativeElement &&
        !this.bitModal.nativeElement.contains(e.target)
      ) {
        console.log("Closing modal clicked outside the popup");
        this.toggleModal();
      }
    });
  }

  showModal = false;

  toggleModal() {
    this.showModal = !this.showModal;
  }
}
