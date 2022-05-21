export type TraitWithUniqueScore = {
  property: string
  value: string
  uniqueScore: number
  id?: string | number
  selected?: boolean
}

export type TGroupedTraits = Record<string, TraitWithUniqueScore[]>