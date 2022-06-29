import {
  AfterViewInit,
  Component,
  Input,
  ViewChild,
  ElementRef,
  HostListener,
} from "@angular/core";

@Component({
  selector: "bit-modal",
  templateUrl: "./modal.component.html",
})
export class ModalComponent {
  // Controls the size of the bit modal displayed. Needs to be implemented.
  @Input("modalSize") modalSize: "small" | "default" | "large";

  @ViewChild("bitModal") bitModal: ElementRef;

  @ViewChild("bitModalPopUp") bitModalPopUp: ElementRef;

  // Handle keyboard escape from modal
  @HostListener("keydown", ["$event"])
  handleKeyboardEvent(event: KeyboardEvent) {
    console.log("here");
    if (event.key == "Escape" && this.showModal) {
      console.log("detected escape key closing modal.");
      this.closeBitModal();
    }
  }

  // Watch for clicking outside of the modal popup and close if so.
  @HostListener("document:click", ["$event"])
  clickOut(e: Event) {
    if (
      !this.initialize &&
      this.showModal &&
      e.target !== this.bitModalPopUp.nativeElement &&
      !this.bitModalPopUp.nativeElement.contains(e.target)
    ) {
      console.log("Closing modal clicked outside the popup");
      this.closeBitModal();
    }
    this.initialize = false;
  }

  showModal = false;
  initialize = false;

  // Hides the modal.
  closeBitModal() {
    this.showModal = false;
  }

  // This should be called to initialize/show the modal from a button/link
  initializeBitModal() {
    console.log("starting invoker event.");
    this.initialize = true;
    this.showModal = true;
    // Set focus on the bit modal so when users hit ESC key the modal closes instantly.
    setTimeout(() => this.bitModal.nativeElement.focus());
  }
}
