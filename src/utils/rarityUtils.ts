import { useEffect, useState } from "react"

/* rarityScore = rank / totalSupply */
export const getRarityLabel = (rarityScore: number): string => {
  if (rarityScore < 0.1 / 100) {
    return 'legend'
  }
  if (rarityScore < 1 / 100) {
    return 'epic'
  }
  if (rarityScore < 10 / 100) {
    return 'rare'
  }
  if (rarityScore < 50 / 100) {
    return 'uncommon'
  }
  return 'common';
}

export const RARITY_TYPES = [
  {
    top: 0.001,
    name: 'legend' as const,
    color: { light: 'orange.200', dark: 'orange.500' },
  },
  {
    top: 0.01,
    name: 'epic' as const,
    color: { light: 'purple.200', dark: 'purple.500' },
  },
  {
    top: 0.1,
    name: 'rare' as const,
    color: { light: 'blue.200', dark: 'blue.500' },
  },
  {
    top: 0.5,
    name: 'uncommon' as const,
    color: { light: 'green.200', dark: 'green.500' },
  },
  {
    top: Infinity,
    name: 'common' as const,
    color: { light: 'gray.200', dark: 'gray.500' },
  },
]
export type RarityName = typeof RARITY_TYPES[number]['name']

export const determineRarityType = (rank: number, tokenCount: number) => {
  return rank === 1
    ? RARITY_TYPES[0]
    : RARITY_TYPES.find(({ top }) => rank / tokenCount <= top)!
}


export const useTraitCountExcluded = (address: string | null) => {
  const [traitCountExcluded, setTraitCountExcluded] = useState<boolean | null>(
    null,
  )

  const storageKey = `excludeTraitCount:${address}`

  useEffect(() => {
    if (!address) return

    const listener: Parameters<
      typeof chrome.storage.onChanged.addListener
    >[0] = (changes, area) => {
      if (area === 'sync' && changes[storageKey]) {
        setTraitCountExcluded(Boolean(changes[storageKey].newValue || false))
      }
    }
    chrome.storage.onChanged.addListener(listener)
    chrome.storage.sync.get([storageKey], (res) => {
      setTraitCountExcluded(res[storageKey] ?? false)
    })

    return () => chrome.storage.onChanged.removeListener(listener)
  }, [storageKey, address])

  return [
    traitCountExcluded,
    (exclude: boolean) => {
      if (exclude) {
        chrome.storage.sync.set({
          [storageKey]: true,
        })
      } else {
        chrome.storage.sync.remove(storageKey)
      }
      setTraitCountExcluded(exclude)
    },
  ] as const
}