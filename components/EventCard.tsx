import { Button } from '@chakra-ui/button';
import { Box, Heading, Text, VStack } from '@chakra-ui/layout';
import { faLocationPin } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type EventCardProps = {
  title: string;
  date: string;
  subDate: string;
  place: React.ReactNode;
  mapUrl: string;
};

const EventCard = ({ title, date, subDate, place, mapUrl }: EventCardProps) => {
  return (
    <VStack spacing="6" minW="xs" textAlign="center" color="main">
      <Heading fontSize="2xl">{title}</Heading>
      <Box fontFamily="Satisfy">
        <Text mb="-3" fontSize="4xl">
          {date}
        </Text>
        <Text fontSize="2xl">{subDate}</Text>
      </Box>

      <Text fontSize="lg" lineHeight="5" w="80%">
        {place}
      </Text>

      <Button
        as="a"
        target="_blank"
        rel="noopener noreferrer"
        href={mapUrl}
        colorScheme="blue"
        leftIcon={<FontAwesomeIcon icon={faLocationPin} />}
      >
        Lihat Lokasi
      </Button>
    </VStack>
  );
};

export default EventCard;