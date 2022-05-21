import { createSelector } from "@reduxjs/toolkit";
import { TGroupedTraits, TraitWithUniqueScore } from "../../../types";
import { RootState } from "../../store";

export const selectGroupedTraits = (state: RootState) => 
  state.traits.items.reduce((groups: TGroupedTraits, trait: TraitWithUniqueScore) => {
    groups[trait.property] = groups[trait.property] ?? []
    groups[trait.property].push(trait)
    return groups
  }, {})

export const selectTraitsGroup = createSelector(
  selectGroupedTraits,
  (_state: RootState, groupName: string) => groupName,
  (groupedTraits, groupName) => groupedTraits[groupName]
)

export const selectSelectedTraits = (state: RootState) => state.traits.items.filter(x => x.selected)