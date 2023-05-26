import * as React from 'react';
import { CustomMuiTable, Cell, StringCell, stringComparator, BooleanCell, booleanComparator, NumberCell } from './';
import { ColumnDef, Row, createColumnHelper, filterFns, sortingFns } from '@tanstack/react-table';
import { numberComparator } from './cell-types/number-cell';

export default {
  component: CustomMuiTable,
  title: 'CustomMuiTable'
};

const Template = (args) => <CustomMuiTable {...args} />;

//#region Default
type Person = {
  name: Cell<string>;
  age: Cell<number>;
  married?: Cell<boolean>;
};

const defaultData: Person[] = [
  {
    name: {
      tooltip: 'John',
      value: 'John fdsfdsfds f dsf dsfdsf fds fsd fds fds fdssdf dsf '
    },
    age: { value: 24 },
    married: { value: true, tooltip: 'Married', href: 'https://www.google.com', target: '_blank' }
  },
  {
    name: { href: 'https://www.google.com', target: '_blank', tooltip: 'Google', value: 'Charlie' },
    age: { value: 40, tooltip: '40 years old' },
    married: { value: false, tooltip: 'Not Married' }
  },
  {
    name: { href: 'https://www.google.com', target: '_blank', tooltip: 'Google', value: 'Sam' },
    age: { value: 45 },
    married: { value: true, tooltip: 'Married' }
  }
];
const columnHelper = createColumnHelper<Person>();

const columns = [
  columnHelper.group({
    id: 'persons',
    header: (h) => {
      return 'Persons';
    },
    columns: [
      columnHelper.accessor('name', {
        header: () => 'Name',
        cell: StringCell,
        sortingFn: stringComparator
      }),
      columnHelper.accessor('age', {
        header: () => 'Age',
        cell: NumberCell,
        sortingFn: numberComparator
      }),
      columnHelper.accessor('married', {
        header: () => 'Married',
        // cell: (info) => booleanCell(info, { imageMap: { true: 'Yes', false: 'No' } }),
        cell: BooleanCell,
        sortingFn: booleanComparator
      })
    ]
  })
];
export const Default = Template.bind({});
Default.args = {
  columns,
  columnsWidth: ['300px', 100],
  data: defaultData,
  searchable: true,
  sortable: true,
  displayNumberOfRows: true,
  initialSort: { id: 'age', desc: false },
  initialSearch: '',
  size: 'small',
  headerFontSize: 12,
  columnFontSize: '0.875rem'
};
//#endregion
