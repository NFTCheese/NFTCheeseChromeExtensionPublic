import { Box, SystemProps } from "@chakra-ui/react";
import React from "react";

export default function Card({children, ...rest}: React.PropsWithChildren<SystemProps>) {
  return (
    <Box borderRadius={10} bg={'card-bg'} p={6} {...rest}>
      {children}
    </Box>
  )
}