import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    heading: `'Glass Antiqua', serif`,
    body: `'Port Lligat Sans', sans-serif`,
    hero: `'Sacramento', sans-serif`,
    handwrite: `'Satisfy', sans-serif`,
  },
  textStyles: {
    h1: {
      'font-family': 'var(--chakra-fonts-hero)',
    },
    h3: {
      'font-family': 'var(--chakra-fonts-handwrite)',
    },
  },
  colors: {
    main: '#8F4542',
    bg: '#E5CB9F',
    cardBg: '#948F68',
    cardBgGradient: '#A7A27C',
  },
});

export default theme;
