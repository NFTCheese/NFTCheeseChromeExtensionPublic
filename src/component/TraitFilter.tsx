import { AddIcon, Icon, MinusIcon } from "@chakra-ui/icons";
import {
  Accordion, AccordionButton, AccordionItem, AccordionPanel, Box, Button, ButtonGroup, Checkbox, CloseButton, HStack, Input, Text, VStack
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";





type AllTraitsProp = {
  traitTitle: string,
  traitProperties: {
    traitType: string, rarenessPercentage: number, traitTitle: string
  }[]
}[]

// For each tag the user selects
type AllTraitTags = {
  traitTitle: string,
  traitType: string
  tagId: string
}


const TraitTag = ({ tag }: { tag: AllTraitTags }) => {
  const { traitTitle, traitType } = tag
  return <HStack bg='#383838'
    borderRadius='6px !important'
    w='fit-content'
    p='6px'
    whiteSpace='nowrap'
    textTransform='uppercase'
    color='rgba(255, 255, 255, 0.52) !important'

  >
    <Text as='span'
      fontWeight='400'
      fontSize={'14px'}
      color='rgba(255, 255, 255, 0.52) !important'
    >
      {traitTitle}:{traitType}
    </Text>
    <CloseButton />
  </HStack>
}


const checkSvgIcon = () => {
  return <>
    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M3.00025 8.00057C2.73625 8.00057 2.48125 7.89657 2.29325 7.70757L0.29325 5.70757C-0.09775 5.31657 -0.09775 4.68457 0.29325 4.29357C0.68425 3.90257 1.31625 3.90257 1.70725 4.29357L2.84525 5.43157L6.16825 0.445572C6.47425 -0.0144275 7.09425 -0.138428 7.55525 0.168572C8.01425 0.475572 8.13825 1.09557 7.83225 1.55557L3.83225 7.55557C3.66625 7.80457 3.39625 7.96657 3.09925 7.99557C3.06525 7.99857 3.03325 8.00057 3.00025 8.00057Z" fill="white" fill-opacity="0.88" />
    </svg>

  </>
}

const closeSvgIcon = () => {
  return <>
    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M5.41413 4.00001L7.70713 1.70701C8.09813 1.31601 8.09813 0.684006 7.70713 0.293006C7.31613 -0.0979941 6.68413 -0.0979941 6.29313 0.293006L4.00013 2.58601L1.70713 0.293006C1.31613 -0.0979941 0.684128 -0.0979941 0.293128 0.293006C-0.0978721 0.684006 -0.0978721 1.31601 0.293128 1.70701L2.58613 4.00001L0.293128 6.29301C-0.0978721 6.68401 -0.0978721 7.31601 0.293128 7.70701C0.488128 7.90201 0.744128 8.00001 1.00013 8.00001C1.25613 8.00001 1.51213 7.90201 1.70713 7.70701L4.00013 5.41401L6.29313 7.70701C6.48813 7.90201 6.74413 8.00001 7.00013 8.00001C7.25613 8.00001 7.51213 7.90201 7.70713 7.70701C8.09813 7.31601 8.09813 6.68401 7.70713 6.29301L5.41413 4.00001Z" fill="white" fill-opacity="0.88" />
    </svg>


  </>
}


const TraitFilter = ({ NFTs }: { NFTs: any }) => {

  // const allTraitTags: TraitTag = [

  // ]


  const allTraits: AllTraitsProp = [
    {
      traitTitle: 'Type',
      traitProperties: [
        { traitType: 'Human', rarenessPercentage: 0.1, traitTitle: 'Type' },
        { traitType: 'Blue', rarenessPercentage: 5, traitTitle: 'Type' },
        { traitType: 'Red', rarenessPercentage: 15, traitTitle: 'Type' }]
    },

    {
      traitTitle: 'Special',
      traitProperties: [
        { traitType: 'Human', rarenessPercentage: 0.1, traitTitle: 'Special' },
        { traitType: 'Blue', rarenessPercentage: 0.1, traitTitle: 'Special' },
        { traitType: 'Red', rarenessPercentage: 0.1, traitTitle: 'Special' }]
    },


    {
      traitTitle: 'Clothing',
      traitProperties: [
        { traitType: 'Human', rarenessPercentage: 0.1, traitTitle: 'Clothing' },
        { traitType: 'Blue', rarenessPercentage: 0.1, traitTitle: 'Clothing' },
        { traitType: 'Red', rarenessPercentage: 0.1, traitTitle: 'Clothing' }]
    },
    {
      traitTitle: 'Offhand',
      traitProperties: [
        { traitType: 'Human', rarenessPercentage: 0.1, traitTitle: 'Offhand' },
        { traitType: 'Blue', rarenessPercentage: 0.1, traitTitle: 'Offhand' },
        { traitType: 'Red', rarenessPercentage: 0.1, traitTitle: 'Offhand' }]
    },
    {
      traitTitle: 'Hair',
      traitProperties: [
        { traitType: 'Human', rarenessPercentage: 0.1, traitTitle: 'Hair' },
        { traitType: 'Blue', rarenessPercentage: 0.1, traitTitle: 'Hair' },
        { traitType: 'Red', rarenessPercentage: 0.1, traitTitle: 'Hair' }]
    },
    {
      traitTitle: 'HeadGear',
      traitProperties: [
        { traitType: 'Human', rarenessPercentage: 0.1, traitTitle: 'HeadGear' },
        { traitType: 'Blue', rarenessPercentage: 0.1, traitTitle: 'HeadGear' },
        { traitType: 'Red', rarenessPercentage: 0.1, traitTitle: 'HeadGear' }]
    },


  ]

  // const [allTraitList, setAllTraits] = useState<AllTraitsProp>(allTraits)
  const [allTraitTag, setAllTraitTag] = useState<AllTraitTags[]>([])

  useEffect(() => {
    console.log(allTraitTag)
  }, [allTraitTag])


  console.log(NFTs)

  return <VStack as='section' bg='#292929'
    position='relative'
    w={{
      base: '90%'
      , md: '50%'
    }} pl='23px' pt='25px'
    mb='12'
    mt='24px'

    h='fit-content'
    align={'flex-start'}
    fontSize='16px'
    spacing={'19px'}
    sx={{

      '*:focus,*:focus-visible,*:focus-within': {
        boxShadow: '0 0 0 0px #000 !important',
        outline: 'none'
      },
      '.nftcheese__allTags':
      {
        pb: '20px',
        w: '100%',
        overflowX: 'auto',
        overflowY: 'hidden',

      },
      '.nftcheese__title': {
        color: 'rgba(255, 255, 255, 0.88)',
        lineHeight: '24px',
        letterSpacing: '0.2px',

      }
    }}
    pb='70px'
  >

    <Text
      className="nftcheese__title"
    >Selected traits (7)</Text>


    {/* All Tags */}
    <HStack className="nftcheese__allTags"
      spacing='13px'
      // bg='red'
      minH={'70px'}
    >
      {allTraitTag.map((traitTag: AllTraitTags) => <React.Fragment key={traitTag.tagId}>
        <TraitTag tag={traitTag} />
      </React.Fragment>

      )}
    </HStack>
    {/* All Tags */}


    <Text
      className="nftcheese__title">Filter traits (7)</Text>


    {/* Accordion */}
    <Accordion allowToggle w='100%' pr='23px'>
      {allTraits.map(traits => {
        const { traitProperties, traitTitle } = traits

        return <>
          <AccordionItem>
            {({ isExpanded }) => (
              <>
                <h2 >
                  <AccordionButton w='100%' px='0px !important' py='14px'>
                    <Text flex='1' textAlign='left' color='rgba(255, 255, 255, 0.88)' fontSize='16px' fontWeight={700} textTransform='uppercase' w='100%'>
                      {traitTitle}
                    </Text>
                    {isExpanded ? (
                      <MinusIcon w='12.67px' h='12.67px' color={'rgba(255, 255, 255, 0.88)'} />
                    ) : (
                      <AddIcon w='12.67px' h='12.67px' color={'rgba(255, 255, 255, 0.88)'} />
                    )}
                  </AccordionButton>
                </h2>


                {/* List of Trait Types */}
                <AccordionPanel pb={4}>
                  <Input mb='20px' bg='rgba(33, 33, 33, 1)' border='0px solid #383838' borderRadius={'6px'} placeholder='Search....' _placeholder={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.52)' }}
                    color='rgba(255, 255, 255, 0.88)'
                    _focusWithin={{ outline: 'none' }}
                  />

                  <VStack spacing='14px' align='flex-start'>
                    {traitProperties.map((prop, index) => <>
                      <HStack as='span' spacing={prop.rarenessPercentage <= 2 ? '36px' : '54px'} justify={'space-between'}>

                        <HStack as='label' htmlFor={`nftcheese__${prop.traitType}`}>
                          <Checkbox border='2px solid #474747' w='20px' h='20px' borderRadius=' 4px' id={`nftcheese__${prop.traitType}`}
                            // isChecked={true}
                            onChange={(e) => {
                              const tagId = `${prop.traitTitle}-${prop.traitType}-${index}`
                              const isChecked: boolean = e.target.checked
                              if (isChecked) {
                                setAllTraitTag([...allTraitTag, { traitTitle: prop.traitTitle, traitType: prop.traitType, tagId }])
                                console.log(isChecked, index)
                              }
                              else {
                                setAllTraitTag(allTraitTag.filter((traitTag: AllTraitTags) => traitTag.tagId != tagId))
                              }
                            }}
                          />
                          <Text color='rgba(255, 255, 255, 0.88)' fontSize='14px' letterSpacing={'0.2px'}>{prop.traitType}</Text>
                        </HStack>


                        {/* Tag Rarity */}
                        <Box as='span' fontSize='12px' py='4px' px='8px' borderRadius="6px" w='fit-content'
                          bg={prop.rarenessPercentage <= 2 ? '#D38117' : '#666666'} letterSpacing='0.2px' color='rgba(255, 255, 255, 0.88)'>{prop.rarenessPercentage <= 2 ? prop.rarenessPercentage + '%' + ' Rare' : prop.rarenessPercentage + '%'} </Box>
                      </HStack>

                    </>)}
                  </VStack>



                </AccordionPanel>
                {/* List of Trait Types */}

              </>
            )}
          </AccordionItem>

        </>

      })}
    </Accordion>
    {/* Accordion */}




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
      <Button bg='#159D50' borderRadius='6px'
        py='10px'
        px='20px'
        fontWeight={400}

        colorScheme={'green'}
        leftIcon={<Icon as={checkSvgIcon} fontSize={'9px'} fontWeight={600} />}
        color='rgba(255, 255, 255, 0.88)'

      >Confirm</Button>
    </ButtonGroup>

    <Box
      background={'linear-gradient(270deg, #1B1B1B 0%, rgba(41, 41, 41, 0) 100%)'}
      w='100%'
      h='18px'
      position='relative'
      left='0'
      right='0'
      className="nftcheese__linear"
      bottom='-14px'
    />


  </VStack>

};

export default TraitFilter
