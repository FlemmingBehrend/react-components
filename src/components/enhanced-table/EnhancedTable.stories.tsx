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

interface User {
  userId?: string;
  username?: string;
  email?: string;
  website?: string;
  age?: number;
}

//👇 We create a “template” of how args map to rendering
const TemplateWithTheme: ComponentStory<typeof EnhancedTable> = (args) => (
  <ThemeProvider theme={customTheme}>
    <EnhancedTable {...args} />
  </ThemeProvider>
);

//**************************************************** Simple table *******************************************************/

function createRandomSimpleData(): User {
  return {
    userId: faker.datatype.uuid(),
    username: faker.internet.userName(),
    website: faker.internet.domainName(),
    age: faker.datatype.number({ min: 18, max: 99 })
  };
}
const SIMPLE_USER: User[] = faker.helpers.arrayElements(
  Array.from({ length: 15 }, () => createRandomSimpleData()),
  15
);

interface SimpleRowData extends Identible {
  name?: StringCell;
  website?: StringCell;
  age?: NumberCell;
}

const rows: SimpleRowData[] = SIMPLE_USER.map((user) => ({
  id: user.userId || 'N/A',
  name: { id: user.userId ?? 'N/A', value: user.username ?? 'N/A' },
  website: { id: user.userId ?? 'N/A', value: user.website ?? 'N/A' },
  age: { id: user.userId ?? 'N/A', value: user.age ?? 0 }
}));

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

// create 100 random users

function createRandomUser(): User {
  return {
    username: faker.internet.userName(),
    age: faker.datatype.number({ min: 18, max: 99 }),
    email: faker.internet.email(),
    userId: faker.datatype.uuid()
  };
}
const USERS: User[] = faker.helpers.arrayElements(
  Array.from({ length: 1000 }, () => createRandomUser()),
  1000
);

export const HeaderGrouping = TemplateWithTheme.bind({});
const withSubheaders: TableHeader<HeaderGroupingRowData>[] = [
  {
    label: 'User info',
    align: 'center',
    tooltip: 'Information about users',
    subHeaders: [
      {
        label: 'Person details',
        align: 'center',
        subHeaders: [
          {
            label: 'Username',
            dataType: 'username',
            definition: StringColDef
          },
          {
            label: 'Age',
            dataType: 'age',
            definition: { ...NumberColDef, suffix: ' years old' }
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
        align: 'center',
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
  id: user.userId ?? 'N/A',
  userId: { id: user.userId ?? 'N/A', value: user.userId ?? 'N/A' },
  username: { id: user.userId ?? 'N/A', value: user.username ?? 'N/A' },
  email: { id: user.userId ?? 'N/A', value: user.email ?? 'N/A' },
  age: { id: user.userId ?? 'N/A', value: user.age ?? 0 }
}));

HeaderGrouping.args = {
  headers: withSubheaders,
  rows: headerGroupingRows,
  stripedRows: true,
  filterable: true,
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
