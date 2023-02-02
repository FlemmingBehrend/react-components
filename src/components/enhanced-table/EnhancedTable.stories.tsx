import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import EnhancedTable, { NumberCell, NumberColDef, StringCell, StringColDef } from './';
import { TableHeader } from './types';
import { Identible } from './table/cell-types/definition';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { green } from '@mui/material/colors';

export default {
  title: 'EnhancedTable',
  component: EnhancedTable
} as ComponentMeta<typeof EnhancedTable>;

const customTheme = createTheme({
  enhancedTable: {
    tableHeader: {
      backgroundColor: green[400]
    }
  }
});

//👇 We create a “template” of how args map to rendering
const TemplateWithTheme: ComponentStory<typeof EnhancedTable> = (args) => (
  <ThemeProvider theme={customTheme}>
    <EnhancedTable {...args} />
  </ThemeProvider>
);

interface RowData1 extends Identible {
  name: StringCell;
  age: NumberCell;
}

const rows: RowData1[] = [
  {
    id: '1',
    name: { id: '2', value: 'John' },
    age: { id: '3', value: 37 }
  }
];

const headers: TableHeader<RowData1>[] = [
  {
    label: 'Name',
    tooltip: 'This is a tooltip',
    dataType: 'name',
    definition: StringColDef
  },
  {
    label: 'Age',
    dataType: 'age',
    definition: NumberColDef
  }
];
export const NoArgs = () => <EnhancedTable headers={headers} rows={rows} />;
NoArgs.storyName = 'Table component with all default values';

// export const OneLevelHeader = Template.bind({});
// interface OneLevelHeaderRowDef extends Identible {
//   name: string;
//   address: string;
// }
// const oneLevelHeaders: TableHeaders<OneLevelHeaderRowDef>[] = [
//   {
//     label: 'Name',
//     tooltip: 'This is a tooltip'
//   },
//   {
//     label: 'Address',
//     sortable: true
//   }
// ];
// OneLevelHeader.args = {
//   headers: oneLevelHeaders
// };
// OneLevelHeader.storyName = 'Table component with single level headers';

// export const HeaderGrouping = Template.bind({});
// const withSubheaders: TableHeaders[] = [
//   {
//     label: 'Header 1',
//     align: 'center',
//     subHeaders: [
//       {
//         label: 'Header 1.1',
//         align: 'center',
//         subHeaders: [
//           {
//             label: 'Header 1.1.1'
//           },
//           {
//             label: 'Header 1.1.2'
//           },
//           {
//             label: 'Header 1.1.3'
//           }
//         ]
//       },
//       {
//         label: 'Header 1.2',
//         align: 'center',
//         subHeaders: [
//           {
//             label: 'Header 1.2.1'
//           }
//         ]
//       }
//     ]
//   }
// ];
// HeaderGrouping.args = {
//   headers: withSubheaders
// };
// HeaderGrouping.storyName = 'Table component showing header grouping';

// export const CustomTheme = TemplateWithTheme.bind({});
// CustomTheme.args = {
//   headers: withSubheaders
// };
// CustomTheme.storyName = 'Table component with custom theme';

// export const MediumSizeTable = Template.bind({});
// MediumSizeTable.args = {
//   headers: withSubheaders,
//   tableSize: 'medium'
// };
// MediumSizeTable.storyName = 'Table component with medium size';
