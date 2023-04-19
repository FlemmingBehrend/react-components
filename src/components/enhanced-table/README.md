# Enhanced Table

The enhanced table is a wrapper around the [Material UI Table](https://material-ui.com/components/tables/) component. It provides a number of features that are not available in the base component.

## Usage

This is the basic usage of the enhanced table. It shows a table with two columns and two rows.

```typescript
import React from 'react';
import EnhancedTable, { Identible, NumberCell, NumberColDef, StringCell, StringColDef } from 'react-components';

// Hardcoded data for the table, these would normally be fetched from a server.
interface User {
  name: string;
  age: number;
}
const rows: User[] = [
  { name: 'John', age: 37 },
  { name: 'Jane', age: 32 }
];

// Every table is based on a data definition interface that extends
// from [Identible](/src/components/enhanced-table/table/cells/types/identible.ts) and
// describes a row in the table.
interface DataDefinition extends Identible {
  name: StringCell;
  age: NumberCell;
}

// Headers in the table are linked to the data definition by the dataType property.
//
const headers: TableHeader<DataDef>[] = [
  { label: 'Name', dataType: 'name', definition: StringColDef },
  { label: 'Age', dataType: 'age', definition: NumberColDef }
];

// The data for the table is an array of objects that match the data definition.
const rows: DataDefinition[] = [
  {
    id: '1',
    name: { id: '2', value: 'John' },
    age: { id: '3', value: 37 }
  },
  {
    id: '4',
    name: { id: '5', value: 'Jane' },
    age: { id: '6', value: 32 }
  }
];
```
