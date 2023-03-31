import React from 'react';
import { faker } from '@faker-js/faker';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Story } from '@storybook/addon-docs';
import { Identible, StringCell, StringColDef, EnhancedTable, EnhancedTableHeader } from './';
import { Theme, ThemeProvider, createTheme } from '@mui/material';
import { hash } from '../../hashing';
import { grey, blueGrey, common } from '@mui/material/colors';
import { CYAN, LIGHT_BLUE, TableTheme } from './themes';

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
    subHeaders: [
      {
        label: 'Name and address',
        align: 'center',
        tooltip: 'Name and address of the factory',
        subHeaders: [
          {
            label: 'Name',
            align: 'center',
            tooltip: 'Name of the factory',
            subHeaders: [
              {
                label: 'Company name',
                tooltip: 'Name of the company',
                definition: StringColDef,
                dataType: 'companyName'
              },
              {
                label: 'Company suffix',
                tooltip: 'Suffix of the company',
                definition: StringColDef,
                dataType: 'companySuffix'
              }
            ]
          },
          {
            label: 'Address',
            align: 'center',
            tooltip: 'Address of the factory',
            subHeaders: [
              {
                label: 'Street address',
                tooltip: 'Street address of the factory',
                definition: StringColDef,
                dataType: 'streetAddress'
              },
              {
                label: 'Building number',
                tooltip: 'Building number of the factory',
                definition: StringColDef,
                dataType: 'buildingNumber'
              },
              {
                label: 'Country',
                tooltip: 'Country of the factory',
                definition: StringColDef,
                dataType: 'country'
              }
            ]
          }
        ]
      },
      {
        label: 'Other details',
        align: 'center',
        tooltip: 'Other details of the factory',
        subHeaders: [
          {
            label: 'Contact details',
            align: 'center',
            tooltip: 'Contact details of the factory',
            subHeaders: [
              {
                label: 'Phone number',
                tooltip: 'Phone number of the factory',
                definition: StringColDef,
                dataType: 'phoneNo'
              }
            ]
          },
          {
            label: 'Department information',
            align: 'center',
            tooltip: 'Department information of the factory',
            subHeaders: [
              {
                label: 'Department',
                tooltip: 'Department of the factory',
                definition: StringColDef,
                dataType: 'department'
              },
              {
                label: 'Build date',
                tooltip: 'Build date of the factory',
                definition: StringColDef,
                dataType: 'buildDate'
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

function chooseMode(mode: 'light' | 'dark', colorTheme: TableTheme = LIGHT_BLUE): Theme {
  return createTheme({
    palette: {
      mode,
      primary: {
        main: mode === 'light' ? grey[500] : blueGrey[500]
      },
      background: {
        default: mode === 'light' ? common.white : '#22272e',
        paper: mode === 'light' ? common.white : blueGrey[800]
      }
    },
    enhancedTable: colorTheme
  });
}

export const DarkTemplate: ComponentStory<typeof EnhancedTable> = (args) => (
  <ThemeProvider theme={chooseMode('dark')}>
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
  <ThemeProvider theme={chooseMode('light', CYAN)}>
    <EnhancedTable {...args} />
  </ThemeProvider>
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
