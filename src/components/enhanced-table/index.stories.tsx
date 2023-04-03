import React from 'react';
import { faker } from '@faker-js/faker';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Identible, StringCell, StringColDef, EnhancedTable, EnhancedTableHeader, NumberCell, NumberColDef } from './';
import { Grid, Theme, ThemeProvider, createTheme } from '@mui/material';
import { hash } from '../../hashing';
import { grey, blueGrey, common } from '@mui/material/colors';
import { CYAN, LIGHT_BLUE, EnhancedTableTheme, DARK } from './themes';

interface Factory {
  companyName?: string;
  companySuffix?: string;
  streetAddress?: string;
  buildingNumber?: string;
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
    buildingNumber: faker.address.buildingNumber(),
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
  buildingNumber?: StringCell;
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
    colspan: 3,
    subHeaders: [
      // {
      //   label: 'Name and address',
      //   align: 'center',
      //   tooltip: 'Name and address of the factory',
      //   colspan: 5,
      //   subHeaders: [
      //     {
      //       label: 'Name',
      //       align: 'center',
      //       tooltip: 'Name of the factory',
      //       colspan: 2,
      //       subHeaders: [
      //         {
      //           label: 'Company name',
      //           tooltip: 'Name of the company',
      //           definition: StringColDef,
      //           dataType: 'companyName',
      //           width: '200px',
      //           colspan: 1
      //         },
      //         {
      //           label: 'Company suffix',
      //           tooltip: 'Suffix of the company',
      //           definition: StringColDef,
      //           dataType: 'companySuffix',
      //           width: '10%',
      //           colspan: 1
      //         }
      //       ]
      //     },
      //     {
      //       label: 'Address',
      //       align: 'center',
      //       tooltip: 'Address of the factory',
      //       colspan: 3,
      //       subHeaders: [
      //         {
      //           label: 'Street address',
      //           tooltip: 'Street address of the factory',
      //           definition: StringColDef,
      //           dataType: 'streetAddress',
      //           width: '15%',
      //           colspan: 1
      //         },
      //         {
      //           label: 'No.',
      //           tooltip: 'Building number of the factory',
      //           definition: StringColDef,
      //           dataType: 'buildingNumber',
      //           width: '10px',
      //           colspan: 1
      //         },
      //         {
      //           label: 'Country',
      //           tooltip: 'Country of the factory',
      //           definition: StringColDef,
      //           dataType: 'country',
      //           width: '10%',
      //           colspan: 1
      //         }
      //       ]
      //     }
      //   ]
      // },
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
                label: 'Phone number',
                tooltip: 'Phone number of the factory',
                definition: StringColDef,
                dataType: 'phoneNo',
                width: '5%',
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
                label: 'Department',
                tooltip: 'Department of the factory',
                definition: StringColDef,
                dataType: 'department',
                width: 'auto',
                colspan: 1
              },
              {
                label: 'Build date',
                tooltip: 'Build date of the factory',
                definition: StringColDef,
                dataType: 'buildDate',
                width: '30%',
                colspan: 1
              }
            ]
          }
        ]
      }
    ]
  }
];

const rows: RowData[] = FACTORY.map((factory) => {
  const id = `${hash(factory.companyName! + factory.companySuffix!)}`;
  return {
    id,
    companyName: { id, value: factory.companyName ?? 'N/A' },
    companySuffix: { id, value: factory.companySuffix ?? 'N/A' },
    streetAddress: { id, value: factory.streetAddress ?? 'N/A' },
    buildingNumber: { id, value: factory.buildingNumber ?? 'N/A' },
    country: { id, value: factory.country ?? 'N/A' },
    phoneNo: { id, value: factory.phoneNo ?? 'N/A' },
    department: { id, value: factory.department ?? 'N/A' },
    buildDate: { id, value: factory.buildDate ?? 'N/A' }
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
    width: 'auto',
    colspan: 1
  },
  {
    label: 'Age',
    tooltip: 'Age of the user',
    definition: NumberColDef,
    dataType: 'age',
    width: '5%',
    colspan: 1
  },
  {
    label: 'Birth date',
    tooltip: 'Birth date of the user',
    definition: StringColDef,
    dataType: 'birthDate',
    width: '15%',
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
