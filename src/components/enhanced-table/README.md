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
