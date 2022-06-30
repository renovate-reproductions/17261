import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { ModalBodyComponent } from "./modal-body.component";
import { ModalContainerComponent } from "./modal-container.component";
import { ModalTitleComponent } from "./modal-title.component";

@NgModule({
  imports: [CommonModule],
  exports: [ModalContainerComponent, ModalBodyComponent, ModalTitleComponent],
  declarations: [ModalContainerComponent, ModalBodyComponent, ModalTitleComponent],
})
export class ModalModule {}
