import { useEffect, useState, useRef } from 'react';
import {
  Box,
  Button,
  Center,
  Container,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  Divider,
  Image,
  Input,
  Textarea,
  Spinner,
} from '@chakra-ui/react';
import { collection, query, addDoc, orderBy, limit, getDocs, serverTimestamp } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import Fade from 'react-reveal/Fade';
import Link from 'next/link';

import GuestBookItem from 'components/GuestBookItem';

import { db } from 'lib/firebase/initFirebase';
import { GuestBook } from 'types/guestBook';

type GuestBookSectionProps = {
  transitionHeight: number;
  setTransitionHeight: (height: number) => void;
};

const GuestBookSection = ({ transitionHeight, setTransitionHeight }: GuestBookSectionProps) => {
  const transitionRef = useRef(null);

  useEffect(() => {
    setTransitionHeight(transitionRef.current.clientHeight);
  });

  const [guestBooks, setGuestBooks] = useState<GuestBook[]>([]);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const getGuestBook = async () => {
    setIsLoading(true);

    const q = query(collection(db, 'guest-books'), orderBy('createdAt', 'desc'), limit(3));
    const querySnapshot = await getDocs(q);

    const data = [];
    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });

    setGuestBooks(data);
    setIsLoading(false);
  };

  useEffect(() => {
    getGuestBook();
  }, []);

  const sendGuestBook = async ({ name, message }) => {
    setIsSubmitting(true);
    const colRef = collection(db, 'guest-books');
    await addDoc(colRef, {
      name,
      message,
      createdAt: serverTimestamp(),
    }).then(() => {
      toast.success('Pesan terkirim');
      setName('');
      setMessage('');
      setIsSubmitting(false);
      getGuestBook();
    });
  };

  return (
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
                leftIcon={<FontAwesomeIcon icon={faPaperPlane} />}
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
        src="/addin-anis/assets/guest-book-transition.svg"
        pos="absolute"
        top={`${transitionHeight * -1 + 2}px`}
        w="full"
        userSelect="none"
        ref={transitionRef}
        alt=""
      />
    </Box>
  );
};

export default GuestBookSection;
