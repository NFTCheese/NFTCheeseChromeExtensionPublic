import { Box, HStack, Select, StackDivider, Text } from '@chakra-ui/react'
import { RangeSlider, RangeSliderTrack, RangeSliderFilledTrack, RangeSliderThumb } from '@chakra-ui/slider'
import { useState } from 'react'

type IRarityPickerProps = {
  maxRarity: number
	onSelect: (minRarity: number, maxRarity: number) => void
}

export default function RarityPicker(props: IRarityPickerProps) {
  const defaultEndValue = Math.round(5 / 100 * props.maxRarity)
  const [minVal, setMinVal] = useState(1)
  const [maxVal, setMaxVal] = useState(defaultEndValue);
  const [presetVal, setPresetVal] = useState<string | null>(null);

  function onChangeEnd(val: number[]) {
    const min = Math.round(val[0]);
    const max = Math.round(val[1]);
    props.onSelect(min, max);
    setMinVal(min);
    setMaxVal(max)
  }

  function onPresetSelect(preset: string) {
    setPresetVal(preset);
    if (preset === 'legend') {
      onChangeEnd([1, 0.1 / 100 * props.maxRarity])
    } else if (preset === 'epic') {
      onChangeEnd([0.1 / 100 * props.maxRarity, 1 / 100 * props.maxRarity])
    } else if (preset === 'rare') {
      onChangeEnd([1 / 100 * props.maxRarity, 10 / 100 * props.maxRarity])
    } else if (preset === 'uncommon') {
      onChangeEnd([10 / 100 * props.maxRarity, 50 / 100 * props.maxRarity])
    } else if (preset === 'common') {
      onChangeEnd([50 / 100 * props.maxRarity, props.maxRarity])
    }
  }

  return (
    <Box>
      <HStack
        spacing={6}
        divider={<StackDivider borderColor='border-color' />}
      >
        <Box flex={1}>
          <Text mb={2}>Pick the rarity: #{minVal} {'→'} #{maxVal}</Text>
          <Box display='flex' flexDir={'row'} justifyContent="space-between">
            <Text>1%</Text>
            <Text>100%</Text>
          </Box>
          <Box position="relative">
            <RangeSlider

              // itemRef={rangeRef}
              aria-label={['min', 'max']}
              colorScheme='orange.400'
              min={1}
              max={props.maxRarity}
              onChange={([min, max]) => {
                setPresetVal(null);
                setMinVal(min);
                setMaxVal(max)
              }}
              value={[minVal, maxVal]}
              defaultValue={[1, defaultEndValue]}
              onChangeEnd={onChangeEnd}
            >
              <RangeSliderTrack bg={'border-color'}>
                <RangeSliderFilledTrack bg={'orange.400'} />
              </RangeSliderTrack>
              <RangeSliderThumb boxShadow={'none'} boxSize={4} index={0} bg={'orange.400'} borderColor={'card-bg'} borderWidth={2}/>
              <RangeSliderThumb boxShadow={'none'} boxSize={4} index={1} bg={'orange.400'} borderColor={'card-bg'} borderWidth={2}/>
            </RangeSlider>
          </Box>

          <Box display='flex' flexDir={'row'} justifyContent="space-between">
            <Text>#1</Text>
            <Text>#{props.maxRarity}</Text>
          </Box>
        </Box>

        <Box>
          <Text mb={2}>Or pick a rarity preset</Text>
          <Select color={'text'} w={'178px'} onChange={(e) => onPresetSelect(e.currentTarget.value)} borderColor={'border-color'} placeholder='Custom'>
            <option selected={presetVal === 'legend'} value='legend'>Legend</option>
            <option selected={presetVal === 'epic'} value='epic'>Epic</option>
            <option selected={presetVal === 'rare'} value='rare'>Rare</option>
            <option selected={presetVal === 'uncommon'} value='uncommon'>Uncommon</option>
            <option selected={presetVal === 'common'} value='common'>Common</option>
          </Select>
        </Box>
      </HStack>
    </Box>
  )
}