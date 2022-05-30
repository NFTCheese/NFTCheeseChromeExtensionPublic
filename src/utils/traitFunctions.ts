import { Dispatch, SetStateAction, ChangeEvent } from 'react';
import { TraitSelectable, TraitWithUniqueScore } from './../component/TraitSelection';

export const handleSelectedItemsChange = (
  selectedItems: TraitWithUniqueScore[],
  onSelect: (trait: TraitWithUniqueScore[]) => void
) => {
  onSelect(selectedItems);
};

export const scrollBarStyle = (
  scrollBarBG: string,
  scrollBarOutlineColor: string,
  scrollBarThumbBG: string
) => {
  return {
    '&::-webkit-scrollbar': {
      backgroundColor: scrollBarBG,
      borderRadius: '3px',
      width: '3px',
      outlineWidth: '2px',
      outlineColor: scrollBarOutlineColor,
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: scrollBarThumbBG,
      borderRadius: '3px',
      width: '3px',
    },
  };
};

export const removeItem = (
  sessionValues: TraitWithUniqueScore[],
  item: TraitWithUniqueScore,
  setSessionValues: Dispatch<SetStateAction<TraitWithUniqueScore[] | []>>
) => {
  const sessionCopy = [...sessionValues];
  const itemIndex = sessionCopy.findIndex(
    (trait) => trait.property === item.property && trait.value === item.value
  );
  const updatedSession = [...sessionCopy.slice(0, itemIndex), ...sessionCopy.slice(itemIndex + 1)];
  setSessionValues(updatedSession);
};

export const checkBox = (
  event: ChangeEvent<HTMLInputElement>,
  property: string,
  value: string,
  uniqueScore: number,
  setSessionValues: Dispatch<SetStateAction<TraitWithUniqueScore[] | []>>,
  sessionValues: TraitWithUniqueScore[]
) => {
  if (!event.target.checked) {
    const sessionCopy = [...sessionValues];
    const indexOfSessionItem = sessionCopy.findIndex(
      (element) => element?.property === property && element?.value === value
    );
    const updatedSession = [
      ...sessionCopy.slice(0, indexOfSessionItem),
      ...sessionCopy.slice(indexOfSessionItem + 1),
    ];
    setSessionValues(updatedSession);
  } else {
    setSessionValues([
      ...sessionValues,
      { property: property, value: value, uniqueScore: uniqueScore },
    ]);
  }
};

export const traitFilter = (
  event: ChangeEvent<HTMLInputElement>,
  mainProperty: string,
  setFilterInput: Dispatch<SetStateAction<string>>,
  traits: TraitWithUniqueScore[],
  setPropertyValues: Dispatch<SetStateAction<TraitWithUniqueScore[] | []>>
) => {
  setFilterInput(event.target.value);
  const valuesFilter = traits.filter(
    ({ property }: { property: string }) => property === mainProperty
  );
  if (event.target.value.length !== 0) {
    const values = valuesFilter.filter((item) =>
      item.value.toLowerCase().startsWith(event.target.value.toLowerCase())
    );
    setPropertyValues(values);
  } else {
    setPropertyValues([...valuesFilter]);
  }
};

export const traitWithLabel = (trait: TraitWithUniqueScore): TraitSelectable => {
  return {
    ...trait,
    label: `${trait.property} - ${trait.value}`,
  };
};

export const setPropValues = (
  isExpanded: boolean,
  properties: string[],
  traits: TraitWithUniqueScore[],
  setPropertyValues: Dispatch<SetStateAction<TraitWithUniqueScore[] | []>>,
  setFilter: Dispatch<SetStateAction<string | null>>,
  key: number
) => {
  if (isExpanded) return;
  const mainProperty = properties[key];
  const valuesFilter = traits.filter(
    ({ property }: { property: string }) => property === mainProperty
  );
  setPropertyValues(valuesFilter);
  if (valuesFilter.length > 4) {
    setFilter(mainProperty);
  }
};
