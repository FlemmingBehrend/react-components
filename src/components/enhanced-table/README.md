# Enhanced Table

The enhanced table is a wrapper around the [Material UI Table](https://material-ui.com/components/tables/) component. It provides a number of features that are not available in the base component.

## Usage

This is the basic usage of the enhanced table. It shows a table with two columns and two rows.

Import are left out of the example for brevity.

```typescript
// Create an interface that extends Idenfible with the data types for the table.
interface Data extends Identible {
  animal: StringCell;
  age: NumberCell;
}

// Create the rows for the table.
const rows: Data[] = [
  { id: '1', animal: { value: 'Dog' }, age: { value: 5 } },
  { id: '2', animal: { value: 'Cat' }, age: { value: 3 } }
];

// Create the headers for the table.
const headers: EnhancedTableHeader<Data>[] = [
  { dataType: 'animal', label: 'Animal', columnOptions: stringColumnDefaults },
  { dataType: 'age', label: 'Age', align: 'right', columnOptions: numberColumnDefaults }
];

// Render the table.
<EnhancedTable headers={headers} rows={rows} />;
```

The table can take a number of props to customize the table. The following table shows the props that can be passed to the table.
All props except for `headers` and `rows` are optional.

| Prop                   | Type                         | Default   | Description                                               |
| ---------------------- | ---------------------------- | --------- | --------------------------------------------------------- |
| `headers`              | EnhancedTableHeader[]        | N/A       | The headers for the table.                                |
| `rows`                 | Data[]                       | N/A       | The rows for the table.                                   |
| `columnWidths`         | number[] \| string[]         | `auto`    | The widths of the columns.                                |
| `showHeaders`          | boolean                      | `true`    | Show the table headers.                                   |
| `initialSortColumn`    | keyof Data                   | undefined | The column to sort on initially.                          |
| `initialSortDirection` | 'asc' \| 'desc' \| undefined | undefined | The direction to sort initially.                          |
| `filterable`           | boolean                      | `true`    | Enable filtering.                                         |
| `stripedRows`          | boolean                      | `false`   | Enable striped rows.                                      |
| `tableSize`            | 'small' \| 'medium'          | `medium`  | The size of the table.                                    |
| `displayNumberOfRows`  | boolean                      | `true`    | Display the number of rows currently visible in the table |
| `expandable`           | boolean                      | `false`   | Enable expandable rows.                                   |

## Features

### Sorting
