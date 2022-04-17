const theme = {
  mediaQueries: {
    desktopHD: 'only screen and (max-width: 1920px)',
    desktopMedium: 'only screen and (max-width: 1680px)',
    desktopSmall: 'only screen and (max-width: 1440px)',
    laptop: 'only screen and (max-width: 1366px)',
    laptopSmall: 'only screen and (max-width: 1280px)',
    tabletLandscape: 'only screen and (max-width: 1024px)',
    tabletMedium: 'only screen and (max-width: 900px)',
    tabletPortrait: 'only screen and (max-width: 768px)',
    mobileXLarge: 'only screen and (max-width: 640px)',
    mobileLarge: 'only screen and (max-width: 576px)',
    mobileMedium: 'only screen and (max-width: 480px)',
    mobileSmall: 'only screen and (max-width: 415px)',
    mobileXSmall: 'only screen and (max-width: 375px)',
    mobileTiny: 'only screen and (max-width: 325px)'
  },
  shades: {
    white: '#fff',
    black: '#000'
  },
  colors: {
    // color palette from:
    // https://colorhunt.co/palette/06113cff8c32ddddddeeeeee

    sapphire: '#06113c', // dark blue
    carrot: '#ff8c32', // orange
    gainsboro: '#ddd', // light grey
    whiteSmoke: '#f9f9f9', // off-white grey
    nero: '#141414' // dark grey
  },
  fonts: {
    roboto: "'Roboto', sans-serif"
  },
  fontWeights: {
    normal: 400,
    bold: 700
  },
  fontSizes: {
    copy: {
      small: '0.875rem',
      medium: '1rem',
      large: '1.125rem'
    },
    heading: {
      small: '2rem',
      medium: '3.25rem',
      large: '4.5rem'
    }
  },
  lineHeights: {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2
  },
  transitions: {
    short: 'all 175ms ease-in-out',
    medium: 'all 350ms ease-in-out',
    long: 'all 525ms ease-in-out'
  }
};

export default theme;
