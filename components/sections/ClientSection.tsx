import { useRef, useEffect } from 'react';
import { Box, Container, Text, SimpleGrid, VStack, Image } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import Fade from 'react-reveal/Fade';

import ClientCard from 'components/ClientCard';

type ClientSectionProps = {
  transitionHeight: number;
  setTransitionHeight: (height: number) => void;
};

const ClientSection = ({ transitionHeight, setTransitionHeight }: ClientSectionProps) => {
  const transitionRef = useRef(null);

  useEffect(() => {
    setTransitionHeight(transitionRef.current.clientHeight);
  });

  return (
    <Box as="section" bg="bg" py="16" pos="relative">
      <Container as={VStack} spacing="32" maxW="container.lg" px="6" textAlign="center">
        <Fade left>
          <Box p="4" rounded="lg" bg="cardBg" color="white">
            <Text fontSize={{ base: 'base', lg: 'lg' }}>
              “Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu
              sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan
              sayang”
              <br />
              (QS. Ar- Rum 21)
            </Text>
          </Box>
        </Fade>

        <SimpleGrid
          templateColumns={{ md: '1fr', lg: '4fr 1fr 4fr' }}
          gap={{ base: '4', lg: '8' }}
          alignItems="center"
          w={{ base: 'full', lg: '80%' }}
          px="8"
        >
          <Fade left>
            <ClientCard
              name={
                <>
                  Muhammad
                  <br />
                  Syafruddin, S.P.
                </>
              }
              parents={
                <>
                  Putra Bpk. Joko Purnomo <br />
                  &amp; Ibu Retno Dyah Sundari
                </>
              }
              decoration={
                <Image
                  src="/addin-anis/assets/client-flower-1.png"
                  pos="absolute"
                  top="-45%"
                  right="-20%"
                  width="180px"
                  alt=""
                />
              }
              socials={[
                {
                  title: 'instagram',
                  logo: <FontAwesomeIcon icon={faInstagram} />,
                  url: 'https://instagram.com/addinsyaf?igshid=YmMyMTA2M2Y=',
                },
              ]}
            />
          </Fade>

          <Fade>
            <Text fontFamily="Sacramento" fontSize="6xl" color="main">
              &amp;
            </Text>
          </Fade>

          <Fade left>
            <ClientCard
              name={
                <>
                  Anisa Trias
                  <br />
                  Viyana, S.P.
                </>
              }
              parents={
                <>
                  Putri Bpk. Firman (Alm)
                  <br />
                  &amp; Ibu Ela Susyani
                </>
              }
              decoration={
                <Image
                  src="/addin-anis/assets/client-flower-2.png"
                  pos="absolute"
                  top="-33%"
                  right="-15%"
                  width="140px"
                  alt=""
                />
              }
              socials={[
                {
                  title: 'instagram',
                  logo: <FontAwesomeIcon icon={faInstagram} />,
                  url: 'https://instagram.com/anisatviyana?igshid=YmMyMTA2M2Y=',
                },
              ]}
            />
          </Fade>
        </SimpleGrid>
      </Container>

      <Image
        src="/addin-anis/assets/client-transition.svg"
        pos="absolute"
        width="full"
        bottom={`${transitionHeight * -1 + 2}px`}
        // bottom="0"
        userSelect="none"
        ref={transitionRef}
        alt=""
      />
      <Image
        src="/addin-anis/assets/event-flower-1.png"
        pos="absolute"
        bottom={{ base: '-10%', xl: '-40%', '2xl': '-50%' }}
        left={{ base: '7%', lg: '15%' }}
        h={{ base: '120px', lg: '250px' }}
        userSelect="none"
        zIndex="10"
        alt=""
      />
      <Image
        src="/addin-anis/assets/event-flower-2.png"
        pos="absolute"
        bottom={{ base: '-5%', lg: '-19%' }}
        right={{ base: '2%', lg: '5%' }}
        h={{ base: '70px', lg: '130px' }}
        userSelect="none"
        zIndex="10"
        alt=""
      />
    </Box>
  );
};

export default ClientSection;
