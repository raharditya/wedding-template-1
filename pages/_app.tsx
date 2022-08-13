import { ChakraProvider } from '@chakra-ui/provider';

import '@fontsource/glass-antiqua';
import '@fontsource/port-lligat-sans';
import '@fontsource/sacramento';
import '@fontsource/satisfy';

import theme from '../theme';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
