import { useState } from 'react';
import { Box } from '@chakra-ui/react';
import Head from 'next/head';
import dynamic from 'next/dynamic';

import HeroSection from 'components/sections/HeroSection';
import ClientSection from 'components/sections/ClientSection';
import EventSection from 'components/sections/EventSection';
import GuestBookSection from 'components/sections/GuestBookSection';

import { initFirebase } from 'lib/firebase/initFirebase';

initFirebase();

const Home = () => {
  const [clientTransitionHeight, setClientTransitionHeight] = useState(0);
  const [guestTransitionHeight, setGuestTransitionHeight] = useState(0);

  return (
    <div>
      <Head>
        <title>Addin & Anis</title>
        <meta name="description" content="The wedding of Addin & Anis" />
        <link rel="icon" href="/addin-anis/favicon.ico" />
      </Head>

      <Box as="main" overflowX="hidden">
        <HeroSection />

        <ClientSection transitionHeight={clientTransitionHeight} setTransitionHeight={setClientTransitionHeight} />

        <EventSection
          clientTransitionHeight={clientTransitionHeight}
          guestBookTransitionHeight={guestTransitionHeight}
        />

        <GuestBookSection transitionHeight={guestTransitionHeight} setTransitionHeight={setGuestTransitionHeight} />
      </Box>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Home), { ssr: false });
