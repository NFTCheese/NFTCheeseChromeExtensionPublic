import { Input, InputGroup, InputLeftAddon } from "@chakra-ui/input";
import { Box, Grid, Text } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import EthIcon from "./icons/EthIcon";

type IPriceRangePickerProps = {
  onChange: (minPrice: number, maxPrice: number) => void
}

export default function PriceRangePicker(props: IPriceRangePickerProps) {
  const minPrice = 0.001;
  const [maxPrice, setMaxPrice] = useState(0.5);

  useEffect(() => {
    props.onChange(minPrice, maxPrice)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maxPrice])

  return (
    <Box color="white">
      <Text marginBottom="2">Choose price range</Text>
      <Grid
        columnGap={"4"}
      >
        <Box>
          <Text fontWeight="bold" marginBottom="2">Max</Text>
          <InputGroup
            borderColor={'border-color'}
            bg={'transparent'}
          >
            <InputLeftAddon
              bg={'transparent'}
              borderRight="none"
            >
              <EthIcon width={'10px'} />
            </InputLeftAddon>
            <Input
              color={'text'}
              min={minPrice}
              type='number'
              value={maxPrice}
              placeholder='MAX'
              onChange={(e) => { setMaxPrice(parseFloat(e.currentTarget.value)) }}
            />
          </InputGroup>
        </Box>
      </Grid>
    </Box>
  )
}