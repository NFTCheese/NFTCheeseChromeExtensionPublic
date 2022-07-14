import { useColorModeValue } from '@chakra-ui/react';

export const TableIcon = ({ isSelected }: { isSelected: boolean }) => {
  const modeColor = useColorModeValue('#000', '#fff');
  const fillColor = isSelected ? '#E0AF00' : modeColor;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18" fill="none">
      <path
        d="M15.9862 3.7584C15.9504 3.3464 15.6124 3 15.1875 3H3.8125C3.38756 3 3.04956 3.3464 3.01381 3.7584H3V14.2C3 14.4122 3.0856 14.6157 3.23798 14.7657C3.39035 14.9157 3.59701 15 3.8125 15H15.1875C15.403 15 15.6097 14.9157 15.762 14.7657C15.9144 14.6157 16 14.4122 16 14.2V3.7584H15.9862ZM7.875 7.8V5.4H11.125V7.8H7.875ZM11.125 8.6V11.0664H7.875V8.6H11.125ZM7.0625 5.4V7.8H3.8125V5.4H7.0625ZM3.8125 8.6H7.0625V11.0664H3.8125V8.6ZM3.8125 14.2V11.8H7.0625V14.2H3.8125ZM7.875 14.2V11.8H11.125V14.2H7.875ZM15.1875 14.2H11.9375V11.8H15.1875V14.2ZM15.1875 11.0664H11.9375V8.6H15.1875V11.0664ZM15.1875 7.8H11.9375V5.4H15.1875V7.8Z"
        fill={fillColor}
      />
      <rect x="0.5" y="0.5" width="18" height="17" rx="1.5" stroke={fillColor} />
    </svg>
  );
};
