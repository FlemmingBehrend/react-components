// import { Theme } from '@mui/material';
// import { getDarkerColor, getLighterColor, getBackgroundColor, getSeperatorColor } from './helpers';

// interface T {
//   test: string;
// }

// describe('helper functions', () => {
//   describe('lighter color', () => {
//     it('should return white if given write', () => {
//       const result = getLighterColor('#ffffff', 10);
//       expect(result).toEqual('#ffffff');
//     });

//     it('should return black if given white and 100%', () => {
//       const result = getLighterColor('#000000', 100);
//       expect(result).toEqual('#ffffff');
//     });

//     it('should return 10% lighter color of black', () => {
//       const result = getLighterColor('#000000', 10);
//       expect(result).toEqual('#1a1a1a');
//     });
//   });

//   describe('darker color', () => {
//     it('should return black if given black', () => {
//       const result = getDarkerColor('#000000', 10);
//       expect(result).toEqual('#000000');
//     });

//     it('should return white if given black and 100%', () => {
//       const result = getDarkerColor('#ffffff', 100);
//       expect(result).toEqual('#000000');
//     });

//     it('should return 10% darker color of white', () => {
//       const result = getDarkerColor('#ffffff', 10);
//       expect(result).toEqual('#e6e6e6');
//     });
//   });

//   describe('header background color', () => {
//     it('should use default color if not specified in theme', () => {
//       const theme = {} as Theme;
//       const result = getBackgroundColor(theme, 0);
//       expect(result).toEqual(DEFAULT_TABLE_HEADER_COLOR);
//     });

//     it('should use theme color if specified', () => {
//       const theme = {
//         enhancedTable: {
//           headers: {
//             backgroundColor: '#000000'
//           }
//         }
//       } as Theme;
//       const result = getBackgroundColor(theme, 0);
//       expect(result).toEqual('#000000');
//     });

//     it('should make every level of sub headers 10% lighther', () => {
//       const theme = {
//         enhancedTable: {
//           headers: {
//             backgroundColor: '#000000'
//           }
//         }
//       } as Theme;
//       const level1 = getBackgroundColor(theme, 1);
//       expect(level1).toEqual('#1a1a1a');
//       const level2 = getBackgroundColor(theme, 2);
//       expect(level2).toEqual('#333333');
//       const level3 = getBackgroundColor(theme, 3);
//       expect(level3).toEqual('#4d4d4d');
//     });
//   });

//   describe('seperator color', () => {
//     it('should use default color and make it 70% lighter if no theme is set', () => {
//       const theme = {} as Theme;
//       const result = getSeperatorColor(theme);
//       expect(result).toEqual('#d7dee1');
//     });

//     it('should use theme if specified and make it 70% lighter', () => {
//       const theme = {
//         enhancedTable: {
//           headers: {
//             backgroundColor: '#000000'
//           }
//         }
//       } as Theme;
//       const result = getSeperatorColor(theme);
//       expect(result).toEqual('#b3b3b3');
//     });
//   });
// });
