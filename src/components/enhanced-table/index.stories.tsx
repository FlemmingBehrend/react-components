import React from 'react';
import { faker } from '@faker-js/faker';
import { Meta } from '@storybook/react';
import {
  Identible,
  StringCell,
  StringColDef,
  EnhancedTable,
  EnhancedTableHeader,
  NumberCell,
  NumberColDef,
  DateColDef,
  DateCell,
  BooleanColDef,
  BooleanCell,
  SparklineColDef,
  SparklineCell
} from './';
import { Grid, Theme, ThemeProvider, createTheme } from '@mui/material';
import { hash } from '../../hashing';
import { grey, common } from '@mui/material/colors';
import { CYAN, LIGHT_BLUE, EnhancedTableTheme, DARK } from './themes';

interface Factory {
  companyName?: string;
  companySuffix?: string;
  streetAddress?: string;
  buildingNumber?: number;
  country?: string;
  phoneNo?: string;
  valid?: boolean;
  department?: string;
  buildDate?: Date;
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
const FACTORY: Factory[] = faker.helpers.arrayElements(
  Array.from({ length: 10 }, () => createRandomFatory()),
  10
);

interface RowData extends Identible {
  companyName: StringCell;
  companySuffix: StringCell;
  streetAddress?: StringCell;
  buildingNumber?: NumberCell;
  country?: StringCell;
  phoneNo?: StringCell;
  valid?: BooleanCell;
  department?: StringCell;
  buildDate?: DateCell;
}

const headers: EnhancedTableHeader<RowData>[] = [
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
                definition: StringColDef,
                dataType: 'companyName',
                colspan: 1
              },
              {
                label: 'Suffix',
                tooltip: 'Suffix of the company',
                definition: { ...StringColDef, suffix: ' Inc.' },
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
                definition: StringColDef,
                dataType: 'streetAddress',
                colspan: 1
              },
              {
                label: 'No.',
                tooltip: 'Building number of the factory',
                definition: NumberColDef,
                dataType: 'buildingNumber',
                align: 'right',
                colspan: 1
              },
              {
                label: 'Country',
                tooltip: 'Country of the factory',
                definition: StringColDef,
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
                definition: StringColDef,
                dataType: 'phoneNo',
                colspan: 1
              },
              {
                label: 'Valid',
                tooltip: 'Validity of the factory',
                definition: BooleanColDef,
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
                definition: StringColDef,
                dataType: 'department',
                colspan: 1
              },
              {
                label: 'Build date',
                tooltip: 'Build date of the factory',
                definition: DateColDef,
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

const rows: RowData[] = FACTORY.map((factory) => {
  const id = `${hash(factory.companyName! + factory.companySuffix!)}`;
  return {
    id,
    companyName: { id, value: factory.companyName ?? 'N/A', tooltip: 'Company name' },
    companySuffix: { id, value: factory.companySuffix ?? 'N/A', tooltip: 'Company suffix' },
    streetAddress: {
      id,
      value: factory.streetAddress ?? 'N/A',
      tooltip: (
        <React.Fragment>
          <table>
            <tbody>
              <tr>
                <td>Street address</td>
                <td>{factory.streetAddress ?? 'N/A'}</td>
              </tr>
              <tr>
                <td>Building number</td>
                <td>{factory.buildingNumber ?? 0}</td>
              </tr>
            </tbody>
          </table>
        </React.Fragment>
      )
    },
    buildingNumber: { id, value: factory.buildingNumber ?? 0, tooltip: 'Building number' },
    country: {
      id,
      value: factory.country ?? 'N/A',
      href: 'https://www.google.com',
      target: '_blank',
      tooltip: 'Country'
    },
    phoneNo: { id, value: factory.phoneNo ?? 'N/A' },
    valid: { id, value: factory.valid ?? false, tooltip: 'Validity' },
    department: { id, value: factory.department ?? 'N/A' },
    buildDate: { id, value: factory.buildDate ?? new Date(), tooltip: 'Build date' }
  };
});

export default {
  title: 'EnhancedTable',
  component: EnhancedTable,
  argTypes: {
    rows: {
      control: {
        disable: true
      }
    },
    headers: {
      control: {
        disable: true
      }
    }
  }
} as Meta<typeof EnhancedTable>;

function chooseMode(mode: 'light' | 'dark', colorTheme: EnhancedTableTheme = LIGHT_BLUE): Theme {
  return createTheme({
    palette: {
      mode,
      primary: {
        main: mode === 'light' ? grey[500] : '#282a33'
      },
      background: {
        default: mode === 'light' ? common.white : '#22272e',
        paper: mode === 'light' ? common.white : '#282a33'
      }
    },
    enhancedTable: colorTheme
  });
}

export const DarkTemplate = (args) => (
  <ThemeProvider theme={chooseMode('dark', DARK)}>
    <EnhancedTable {...args} />
  </ThemeProvider>
);
DarkTemplate.args = {
  headers: headers as EnhancedTableHeader<Identible>[],
  rows,
  displayNumberOfRows: true,
  expandable: true,
  filterable: true,
  stripedRows: true,
  showHeaders: true
};
DarkTemplate.story = {
  name: 'Dark mode',
  parameters: {
    backgrounds: {
      default: 'dark'
    }
  }
};

export const LightBlueTemplate = (args) => (
  <ThemeProvider theme={chooseMode('light', LIGHT_BLUE)}>
    <EnhancedTable {...args} />
  </ThemeProvider>
);
LightBlueTemplate.args = {
  headers: headers as EnhancedTableHeader<Identible>[],
  columnWidths,
  rows,
  displayNumberOfRows: true,
  expandable: true,
  filterable: true,
  stripedRows: true,
  showHeaders: true
};
LightBlueTemplate.story = {
  name: 'Light blue theme',
  parameters: {
    backgrounds: {
      default: 'light'
    }
  }
};

export const LightCyanTemplate = (args) => (
  <Grid container>
    <Grid item xs={12}>
      <ThemeProvider theme={chooseMode('light', CYAN)}>
        <EnhancedTable {...args} />
      </ThemeProvider>
    </Grid>
  </Grid>
);
LightCyanTemplate.args = {
  headers: headers as EnhancedTableHeader<Identible>[],
  rows,
  displayNumberOfRows: true,
  expandable: true,
  filterable: true,
  stripedRows: true,
  showHeaders: true
};
LightCyanTemplate.story = {
  name: 'Cyan theme',
  parameters: {
    backgrounds: {
      default: 'light'
    }
  }
};

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

interface SimpleRowData extends Identible {
  name: StringCell;
  age: NumberCell;
  birthDate: DateCell;
  interval: SparklineCell;
  working: BooleanCell;
}

const simpleHeaders: EnhancedTableHeader<SimpleRowData>[] = [
  {
    label: 'Name',
    tooltip: 'Name of the user',
    definition: StringColDef,
    dataType: 'name',
    colspan: 1
  },
  {
    label: 'Age',
    tooltip: 'Age of the user',
    definition: NumberColDef,
    dataType: 'age',
    colspan: 1
  },
  {
    label: 'Birth date',
    tooltip: 'Birth date of the user',
    definition: DateColDef,
    dataType: 'birthDate',
    colspan: 1
  },
  {
    label: 'Interval',
    tooltip: 'Interval of random numbers',
    definition: SparklineColDef,
    dataType: 'interval',
    colspan: 1
  },
  {
    label: 'Working',
    tooltip: 'Is the user working?',
    definition: BooleanColDef,
    dataType: 'working',
    colspan: 1
  }
];

const simpleRows: SimpleRowData[] = USER.map((user) => {
  const id = `${hash(user.name! + user.age!)}`;
  return {
    id,
    name: { id, value: user.name },
    age: { id, value: user.age },
    birthDate: { id, value: user.birthDate, display: 'datetime' },
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
      tooltip: user.working ? 'The user is working' : 'The user is not working',
      href: 'https://www.google.com',
      target: '_blank'
    }
  };
});

export const SimpleTemplateLight = (args) => (
  <ThemeProvider theme={chooseMode('light')}>
    <EnhancedTable {...args} />
  </ThemeProvider>
);
SimpleTemplateLight.args = {
  headers: simpleHeaders as EnhancedTableHeader<Identible>[],
  rows: simpleRows,
  displayNumberOfRows: true,
  expandable: true,
  filterable: true,
  stripedRows: true,
  showHeaders: true
};
SimpleTemplateLight.story = {
  name: 'Simple table light',
  parameters: {
    backgrounds: {
      default: 'light'
    }
  }
};

const simpleTemplateDarkColWidth: Array<number | string> = ['auto', 80, 220, 100, 100];
export const SimpleTemplateDark = (args) => (
  <ThemeProvider theme={chooseMode('dark', DARK)}>
    <EnhancedTable {...args} />
  </ThemeProvider>
);
SimpleTemplateDark.args = {
  headers: simpleHeaders as EnhancedTableHeader<Identible>[],
  rows: simpleRows,
  columnWidths: simpleTemplateDarkColWidth,
  displayNumberOfRows: true,
  expandable: true,
  filterable: true,
  stripedRows: true,
  showHeaders: true
};
SimpleTemplateDark.story = {
  name: 'Simple table dark',
  parameters: {
    backgrounds: {
      default: 'dark'
    }
  }
};
