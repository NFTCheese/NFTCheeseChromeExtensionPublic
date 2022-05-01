export const legendBg = 'linear-gradient(125deg, rgba(88,89,128,1) 0%, rgba(36,204,209,1) 24%, rgba(153,237,197,1) 48%, rgba(237,246,141,1) 72%, rgba(185,105,68,1) 98%)';
export const epicBg = 'linear-gradient(90deg, rgba(255,222,104,1) 0%, rgba(251,239,182,1) 68%, rgba(220,191,88,1) 100%)';
export const rareBg = 'linear-gradient(90deg, rgba(22,171,210,1) 0%, rgba(223,248,255,1) 68%, rgba(22,171,210,1) 100%)';
export const uncommonBg = 'linear-gradient(90deg, rgba(14,168,89,1) 0%, rgba(181,242,213,1) 68%, rgba(14,168,89,1) 100%);';

export const legendColor = 'red';
export const epicColor = '#e9a000';
export const rareColor = '#00a4d9';
export const uncommonColor = '#02a95a';
export const commonColor = 'gray.800'


// export function colorPicker(variant:string, isBackground:boolean) {
//   if (isBackground){
//     if (variant === 'legend') {
//       return legendBg
//     } else if (variant === 'epic') {
//       return epicBg
//     } else if (variant === 'rare') {
//       return rareBg
//     } else if (variant === 'uncommon') {
//       return uncommonBg
//     } else {
//       return commonColor
//     }


//   } else {
//     // Border color, color for Buy now
//     if (variant === 'legend') {
//       return legendColor
//     } else if (variant === 'epic') {
//       return epicColor
//     } else if (variant === 'rare') {
//       return rareColor
//     } else if (variant === 'uncommon') {
//       return uncommonColor
//     } else if (variant === 'common') {
//       return commonColor
//     }
//   }
//   return commonColor;
// }

export function btnClassPicker(variant: string): string {
  if (variant === 'legend') {
    return 'btn-legend'
  } else if (variant === 'epic') {
    return 'btn-epic'
  } else if (variant === 'rare') {
    return 'btn-rare'
  } else if (variant === 'uncommon') {
    return 'btn-uncommon'
  }
  return 'btn-common'
}

export function classNamePicker(variant: string) {
  if (variant === 'legend') {
    return 'rotateBgRainbow';
  } else if (variant === 'epic') {
    return 'rotateBgYellow';
  } else if (variant === 'rare') {
    return 'rotateBgBlue';
  } else if (variant === 'uncommon') {
    return 'rotateBgGreen'
  }
  return 'bg-black';
}
