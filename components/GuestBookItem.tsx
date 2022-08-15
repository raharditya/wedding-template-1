import { VStack, Text, Divider } from '@chakra-ui/layout';

type GuestBookItemProps = {
  name: string;
  message: string;
};

const GuestBookItem = ({ name, message }: GuestBookItemProps) => {
  return (
    <VStack color="white" bg="cardBg" p="4" rounded="lg" w="full" alignItems="flex-start" textAlign="start">
      <Text fontFamily="Satisfy" fontSize={{ base: 'lg', lg: 'xl' }}>
        {name}
      </Text>
      <Divider w="200px" />
      <Text fontSize={{ base: 'base', lg: 'lg' }}>{message}</Text>
    </VStack>
  );
};

export default GuestBookItem;
