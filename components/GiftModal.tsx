import {
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
  Stack,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

const GiftModal = ({ isOpen, onClose, ...props }: Pick<ModalProps, 'isOpen' | 'onClose'>) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        toast.success('Nomor rekening berhasil disalin');
      },
      () => {
        toast.error('Nomor rekening gagal disalin');
      }
    );
  };

  return (
    <Modal
      size={{ base: 'sm', lg: 'xl' }}
      isOpen={Boolean(isOpen)}
      onClose={onClose as () => void}
      closeOnEsc={false}
      {...props}
    >
      <ModalOverlay />
      <ModalContent p="0" data-testid="confirmation-modal">
        <ModalCloseButton />

        <ModalHeader bg="white" px="6" borderTopRadius="md" fontSize="md" fontWeight="bold">
          Wedding Gift
        </ModalHeader>

        <ModalBody as={VStack} spacing="4" pb="6" bg="white" borderBottomRadius="md">
          <Stack
            direction={{ base: 'column', lg: 'row' }}
            spacing="6"
            w="full"
            divider={<StackDivider />}
            alignItems="flex-start"
          >
            <VStack w="full">
              <Text>Mandiri</Text>
              <Text fontWeight="bold" fontSize="lg">
                1380019909618
              </Text>
              <Text opacity="0.8" textAlign="center">
                A/n Muhammad Syafruddin
              </Text>

              <Button
                variant="outline"
                colorScheme="green"
                size={{ base: 'sm' }}
                leftIcon={<FontAwesomeIcon icon={faCopy} />}
                onClick={() => copyToClipboard('1380019909618')}
              >
                Salin
              </Button>
            </VStack>
            <VStack w="full">
              <Text>Bjb</Text>
              <Text fontWeight="bold" fontSize="lg">
                0090012665100
              </Text>
              <Text opacity="0.8" textAlign="center">
                A/n Anisa Trias Viyana
              </Text>

              <Button
                variant="outline"
                colorScheme="green"
                size={{ base: 'sm' }}
                leftIcon={<FontAwesomeIcon icon={faCopy} />}
                onClick={() => copyToClipboard('0090012665100')}
              >
                Salin
              </Button>
            </VStack>
          </Stack>

          <VStack spacing="4">
            <Text mt="8" fontSize="sm" fontWeight="bold">
              Alamat
            </Text>
            <Text mt="-4" w={{ base: 'full', lg: '80%' }} textAlign="center">
              Keden RT01 RW04 Kelurahan Sidoharjo, Kecamatan Sidoharjo, Kabupaten Wonogiri, Jawa Tengah
            </Text>

            <Button
              as="a"
              href="https://maps.app.goo.gl/5Zbcz2BafQ9U5CZe6"
              target="_blank"
              rel="noopener noreferrer"
              colorScheme="blue"
              size="sm"
              leftIcon={<FontAwesomeIcon icon={faLocationDot} />}
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
