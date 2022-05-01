import { Meta, Story } from '@storybook/react';
import { Button, Text, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { HStack, Center, VStack, Box } from "@chakra-ui/layout";
import { UserProvider } from '../utils/user';
import GlobalStyles from '../component/GlobalStyles';

const meta: Meta = {
  title: 'UI',
  // component: WatchListContainer
}
export default meta;


const Template: Story<React.ComponentProps<any>> = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  const bg = useColorModeValue('opensea-light', 'opensea-dark')
  return (
    <Center height="100%" bg={bg}>
      <UserProvider
        loadFromBackgroundScript={false}
        mockUser={{
          accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwdWJsaWNBZGRyZXNzIjoiMHhhMmJlYjM3NDkxNjZhMTc4NjYwYzQxMDI2MzhhMWJkNGU3MDYzZDY0In0.TJwVvhxBi1Dr0bIEh6Goz-476Z-2F1gGXh9lGSL7Iqw',
          isFounder: false,
          isSubscriber: true,
          membershipType: 'LIFETIME',
          publicAddress: '0xa2beb3749166a178660c4102638a1bd4e7063d64',
          role: 'MEMBER'
        }}
        >
        <VStack gap={10}>
          <Text>Curent color mode: {colorMode}</Text>
          {/* Buttons */}
          <HStack gap={4}>
            <Button colorScheme="blue">Blue Button</Button>
            <Button colorScheme="green">Green Button</Button>
            <Button colorScheme="red">Red Button</Button>
            <Button colorScheme="orange">Orange Button</Button>
            <Button colorScheme="yellow">Yellow Button</Button>

            <Button onClick={toggleColorMode}>(Default) Toggle color mode</Button>
          </HStack>

          {/* Box Container */}
          <Box borderRadius={10} bg={useColorModeValue('gray.200', 'blackAlpha.900')} p={6}>
            <Text>Hi guys</Text>
          </Box>
        </VStack>
      </UserProvider>
      <GlobalStyles />
    </Center>
  )
}

export const Default = Template.bind({})
Default.args = {
}