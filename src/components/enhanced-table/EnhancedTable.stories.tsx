import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import EnhancedTable, { NumberCell, NumberColDef, StringCell, StringColDef } from './';
import { TableHeader } from './table/header-definitions';
import { Identible } from './table/cell-types/cell-definitions';
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
    name: { id: '11', value: 'John' },
    age: { id: '12', value: 37 }
  },
  {
    id: '2',
    name: { id: '21', value: 'Max' },
    age: { id: '22', value: 45 }
  }
];

// const headers: TableHeader<RowData1>[] = [
//   {
//     label: 'Persons',
//     tooltip: 'This is a tooltip for header',
//     subHeaders: [
//       {
//         label: 'Name',
//         tooltip: 'This is a tooltip',
//         dataType: 'name',
//         definition: StringColDef
//       },
//       {
//         label: 'Age',
//         dataType: 'age',
//         definition: NumberColDef
//       }
//     ]
//   }
// ];
// export const NoArgs = () => <EnhancedTable headers={headers} rows={rows} />;
// NoArgs.storyName = 'Table component with all default values';

// export const OneLevelHeader = TemplateWithTheme.bind({});
// interface OneLevelHeaderRowDef extends Identible {
//   name: string;
//   address: string;
// }
// const oneLevelHeaders: TableHeader<OneLevelHeaderRowDef>[] = [
//   {
//     label: 'Name',
//     tooltip: 'This is a tooltip',
//     definition: StringColDef,
//     dataType: 'name'
//   },
//   {
//     label: 'Address',
//     definition: StringColDef,
//     dataType: 'address'
//   }
// ];
// OneLevelHeader.args = {
//   headers: oneLevelHeaders
// };
// OneLevelHeader.storyName = 'Table component with single level headers';

//**************************************************** Multiple Sub headers *******************************************************/
export const HeaderGrouping = TemplateWithTheme.bind({});
const withSubheaders: TableHeader<HeaderGroupingRowData>[] = [
  {
    label: 'Header 1',
    tooltip: 'This is a tooltip for header',
    subHeaders: [
      {
        label: 'Header 1.1',
        subHeaders: [
          {
            label: 'Header 1.1.1',
            dataType: 'cell1',
            definition: StringColDef
          },
          {
            label: 'Header 1.1.2',
            dataType: 'cell2',
            definition: NumberColDef
          },
          {
            label: 'Header 1.1.3',
            dataType: 'cell3',
            definition: StringColDef
          }
        ]
      },
      {
        label: 'Header 1.2',
        subHeaders: [
          {
            label: 'Header 1.2.1',
            dataType: 'cell4',
            definition: StringColDef
          }
        ]
      }
    ]
  }
];

interface HeaderGroupingRowData extends Identible {
  cell1: StringCell;
  cell2: NumberCell;
  cell3: StringCell;
  cell4: StringCell;
}

const headerGroupingRows: HeaderGroupingRowData[] = [
  {
    id: '1',
    cell1: { id: '11', value: 'Cell 1/1' },
    cell2: { id: '12', value: 37 },
    cell3: { id: '13', value: 'Cell 2/1' },
    cell4: { id: '14', value: 'Cell 3/1' }
  },
  {
    id: '2',
    cell1: { id: '11', value: 'Cell 1/2' },
    cell2: { id: '12', value: 38 },
    cell3: { id: '13', value: 'Cell 2/2' },
    cell4: { id: '14', value: 'Cell 3/2' }
  }
];

HeaderGrouping.args = {
  headers: withSubheaders,
  rows: headerGroupingRows
};
HeaderGrouping.storyName = 'Table component showing header grouping';
//**************************************************** Multiple Sub headers *******************************************************/

//**************************************************** Medium table *******************************************************/
export const mediumTableTheme = TemplateWithTheme.bind({});
interface MediumTableRowData extends Identible {
  cell1: StringCell;
  cell2: NumberCell;
}
const mediumTable: TableHeader<MediumTableRowData>[] = [
  {
    label: 'Header 1',
    tooltip: 'This is a tooltip for header',
    dataType: 'cell1',
    definition: StringColDef
  },
  {
    label: 'Header 2',
    dataType: 'cell2',
    definition: NumberColDef
  }
];
const mediumTableRows: MediumTableRowData[] = [
  {
    id: '1',
    cell1: { id: '11', value: 'Cell 1/1' },
    cell2: { id: '12', value: 37 }
  },
  {
    id: '2',
    cell1: { id: '11', value: 'Cell 1/2' },
    cell2: { id: '12', value: 38 }
  }
];
mediumTableTheme.args = {
  headers: mediumTable,
  rows: mediumTableRows
};
mediumTableTheme.storyName = 'Medium size table';
//**************************************************** Medium table *******************************************************/
