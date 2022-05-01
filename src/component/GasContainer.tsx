import { Box, Text, Flex } from '@chakra-ui/react'
import { GasBox, GasBoxProps } from './GasBox';

export type GasContainerProps = {
  gasBoxes: GasBoxProps[]
}

export const GasContainer = (props: GasContainerProps) => {
  // const [gasBox, setGasBox] = useState(props.gasBoxes)
  const gasBox = props.gasBoxes;
  return (
    <Box
      maxW="100%"
      overflow="auto"
      color="text"
    >
      <Flex>
        <Text
          fontSize="15px"
          fontWeight="bold"
          marginBottom="1rem"
        >
          Gas
        </Text>
        <Text
          paddingLeft="5px"
          paddingTop="5px"
          fontSize="8px"
        >
          &#9432; From <a rel="noreferrer" href="https://www.blocknative.com/gas-estimator" target="_blank">blocknative.com</a>
        </Text>
      </Flex>
      <Box
        gridTemplateColumns={'1fr 1fr 1fr 1fr'}
        columnGap="1rem"
        display="grid"
        flexWrap="wrap"
        marginBottom={'1rem'}
        maxHeight={160}
        overflow={'auto'}
      >
        {gasBox.length === 0 &&
          <Text color="gray">No info</Text>
        }
        {gasBox.map((box, i) => {
          return (
            <Box key={i}>
              <GasBox
                priorityFee={box.priorityFee}
                maxFee={box.maxFee}
                probability={box.probability}
                isRecommended={box.isRecommended}
              />
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}