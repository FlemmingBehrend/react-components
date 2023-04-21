import * as React from 'react';
import { faker } from '@faker-js/faker';
import { Identible } from '../table/cells/types/identible';
import { StringCell, StringColDef } from '../table/cells/string-cell';
import { NumberCell, NumberColDef } from '../table/cells/number-cell';
import { DateCell, DateColDef } from '../table/cells/date-cell';
import { SparklineCell, SparklineColDef } from '../table/cells/sparkeline-cell';
import { BooleanCell, BooleanColDef } from '../table/cells/boolean-cell';
import { EnhancedTableHeader } from '../table/header-definitions';
import { ThemeProvider } from '@mui/material';
import EnhancedTable from '../enhanced-table';
import { chooseMode } from './mode-helper';

interface User {
  name: string;
  age: number;
  birthDate: Date;
  interval: number[];
  working: boolean;
}

function createRandomUser(): User {
  const age = faker.datatype.number({ min: 18, max: 85 });
  return {
    name: faker.name.firstName() + ' ' + faker.name.lastName(),
    age,
    birthDate: faker.date.past(),
    interval: [
      faker.datatype.number({ min: 0, max: 100 }),
      faker.datatype.number({ min: 0, max: 100 }),
      faker.datatype.number({ min: 0, max: 100 }),
      faker.datatype.number({ min: 0, max: 100 }),
      faker.datatype.number({ min: 0, max: 100 }),
      faker.datatype.number({ min: 0, max: 100 }),
      faker.datatype.number({ min: 0, max: 100 }),
      faker.datatype.number({ min: 0, max: 100 }),
      faker.datatype.number({ min: 0, max: 100 }),
      faker.datatype.number({ min: 0, max: 100 })
    ],
    working: age > 18 && age < 65
  };
}

const USER: User[] = faker.helpers.arrayElements(
  Array.from({ length: 10 }, () => createRandomUser()),
  10
);

interface RowData extends Identible {
  name: StringCell;
  age: NumberCell;
  birthDate: DateCell;
  interval: SparklineCell;
  working: BooleanCell;
}

const headers: EnhancedTableHeader<RowData>[] = [
  {
    label: 'Name',
    tooltip: 'This is an example of a string cell',
    colDef: StringColDef,
    dataType: 'name',
    colspan: 1
  },
  {
    label: 'Age',
    tooltip: 'This is an example of a number cell',
    colDef: NumberColDef,
    dataType: 'age',
    colspan: 1
  },
  {
    label: 'Birth date',
    tooltip: 'This is an example of a date cell',
    colDef: DateColDef,
    dataType: 'birthDate',
    colspan: 1
  },
  {
    label: 'Interval',
    tooltip: 'This is an example of a sparkline cell',
    colDef: SparklineColDef,
    dataType: 'interval',
    colspan: 1
  },
  {
    label: 'Working',
    tooltip: 'This is an example of a boolean cell',
    colDef: BooleanColDef,
    dataType: 'working',
    colspan: 1
  }
];

const simpleRows: RowData[] = USER.map((user) => {
  const id = crypto.randomUUID();
  return {
    id,
    name: { id, value: user.name },
    age: { id, value: user.age },
    birthDate: { id, value: user.birthDate, display: 'date' },
    interval: {
      id,
      value: user.interval,
      heigth: 15,
      width: 100,
      tooltip: (
        <div>
          <div>
            Max value: <strong>{Math.max(...user.interval)}</strong>
          </div>
          <div>
            Min value: <strong>{Math.min(...user.interval)}</strong>
          </div>
          <div>
            Avg value: <strong>{user.interval.reduce((a, b) => a + b, 0) / user.interval.length}</strong>
          </div>
        </div>
      )
    },
    working: {
      id,
      value: user.working,
      tooltip: user.working ? 'The user is working' : 'The user is to old to work',
      href: 'https://www.google.com',
      target: '_blank'
    }
  };
});

export const ColumnTypes = (args: any) => (
  <ThemeProvider theme={chooseMode('light')}>
    <EnhancedTable {...args} />
  </ThemeProvider>
);
ColumnTypes.args = {
  headers: headers,
  rows: simpleRows,
  displayNumberOfRows: false,
  expandable: false,
  filterable: false,
  stripedRows: true,
  showHeaders: true
};
ColumnTypes.story = {
  parameters: {
    backgrounds: {
      default: 'light'
    }
  }
};
