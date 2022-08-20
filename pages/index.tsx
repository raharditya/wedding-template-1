import { useRef, useEffect, useState } from 'react';
import { Button } from '@chakra-ui/button';
import { Input } from '@chakra-ui/input';
import { Box, Center, Container, Heading, Text, SimpleGrid, VStack, HStack, Divider } from '@chakra-ui/layout';
import { Image, Spinner, useDisclosure } from '@chakra-ui/react';
import { Textarea } from '@chakra-ui/textarea';
import { useBreakpointValue } from '@chakra-ui/react';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faGift } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Countdown from 'react-countdown';
import Fade from 'react-reveal/Fade';
import { initFirebase, db } from '../lib/firebase/initFirebase';
import { toast } from 'react-toastify';
import { collection, query, addDoc, orderBy, limit, getDocs, serverTimestamp } from 'firebase/firestore';
import dynamic from 'next/dynamic';

import ClientCard from '../components/ClientCard';
import EventCard from '../components/EventCard';
import GuestBookItem from '../components/GuestBookItem';
import GiftModal from '../components/GiftModal';

initFirebase();

type GuestBook = {
  name: string;
  message: string;
};

const Home = () => {
  const isMobile = useBreakpointValue({ base: true, sm: false });
  const giftModal = useDisclosure();
  const router = useRouter();
  const receiverName = router.query.nama;

  const clientTransitionRef = useRef(null);
  const [clientTransitionHeight, setClientTransitionHeight] = useState(0);

  const guestTransitionRef = useRef(null);
  const [guestTransitionHeight, setGuestTransitionHeight] = useState(0);

  useEffect(() => {
    setClientTransitionHeight(clientTransitionRef.current.clientHeight);
    setGuestTransitionHeight(guestTransitionRef.current.clientHeight);
  });

  // FIREBASE
  const [guestBooks, setGuestBooks] = useState<GuestBook[]>([]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    if (guestBooks.length > 0) return;

    setIsLoading(true);

    const getGuestBook = async () => {
      const q = query(collection(db, 'guest-book'), orderBy('createdAt', 'desc'), limit(3));
      const querySnapshot = await getDocs(q);

      const data = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });

      setGuestBooks(data);
      setIsLoading(false);
    };

    getGuestBook();
  }, []);

  const sendGuestBook = async ({ name, message }) => {
    setIsSubmitting(true);
    const colRef = collection(db, 'guest-book');
    await addDoc(colRef, {
      name,
      message,
      createdAt: serverTimestamp(),
    }).then(() => {
      toast.success('Pesan terkirim');
      setName('');
      setMessage('');
      setIsSubmitting(false);
    });
  };

  const date = new Date('3 Sep 2022');
  return (
    <div>
      <Head>
        <title>Addin & Anis</title>
        <meta name="description" content="The wedding of Addin & Anis" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box as="main" overflowX="hidden">
        <Center as="section" h="100vh" pos="relative">
          <Container
            as={VStack}
            spacing="24"
            maxW="container.md"
            textAlign="center"
            mt="-16"
            pos="relative"
            zIndex="10"
          >
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

          <Image src="/assets/hero-flower-1.png" pos="absolute" top="0" w="250px" userSelect="none" zIndex="10" />
          <Image
            src="/assets/hero-flower-2.png"
            pos="absolute"
            bottom={{ base: '-4%', lg: '-2px' }}
            w={{ base: '270px', lg: '300px' }}
            userSelect="none"
            zIndex="10"
          />
          <Image src="/assets/hero-main-bg.png" pos="absolute" bottom="-2px" w="500px" userSelect="none" zIndex="0" />
          {/* <Hero pos="absolute" bottom="-2px" w="500px" userSelect="none" zIndex="0" /> */}
          <Image
            src="/assets/hero-main-bg.png"
            pos="absolute"
            top="-20%"
            right="-5%"
            transform="rotate(240deg)"
            w="500px"
            userSelect="none"
            zIndex="0"
            display={{ base: 'none', lg: 'block' }}
          />
          <Image
            src="/assets/hero-main-bg.png"
            pos="absolute"
            top="-20%"
            left="-5%"
            transform="rotate(160deg)"
            w="500px"
            userSelect="none"
            zIndex="0"
          />
          <Image src="/assets/hero-transition.svg" pos="absolute" bottom="-2px" w="full" userSelect="none" />
        </Center>

        <Box as="section" bg="bg" py="16" pos="relative">
          <Container as={VStack} spacing="32" maxW="container.lg" px="6" textAlign="center">
            <Fade left>
              <Box p="4" rounded="lg" bg="cardBg" color="white">
                <Text fontSize={{ base: 'base', lg: 'lg' }}>
                  “Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari
                  jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu
                  rasa kasih dan sayang”
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
                    <Image src="/assets/client-flower-1.png" pos="absolute" top="-45%" right="-20%" width="180px" />
                  }
                  socials={[
                    { title: 'instagram', logo: <FontAwesomeIcon icon={faInstagram} />, url: 'https://instagram.com' },
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
                    <Image src="/assets/client-flower-2.png" pos="absolute" top="-33%" right="-15%" width="140px" />
                  }
                  socials={[
                    { title: 'instagram', logo: <FontAwesomeIcon icon={faInstagram} />, url: 'https://instagram.com' },
                  ]}
                />
              </Fade>
            </SimpleGrid>
          </Container>

          <Image
            src="/assets/client-transition.svg"
            pos="absolute"
            width="full"
            bottom={`${clientTransitionHeight * -1 + 2}px`}
            // bottom="0"
            userSelect="none"
            ref={clientTransitionRef}
          />
          <Image
            src="/assets/event-flower-1.png"
            pos="absolute"
            bottom={{ base: '-10%', xl: '-40%', '2xl': '-50%' }}
            left={{ base: '7%', lg: '15%' }}
            h={{ base: '120px', lg: '250px' }}
            userSelect="none"
            zIndex="10"
          />
          <Image
            src="/assets/event-flower-2.png"
            pos="absolute"
            bottom={{ base: '-5%', lg: '-19%' }}
            right={{ base: '2%', lg: '5%' }}
            h={{ base: '70px', lg: '130px' }}
            userSelect="none"
            zIndex="10"
          />
        </Box>

        <Box as="section" py="20" pos="relative">
          <Container
            as={VStack}
            spacing="32"
            maxW="container.lg"
            textAlign="center"
            px="6"
            mt={`${clientTransitionHeight}px`}
            mb={`${guestTransitionHeight / 1.5}px`}
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
            src="/assets/event-main-bg.png"
            pos="absolute"
            bottom={`${guestTransitionHeight / 2 - 8}px`}
            right="0%"
            w="50%"
            userSelect="none"
            zIndex="0"
          />
        </Box>

        <Box as="section" bg="bg" pt="8" pb="24" pos="relative">
          <Container as={VStack} spacing="32" maxW="container.lg" textAlign="center">
            <SimpleGrid templateColumns={{ md: '1fr', lg: '2fr 1px 3fr' }} gap="8" alignItems="flex-start" w="full">
              <Fade cascade>
                <VStack spacing="4" alignItems="start">
                  <Heading fontSize="2xl" color="main">
                    Guest Book
                  </Heading>
                  <VStack spacing="1" w="full" alignItems="start">
                    <Text color="main" opacity="95%">
                      Nama Pengirim
                    </Text>
                    <Input bg="white" w="full" value={name} onChange={(e) => setName(e.target.value)} />
                  </VStack>

                  <VStack spacing="1" w="full" alignItems="start">
                    <Text color="main" opacity="95%">
                      Pesan
                    </Text>
                    <Textarea bg="white" value={message} onChange={(e) => setMessage(e.target.value)} />
                  </VStack>

                  <Button
                    colorScheme="green"
                    isDisabled={!name || !message}
                    isLoading={isSubmitting}
                    onClick={() => sendGuestBook({ name, message })}
                  >
                    Kirim Pesan
                  </Button>
                </VStack>
              </Fade>

              <Fade cascade>
                <Divider orientation="vertical" borderColor="main" borderStyle="dashed" />
              </Fade>

              <Fade cascade>
                <VStack spacing="6" alignItems="start">
                  <Heading fontSize="2xl" color="main">
                    Ucapan Tamu
                  </Heading>

                  {!isLoading ? (
                    guestBooks.length > 0 ? (
                      <VStack spacing="4" w="full">
                        {guestBooks.map((item, i) => (
                          <GuestBookItem key={i} name={item.name} message={item.message} />
                        ))}

                        <Link href="/guest-books" passHref>
                          <Text as="a" color="main">
                            Lihat Semua...
                          </Text>
                        </Link>
                      </VStack>
                    ) : (
                      <Box w="full" bg="cardBg" p="4" rounded="lg" color="white">
                        <Text>Belum ada ucapan</Text>
                      </Box>
                    )
                  ) : (
                    <Center w="full" py="16">
                      <Spinner />
                    </Center>
                  )}
                </VStack>
              </Fade>
            </SimpleGrid>
          </Container>

          <Image
            src="/assets/guest-book-transition.svg"
            pos="absolute"
            top={`${guestTransitionHeight * -1 + 2}px`}
            w="full"
            userSelect="none"
            ref={guestTransitionRef}
          />
        </Box>
      </Box>

      <GiftModal isOpen={giftModal.isOpen} onClose={giftModal.onClose} />
    </div>
  );
};

export default dynamic(() => Promise.resolve(Home), { ssr: false });
