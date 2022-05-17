import { AddIcon, MinusIcon, CloseIcon } from '@chakra-ui/icons';
import { HStack, Text } from '@chakra-ui/layout';
import { Accordion, AccordionButton, AccordionItem, AccordionPanel, Box, Checkbox, Input, Tag, TagCloseButton, TagLabel, useColorModeValue, VStack } from '@chakra-ui/react';
import _ from 'lodash'
import { Button } from '@chakra-ui/button';

// const Tag



const TraitTag = ({ title }: { title: string }) => {
  // const [traitName, setTraitName] = useState('')
  // const [traitType, setTraitType] = useState('')
  return (
    <Box as='span'

    >

      <Tag size='md' variant='solid' bg='#383838' colorScheme='gray' w='full' _hover={{ bg: "#AF8B0B" }} flex='1' cursor={'pointer'} >

        <TagLabel fontWeight={'400'} fontSize='xs'>Clothing:
          <Text as='span' fontSize='inherit' textTransform={'uppercase'} color='inherit' pl='1'>

            {title}
          </Text>
        </TagLabel>
        <TagCloseButton />
      </Tag>
    </Box>)
}

type traitsProps = {
  traitName: string
  props: { title: string, percentage: string }[]
}[]

const allTraits: traitsProps = [

  {
    traitName: 'Type',
    props: [{ title: 'human', percentage: '0.1%' },
    { title: 'blue', percentage: '5%' },
    { title: 'red', percentage: '15%' }

    ]

  }
  ,
  {
    traitName: 'Special',
    props: [{ title: 'human', percentage: '0.1%' },
    { title: 'blue', percentage: '5%' },
    { title: 'red', percentage: '15%' }

    ]

  }
  ,
  {
    traitName: 'Clothing',
    props: [{ title: 'human', percentage: '0.1%' },
    { title: 'blue', percentage: '5%' },
    { title: 'red', percentage: '15%' }

    ]

  }
  ,
  {
    traitName: 'Offhand',
    props: [{ title: 'human', percentage: '0.1%' },
    { title: 'blue', percentage: '5%' },
    { title: 'red', percentage: '15%' }

    ]

  }


]


const TraitSelector = ({ NFTs }: { NFTs: any }) => {
  console.log(NFTs);
  return (
    <VStack as="section" w="95%" mx="auto" h="fit-content" bg="#292929" mt="8" align='flex-start' px='23px' py='20px'>

      {/* Selected Traits */}
      <Text color='rgba(255, 255, 255, 0.88)' fontSize='16px'> Selected traits (0)</Text>


      {/* Tags */}
      <HStack spacing={'4'} w='100%' mx='auto' overflowX={'auto'} overflowY='hidden'
        pt='5px'
        className=''
      >
        <TraitTag title='title' />
        <TraitTag title='title' />
        <TraitTag title='title' />
        <TraitTag title='title' />
        <TraitTag title='title' />
      </HStack>

      {/* Tags */}
      <Text color={useColorModeValue('gray.500', 'gray.200')} fontSize='xs'> Filter traits (0) </Text>

      {/* Options to choose from */}
      <Accordion color='white' allowToggle w='full'>

        {allTraits.map(trait => {

          const { traitName, props } = trait
          // const {  title } = props

          return <AccordionItem w='100%'
            border='1px solid gray'
            key={_.random(10)}
          >
            {({ isExpanded }: { isExpanded: any }) => (
              <>
                <h2>
                  <AccordionButton>
                    <Text as='span' fontSize='xs' flex='1' textAlign='left' color='white' textTransform='uppercase' fontWeight='bold'>
                      {traitName}
                    </Text>

                    {isExpanded ? (
                      <MinusIcon fontSize='.6em' fontWeight='700' />
                    ) : (
                      <AddIcon fontSize='.6em'
                        fontWeight='700' />

                    )}
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Input size='sm' placeholder='Search...' />
                  <VStack align={'flex-start'} pt='4' w='full' spacing='4'>

                    {props.map(prop => <>
                      <HStack key={_.random(10)} as='span' fontSize='xs'>
                        <Checkbox />
                        <Text textTransform={'capitalize'}>{prop.title}</Text>
                        <Box
                          px='2'
                          p='1'
                          bg='gray.300'
                        >{prop.percentage}</Box>
                      </HStack>
                    </>)}

                  </VStack>
                </AccordionPanel>
              </>

            )}
          </AccordionItem>

        })}
      </Accordion>
      <HStack>
        <Button leftIcon={<CloseIcon />} >Cancel</Button>
        <Button>Confirm</Button>
      </HStack>


      {/* Options to choose from */}

    </VStack>
  );
};

export default TraitSelector;
