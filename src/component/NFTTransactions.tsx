import { Box, Flex } from '@chakra-ui/react';
import { useState } from 'react';
import divineAnarchyAvailableNFTs from '../mockupData/divineAnarchyAvailableNFTs';
import { ChartIcon } from './icons/ChartIcon';
import { TableIcon } from './icons/TableIcon';
import NFTGraph from './NFTGraph';
import NFTTable from './NFTTable';

export type ITransactionData = {
  eventType: string;
  eventTimestamp: string;
  price: number | null;
  gas: number | null;
  bidAmount: number | null;
  from: {
    user: string | null;
    profileURL: string | undefined;
    address: string;
  };
  to_account: {
    user: string | null;
    profile_img_url: string | undefined;
    address: string;
  };
};

export const NFTTransactions = ({ tokenID }: { tokenID: string }) => {
  const [selected, setSelected] = useState('chart');
  const nft = divineAnarchyAvailableNFTs.filter(({ tokenID: mainID }) => mainID === tokenID);

  return (
    <div>
      <Flex>
        <Box mr="4px" cursor="pointer" onClick={() => setSelected('chart')}>
          <ChartIcon isSelected={selected === 'chart'} />
        </Box>
        <Box cursor="pointer" onClick={() => setSelected('table')}>
          <TableIcon isSelected={selected === 'table'} />
        </Box>
      </Flex>
      {/* added height to smooth transition from graph to table and vice-versa */}
      <Box maxH="600px" h="600px">
        {selected === 'chart' && nft?.length > 0 ? (
          <NFTGraph transactionData={nft[0].transactionData} nftData={nft[0]} />
        ) : (
          <NFTTable transactionData={nft[0].transactionData} />
        )}
      </Box>
    </div>
  );
};
