import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  ModalFooter,
  Button,
  Flex,
} from '@chakra-ui/react';
import { OpenseaAsset } from '../utils/api';
import { NFT } from './NFTBox';
import NFTImage from './NFTImage';
import { NFTTabs } from './NFTTabs';
import { OsIcon } from './icons/OsIcon';
import { CloseIcon } from '@chakra-ui/icons';

export type INFTModal = {
  isOpen: boolean;
  onClose: () => void;
  nft: NFT;
  nftAsset: OpenseaAsset | undefined;
  imageTransform: (url: string) => string;
};

export const NFTModal = ({ isOpen, onClose, nft, nftAsset, imageTransform }: INFTModal) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW="586px" bg="nft-bg">
          <ModalHeader p="13px">
            <NFTImage
              width={558}
              borderRadius={8}
              src={
                nftAsset && nftAsset.image_thumbnail_url
                  ? nftAsset.image_thumbnail_url
                  : imageTransform(nft.image || '')
              }
              alt=""
              marginBottom={2}
            />
            <Flex justify="space-between" mt="17px">
              <Flex align="flex-start">
                <Text mr="9px">#{nft.tokenID}</Text>
                <OsIcon />
              </Flex>
              {nft.isAvailable && (
                <Button
                  type="button"
                  fontSize="md"
                  colorScheme="yellow"
                  py="12px"
                  px="24px"
                  color="text"
                >
                  <Text mr="8px">
                    {nft.price}
                    <span style={{ marginLeft: '1px' }}>Ξ</span>
                  </Text>
                  Buy Now
                </Button>
              )}
            </Flex>
          </ModalHeader>
          <ModalBody mt="37px" px="12px">
            <NFTTabs traits={nft.traits} isOpen={isOpen} tokenID={nft.tokenID} />
          </ModalBody>

          <ModalFooter
            height="10vh"
            display="flex"
            justifyContent="center"
            alignItems="center"
            boxShadow="dark-lg"
          >
            <Flex my="16px">
              <Button mr={3} onClick={onClose}>
                <CloseIcon fontSize="8px" color="inherit" mr="14px" />
                Close
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
