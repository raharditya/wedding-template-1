import { Box, Center, Container, Heading, VStack, Image } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Fade from 'react-reveal/Fade';

const HeroSection = () => {
  const router = useRouter();
  const receiverName = router.query.to;

  return (
    <Center as="section" h="100vh" pos="relative">
      <Container as={VStack} spacing="24" maxW="container.md" textAlign="center" mt="-16" pos="relative" zIndex="10">
        {receiverName && (
          <Fade left>
            <Heading fontSize={{ base: '18', lg: '24' }} color="#B66965">
              Dear {receiverName}, you are invited to
            </Heading>
          </Fade>
        )}

        <Fade left cascade>
          <Box>
            <Heading fontSize={{ base: '26', lg: '36' }} color="main" opacity="80%">
              The Wedding Of
            </Heading>
            <Heading as="h1" fontFamily="Sacramento" fontSize={{ base: '38', lg: '64' }} color="main">
              Addin &amp; Anis
            </Heading>
            <Heading fontSize={{ base: '20', lg: '28' }} color="main" opacity="80%">
              September 3rd, 2022
            </Heading>
          </Box>
        </Fade>
      </Container>

      <Image
        src="/addin-anis/assets/hero-flower-1.png"
        pos="absolute"
        top="0"
        w="250px"
        userSelect="none"
        zIndex="10"
        alt=""
      />
      <Image
        src="/addin-anis/assets/hero-flower-2.png"
        pos="absolute"
        bottom={{ base: '-4%', lg: '-2px' }}
        w={{ base: '270px', lg: '300px' }}
        userSelect="none"
        zIndex="10"
        alt=""
      />
      <Image
        src="/addin-anis/assets/hero-main-bg.png"
        pos="absolute"
        bottom="-2px"
        w="500px"
        userSelect="none"
        zIndex="0"
        alt=""
      />
      <Image
        src="/addin-anis/assets/hero-main-bg.png"
        pos="absolute"
        top="-20%"
        right="-5%"
        transform="rotate(240deg)"
        w="500px"
        userSelect="none"
        zIndex="0"
        display={{ base: 'none', lg: 'block' }}
        alt=""
      />
      <Image
        src="/addin-anis/assets/hero-main-bg.png"
        pos="absolute"
        top="-20%"
        left="-5%"
        transform="rotate(160deg)"
        w="500px"
        userSelect="none"
        zIndex="0"
        alt=""
      />
      <Image
        src="/addin-anis/assets/hero-transition.svg"
        pos="absolute"
        bottom="-2px"
        w="full"
        userSelect="none"
        alt=""
      />
    </Center>
  );
};

export default HeroSection;
