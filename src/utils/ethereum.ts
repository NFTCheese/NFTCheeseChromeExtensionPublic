const WEI_PER_ETH = Math.pow(10, 18)
export const weiToEth = (wei: number) => {
  return Math.round(wei / WEI_PER_ETH * 10000) / 10000;
}
export const readableEthValue = (wei: number) => {
  return Math.round(weiToEth(wei) * 10000) / 10000
}
