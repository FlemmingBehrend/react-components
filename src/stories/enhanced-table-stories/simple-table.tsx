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

const simpleTableHeaders: EnhancedTableHeader<SimpleRowData>[] = [
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

export const simpleTableNoHeader = () => (
  <EnhancedTable
    headers={simpleTableHeaders}
    rows={rows}
    stripedRows={true}
    filterable={false}
    showHeaders={false}
    initialSortColumn="age"
    initialSortDirection="asc"
  />
);
simpleTableNoHeader.storyName = 'Simple table (no header or filtering)';

export const defaultTable = () => <EnhancedTable headers={simpleTableHeaders} rows={rows} />;
defaultTable.storyName = 'default table';
