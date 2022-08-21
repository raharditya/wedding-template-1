import { useState, useRef } from 'react';
import { Box, Button, Center, Container, Heading, VStack, Image } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faStop } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import Fade from 'react-reveal/Fade';

const HeroSection = () => {
  const router = useRouter();
  const receiverName = router.query.to;

  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
    audioRef.current.play();
  };

  const handleStop = () => {
    setIsPlaying(false);
    audioRef.current.pause();
  };

  return (
    <>
      <audio src="/addin-anis/music.mp3" ref={audioRef} style={{ display: 'none' }}>
        Your browser does not support the
        <code>audio</code> element.
      </audio>

      <Center as="section" h="100vh" pos="relative">
        <Container as={VStack} spacing="16" maxW="container.md" textAlign="center" mt="-16" pos="relative" zIndex="10">
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

          <Fade left>
            <Button
              colorScheme="green"
              leftIcon={<FontAwesomeIcon icon={isPlaying ? faStop : faPlay} />}
              onClick={() => (isPlaying ? handleStop() : handlePlay())}
            >
              {isPlaying ? 'Pause' : 'Putar'} musik
            </Button>
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
    </>
  );
};

export default HeroSection;
