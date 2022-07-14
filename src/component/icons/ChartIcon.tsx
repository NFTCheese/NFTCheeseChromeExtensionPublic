import { useColorModeValue } from '@chakra-ui/react';

export const ChartIcon = ({ isSelected }: { isSelected: boolean }) => {
  const modeColor = useColorModeValue('#000', '#fff');
  const fillColor = isSelected ? '#E0AF00' : modeColor;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="0.5" y="0.5" width="17" height="17" rx="1.5" stroke={fillColor} />
      <path
        d="M3.93387 14.7529C3.81816 14.7529 3.72437 14.6592 3.72437 14.5434V3.80946C3.72437 3.69366 3.81816 3.59998 3.93385 3.59998C4.04954 3.59998 4.14333 3.69366 4.14333 3.80946V14.5434C4.14333 14.6592 4.04954 14.7529 3.93385 14.7529L3.93387 14.7529Z"
        fill={fillColor}
      />
      <path
        d="M15.0904 14.3826H3.56356C3.44787 14.3826 3.35408 14.2889 3.35408 14.1731C3.35408 14.0573 3.44787 13.9637 3.56356 13.9637H15.0904C15.2061 13.9637 15.2999 14.0573 15.2999 14.1731C15.2999 14.2889 15.2061 14.3826 15.0904 14.3826ZM4.44689 13.2632H3.35938C3.24369 13.2632 3.1499 13.1695 3.1499 13.0537C3.1499 12.9379 3.24369 12.8442 3.35938 12.8442H4.44689C4.56258 12.8442 4.65637 12.9379 4.65637 13.0537C4.65637 13.1695 4.56258 13.2632 4.44689 13.2632V13.2632ZM4.44689 12.2023H3.35938C3.24369 12.2023 3.1499 12.1086 3.1499 11.9928C3.1499 11.877 3.24369 11.7833 3.35938 11.7833H4.44689C4.56258 11.7833 4.65637 11.877 4.65637 11.9928C4.65637 12.1086 4.56258 12.2023 4.44689 12.2023ZM4.44689 11.1414H3.35938C3.24369 11.1414 3.1499 11.0477 3.1499 10.9319C3.1499 10.8161 3.24369 10.7224 3.35938 10.7224H4.44689C4.56258 10.7224 4.65637 10.8161 4.65637 10.9319C4.65637 11.0477 4.56258 11.1414 4.44689 11.1414ZM4.44689 10.0809H3.35938C3.24369 10.0809 3.1499 9.98716 3.1499 9.87138C3.1499 9.75559 3.24369 9.6619 3.35938 9.6619H4.44689C4.56258 9.6619 4.65637 9.75559 4.65637 9.87138C4.65637 9.98716 4.56258 10.0809 4.44689 10.0809ZM4.44689 9.01993H3.35938C3.24369 9.01993 3.1499 8.92626 3.1499 8.81045C3.1499 8.69467 3.24369 8.60096 3.35938 8.60096H4.44689C4.56258 8.60096 4.65637 8.69467 4.65637 8.81045C4.65637 8.92626 4.56258 9.01993 4.44689 9.01993ZM4.44689 7.95903H3.35938C3.24369 7.95903 3.1499 7.86533 3.1499 7.74955C3.1499 7.63376 3.24369 7.54007 3.35938 7.54007H4.44689C4.56258 7.54007 4.65637 7.63376 4.65637 7.74955C4.65637 7.86533 4.56258 7.95903 4.44689 7.95903ZM4.44689 6.89812H3.35938C3.24369 6.89812 3.1499 6.80441 3.1499 6.68864C3.1499 6.57284 3.24369 6.47915 3.35938 6.47915H4.44689C4.56258 6.47915 4.65637 6.57284 4.65637 6.68864C4.65637 6.80441 4.56258 6.89812 4.44689 6.89812ZM4.44689 5.8372H3.35938C3.24369 5.8372 3.1499 5.74352 3.1499 5.62772C3.1499 5.51192 3.24369 5.41824 3.35938 5.41824H4.44689C4.56258 5.41824 4.65637 5.51192 4.65637 5.62772C4.65637 5.74352 4.56258 5.8372 4.44689 5.8372ZM4.44689 4.77626H3.35938C3.24369 4.77626 3.1499 4.68258 3.1499 4.56678C3.1499 4.45101 3.24369 4.3573 3.35938 4.3573H4.44689C4.56258 4.3573 4.65637 4.45101 4.65637 4.56678C4.65637 4.68258 4.56258 4.77626 4.44689 4.77626Z"
        fill={fillColor}
      />
      <path
        d="M7.13493 11.1238C7.13493 11.6352 6.72046 12.0492 6.20964 12.0492C5.69862 12.0492 5.28418 11.6352 5.28418 11.1238C5.28418 10.6131 5.69862 10.1987 6.20964 10.1987C6.72048 10.1987 7.13493 10.6131 7.13493 11.1238Z"
        fill={fillColor}
      />
      <path
        d="M6.20967 12.2587C5.58387 12.2587 5.07471 11.7497 5.07471 11.1238C5.07471 10.4982 5.58389 9.9892 6.20967 9.9892C6.83536 9.9892 7.34444 10.4982 7.34444 11.1238C7.34444 11.7498 6.83536 12.2587 6.20967 12.2587V12.2587ZM6.20967 10.4082C5.81484 10.4082 5.49367 10.7293 5.49367 11.1238C5.49367 11.5186 5.81484 11.8398 6.20967 11.8398C6.60439 11.8398 6.92548 11.5186 6.92548 11.1238C6.92548 10.7293 6.60441 10.4082 6.20967 10.4082Z"
        fill={fillColor}
      />
      <path
        d="M9.35327 8.90538C9.35327 9.41643 8.93878 9.8309 8.42777 9.8309C7.91696 9.8309 7.50269 9.41643 7.50269 8.9054C7.50269 8.39438 7.91696 7.97992 8.42777 7.97992C8.93878 7.97992 9.35327 8.39438 9.35327 8.90538Z"
        fill={fillColor}
      />
      <path
        d="M8.42778 10.0403C7.80219 10.0403 7.29321 9.53137 7.29321 8.90537C7.29321 8.2798 7.80219 7.77039 8.42778 7.77039C9.05355 7.77039 9.56274 8.27978 9.56274 8.90537C9.56274 9.53135 9.05355 10.0403 8.42778 10.0403ZM8.42778 8.18935C8.03316 8.18935 7.71218 8.51054 7.71218 8.90537C7.71218 9.30019 8.03316 9.62136 8.42778 9.62136C8.8226 9.62136 9.1438 9.30019 9.1438 8.90537C9.1438 8.51054 8.8226 8.18935 8.42778 8.18935Z"
        fill={fillColor}
      />
      <path
        d="M15.0905 8.35017C15.0905 8.86162 14.6763 9.27565 14.1649 9.27565C13.6542 9.27565 13.2397 8.86162 13.2397 8.35019C13.2397 7.83914 13.6542 7.42511 14.1649 7.42511C14.6763 7.42511 15.0905 7.83916 15.0905 8.35017H15.0905Z"
        fill={fillColor}
      />
      <path
        d="M14.1648 9.48513C13.5393 9.48513 13.0303 8.97614 13.0303 8.35014C13.0303 7.72456 13.5393 7.21558 14.1648 7.21558C14.7907 7.21558 15.3 7.72456 15.3 8.35014C15.3 8.97614 14.7907 9.48513 14.1648 9.48513ZM14.1648 7.63454C13.7702 7.63454 13.4492 7.95573 13.4492 8.35014C13.4492 8.74497 13.7702 9.06616 14.1648 9.06616C14.5598 9.06616 14.881 8.74497 14.881 8.35014C14.881 7.95573 14.5598 7.63454 14.1648 7.63454Z"
        fill={fillColor}
      />
      <path
        d="M11.7596 11.3116C11.7596 11.8226 11.3448 12.237 10.8339 12.237C10.3229 12.237 9.90845 11.8226 9.90845 11.3116C9.90845 10.8005 10.3229 10.386 10.8339 10.386C11.3448 10.386 11.7596 10.8005 11.7596 11.3116Z"
        fill={fillColor}
      />
      <path
        d="M10.8341 12.4465C10.2083 12.4465 9.69911 11.9371 9.69911 11.3116C9.69911 10.6856 10.2083 10.1766 10.8341 10.1766C11.46 10.1766 11.9693 10.6856 11.9693 11.3116C11.9693 11.9371 11.46 12.4465 10.8341 12.4465ZM10.8341 10.5956C10.4393 10.5956 10.1181 10.9167 10.1181 11.3116C10.1181 11.7064 10.4393 12.0276 10.8341 12.0276C11.229 12.0276 11.5503 11.7064 11.5503 11.3116C11.5503 10.9167 11.229 10.5956 10.8341 10.5956ZM6.76245 10.5956C6.70886 10.5956 6.65527 10.5751 6.61434 10.5342C6.59489 10.5148 6.57946 10.4917 6.56893 10.4663C6.5584 10.4408 6.55298 10.4136 6.55298 10.3861C6.55298 10.3586 6.5584 10.3313 6.56893 10.3059C6.57946 10.2805 6.59489 10.2574 6.61434 10.238L7.54188 9.31045C7.56132 9.291 7.58441 9.27556 7.60983 9.26503C7.63524 9.2545 7.66248 9.24908 7.68999 9.24908C7.71749 9.24908 7.74473 9.2545 7.77015 9.26503C7.79556 9.27556 7.81865 9.291 7.8381 9.31045C7.85755 9.3299 7.87298 9.35299 7.88351 9.3784C7.89403 9.40381 7.89945 9.43104 7.89945 9.45855C7.89945 9.48606 7.89403 9.51329 7.88351 9.5387C7.87298 9.56411 7.85755 9.5872 7.8381 9.60665L6.91057 10.5342C6.89114 10.5537 6.86805 10.5691 6.84264 10.5797C6.81722 10.5902 6.78997 10.5956 6.76245 10.5956V10.5956Z"
        fill={fillColor}
      />
      <path
        d="M10.2813 10.7829C10.2277 10.7829 10.1741 10.7625 10.1332 10.7215L9.01743 9.60661C8.93561 9.52479 8.93561 9.39223 9.01733 9.31039C9.09915 9.22857 9.23181 9.22857 9.31366 9.31039L10.4294 10.4253C10.5112 10.5071 10.5112 10.6397 10.4295 10.7215C10.4101 10.741 10.3869 10.7565 10.3615 10.767C10.3361 10.7776 10.3088 10.783 10.2813 10.7829V10.7829ZM11.5744 10.9658C11.5208 10.9658 11.4672 10.9453 11.4263 10.9044C11.4068 10.885 11.3914 10.8619 11.3809 10.8365C11.3703 10.8111 11.3649 10.7838 11.3649 10.7563C11.3649 10.7288 11.3703 10.7016 11.3809 10.6762C11.3914 10.6508 11.4068 10.6277 11.4263 10.6082L13.2764 8.75723C13.358 8.67541 13.4908 8.67541 13.5727 8.75723C13.6545 8.83905 13.6545 8.97163 13.5727 9.05347L11.7225 10.9044C11.7031 10.9239 11.68 10.9394 11.6546 10.9499C11.6291 10.9604 11.6019 10.9658 11.5744 10.9658H11.5744Z"
        fill={fillColor}
      />
    </svg>
  );
};