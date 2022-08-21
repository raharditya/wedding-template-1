import {
  Box,
  Button,
  Center,
  Container,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  HStack,
  Divider,
  Image,
  useDisclosure,
  useBreakpointValue,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGift } from '@fortawesome/free-solid-svg-icons';
import Countdown from 'react-countdown';
import Fade from 'react-reveal/Fade';

import EventCard from 'components/EventCard';
import GiftModal from 'components/GiftModal';

type EventSectionProps = {
  clientTransitionHeight: number;
  guestBookTransitionHeight: number;
};

const EventSection = ({ clientTransitionHeight, guestBookTransitionHeight }: EventSectionProps) => {
  const isMobile = useBreakpointValue({ base: true, sm: false });
  const giftModal = useDisclosure();

  const date = new Date('3 Sep 2022');

  return (
    <>
      <Box as="section" py="20" pos="relative">
        <Container
          as={VStack}
          spacing="32"
          maxW="container.lg"
          textAlign="center"
          px="6"
          mt={`${clientTransitionHeight}px`}
          mb={`${guestBookTransitionHeight / 1.5}px`}
          pos="relative"
          zIndex="10"
        >
          <Fade>
            <SimpleGrid
              templateColumns={{ md: '1fr', lg: '4fr 1px 4fr' }}
              gap={{ base: '12', lg: '8' }}
              alignItems="center"
              w="full"
            >
              <EventCard
                title="Akad Nikah"
                date="3"
                subDate="September 2022"
                time="09.00 - 14.00"
                place="Hotel handayani. Jl. Kembar No. 205 Indramayu, Jawa Barat"
                mapUrl="https://goo.gl/maps/N3FkGFM82YEUSmyX8"
              />
              <Divider orientation={isMobile ? 'horizontal' : 'vertical'} />
              <EventCard
                title="Ngunduh Mantu"
                date="10"
                subDate="September 2022"
                time="09.00 - Selesai"
                place="Keden RT 01/RW 04, Sidoharjo, Wonogiri, Jawa Tengah"
                mapUrl="https://maps.app.goo.gl/5Zbcz2BafQ9U5CZe6"
              />
            </SimpleGrid>
          </Fade>

          <VStack spacing="8">
            <Fade>
              <Heading fontSize={{ base: '2xl', lg: '3xl' }} color="main">
                Counting Down To The Big Day
              </Heading>
            </Fade>

            <Fade cascade>
              <Countdown
                date={date}
                renderer={(props) => (
                  <HStack spacing="3">
                    <VStack>
                      <Center boxSize={{ base: '12', lg: '16' }} bg="#C88358" rounded="xl">
                        <Text fontFamily="Satisfy" fontSize={{ base: '2xl', lg: '3xl' }} color="white" pt="2">
                          {props.days}
                        </Text>
                      </Center>
                      <Text color="main">Hari</Text>
                    </VStack>

                    <Text fontSize="2xl" color="main" pb={{ base: '9', lg: '8' }}>
                      :
                    </Text>

                    <VStack>
                      <Center boxSize={{ base: '12', lg: '16' }} bg="#C88358" rounded="xl">
                        <Text fontFamily="Satisfy" fontSize={{ base: '2xl', lg: '3xl' }} color="white" pt="2">
                          {props.hours}
                        </Text>
                      </Center>
                      <Text color="main">Jam</Text>
                    </VStack>

                    <Text fontSize="2xl" color="main" pb={{ base: '9', lg: '8' }}>
                      :
                    </Text>

                    <VStack>
                      <Center boxSize={{ base: '12', lg: '16' }} bg="#C88358" rounded="xl">
                        <Text fontFamily="Satisfy" fontSize={{ base: '2xl', lg: '3xl' }} color="white" pt="2">
                          {props.minutes}
                        </Text>
                      </Center>
                      <Text color="main">Menit</Text>
                    </VStack>

                    <Text fontSize="2xl" color="main" pb={{ base: '9', lg: '8' }}>
                      :
                    </Text>

                    <VStack>
                      <Center boxSize={{ base: '12', lg: '16' }} bg="#C88358" rounded="xl">
                        <Text fontFamily="Satisfy" fontSize={{ base: '2xl', lg: '3xl' }} color="white" pt="2">
                          {props.seconds}
                        </Text>
                      </Center>
                      <Text color="main">Detik</Text>
                    </VStack>
                  </HStack>
                )}
              />
            </Fade>
          </VStack>

          <VStack spacing="6" color="main">
            <Fade cascade>
              <VStack>
                <Heading fontSize={{ base: '2xl', lg: '3xl' }} color="main">
                  Wedding Gift
                </Heading>
                <Text w={{ base: 'full', lg: '60%' }} fontSize={{ base: 'base', lg: 'lg' }}>
                  Bagi keluarga dan sahabat yang ingin mengirimkan hadiah, silakan mengirimkannya melalui tautan
                  berikut:
                </Text>
              </VStack>

              <Button colorScheme="blue" leftIcon={<FontAwesomeIcon icon={faGift} />} onClick={giftModal.onOpen}>
                Kirim Hadiah
              </Button>
            </Fade>
          </VStack>
        </Container>

        <Image
          src="/addin-anis/assets/event-main-bg.png"
          pos="absolute"
          bottom={`${guestBookTransitionHeight / 2 - 8}px`}
          right="0%"
          w="50%"
          userSelect="none"
          zIndex="0"
          alt=""
        />
      </Box>

      <GiftModal isOpen={giftModal.isOpen} onClose={giftModal.onClose} />
    </>
  );
};

export default EventSection;
