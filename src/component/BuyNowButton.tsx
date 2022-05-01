import React, { useState, ReactElement } from 'react'
import {
  Tooltip,
  useToast,
} from '@chakra-ui/react'
import Toast from './Toast';
import {
  getExtensionConfig,
  useExtensionConfig,
} from '../utils/extensionConfig'
import { useUser } from '../utils/user'
import { fetchAssetOrders, fetchOptimalGasPreset } from '../utils/api'

const readableError = (message: string) => {
  if (/insufficient funds/.test(message)) {
    return 'You do not have enough funds to buy this asset.'
  } else if (/cancelled due to price change/.test(message)) {
    return message
  }
  return `Unable to buy item. Received error "${message}"`
}

export const triggerQuickBuy = async ({
  isFounder,
  toast,
  address,
  tokenId,
  displayedPrice,
  onComplete,
}: {
  isFounder: boolean
  toast: ReturnType<typeof useToast>
  address: string
  tokenId: string
  displayedPrice?: string
  onComplete: () => void
}) => {
  const [asset, gasPreset] = await Promise.all([
    fetchAssetOrders(address, tokenId)
      .then((orders: any) => ({ orders }) as any)
      .catch((_: any) => {
        return {}
      }),
    (async () => {
      const config = await getExtensionConfig(false)
      if (config.quickBuyGasPreset === 'fixed') {
        return config.fixedGas
      } else if (config.quickBuyGasPreset === 'optimal' && isFounder) {
        try {
          const optimalGasPreset = await fetchOptimalGasPreset()
          return optimalGasPreset
        } catch (err) {
          console.error(err)
          toast({
            duration: 7500,
            position: 'bottom-right',
            render: () => (
              <Toast
                text={
                  'Unable to load optimal gas settings, using MetaMask defaults.'
                }
                type="error"
              />
            ),
          })
          return null
        }
      }
      return null
    })(),
  ])
  if (!asset.orders || asset.orders.length === 0) {
    toast({
      duration: 7500,
      position: 'bottom-right',
      render: () => (
        <Toast text={'Unable to get asset listing.'} type="error" />
      ),
    })
    onComplete()
    return
  }
  window.postMessage({
    method: 'NFTCheese__Buy',
    params: { asset, gasPreset, displayedPrice },
  })
  // Listen for errors, unsubscribe
  const messageListener = (event: any) => {
    if (
      event.data.method === 'NFTCheese__Buy__Error' &&
      event.data.params.asset.id === asset.id
    ) {
      if (!/user denied/i.test(event.data.params.error.message)) {
        toast({
          duration: 7500,
          position: 'bottom-right',
          render: () => (
            <Toast
              text={readableError(event.data.params.error.message)}
              type="error"
            />
          ),
        })
      }
      window.removeEventListener('message', messageListener)
      onComplete()
    } else if (
      event.data.method === 'NFTCheese__Buy__Success' &&
      event.data.params.asset.id === asset.id
    ) {
      window.removeEventListener('message', messageListener)
      onComplete()
    }
  }

  window.addEventListener('message', messageListener)
}

export const BuyNowButtonUI = ({
  address,
  tokenId,
  active,
  displayedPrice,
  children
}: {
  address: string
  tokenId: string
  active: boolean
  displayedPrice?: string
  children: (props: { onClick: () => void, isLoading: boolean }) => ReactElement
}) => {
  const toast = useToast()
  const { isFounder } = useUser() || { isFounder: false }
  const [isLoading, setIsLoading] = useState(false)

  const onClick = async () => {
    if (active) {
      setIsLoading(true)
      triggerQuickBuy({
        isFounder,
        toast,
        tokenId,
        address,
        displayedPrice,
        onComplete: () => setIsLoading(false),
      })
    } else {
      chrome.runtime.sendMessage({
        method: 'openPopup',
        params: { action: 'activateQuickBuy' },
      })
    }
  }

  return (
    <Tooltip
      label={active ? 'Quick Buy' : 'Activate Quick Buy'}
      fontSize="xs"
      hasArrow
      bg="gray.700"
      placement="top"
      color="white"
      px="2"
      py="1"
    >
      {children({ onClick, isLoading })}
      {/* <IconButton
        // icon={
        //   <Icon color="white" width="14px" height="14px" />
        // }
        width="32px"
        minWidth="auto"
        height="24px"
        borderRadius="lg"
        isLoading={isLoading}
        bg={useColorModeValue(
          active ? 'blue.500' : 'gray.500',
          active ? 'blue.400' : 'gray.500',
        )}
        _hover={{
          bg: useColorModeValue(
            active ? 'blue.400' : 'gray.400',
            active ? 'blue.300' : 'gray.400',
          ),
        }}
        _active={{
          bg: useColorModeValue(
            active ? 'blue.300' : 'gray.300',
            active ? 'blue.200' : 'gray.300',
          ),
        }}
        boxShadow={useColorModeValue(
          '0 1px 2px rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(255, 255, 255, 0.15)',
          '0 1px 2px rgba(0, 0, 0, 0.15), inset 0 0 0 1px rgba(255, 255, 255, 0.15)',
        )}
        aria-label="Buy Now"
        onClick={onClick}
      /> */}
    </Tooltip>
  )
}

const BuyNowButton = (
  props: Omit<React.ComponentProps<typeof BuyNowButtonUI>, 'active'>,
) => {
  const [config] = useExtensionConfig()
  // const user = useUser()
  // const isAccountPage = window.location.pathname.split('/')[1] === 'account'
  // if (config === null || user === null || !user.isSubscriber || isAccountPage)
  //   return null
  return <BuyNowButtonUI {...props} active={config?.quickBuyEnabled || false} />
}

export default BuyNowButton
