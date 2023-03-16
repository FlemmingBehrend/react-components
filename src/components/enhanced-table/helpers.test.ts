import { Theme } from '@mui/material';
import {
  getDarkerColor,
  getLighterColor,
  calculateHeaderColspan,
  getBackgroundColor,
  DEFAULT_TABLE_HEADER_COLOR,
  getSeperatorColor
} from './helpers';
import { TableHeader } from './table/header-definitions';

interface T {
  test: string;
}

describe('helper functions', () => {
  describe('lighter color', () => {
    it('should return white if given write', () => {
      const result = getLighterColor('#ffffff', 10);
      expect(result).toEqual('#ffffff');
    });

    it('should return black if given white and 100%', () => {
      const result = getLighterColor('#000000', 100);
      expect(result).toEqual('#ffffff');
    });

    it('should return 10% lighter color of black', () => {
      const result = getLighterColor('#000000', 10);
      expect(result).toEqual('#1a1a1a');
    });
  });

  describe('darker color', () => {
    it('should return black if given black', () => {
      const result = getDarkerColor('#000000', 10);
      expect(result).toEqual('#000000');
    });

    it('should return white if given black and 100%', () => {
      const result = getDarkerColor('#ffffff', 100);
      expect(result).toEqual('#000000');
    });

    it('should return 10% darker color of white', () => {
      const result = getDarkerColor('#ffffff', 10);
      expect(result).toEqual('#e6e6e6');
    });
  });

  describe('calculate header span', () => {
    it('should span 1 if no sub headers', () => {
      const headers: TableHeader<T> = {
        label: 'test',
        dataType: 'test'
      };
      const result = calculateHeaderColspan(headers);
      expect(result).toEqual(1);
    });

    it('should span 1 if 1 sub header', () => {
      const headers: TableHeader<T> = {
        label: 'test',
        subHeaders: [
          {
            label: 'test',
            dataType: 'test'
          }
        ]
      };
      const result = calculateHeaderColspan(headers);
      expect(result).toEqual(1);
    });

    it('should span 2 if 2 sub headers', () => {
      const headers: TableHeader<T> = {
        label: 'test',
        subHeaders: [
          {
            label: 'test',
            dataType: 'test'
          },
          {
            label: 'test',
            dataType: 'test'
          }
        ]
      };
      const result = calculateHeaderColspan(headers);
      expect(result).toEqual(2);
    });

    it('should span 3 if 1 sub header with 2 sub headers', () => {
      const headers: TableHeader<T> = {
        label: 'test',
        subHeaders: [
          {
            label: 'test',
            subHeaders: [
              {
                label: 'test',
                dataType: 'test'
              },
              {
                label: 'test',
                dataType: 'test'
              }
            ]
          },
          {
            label: 'test',
            subHeaders: [
              {
                label: 'test',
                dataType: 'test'
              }
            ]
          }
        ]
      };
      const result = calculateHeaderColspan(headers);
      expect(result).toEqual(3);
    });
  });

  describe('header background color', () => {
    it('should use default color if not specified in theme', () => {
      const theme = {} as Theme;
      const result = getBackgroundColor(theme, 0);
      expect(result).toEqual(DEFAULT_TABLE_HEADER_COLOR);
    });

    it('should use theme color if specified', () => {
      const theme = {
        enhancedTable: {
          tableHeader: {
            backgroundColor: '#000000'
          }
        }
      } as Theme;
      const result = getBackgroundColor(theme, 0);
      expect(result).toEqual('#000000');
    });

    it('should make every level of sub headers 10% lighther', () => {
      const theme = {
        enhancedTable: {
          tableHeader: {
            backgroundColor: '#000000'
          }
        }
      } as Theme;
      const level1 = getBackgroundColor(theme, 1);
      expect(level1).toEqual('#1a1a1a');
      const level2 = getBackgroundColor(theme, 2);
      expect(level2).toEqual('#333333');
      const level3 = getBackgroundColor(theme, 3);
      expect(level3).toEqual('#4d4d4d');
    });
  });

  describe('seperator color', () => {
    it('should use default color and make it 70% lighter if no theme is set', () => {
      const theme = {} as Theme;
      const result = getSeperatorColor(theme);
      expect(result).toEqual('#d7dee1');
    });

    it('should use theme if specified and make it 70% lighter', () => {
      const theme = {
        enhancedTable: {
          tableHeader: {
            backgroundColor: '#000000'
          }
        }
      } as Theme;
      const result = getSeperatorColor(theme);
      expect(result).toEqual('#b3b3b3');
    });
  });
});
