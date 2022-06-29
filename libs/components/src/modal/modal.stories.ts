import { Meta, Story } from "@storybook/angular";

import { ModalComponent } from "./modal.component";

export default {
  title: "Component Library/Modal",
  component: ModalComponent,
} as Meta;

const Template: Story<ModalComponent> = (args: ModalComponent) => ({
  props: args,
  template: `
  <button (click)="bitModal.initializeBitModal()">Open modal</button>
  <bit-modal #bitModal></bit-modal>
  `,
});

export const TestModal = Template.bind({});
