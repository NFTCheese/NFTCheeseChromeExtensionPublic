import { Box, HStack, Text, VStack } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { checkAuth } from "../../utils/api"
import { useUser } from "../../utils/user"
import { btnClassPicker } from "../assets/colorPicker"
import NFTCheeseLogo from "../icons/NFTCheeseLogo"

export default function Popup() {
  const user = useUser()
  const [isAuthenticated, setAuthentication] = useState(false)

  useEffect(() => {
    (async () => {
      try {
        await checkAuth();
        setAuthentication(true)
      }
      catch (err: any) {
        console.log(err)
      }

    })();
  }, [])

  return (
    <Box width="300px" pb={8}>
      <div>
        <VStack justifyContent={'center'}>
          <NFTCheeseLogo />

          {user && isAuthenticated ?
            <Text textAlign="center" fontSize="xl">You're logged in!</Text>:
            <Box
              as={'a'}
              target="_blank"
              href={process.env.REACT_APP_NODE_ENV === 'production' ? `https://login.nftcheese.tools` : `https://login.nftcheese.tools/pre-release`}
              className={`shiningBg ${btnClassPicker('epic')}`}
              color={'black'}
              marginTop={2}
              paddingInline={0}
              borderRadius="md"
              paddingRight={'.6rem'}
              paddingLeft={'.6rem'}
              paddingTop={'.5rem'}
              paddingBottom={'.5rem'}
              fontWeight="bold"
            >
              <HStack justify="space-between">
                <Text textAlign="center">LOGIN</Text>
              </HStack>
            </Box>
          }
        </VStack>
      </div>
    </Box>
  )
}