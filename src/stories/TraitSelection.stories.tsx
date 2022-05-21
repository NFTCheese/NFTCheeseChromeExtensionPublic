import { Story } from '@storybook/react'
import { Center } from '@chakra-ui/react'
import TraitSelection from '../component/TraitSelection'
import { setAllTraits, batchSelectTraits } from '../state/store'
import traits from '../mockupData/traits'
import { useDispatch } from 'react-redux'
import { ITraitSelectionProps } from '../component/TraitSelection'
import { useEffect } from 'react'

// import Filters from '../components/SearchResults/Filters';
export default {
  title: 'TraitSelection',
  component: TraitSelection,
  argTypes: { 
    onSelect: { action: 'onSelect' },
    numberOfSelectedTraits: {
      type: { name: 'number', required: false },
      defaultValue: 3
    }
  }
}

type TTraitsTemplateArgs = {
  numberOfSelectedTraits: number
} & ITraitSelectionProps
const Template: Story<TTraitsTemplateArgs> = (args) => {
  const { numberOfSelectedTraits, ...props} = args
  const dispatch = useDispatch()
  useEffect(() => {
    const selectedTraits = traits.slice(0, numberOfSelectedTraits)
    dispatch(setAllTraits([...traits]))
    dispatch(batchSelectTraits(selectedTraits))
  })
  return (
    <Center height="100%" bg="#000" width="100%">
      <TraitSelection
        {...(props as ITraitSelectionProps)}
      />
    </Center>
  )
}

export const Default = Template.bind({})
Default.args = {
  width: 600,
  height: 800
}
export const NoTraitsSelected = Template.bind({})
NoTraitsSelected.args = {
  numberOfSelectedTraits: 0,
  width: 600,
  height: 800
}
