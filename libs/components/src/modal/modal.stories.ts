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
  <bit-modal #bitModal>
  <!--Header-->
  <div class="tw-flex tw-items-start tw-justify-between tw-p-5">
    <h3 class="tw-text-main tw-text-3xl tw-font-semibold">Modal Title</h3>
    <button
      class="tw-p-1 tw-ml-auto tw-bg-transparent tw-border-0 tw-text-main tw-float-right tw-text-3xl tw-leading-none tw-font-semibold tw-outline-none focus:tw-outline-none"
      (click)="bitModal.closeBitModal()"
    >
      <span
        class="tw-bg-transparent tw-text-main tw-h-6 tw-w-6 tw-text-2xl tw-outline-none focus:tw-outline-none"
      >
        ×
      </span>
    </button>
  </div>

  <!--Body-->
  <div class="tw-relative tw-p-6 tw-flex-auto">
    <p class="tw-my-4 tw-text-main tw-text-lg tw-leading-relaxed">
      Modal body goes here.
    </p>
  </div>

  <!--Footer-->
  <div class="tw-bg-background-alt tw-flex tw-items-center tw-justify-left tw-p-6">
    <button (click)="bitModal.closeBitModal()">Save</button>
    <button (click)="bitModal.closeBitModal()">Cancel</button>
  </div>
  </bit-modal>
  `,
});

export const TestModal = Template.bind({});
