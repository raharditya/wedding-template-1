import { Circle, HStack, Text, VStack } from '@chakra-ui/layout';

type ClientCardProps = {
  name: React.ReactNode;
  parents: React.ReactNode;
  socials: {
    title: string;
    logo: React.ReactNode;
    url: string;
  }[];
};

const ClientCard = ({ name, parents, socials }: ClientCardProps) => {
  return (
    <VStack
      spacing="4"
      bg="cardBg"
      rounded="lg"
      p="4"
      pt="3"
      color="white"
      textAlign="start"
      minW="xs"
      alignItems="flex-start"
    >
      <Text fontFamily="Satisfy" fontSize="3xl" mb="-1">
        {name}
      </Text>

      <HStack>
        {socials?.map((social, i) => (
          <Circle
            key={`${social.title}-${i}`}
            as="a"
            target="_blank"
            rel="noopener noreferrer"
            href={social.url}
            size="8"
            p="2"
            bg="white"
            color="main"
          >
            {social.logo}
          </Circle>
        ))}
      </HStack>

      <HStack bg="white" w="full" rounded="md" px="2" py="1">
        <Circle size="10" bg="cardBg" />
        <Text color="main">{parents}</Text>
      </HStack>
    </VStack>
  );
};

export default ClientCard;
