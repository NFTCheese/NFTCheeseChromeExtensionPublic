import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TraitsSlice } from './slices/traitsSlice/traitsSlice';

export const { setAllTraits, selectTrait, deselectTrait, toggleTraitSelection, batchSelectTraits, deselectAllTraits } = TraitsSlice.actions

const store = configureStore({
  reducer: combineReducers({
    traits: TraitsSlice.reducer
  })
})

export type RootState = ReturnType<typeof store.getState>
export default store