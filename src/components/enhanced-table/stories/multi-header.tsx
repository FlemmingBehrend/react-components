import * as React from 'react';
import { faker } from '@faker-js/faker';
import { Identible } from '../table/cell/types/identible';
import { StringCell } from '../table/cell/string-cell';
import { NumberCell } from '../table/cell/number-cell';
import { BooleanCell } from '../table/cell/boolean-cell';
import { DateCell } from '../table/cell/date-cell';
import { chooseMode } from './mode-helper';
import { ThemeProvider } from '@mui/material';
import EnhancedTable from '../enhanced-table';
import { EnhancedTableHeader } from '../table/header/header-options';
import { stringColumnDefaults } from '../table/column/string-column';
import { numberColumnDefaults } from '../table/column/number-column';
import { booleanColumnDefaults } from '../table/column/boolean-column';
import { dateColumnDefaults } from '../table/column/date-column';

interface Factory {
  companyName: string;
  companySuffix: string;
  streetAddress: string;
  buildingNumber: number;
  country: string;
  phoneNo: string;
  valid: boolean;
  department: string;
  buildDate: Date;
}

function createRandomFatory(): Factory {
  return {
    companyName: faker.company.name(),
    companySuffix: faker.company.companySuffix(),
    streetAddress: faker.address.streetAddress(),
    buildingNumber: Number(faker.address.buildingNumber()),
    country: faker.address.country(),
    phoneNo: faker.phone.number(),
    valid: faker.datatype.boolean(),
    department: faker.commerce.department(),
    buildDate: faker.date.past()
  };
}

const factories: Factory[] = faker.helpers.arrayElements(
  Array.from({ length: 10 }, () => createRandomFatory()),
  10
);

interface RowDef extends Identible {
  companyName: StringCell;
  companySuffix: StringCell;
  streetAddress: StringCell;
  buildingNumber: NumberCell;
  country: StringCell;
  phoneNo: StringCell;
  valid: BooleanCell;
  department: StringCell;
  buildDate: DateCell;
}

const headers: EnhancedTableHeader<RowDef>[] = [
  {
    label: 'Factory details',
    align: 'center',
    tooltip: 'Information about factories',
    colspan: 9,
    subHeaders: [
      {
        label: 'Name and address',
        align: 'center',
        tooltip: 'Name and address of the factory',
        colspan: 5,
        subHeaders: [
          {
            label: 'Company',
            align: 'center',
            tooltip: 'Name of the factory',
            colspan: 2,
            subHeaders: [
              {
                label: 'Name',
                tooltip: 'Name of the company',
                columnOptions: stringColumnDefaults,
                dataType: 'companyName',
                colspan: 1
              },
              {
                label: 'Suffix',
                tooltip: 'Suffix of the company',
                columnOptions: stringColumnDefaults,
                dataType: 'companySuffix',
                colspan: 1
              }
            ]
          },
          {
            label: 'Address',
            align: 'center',
            tooltip: 'Address of the factory',
            colspan: 3,
            subHeaders: [
              {
                label: 'Street address',
                tooltip: 'Street address of the factory',
                columnOptions: stringColumnDefaults,
                dataType: 'streetAddress',
                colspan: 1
              },
              {
                label: 'No.',
                tooltip: 'Building number of the factory',
                columnOptions: numberColumnDefaults,
                dataType: 'buildingNumber',
                align: 'right',
                colspan: 1
              },
              {
                label: 'Country',
                tooltip: 'Country of the factory',
                columnOptions: stringColumnDefaults,
                dataType: 'country',
                colspan: 1
              }
            ]
          }
        ]
      },
      {
        label: 'Other details',
        align: 'center',
        tooltip: 'Other details of the factory',
        colspan: 4,
        subHeaders: [
          {
            label: 'Contact details',
            align: 'center',
            tooltip: 'Contact details of the factory',
            colspan: 2,
            subHeaders: [
              {
                label: 'Phone no.',
                tooltip: 'Phone number of the factory',
                columnOptions: stringColumnDefaults,
                dataType: 'phoneNo',
                colspan: 1
              },
              {
                label: 'Valid',
                tooltip: 'Validity of the factory',
                columnOptions: booleanColumnDefaults,
                dataType: 'valid',
                colspan: 1
              }
            ]
          },
          {
            label: 'Department information',
            align: 'center',
            tooltip: 'Department information of the factory',
            colspan: 2,
            subHeaders: [
              {
                label: 'Name',
                tooltip: 'Name of the factory',
                columnOptions: stringColumnDefaults,
                dataType: 'department',
                colspan: 1
              },
              {
                label: 'Build date',
                tooltip: 'Build date of the factory',
                columnOptions: dateColumnDefaults,
                dataType: 'buildDate',
                colspan: 1
              }
            ]
          }
        ]
      }
    ]
  }
];

const columnWidths: Array<number | string> = ['auto', 120, 160, 80, 120, 180, 70, 100, 120];

const rows: RowDef[] = factories.map((factory) => {
  const id = crypto.randomUUID();
  return {
    id,
    companyName: { value: factory.companyName, tooltip: 'Company name' },
    companySuffix: { value: factory.companySuffix, tooltip: 'Company suffix' },
    streetAddress: {
      value: factory.streetAddress,
      tooltip: (
        <React.Fragment>
          <table>
            <tbody>
              <tr>
                <td>Street address</td>
                <td>{factory.streetAddress}</td>
              </tr>
              <tr>
                <td>Building number</td>
                <td>{factory.buildingNumber}</td>
              </tr>
            </tbody>
          </table>
        </React.Fragment>
      )
    },
    buildingNumber: { value: factory.buildingNumber, tooltip: 'Building number' },
    country: {
      value: factory.country,
      href: 'https://www.google.com',
      target: '_blank',
      tooltip: 'Country'
    },
    phoneNo: { value: factory.phoneNo },
    valid: { value: factory.valid, tooltip: 'Validity' },
    department: { value: factory.department },
    buildDate: { value: factory.buildDate, tooltip: 'Build date' }
  };
});

export const MultiHeader = (args: any) => (
  <ThemeProvider theme={chooseMode('light')}>
    <EnhancedTable {...args} />
  </ThemeProvider>
);
MultiHeader.args = {
  headers,
  rows,
  columnWidths,
  displayNumberOfRows: true,
  expandable: true,
  filterable: true,
  stripedRows: true,
  showHeaders: true
};
MultiHeader.story = {
  parameters: {
    backgrounds: {
      default: 'light'
    }
  }
};
