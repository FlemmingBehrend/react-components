import * as React from 'react';
import CustomMuiTable from './custom-mui-table';
import { ColumnDef, createColumnHelper, filterFns } from '@tanstack/react-table';
import { BooleanCell } from './cell-types/boolean-cell';
import { StringCell } from './cell-types/string-cell';

export default {
  component: CustomMuiTable,
  title: 'CustomMuiTable'
};

const Template = (args) => <CustomMuiTable {...args} />;

//#region Default
type Person = {
  name: { href: string; target?: string; tooltip?: string; value: string };
  age: number;
  married?: boolean;
};
const defaultData: Person[] = [
  {
    name: { href: 'https://www.google.com', target: '_blank', tooltip: 'Google', value: 'John' },
    age: 24,
    married: true
  },
  {
    name: { href: 'https://www.google.com', target: '_blank', tooltip: 'Google', value: 'Jane' },
    age: 40,
    married: false
  },
  {
    name: { href: 'https://www.google.com', target: '_blank', tooltip: 'Google', value: 'Sam' },
    age: 45,
    married: true
  }
];
const columnHelper = createColumnHelper<Person>();
const columns = [
  columnHelper.group({
    id: 'persons',
    header: 'Persons',
    columns: [
      columnHelper.accessor('name', {
        header: () => 'Name',
        cell: StringCell,
        enableSorting: false,
        enableGlobalFilter: true
      }),
      columnHelper.accessor('age', {
        header: () => 'Age',
        cell: (info) => info.renderValue()
      }),
      columnHelper.accessor('married', {
        header: () => 'Married',
        // cell: (info) => BooleanCell(info, { imageMap: { true: 'Yes', false: 'No' } })
        cell: BooleanCell
      })
    ]
  })
];
export const Default = Template.bind({});
Default.args = {
  columns,
  data: defaultData,
  searchable: true,
  sortable: true,
  displayNumberOfRows: true,
  initialSort: { id: 'age', desc: false },
  initialSearch: ''
};
//#endregion
