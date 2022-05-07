import { useToast } from '@chakra-ui/react';
import { RateLimit } from 'async-sema';
import DataLoader from 'dataloader';
import { useCallback, useContext, useEffect, useState } from 'react';
import useCollectionPrices from '../hooks/useCollectionPrices';
import {
  Chain,
  fetchCollectionIsRevealed,
  fetchMetadata,
  fetchSelectors,
  useRequest,
} from '../utils/api';
import { fetchAssetWithRankingV2 } from '../utils/apiV2';
import { determineRarityType, RARITY_TYPES } from '../utils/rarityUtils';
import { selectElement } from '../utils/selector';
// import { useUser } from "../utils/user";
import { EventEmitterContext, GlobalConfigContext } from './AppProvider';
import { MenuRenderer } from './MenuRenderer';
import NFTInfoExtensionInjectable from './NFTInfoExtensionInjectable';
import Toast from './Toast';

type IAssetInfoProps = {
  nftLoader: DataLoader<
    string,
    {
      iteratorID: any;
      rank: any;
      tokenCount: number;
      // this is for fetching the price of the nft if available for purchase
      price: number | null;
    },
    string
  >;
  address: string;
  tokenId: string;
  chain: Chain;
  collectionSlug: string;
  type: 'grid' | 'item';
  container: HTMLElement;
};

type Rarity = {
  isRanked: boolean;
  tokenCount: number;
  rank: number;
  type: typeof RARITY_TYPES[number];
};

const replaceImageRateLimit = RateLimit(3);

/* This will have to fetch data somehow */
export default function AssetInfo(props: IAssetInfoProps) {
  const { collectionSlug, tokenId, chain, container, type, address } = props;
  const events = useContext(EventEmitterContext);
  const [rarity, setRarity] = useState<Rarity | null | undefined>(undefined);
  const [loadingRarity, setLoadingRarity] = useState(true);

  // this piece of state is for storing the price of NFT and passing to menu renderer as prop
  const [price, setPrice] = useState<number | null>(null);

  // const { isSubscriber } = useUser() || { isSubscriber: false }
  const { prices, loading: pricesLoading } = useCollectionPrices(
    collectionSlug,
    chain || 'ethereum'
  );
  const [isAutoImageReplaced, setIsAutoImageReplaced] = useState(false);

  const toast = useToast();
  const globalConfig = useContext(GlobalConfigContext);

  const { data: collectionWithRevealInfo, loading: loadingIsRevealed } = useRequest(
    () => fetchCollectionIsRevealed(collectionSlug),
    []
  );

  const isRevealed = collectionWithRevealInfo?.isRevealed || false;

  useEffect(() => {
    if (!tokenId) return;
    (async () => {
      if (chain === 'polygon') {
        setRarity(null);
        return;
      }
      try {
        let token: {
          iteratorID: string;
          rank: number | null;
          tokenCount: number | null;
          price: number | null;
        } | null = null;

        try {
          token = await props.nftLoader.load(props.tokenId);
          // store price in price state
          setPrice(token.price);
        } catch (error) {
          console.log(error);
        }

        if (!token) {
          token = await fetchAssetWithRankingV2(props.address, tokenId);
          // store price in price state
          setPrice(token.price);
        }

        setLoadingRarity(false);

        if (token && token.tokenCount) {
          const { rank } = token;
          if (rank !== null) {
            setRarity({
              isRanked: true,
              tokenCount: token.tokenCount,
              rank,
              type: determineRarityType(rank, token.tokenCount),
            });
            return;
          }
        }
      } catch (err) {
        console.log(err);
        setLoadingRarity(false);
      }
      setRarity(null);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenId]);

  const replaceImage = useCallback(async () => {
    await replaceImageRateLimit();
    const selectors = await fetchSelectors();
    try {
      const metadata = await fetchMetadata(address, +tokenId);

      if (!(metadata?.image || metadata?.image_url)) {
        throw new Error('Unable to load metadata');
      }

      const imgElement = selectElement(container, selectors.assetInfo[type].image) as HTMLElement;

      // console.log({ imgElement, container, sth: selectors.assetInfo[type].image });

      if (imgElement) {
        imgElement.style.opacity = '0';
        setTimeout(() => {
          imgElement.setAttribute('src', '');
        }, 0);
        setTimeout(() => {
          imgElement.style.opacity = '1';
          imgElement.setAttribute(
            'src',
            (metadata.image || metadata.image_url).replace(/^ipfs:\/\//, 'https://ipfs.io/ipfs/')
          );
        }, 100);
      }
    } catch (err) {
      console.error(err);
      toast({
        duration: 3000,
        position: 'bottom-right',
        render: () => <Toast text="Unable to load source image." type="error" />,
      });
    }
  }, [address, container, toast, tokenId, type]);

  const autoReplaceImage = useCallback(() => {
    if (globalConfig.autoImageReplaceAddresses[address]) {
      setIsAutoImageReplaced(true);
      if (!globalConfig.imageReplaced[`${address}/${tokenId}`]) {
        globalConfig.imageReplaced[`${address}/${tokenId}`] = true;
        replaceImage();
      }
    } else if (isAutoImageReplaced) {
      setIsAutoImageReplaced(false);
    }
  }, [address, globalConfig, replaceImage, isAutoImageReplaced, tokenId]);

  useEffect(() => {
    events.addListener('toggleAutoReplaceImage', autoReplaceImage);
    return () => {
      events.removeListener('toggleAutoReplaceImage', autoReplaceImage);
    };
  }, [autoReplaceImage, events]);

  useEffect(() => {
    autoReplaceImage();
  }, [autoReplaceImage]);

  if (!collectionSlug) return null;

  return (
    <NFTInfoExtensionInjectable
      loadingPrices={pricesLoading}
      loadingRarity={loadingRarity || loadingIsRevealed}
      avgPriceToday={prices?.todayAveragePrice || NaN}
      volumeToday={prices?.todayVolume || NaN}
      floorPrice={prices?.floorPrice || NaN}
      rank={isRevealed ? rarity?.rank : undefined}
      totalSupply={rarity?.tokenCount}
      menuRenderer={MenuRenderer}
      chain={chain}
      address={address}
      replaceImage={replaceImage}
      tokenId={tokenId}
      isAutoImageReplaced={isAutoImageReplaced}
      price={price}
    />
  );
}
