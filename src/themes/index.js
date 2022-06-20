import { createMuiTheme } from '@material-ui/core/styles';

import AvenirMediumWoff2 from '../assets/fonts/Avenir-Medium.woff2';
import AvenirLightWoff2 from '../assets/fonts/Avenir-Light.woff2';
import AvenirRomanWoff2 from '../assets/fonts/Avenir-Roman.woff2';
import AvenirHeavyWoff2 from '../assets/fonts/Avenir-Heavy.woff2';

const avenir = {
  fontFamily: 'Avenir',
  fontStyle: 'medium',
  fontDisplay: 'swap',
  fontWeight: 500,
  src: `
    local('Avenir'),
    local('Avenir-Medium'),
    url(${AvenirMediumWoff2}) format('woff2')
  `
};

const avenirLight = {
  fontFamily: 'Avenir',
  fontStyle: 'light',
  fontDisplay: 'swap',
  fontWeight: 300,
  src: `
    local('Avenir'),
    local('Avenir-Light'),
    url(${AvenirLightWoff2}) format('woff2')
  `
};

const avenirRoman = {
  fontFamily: 'Avenir',
  fontStyle: 'roman',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `
    local('Avenir'),
    local('Avenir-Roman'),
    url(${AvenirRomanWoff2}) format('woff2')
  `
};

const avenirHeavy = {
  fontFamily: 'Avenir',
  fontStyle: 'heavy',
  fontDisplay: 'swap',
  fontWeight: 900,
  src: `
    local('Avenir'),
    local('Avenir-Heavy'),
    url(${AvenirHeavyWoff2}) format('woff2')
  `
};

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#2D47FE'
    },
    background: {
      default: '#fff'
    },
    text: {
      primary: '#212533',
      secondary: '#768BA2',
      disabled: '#D4DEE8'
    }
  },
  typography: {
    fontFamily: 'Avenir, Arial',
    fontSize: 18,
    color: '#212533'
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [avenir, avenirLight, avenirRoman, avenirHeavy]
      }
    },
    MuiButton: {
      root: {
        textTransform: 'none',
        padding: '11px 30px'
      }
    }
  }
});

export default theme;
