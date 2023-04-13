import React from 'react';
import { faker } from '@faker-js/faker';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Identible, StringCell, StringColDef, EnhancedTable, EnhancedTableHeader, NumberCell, NumberColDef } from './';
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
  department?: string;
  buildDate?: string;
}

function createRandomFatory(): Factory {
  return {
    companyName: faker.company.name(),
    companySuffix: faker.company.companySuffix(),
    streetAddress: faker.address.streetAddress(),
    buildingNumber: Number(faker.address.buildingNumber()),
    country: faker.address.country(),
    phoneNo: faker.phone.number(),
    department: faker.commerce.department(),
    buildDate: faker.date.past().toLocaleDateString()
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
  department?: StringCell;
  buildDate?: StringCell;
}

const headers: EnhancedTableHeader<RowData>[] = [
  {
    label: 'Factory details',
    align: 'center',
    tooltip: 'Information about factories',
    colspan: 8,
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
        colspan: 3,
        subHeaders: [
          {
            label: 'Contact details',
            align: 'center',
            tooltip: 'Contact details of the factory',
            colspan: 1,
            subHeaders: [
              {
                label: 'Phone no.',
                tooltip: 'Phone number of the factory',
                definition: StringColDef,
                dataType: 'phoneNo',
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
                definition: StringColDef,
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

const columnWidths: Array<number | string> = ['auto', 120, 160, 80, 120, 180, 100, 120];

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
    department: { id, value: factory.department ?? 'N/A' },
    buildDate: { id, value: factory.buildDate ?? 'N/A', tooltip: 'Build date' }
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
} as ComponentMeta<typeof EnhancedTable>;

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

export const DarkTemplate: ComponentStory<typeof EnhancedTable> = (args) => (
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

export const LightBlueTemplate: ComponentStory<typeof EnhancedTable> = (args) => (
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

export const LightCyanTemplate: ComponentStory<typeof EnhancedTable> = (args) => (
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
  name?: string;
  age?: number;
  birthDate?: string;
}

function createRandomUser(): User {
  return {
    name: faker.name.firstName() + ' ' + faker.name.lastName(),
    age: faker.datatype.number({ min: 18, max: 65 }) as number,
    birthDate: faker.date.past().toLocaleDateString()
  };
}

const USER: User[] = faker.helpers.arrayElements(
  Array.from({ length: 10 }, () => createRandomUser()),
  10
);

interface SimpleRowData extends Identible {
  name: StringCell;
  age: NumberCell;
  birthDate: StringCell;
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
    definition: StringColDef,
    dataType: 'birthDate',
    colspan: 1
  }
];

const simpleRows: SimpleRowData[] = USER.map((user) => {
  const id = `${hash(user.name! + user.age!)}`;
  return {
    id,
    name: { id, value: user.name ?? 'N/A' },
    age: { id, value: user.age ?? 0 },
    birthDate: { id, value: user.birthDate ?? 'N/A' }
  };
});

export const SimpleTemplate: ComponentStory<typeof EnhancedTable> = (args) => (
  <ThemeProvider theme={chooseMode('light')}>
    <EnhancedTable {...args} />
  </ThemeProvider>
);
SimpleTemplate.args = {
  headers: simpleHeaders as EnhancedTableHeader<Identible>[],
  rows: simpleRows,
  displayNumberOfRows: true,
  expandable: true,
  filterable: true,
  stripedRows: true,
  showHeaders: true
};
SimpleTemplate.story = {
  name: 'Simple table',
  parameters: {
    backgrounds: {
      default: 'light'
    }
  }
};