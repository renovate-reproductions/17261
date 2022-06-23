import { Meta, moduleMetadata, Story } from "@storybook/angular";

import { TableModule } from "./table.module";

export default {
  title: "Component Library/Table",
  decorators: [
    moduleMetadata({
      imports: [TableModule],
    }),
  ],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/f32LSg3jaegICkMu7rPARm/Tailwind-Component-Library-Update?node-id=1881%3A17952",
    },
  },
} as Meta;

const Template: Story = (args) => ({
  props: args,
  template: `
    <bit-table>
      <ng-container header>
        <tr>
          <th bitCell>Header 1</th>
          <th bitCell>Header 2</th>
          <th bitCell>Header 3</th>
        </tr>
      </ng-container>
      <ng-container body>
        <tr bitRow>
          <td bitCell>Cell 1</td>
          <td bitCell>Cell 2</td>
          <td bitCell>Cell 3</td>
        </tr>
        <tr bitRow>
          <td bitCell>Cell 4</td>
          <td bitCell>Cell 5</td>
          <td bitCell>Cell 6</td>
        </tr>
        <tr bitRow>
          <td bitCell>Cell 7</td>
          <td bitCell>Cell 8</td>
          <td bitCell>Cell 9</td>
        </tr>
      </ng-container>
    </bit-table>

    `,
});

export const Default = Template.bind({});
