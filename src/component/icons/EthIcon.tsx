import { useColorModeValue } from "@chakra-ui/react";
import { SVGProps } from "react";

function EthIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit="2"
      clipRule="evenodd"
      viewBox="0 0 653 1063"
      {...props}
    >
      <path
        fill={useColorModeValue('#8C8C8C', "#fff")}
        fillRule="nonzero"
        d="M923.983 541.032l326.077 192.649V0L923.983 541.032z"
        transform="translate(223.135 163.969) translate(-297.855 -164) translate(-849.263 .031)"
      ></path>
      <path
        fill={useColorModeValue('#343434', "#EAEAEA")}
        fillRule="nonzero"
        d="M1250.06 0v733.682l325.96-192.649L1250.06 0z"
        transform="translate(223.135 163.969) translate(-297.855 -164) translate(-849.263 .031)"
      ></path>
      <path
        fill={useColorModeValue('#8C8C8C', "#fff")}
        fillRule="nonzero"
        d="M923.983 602.813L1250.06 1062.2V795.463l-326.077-192.65z"
        transform="translate(223.135 163.969) translate(-297.855 -164) translate(-849.263 .031)"
      ></path>
      <path
        fill={useColorModeValue('#343434', "#D0D0D0")}
        fillRule="nonzero"
        d="M1250.06 795.463V1062.2l326.21-459.387-326.21 192.65z"
        transform="translate(223.135 163.969) translate(-297.855 -164) translate(-849.263 .031)"
      ></path>
      <path
        fillOpacity={useColorModeValue('0.66', "0.1")}
        fillRule="nonzero"
        d="M1250.06 392.732l-326.077 148.3 326.077 192.649 325.96-192.649-325.96-148.3z"
        transform="translate(223.135 163.969) translate(-297.855 -164) translate(-849.263 .031)"
      ></path>
    </svg>
  );
}

export default EthIcon;
