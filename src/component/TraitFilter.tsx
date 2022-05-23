import { AddIcon, Icon, MinusIcon } from "@chakra-ui/icons";
import {
  Accordion, AccordionButton, AccordionItem, AccordionPanel, Box, Button, ButtonGroup, Checkbox, CloseButton, HStack, Input, Text, VStack
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";


// All Traits Properties
type traitPropertiesProp = {
  traitType: string, rarenessPercentage: number, traitTitle: string
}

type AllTraitsProp = {
  traitTitle: string,
  traitProperties: traitPropertiesProp[]
}

// Tracks number of individual traits property were checked by user
type TrackNumberOfTraitsClicked = {
  traitTitle: string
  numberOfTraitPropChecked: number
}

// For each checkbox the user clicks
type AllTraitTags = {
  traitTitle: string,
  traitType: string
  tagId?: string
}
type individualChosenTraitProp = {
  traitType: string,
  numberOfTraitChildrenCheck: number,
  tagId: string | null
}


//  Confirm Button Icon
const checkSvgIcon = () => {
  return <>
    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M3.00025 8.00057C2.73625 8.00057 2.48125 7.89657 2.29325 7.70757L0.29325 5.70757C-0.09775 5.31657 -0.09775 4.68457 0.29325 4.29357C0.68425 3.90257 1.31625 3.90257 1.70725 4.29357L2.84525 5.43157L6.16825 0.445572C6.47425 -0.0144275 7.09425 -0.138428 7.55525 0.168572C8.01425 0.475572 8.13825 1.09557 7.83225 1.55557L3.83225 7.55557C3.66625 7.80457 3.39625 7.96657 3.09925 7.99557C3.06525 7.99857 3.03325 8.00057 3.00025 8.00057Z" fill="white" fillOpacity="0.88" />
    </svg>

  </>
}
// Close Button Icon

const closeSvgIcon = () => {
  return <>
    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M5.41413 4.00001L7.70713 1.70701C8.09813 1.31601 8.09813 0.684006 7.70713 0.293006C7.31613 -0.0979941 6.68413 -0.0979941 6.29313 0.293006L4.00013 2.58601L1.70713 0.293006C1.31613 -0.0979941 0.684128 -0.0979941 0.293128 0.293006C-0.0978721 0.684006 -0.0978721 1.31601 0.293128 1.70701L2.58613 4.00001L0.293128 6.29301C-0.0978721 6.68401 -0.0978721 7.31601 0.293128 7.70701C0.488128 7.90201 0.744128 8.00001 1.00013 8.00001C1.25613 8.00001 1.51213 7.90201 1.70713 7.70701L4.00013 5.41401L6.29313 7.70701C6.48813 7.90201 6.74413 8.00001 7.00013 8.00001C7.25613 8.00001 7.51213 7.90201 7.70713 7.70701C8.09813 7.31601 8.09813 6.68401 7.70713 6.29301L5.41413 4.00001Z" fill="white" fillOpacity="0.88" />
    </svg>


  </>
}


const TraitFilter = ({ allTraits: traitsData }: { allTraits: AllTraitsProp[] }) => {


  // This contains every tag the user chooses
  const [allTraits, setAllTraits] = useState<any>([])
  const [allTraitTag, setAllTraitTag] = useState<AllTraitTags[]>([])


  // Records how many tags users have chosen in each traits type
  const [individualChosenTrait, setIndividualChosenTrait] = useState<individualChosenTraitProp[]>([])
  // const [userTextInput, setUserTextInput] = useState('')

  useEffect(() => {

    // const filteredArray = allTraits.map((trait) => ({ traitTitle: trait.traitTitle, searchTerm: '' }))
    const newArray: individualChosenTraitProp[] = traitsData.map(a => ({ traitType: a.traitTitle, numberOfTraitChildrenCheck: 0, tagId: null }))
    setIndividualChosenTrait(newArray)
    setAllTraits(traitsData)
  }, [traitsData])


  // handleFilterArray
  const handleFilterArray = (searchTerm: string, traitTitle: string) => {
    // const []
    if (allTraits || traitsData) {
      const searchTermByUser = searchTerm.trim().toLowerCase()
      const { traitProperties } = allTraits.find((prop: any) => prop.traitTitle == traitTitle)

      // If user typing then perform search
      if (searchTermByUser.length >= 1) {

        const searchArrayOfTrait = traitProperties.map((word: any) => {
          const traitTypeSearch = word.traitType.toLowerCase()
          if (traitTypeSearch.includes(searchTermByUser)) {
            return word;
          }
        }).filter((w: any) => w != undefined)


        const newArray = allTraits.map((trait: AllTraitsProp) => {
          if (trait.traitTitle == traitTitle) {
            return {
              ...trait, traitProperties: searchArrayOfTrait
            }
          }
          else { return trait }
        })


        setAllTraits(newArray)
        // console.log(newArray)

      }
      else {
        // else just return original data
        setAllTraits(traitsData)

      }

    }

  }

  const getNumberOfTraitChecked = (text: string): number => {
    if (individualChosenTrait && individualChosenTrait.length > 0) {
      return individualChosenTrait.find((o: any) => o.traitType == text)?.numberOfTraitChildrenCheck as number
    }
    return 0

  }


  // Counts every checkbox the user clicked

  const [checkedTraitCount, setCheckedTraitCount] = useState<number>(0)

  const [trackCheckedTraits, setTrackCheckedTraits] = useState<TrackNumberOfTraitsClicked[]>([])

  // This contains every tag the user chooses



  // This make sure a check box is unchecked when it's corrensponding tag was closed by a user
  const unCheckCheckBoxIfTagIsRemoved = (prop: any, index: number) => {
    const { traitTitle, traitType } = prop
    const tagId = `${traitTitle}-${traitType}-${index}`
    const isTagUnchecked = allTraitTag.some(tag => tag.tagId === tagId);
    return isTagUnchecked
  }

  return <VStack as='section' bg='#292929'
    position='relative'
    w={{
      base: '90%'
      , md: '50%'
      , lg: '40%'
    }} pl='23px' pt='25px'
    mx='auto'
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

    {/* Title */}
    <Text
      className="nftcheese__title"
    >Selected traits ( {checkedTraitCount} )</Text>


    {/* All Tags */}
    <HStack className="nftcheese__allTags"
      spacing='13px'
      // bg='red'
      minH={'70px'}
    >

      {/* All Traits Tag */}
      {allTraitTag.map(({ tagId, traitTitle, traitType }: AllTraitTags) => <React.Fragment key={tagId}>
        < HStack bg='#383838'
          key={tagId}
          borderRadius='6px !important'
          w='fit-content'
          px='6px'
          whiteSpace='nowrap'
          spacing={0}
          textTransform='uppercase'
          color='rgba(255, 255, 255, 0.52) !important'
          transition='0.15s all ease-in'
          _hover={{ bg: 'rgba(224, 175, 0, 0.73)' }}
          onClick={() => {
            // Search for this tag's id from the  allTraitTag's   tags array then delete it.
            const tagFilter = allTraitTag.filter((traitTag: AllTraitTags) => traitTag.tagId != tagId)

            const individualTagCount = individualChosenTrait.map((traitTag) => {
              if (traitTag.traitType == traitTitle) {
                return {
                  ...traitTag, numberOfTraitChildrenCheck: traitTag.numberOfTraitChildrenCheck <= 0 ? 0 : traitTag.numberOfTraitChildrenCheck - 1
                }
              }
              else {
                return traitTag
              }
            })



            // Update the number of checked tags remaining
            setCheckedTraitCount(checkedTraitCount <= 0 ? 0 : checkedTraitCount - 1)
            setAllTraitTag(tagFilter)
            setIndividualChosenTrait(individualTagCount)
          }}

          cursor='pointer'
        >
          <Text as='span'
            fontWeight='400'
            fontSize={'14px'}
            color='rgba(255, 255, 255, 0.52) !important'
          >
            {traitTitle}: {traitType}
          </Text>

          {/* This filters the tags when the closebutton icon is clicked on the tag */}
          <CloseButton fontSize={'8px'} px='2' />
        </HStack>
      </React.Fragment>

      )}


    </HStack>
    {/* All Tags */}


    <Text
      className="nftcheese__title">Filter traits ( {checkedTraitCount} )</Text>
    {/* Accordion */}
    <Accordion allowToggle w='100%' pr='23px'
    >
      {allTraits.map((traits: AllTraitsProp) => {
        const { traitProperties, traitTitle } = traits

        return <>

          <AccordionItem
            key={traitTitle}
            sx={{
              '.nftcheese___accordion--panel': {
                '&::-webkit-scrollbar': {
                  width: '5px',
                  height: '100%',
                },
                '&::-webkit-scrollbar-track': {
                  borderRadius: '10px',
                  bg: '#424242'
                }
                ,
                '&::-webkit-scrollbar-thumb': {
                  width: '5px',
                  'borderRadius': "10px",
                  backgroundColor: "#C4C4C4"
                }
              }

            }}
          >
            {({ isExpanded }: any) => (
              <>
                <h2>
                  <AccordionButton w='100%' px='0px !important' py='14px' >
                    <Text flex='1' textAlign='left' color='rgba(255, 255, 255, 0.88)' fontSize='16px' fontWeight={700} textTransform='uppercase' w='100%'>
                      {traitTitle}
                      <Text as='span' pl='1' color='inherit'>

                        {getNumberOfTraitChecked(traitTitle) <= 0 ? '' : `(${getNumberOfTraitChecked(traitTitle)})`}
                      </Text>
                    </Text>
                    {isExpanded ? (
                      <MinusIcon w='12.67px' h='12.67px' color={'rgba(255, 255, 255, 0.88)'} />
                    ) : (
                      <AddIcon w='12.67px' h='12.67px' color={'rgba(255, 255, 255, 0.88)'} />
                    )}
                  </AccordionButton>
                </h2>


                {/* List of Trait Types */}
                <AccordionPanel pb={4} h='40' overflowY={'auto'}
                  className='nftcheese___accordion--panel'  >
                  <Input mb='20px' bg='rgba(33, 33, 33, 1)' border='0px solid #383838' borderRadius={'6px'} placeholder='Search....' _placeholder={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.52)' }}
                    color='rgba(255, 255, 255, 0.88)'
                    _focusWithin={{ outline: 'none' }}
                    name={`${traitTitle}`}
                    onChange={(e: any) => {
                      // Filter's array
                      const userSearchTerm = e.target.value
                      handleFilterArray(userSearchTerm, traitTitle)
                    }}

                  />

                  <VStack spacing='14px' align='flex-start'

                  >
                    {traitProperties.map((prop: traitPropertiesProp, index: number) => <>

                      <HStack as='span' spacing={prop.rarenessPercentage <= 2 ? '36px' : '54px'} justify={'space-between'} w='50%'>

                        <Checkbox border='2px solid #474747' w='20px' h='20px' borderRadius=' 4px'
                          isChecked={unCheckCheckBoxIfTagIsRemoved(prop, index)}
                          onChange={(e: any) => {
                            const isChecked: boolean = e.target.checked

                            const tagId = `${prop.traitTitle}-${prop.traitType}-${index}`

                            const getNumberOfTraitPropCheckedForThisProperty = trackCheckedTraits.find(trackCheckedTrait => trackCheckedTrait.traitTitle === traitTitle)

                            const numberOfTraitPropCheckedForThisProperty = getNumberOfTraitPropCheckedForThisProperty?.numberOfTraitPropChecked as number

                            if (isChecked) {
                              setAllTraitTag([...allTraitTag, { traitTitle: prop.traitTitle, traitType: prop.traitType, tagId }])
                              // Counts Every Traits that is checked in all Traits category
                              setCheckedTraitCount(checkedTraitCount + 1)

                              // Counts Every Traits that is checked in all Traits category
                              setTrackCheckedTraits([...trackCheckedTraits, { traitTitle, numberOfTraitPropChecked: numberOfTraitPropCheckedForThisProperty ? numberOfTraitPropCheckedForThisProperty + 1 : 1 }])



                              // Records every individual checked traits.
                              const mapArray = individualChosenTrait.map(i => {
                                if (i.traitType == traitTitle) {
                                  return {
                                    ...i,
                                    numberOfTraitChildrenCheck: i.numberOfTraitChildrenCheck + 1
                                    , tagId,
                                  }
                                }
                                else {
                                  return i
                                }
                              })
                              setIndividualChosenTrait(mapArray)
                              getNumberOfTraitChecked(traitTitle)
                            }


                            else {
                              const mapArray = individualChosenTrait.map((i: any) => {
                                if (i.traitType == traitTitle) {
                                  return {
                                    ...i,
                                    numberOfTraitChildrenCheck: i.numberOfTraitChildrenCheck <= 0 ? 0 : i.numberOfTraitChildrenCheck - 1,
                                    tagId
                                  }
                                }
                                else {
                                  return i
                                }
                              })
                              setIndividualChosenTrait(mapArray)
                              // Counts how checkbox have been checked
                              setCheckedTraitCount(checkedTraitCount <= 0 ? 0 : checkedTraitCount - 1)


                              setAllTraitTag(allTraitTag.filter((traitTag: AllTraitTags) => traitTag.tagId != tagId))
                              getNumberOfTraitChecked(traitTitle)
                            }
                            console.log(individualChosenTrait, 'individualChosenTrait  check')

                          }}
                        >

                          <Text color='rgba(255, 255, 255, 0.88)' fontSize='14px' letterSpacing={'0.2px'}>{prop.traitType}</Text>
                        </Checkbox>


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


  </VStack >

};

export default TraitFilter
