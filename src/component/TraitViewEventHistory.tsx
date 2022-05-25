import { Box, ButtonGroup, Divider, Tabs, TabList, TabPanels, Tab, TabPanel, Icon, Button, HStack, Image, Text, useColorModeValue, VStack } from "@chakra-ui/react";
import N_Avatar from '../assets/images/nft-avatar-1.png'
import TraitGraphTab from "./TraitGraphTab";



const closeSvgIcon = () => {
    return <>
        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M5.41413 4.00001L7.70713 1.70701C8.09813 1.31601 8.09813 0.684006 7.70713 0.293006C7.31613 -0.0979941 6.68413 -0.0979941 6.29313 0.293006L4.00013 2.58601L1.70713 0.293006C1.31613 -0.0979941 0.684128 -0.0979941 0.293128 0.293006C-0.0978721 0.684006 -0.0978721 1.31601 0.293128 1.70701L2.58613 4.00001L0.293128 6.29301C-0.0978721 6.68401 -0.0978721 7.31601 0.293128 7.70701C0.488128 7.90201 0.744128 8.00001 1.00013 8.00001C1.25613 8.00001 1.51213 7.90201 1.70713 7.70701L4.00013 5.41401L6.29313 7.70701C6.48813 7.90201 6.74413 8.00001 7.00013 8.00001C7.25613 8.00001 7.51213 7.90201 7.70713 7.70701C8.09813 7.31601 8.09813 6.68401 7.70713 6.29301L5.41413 4.00001Z" fill="white" fillOpacity="0.88" />
        </svg>


    </>
}


const etherScanSvg = () => {
    return <>
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
            <rect width="13" height="13" fill="url(#pattern0)" />
            <defs>
                <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use xlinkHref="#image0_1_3686" transform="scale(0.0111111)" />
                </pattern>
                <image id="image0_1_3686" width="90" height="90" xlinkHref="data:image/png;base64,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" />
            </defs>
        </svg>

    </>
}

const TraitViewEventHistory = () => {
    return <VStack h='fit-content' w={{ base: "50%", lg: '40%' }} bg={useColorModeValue("#212121", '#fff')} mx='auto' mt='4' pt='3' pb='20'
        boxShadow='14px 17px 40px 4px rgba(173, 173, 173, 0.08)' borderRadius={'10px'}
        px='3'
        minH='48'
        position={'relative'}
        sx={{
            '*,*:focus,*:focus-visible,*:focus-within': {
                outline: 'none',
                boxShadow: '0 0 0 0pc #000 !important',
            }
        }}
        spacing='4'
    >
        <Box as='span' w='100%' h='90%' bg='yellow'>
            <Image src={N_Avatar}
                alt='NFt Image' w='100%' h='100%' objectFit={'cover'} borderRadius='10px' />
        </Box>


        <Box h='fit-content' w='full' >
            <HStack justify='space-between'>
                <HStack as='span' align='center'>
                    <Icon as={etherScanSvg} />
                    <Text color='#fff' fontSize={'sm'}>#1142</Text>
                </HStack>
                <Button bg='#E0AF00' fontSize='12px' color='white' size='sm'> 27 Ξ  Buy now</Button>
            </HStack>
        </Box>

        <Tabs isFitted w='100%' variant='line' p='0px' >
            <TabList color='#fff' bg='transparent'>
                <Tab _selected={{ color: '#fff', borderColor: '#E0AF00' }} borderColor='#212121' fontSize='xs'>Transaction</Tab>
                <Tab _selected={{ color: '#fff', borderColor: '#E0AF00' }} borderColor='#212121' fontSize='xs'>Traits</Tab>
            </TabList>

            <TabPanels w='full' p='0px !important' position='relative' >
                <TabPanel>
                    <TraitGraphTab />
                </TabPanel>

                <TabPanel w='full' px='2' mt='4'>
                    <VStack w='full' spacing='4'>
                        {[1, 2, 3, 4].map((ev: any) => <>
                            <HStack w='full' fontSize='xs' justify='space-between'>
                                <Text as='span' color='rgba(255, 255, 255, 0.7) !important'> Voting Power: 1</Text>
                                <Box as='span' color='#000 !important' bg='#E0AF00' px='4' py='1' borderRadius={'5px'}>
                                    <Text as='span' fontWeight={800} fontSize='sm'>
                                        Epic:2.05%-23Ξ {ev}
                                    </Text>
                                </Box>
                                {/* <Text as='span'></Text> */}
                            </HStack>

                        </>)}

                        <Divider />



                    </VStack>
                </TabPanel>
            </TabPanels>
        </Tabs>
        <Box
            // background={'green'}
            background={'linear-gradient(270deg, #1B1B1B 0%, rgba(41, 41, 41, 0) 100%)'}
            w='100%'
            h='18px'
            position='absolute'
            left='0'
            right='0'
            className="nftcheese__linear"
            bottom='55px'
        />


        <ButtonGroup as={HStack} w='full' bg='#292929'
            position={'absolute'} bottom='0' left='0' right='0' minH={14} justify='center' size='sm'
            color='#fff !important'
            spacing='14px'
            shadow='sm'
        >

            <Button colorScheme='gray' bg='#474747'
                py='10px'
                px='20px'
                fontWeight={400}
                leftIcon={<Icon as={closeSvgIcon} fontSize={'9px'} fontWeight={600} />}
                borderRadius='6px' color='rgba(255, 255, 255, 0.88)'>Cancel</Button>
        </ButtonGroup>
        {/* Tabs */}


    </VStack>
};


export default TraitViewEventHistory
