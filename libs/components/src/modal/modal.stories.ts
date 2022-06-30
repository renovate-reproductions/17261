import { CommonModule } from "@angular/common";
import { Meta, Story, moduleMetadata } from "@storybook/angular";

import { ModalBodyComponent } from "./modal-body.component";
import { ModalContainerComponent } from "./modal-container.component";
import { ModalTitleComponent } from "./modal-title.component";

export default {
  title: "Component Library/Modal",
  component: ModalContainerComponent,
  decorators: [
    moduleMetadata({
      declarations: [ModalContainerComponent, ModalBodyComponent, ModalTitleComponent],
      imports: [CommonModule],
    }),
  ],
} as Meta;

const Template: Story<ModalContainerComponent> = (args: ModalContainerComponent) => ({
  props: args,
  template: `
  <bit-modal-container>

    <bit-modal-title>
     <p>Modal Title</p>
    </bit-modal-title>
    <bit-modal-body>
      Modal body text goes here.
    </bit-modal-body>
  </bit-modal-container>
  `,
});

export const TestModal = Template.bind({});
