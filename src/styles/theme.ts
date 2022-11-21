import { extendTheme } from '@chakra-ui/react';
import { colors } from '@twooni-ui/tokens';
export const theme = extendTheme({
  styles: {
    global: {
      'html, body': {
        backgroundColor: colors.gray100,
        fontFamily: "'Outfit', sans-serif"
      },
    },
  },
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  colors: {
    primary:{
      50:'#e6e1fd',
      500:'#6E51F2'
    }, 
    gray: {
      25: colors.gray25,
      50: colors.gray50,
      100: colors.gray100,
      200: colors.gray200,
      300: colors.gray300,
      400: colors.gray400,
      500: colors.gray500,
      600: colors.gray600,
      700: colors.gray700,
      800: colors.gray800,
      900: colors.gray900,
    },
    green: {
      900: '#00452D',
      800: '#005534',
      700: '#006E40',
      600: '#008D4E',
      500: '#00AE63',
      400: '#00CE7C',
      300: '#49E69F',
      200: '#92F2BF',
      100: '#C7F9DC',
      50: '#E7FDF2',
    },
    red: {
      900: '#74231C',
      800: '#8C1E1C',
      700: '#B3211E',
      600: '#DE2825',
      500: '#F93C38',
      400: '#FF655F',
      300: '#FF9993',
      200: '#FFC7C4',
      100: '#FFE0DF',
      50: '#FFF1F0',
    },
    yellow: {
      900: '#732915',
      800: '#8E3016',
      700: '#B43E1A',
      600: '#E05C1D',
      500: '#FF8527',
      400: '#FFA733',
      300: '#FFC150',
      200: '#FFD985',
      100: '#FFEDC2',
      50: '#FFFAE9',
    },
  },
});
