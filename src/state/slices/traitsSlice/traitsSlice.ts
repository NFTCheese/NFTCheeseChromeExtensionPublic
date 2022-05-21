import { createSlice } from '@reduxjs/toolkit';
import { TraitWithUniqueScore } from '../../../types';

export type TraitWithUniqueScoresState = {
  items: TraitWithUniqueScore[],
  status: string,
  error?: string | null
}

export const initialTraitsState: TraitWithUniqueScoresState = {
  items: [],
  status: 'idle',
  error: null,
}

export const emptyTraitsState: TraitWithUniqueScoresState = {
  items: [],
  status: 'idle',
  error: null,
}

export const TraitsSlice = createSlice({
  name: 'allTraits',
  initialState: initialTraitsState,
  reducers: {
    setAllTraits: (state: TraitWithUniqueScoresState, { payload }: { payload: TraitWithUniqueScore[] }) => {
      state.items = [...payload]
    },
    selectTrait: (state: TraitWithUniqueScoresState, { payload }: { payload: TraitWithUniqueScore }) => {
      state.items = [...state.items.map((item: TraitWithUniqueScore) => item.id === payload.id ? {...item, selected: true } : item)]
    },

    batchSelectTraits: (state: TraitWithUniqueScoresState, { payload }: { payload: TraitWithUniqueScore[] }) => {
      const selectedIds = payload.map(x => x.id)
      state.items = [...state.items.map((item: TraitWithUniqueScore) => selectedIds.includes(item.id) ? { ...item, selected: true } : item)]
    },
    deselectAllTraits: (state: TraitWithUniqueScoresState) => {
      state.items = [...state.items.map((item: TraitWithUniqueScore) => ({ ...item, selected: false }))]
    },
    deselectTrait: (state: TraitWithUniqueScoresState, { payload }: { payload: TraitWithUniqueScore }) => {
      state.items = [...state.items.map((item: TraitWithUniqueScore) => item.id === payload.id ? {...item, selected: false } : item)]
    },
    toggleTraitSelection: (state: TraitWithUniqueScoresState, { payload }: { payload: TraitWithUniqueScore }) => {
      state.items = [...state.items.map((item: TraitWithUniqueScore) => item.id === payload.id ? {...item, selected: !item.selected } : item)]
    }
  }
})
