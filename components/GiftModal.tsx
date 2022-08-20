import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalProps,
  StackDivider,
  Text,
  HStack,
  VStack,
} from '@chakra-ui/react';

const GiftModal = ({ isOpen, onClose, ...props }: Pick<ModalProps, 'isOpen' | 'onClose'>) => {
  return (
    <Modal size="xl" isOpen={Boolean(isOpen)} onClose={onClose as () => void} closeOnEsc={false} {...props}>
      <ModalOverlay />
      <ModalContent p="0" data-testid="confirmation-modal">
        <ModalCloseButton />

        <ModalHeader bg="white" px="6" borderTopRadius="md" fontSize="md" fontWeight="bold">
          Wedding Gift
        </ModalHeader>

        <ModalBody as={VStack} spacing="4" pb="6" bg="white" borderBottomRadius="md">
          <HStack spacing="6" w="full" divider={<StackDivider />}>
            <VStack w="full">
              <Text>Mandiri</Text>
              <Text fontWeight="bold" fontSize="lg">
                1380019909618
              </Text>
              <Text opacity="0.8">A/n Muhammad Syafruddin</Text>
            </VStack>
            <VStack w="full">
              <Text>Bjb</Text>
              <Text fontWeight="bold" fontSize="lg">
                0090012665100
              </Text>
              <Text opacity="0.8">A/n Anisa Trias Viyana</Text>
            </VStack>
          </HStack>

          <VStack spacing="4">
            <Text mt="8" fontSize="sm" fontWeight="bold">
              Alamat
            </Text>
            <Text mt="-4" w="80%" textAlign="center">
              Keden RT01 RW04 Kelurahan Sidoharjo, Kecamatan Sidoharjo, Kabupaten Wonogiri, Jawa Tengah
            </Text>

            <Button
              as="a"
              href="https://maps.app.goo.gl/5Zbcz2BafQ9U5CZe6"
              target="_blank"
              rel="noopener noreferrer"
              colorScheme="blue"
              size="sm"
            >
              Lihat Lokasi
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default GiftModal;
