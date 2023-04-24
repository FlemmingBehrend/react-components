import * as React from 'react';
import { faker } from '@faker-js/faker';
import { Identible } from '../table/cell/types/identible';
import { StringCell } from '../table/cell/string-cell';
import { NumberCell } from '../table/cell/number-cell';
import { DateCell } from '../table/cell/date-cell';
import { SparklineCell } from '../table/cell/sparkeline-cell';
import { BooleanCell } from '../table/cell/boolean-cell';
import { ThemeProvider } from '@mui/material';
import EnhancedTable from '../enhanced-table';
import { chooseMode } from './mode-helper';
import { EnhancedTableHeader } from '../table/header/header-options';
import { stringColumnDefaults } from '../table/column/string-column';
import { numberColumnDefaults } from '../table/column/number-column';
import { dateColumnDefaults } from '../table/column/date-column';
import { sparklineColumnDefaults } from '../table/column/sparkline-column';
import { booleanColumnDefaults } from '../table/column/boolean-column';

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

const user: User[] = faker.helpers.arrayElements(
  Array.from({ length: 200 }, () => createRandomUser()),
  200
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
    columnOptions: stringColumnDefaults,
    dataType: 'name',
    colspan: 1
  },
  {
    label: 'Age',
    tooltip: 'This is an example of a number cell',
    columnOptions: numberColumnDefaults,
    dataType: 'age',
    colspan: 1
  },
  {
    label: 'Birth date',
    tooltip: 'This is an example of a date cell',
    columnOptions: dateColumnDefaults,
    dataType: 'birthDate',
    colspan: 1
  },
  {
    label: 'Interval',
    tooltip: 'This is an example of a sparkline cell',
    columnOptions: sparklineColumnDefaults,
    dataType: 'interval',
    colspan: 1
  },
  {
    label: 'Working',
    tooltip: 'This is an example of a boolean cell',
    columnOptions: booleanColumnDefaults,
    dataType: 'working',
    colspan: 1
  }
];

const simpleRows: RowData[] = user.map((user) => {
  const id = crypto.randomUUID();
  return {
    id,
    name: { value: user.name },
    age: { value: user.age },
    birthDate: { value: user.birthDate, display: 'date' },
    interval: {
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
  displayNumberOfRows: true,
  expandable: false,
  filterable: true,
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
