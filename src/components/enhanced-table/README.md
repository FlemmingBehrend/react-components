# Enhanced Table

The enhanced table is a wrapper around the [Material UI Table](https://material-ui.com/components/tables/) component. It provides a number of features that are not available in the base component, including:

- Sorting
- Filtering
- ...

## Usage

- theme

Example:

```typescript
import React from 'react';
import EnhancedTable, { NumberCell, NumberColDef, StringCell, StringColDef } from 'react-components';

// Every table is based on a data definition.
// This data definition describes what data is shown in the table and is
// associated with a cell renderer that known how to render the data,
// how to filter it, and how to sort it.
interface DataDefinition {
  name: StringCell;
  age: NumberCell;
}

// Headers in the table are defined by a label, a data type and a data definition.
// The data type is used to associate the header with a data definition.
// The definition points to an object with the column definition for the data type.
const headers: TableHeader<DataDefinition>[] = [
  { label: 'Name', dataType: 'name', definition: StringColDef },
  { label: 'Age', dataType: 'age', definition: NumberColDef }
];

// The data for the table is an array of objects that match the data definition.
const rows: DataDefinition[] = [
  {
    id: '1',
    name: { id: '2', value: 'John' },
    age: { id: '3', value: 37 }
  }
];
```
