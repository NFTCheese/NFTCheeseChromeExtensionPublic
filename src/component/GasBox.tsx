import { Box, Text, Flex, VStack, useColorMode, useColorModeValue } from '@chakra-ui/react'

export type GasBoxProps = {
  priorityFee: number;
  maxFee: number;
  probability: number;
  isRecommended: boolean;
}

// This function is used to generate the color for Probability

export const GasBox = ({ ...props }: GasBoxProps) => {
  const {colorMode} = useColorMode();
  return (
    <Box w={'200px'}>
      <Box
        maxW='sm'
        borderWidth='1px'
        borderRadius='lg'
        overflow='hidden'
        bg={useColorModeValue('white', '#333333')}
        color="text"
        border='none'
        textAlign={'center'}
      >
        <VStack p='3'>
          <Flex>
            <Text
              color={useColorModeValue('gray.800', 'gray.100')}
            >
              Priority Fee:&nbsp;
            </Text>
            <Text
              color='text'
            >{props.priorityFee} GWEI</Text>
          </Flex>
          <Flex>
            <Text
              color={useColorModeValue('gray.800', 'gray.100')}
            >
              Max Fee:&nbsp;
            </Text>
            <Text
              color='text'
            >{props.maxFee} GWEI</Text>
          </Flex>

          <Flex>
            <Text
              color={`hsla(${((props.probability || 0) - 80) * 5},90%,${colorMode === 'light' ? 40 : 60}%,1)`}
            >
              {props.probability}% Probability
            </Text>
          </Flex>
        </VStack>

      </Box>
      <Box
        color='green'
        textAlign={'center'}
      >
        {props.isRecommended && <Text>Recommended</Text>}
      </Box>
    </Box>
  )
}
