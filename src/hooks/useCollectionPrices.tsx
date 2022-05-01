import { useEffect, useState } from 'react'
import { unstable_batchedUpdates } from 'react-dom'
import { Chain, fetchFloorPrice, CollectionPrices, collectionPricesLoader } from '../utils/api'

const FLOOR_REFRESH_INTERVAL = 1000 * 60 * 3

const pricesReloadCallbacks: Record<string, (() => void)[]> = {}
const pricesLoadedAt: Record<string, number> = {}
const loadPrices = (slug: string, onReload: () => void) => {
  if (!pricesReloadCallbacks[slug]) {
    pricesReloadCallbacks[slug] = []
    setTimeout(() => {
      collectionPricesLoader.clear(slug)
      const callbacks = pricesReloadCallbacks[slug]
      delete pricesReloadCallbacks[slug]
      delete pricesLoadedAt[slug]
      callbacks.forEach((callback) => callback())
    }, FLOOR_REFRESH_INTERVAL)
  }

  pricesReloadCallbacks[slug].push(onReload)

  return fetchFloorPrice(slug).finally(() => {
    if (!pricesLoadedAt[slug]) {
      pricesLoadedAt[slug] = Date.now()
    }
  })
}

const useFloor = (collectionSlug?: string, chain: Chain = 'ethereum') => {
  const [loading, setLoading] = useState(chain === 'ethereum' ? true : false)
  const [prices, setPrices] = useState<CollectionPrices | null | undefined>(
    chain === 'ethereum' ? undefined : null,
  )
  const [loadedAt, setLoadedAt] = useState(0)
  const [floorRefreshCount, setFloorRefreshCount] = useState(0)

  useEffect(() => {
    ;(async () => {
      if (!collectionSlug) return
      try {
        const prices = await loadPrices(collectionSlug, () => {
          unstable_batchedUpdates(() => {
            setLoading(true)
            setFloorRefreshCount((c) => c + 1)
          })
        })
        unstable_batchedUpdates(() => {
          setLoading(false)
          setPrices(prices)
          setLoadedAt(pricesLoadedAt[collectionSlug])
        })
      } catch (err) {
        unstable_batchedUpdates(() => {
          setLoading(false)
          setPrices(null)
          setLoadedAt(pricesLoadedAt[collectionSlug])
        })
      }
    })()
  }, [collectionSlug, floorRefreshCount])

  return { prices, loading, loadedAt }
}

export default useFloor
