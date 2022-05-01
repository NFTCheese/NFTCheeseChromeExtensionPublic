export const rarityToTag = (rarityScoreInPct:number) => {
  if (rarityScoreInPct >=20) {
    return 'common'
  }
  if (rarityScoreInPct >=10) {
    return 'uncommon'
  }
  if (rarityScoreInPct >=1) {
    return 'rare'
  }
  if (rarityScoreInPct >=0.1) {
    return 'epic'
  }
  return 'legend'
}
