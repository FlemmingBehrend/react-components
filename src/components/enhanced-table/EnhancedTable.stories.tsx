import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import EnhancedTable, { NumberCell, NumberColDef, StringCell, StringColDef } from './';
import { TableHeader } from './table/header-definitions';
import { ColDef, Identible } from './table/cell-types/cell-definitions';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { common, green } from '@mui/material/colors';
import { Typography } from '@mui/material';
import { faker } from '@faker-js/faker';

export default {
  title: 'EnhancedTable',
  component: EnhancedTable
} as ComponentMeta<typeof EnhancedTable>;

const customTheme = createTheme({
  enhancedTable: {
    numberOfRowColor: green[100],
    headers: {
      backgroundColor: green[400],
      fontWeight: 'bold',
      fontColor: common.white
    }
  }
});

//👇 We create a “template” of how args map to rendering
const TemplateWithTheme: ComponentStory<typeof EnhancedTable> = (args) => (
  <ThemeProvider theme={customTheme}>
    <EnhancedTable {...args} />
  </ThemeProvider>
);

//**************************************************** Simple table *******************************************************/
interface SimpleRowData extends Identible {
  name: StringCell;
  website: StringCell;
  age: NumberCell;
}

const rows: SimpleRowData[] = [
  {
    id: '1',
    name: { id: '11', value: 'John', tooltip: 'This is Johns name' },
    website: { id: '12', value: 'dr', tooltip: 'This is Johns website', href: 'https://www.dr.dk', target: '_top' },
    age: { id: '12', value: 55 }
  },
  {
    id: '2',
    name: { id: '21', value: 'Max', tooltip: 'This is Maxs name' },
    website: { id: '12', value: 'tv2', tooltip: 'This is Max website', href: 'https://www.tv2.dk' },
    age: { id: '22', value: 44, tooltip: 'This is Max age', href: 'https://www.tv2.dk' }
  },
  {
    id: '3',
    name: {
      id: '31',
      value: 'Oliver',
      tooltip: (
        <React.Fragment>
          <Typography color="yellow">Tooltip with HTML</Typography>
        </React.Fragment>
      )
    },
    website: {
      id: '12',
      value: 'google',
      tooltip: 'This is Olivers website',
      href: 'https://www.google.com',
      target: '_parent'
    },
    age: { id: '32', value: 33 }
  }
];

const simpleTableHeaders: TableHeader<SimpleRowData>[] = [
  {
    label: 'Name',
    tooltip: 'This is a name header tooltip',
    dataType: 'name',
    definition: StringColDef
  },
  {
    label: 'Website',
    tooltip: 'This is a website header tooltip',
    dataType: 'website',
    definition: StringColDef
  },
  {
    label: 'Age',
    tooltip: 'Age of the person',
    dataType: 'age',
    definition: { ...NumberColDef, sortable: true, suffix: ' years old' }
  }
];
export const SimpleTable = () => (
  <EnhancedTable headers={simpleTableHeaders} rows={rows} stripedRows={true} filterable={false} showHeaders={false} />
);
SimpleTable.storyName = 'Simple table';
//**************************************************** Simple table *******************************************************/

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
interface User {
  userId: string;
  username: string;
  email: string;
  age: number;
}

export function createRandomUser(): User {
  return {
    username: faker.internet.userName(),
    age: faker.datatype.number({ min: 18, max: 99 }),
    email: faker.internet.email(),
    userId: faker.datatype.uuid()
  };
}

export const USERS: User[] = faker.helpers.arrayElements(
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => createRandomUser()),
  10
);

export const HeaderGrouping = TemplateWithTheme.bind({});
const withSubheaders: TableHeader<HeaderGroupingRowData>[] = [
  {
    label: 'User info',
    tooltip: 'Information about users',
    subHeaders: [
      {
        label: 'Person details',
        subHeaders: [
          {
            label: 'Username',
            dataType: 'username',
            definition: { ...StringColDef, align: 'center' }
          },
          {
            label: 'Age',
            dataType: 'age',
            definition: NumberColDef
          },
          {
            label: 'Email',
            dataType: 'email',
            definition: StringColDef
          }
        ]
      },
      {
        label: 'System details',
        subHeaders: [
          {
            label: 'User id',
            dataType: 'userId',
            definition: StringColDef
          }
        ]
      }
    ]
  }
];

interface HeaderGroupingRowData extends Identible {
  userId: StringCell;
  username: StringCell;
  email: StringCell;
  age: NumberCell;
}

const headerGroupingRows: HeaderGroupingRowData[] = USERS.map((user) => ({
  id: user.userId,
  userId: { id: user.userId, value: user.userId },
  username: { id: user.userId, value: user.username },
  email: { id: user.userId, value: user.email },
  age: { id: user.userId, value: user.age }
}));

HeaderGrouping.args = {
  headers: withSubheaders,
  rows: headerGroupingRows,
  stripedRows: true,
  filterable: false,
  tableSize: 'small'
};
HeaderGrouping.storyName = 'Table component showing header grouping';
//**************************************************** Multiple Sub headers *******************************************************/

// //**************************************************** Medium table *******************************************************/
// export const mediumTableTheme = TemplateWithTheme.bind({});
// interface MediumTableRowData extends Identible {
//   cell1: StringCell;
//   cell2: NumberCell;
// }
// const mediumTable: TableHeader<MediumTableRowData>[] = [
//   {
//     label: 'Header 1',
//     tooltip: 'This is a tooltip for header',
//     dataType: 'cell1',
//     definition: StringColDef
//   },
//   {
//     label: 'Header 2',
//     dataType: 'cell2',
//     definition: NumberColDef
//   }
// ];
// const mediumTableRows: MediumTableRowData[] = [
//   {
//     id: '1',
//     cell1: { id: '11', value: 'Cell 1/1' },
//     cell2: { id: '12', value: 37 }
//   },
//   {
//     id: '2',
//     cell1: { id: '11', value: 'Cell 1/2' },
//     cell2: { id: '12', value: 38 }
//   }
// ];
// mediumTableTheme.args = {
//   headers: mediumTable,
//   rows: mediumTableRows
// };
// mediumTableTheme.storyName = 'Medium size table';
// //**************************************************** Medium table *******************************************************/
