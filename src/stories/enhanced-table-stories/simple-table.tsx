import React from 'react';
import { faker } from '@faker-js/faker';
import {
  Identible,
  NumberCell,
  StringCell,
  EnhancedTableHeader,
  StringColDef,
  NumberColDef,
  EnhancedTable
} from '../../components';
import { EnhancedTableProps } from '../../components/enhanced-table/enhanced-table';

interface User {
  userId?: string;
  username?: string;
  email?: string;
  website?: string;
  age?: number;
}

function createRandomSimpleData(): User {
  return {
    userId: faker.datatype.uuid(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    website: faker.internet.domainName(),
    age: faker.datatype.number({ min: 18, max: 99 })
  };
}
const SIMPLE_USER: User[] = faker.helpers.arrayElements(
  Array.from({ length: 15 }, () => createRandomSimpleData()),
  15
);

interface SimpleRowData extends Identible {
  userId: StringCell;
  username: StringCell;
  website: StringCell;
  email: StringCell;
  age: NumberCell;
}

const rows: SimpleRowData[] = SIMPLE_USER.map((user) => ({
  id: user.userId || 'N/A',
  userId: { id: user.userId ?? 'N/A', value: user.userId ?? 'N/A' },
  username: { id: user.username ?? 'N/A', value: user.username ?? 'N/A' },
  website: { id: user.website ?? 'N/A', value: user.website ?? 'N/A' },
  email: { id: user.email ?? 'N/A', value: user.email ?? 'N/A' },
  age: { id: `${user.age}` ?? 'N/A', value: user.age ?? 0 }
}));

const headers: EnhancedTableHeader<SimpleRowData>[] = [
  {
    label: 'Id',
    dataType: 'userId',
    definition: StringColDef
  },
  {
    label: 'Name',
    tooltip: 'This is a name header tooltip',
    dataType: 'username',
    definition: StringColDef
  },
  {
    label: 'Email',
    dataType: 'email',
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

export const simpleTableNoHeader = () => (
  <EnhancedTable
    headers={headers}
    rows={rows}
    stripedRows={true}
    filterable={false}
    showHeaders={false}
    initialSortColumn="age"
    initialSortDirection="asc"
  />
);
simpleTableNoHeader.storyName = 'Simple table (no header or filtering)';

export const defaultTable = (props: EnhancedTableProps<User>) => (
  <EnhancedTable {...props} rows={rows} headers={headers} />
);
defaultTable.storyName = 'default table';
