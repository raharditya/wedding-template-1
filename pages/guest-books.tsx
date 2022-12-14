import { useState, useEffect } from 'react';
import { Box, Button, Center, Container, Text, SimpleGrid, Spinner, VStack, HStack } from '@chakra-ui/react';
import { collection, query, getDocs, orderBy } from 'firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Head from 'next/head';
import Link from 'next/link';

import GuestBookItem from 'components/GuestBookItem';

import { db } from 'lib/firebase/initFirebase';

type GuestBook = {
  name: string;
  message: string;
};

const GuestBookPage = () => {
  const [guestBooks, setGuestBooks] = useState<GuestBook[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getGuestBook = async () => {
      setIsLoading(true);
      const q = query(collection(db, 'guest-books'), orderBy('createdAt', 'desc'));

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

  return (
    <Box as="main" bg="bg" minH="100vh">
      <Head>
        <title>Guest Book - Addin & Anis</title>
        <meta name="description" content="The wedding of Addin & Anis" />
        <link rel="icon" href="/addin-anis/favicon.ico" />
      </Head>

      <Container as={VStack} spacing="10" maxW="container.lg" textAlign="center" py="10" px="6">
        <Text fontSize="2xl">Guest Book</Text>

        <Link href="/" passHref>
          <HStack as="a" justifyContent="flex-start" w="full">
            <Button leftIcon={<FontAwesomeIcon icon={faArrowLeft} />} colorScheme="green">
              Kembali
            </Button>
          </HStack>
        </Link>

        {!isLoading ? (
          guestBooks.length > 0 ? (
            <SimpleGrid templateColumns={{ base: '1fr', lg: 'repeat(3, 1fr)' }} w="full" gap="4">
              {guestBooks.map((item, i) => (
                <GuestBookItem key={i} name={item.name} message={item.message} />
              ))}
            </SimpleGrid>
          ) : (
            <Box w="full" bg="cardBg" p="4" rounded="lg" color="white">
              <Text>Belum ada ucapan</Text>
            </Box>
          )
        ) : (
          <Center w="full" py="20">
            <Spinner />
          </Center>
        )}
      </Container>
    </Box>
  );
};

export default GuestBookPage;
