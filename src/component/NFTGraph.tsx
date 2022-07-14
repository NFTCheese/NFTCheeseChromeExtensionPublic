import { useEffect, useState } from 'react';
import { ITransactionData } from './NFTTransactions';
import ReactECharts from 'echarts-for-react';
import { compareAsc, format } from 'date-fns';
import { uniq } from 'lodash';
import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import { NFT } from './NFTBox';
import { GiPlainCircle } from 'react-icons/gi';
import { toolTipDisplay } from '../utils/graphTooltip';

type IGroupedTransactions = ITransactionData[][] | [];

const graphColors = (eventType: string) => {
  switch (eventType) {
    case 'mint':
      return '#BF6EF0';
    case 'list':
      return '#55d0eb';
    case 'sale':
      return '#00A146';
    case 'transfer':
      return '#FFA945';
    default:
      return 'red';
  }
};

const setOptionsInfo = (
  groupTransactions: IGroupedTransactions,
  colorMode: string,
  nftData: NFT
) => {
  return {
    xAxis: {
      type: 'time',
      axisLabel: {
        formatter: (axisValue: string) => {
          return format(new Date(axisValue), 'M/d');
        },
      },
      axisTick: {
        show: false,
      },
      splitNumber: 3,
    },
    yAxis: {
      type: 'value',
      splitLine: {
        lineStyle: {
          color: colorMode,
        },
      },
    },
    series: groupTransactions.map((group: ITransactionData[], i: number) => ({
      type: 'line',
      smooth: true,
      lineStyle: {
        color: graphColors(groupTransactions[i][0].eventType),
      },
      data: group.map((transaction) => ({
        value: [transaction.eventTimestamp, transaction.bidAmount || transaction.price],
        symbol: `image://${transaction.to_account.profile_img_url}`,
        symbolSize: 15,
      })),
      areaStyle: {
        color: graphColors(groupTransactions[i][0].eventType),
      },
    })),
    tooltip: {
      triggerOn: 'mousemove',
      trigger: 'item',
      formatter: toolTipDisplay(),
      extraCssText:
        'background-color:#212121;border-radius:4px;padding:12px 20px;border:none;color:white;',
    },
  };
};

const NFTGraph = ({
  transactionData,
  nftData,
}: {
  transactionData: ITransactionData[];
  nftData: NFT;
}) => {
  const [data, setData] = useState<IGroupedTransactions>([]);
  const [options, setOptions] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const splitLineColor = useColorModeValue('black', '#383838');
  //group transactions
  useEffect(() => {
    if (transactionData.length > 0 && data.length === 0) {
      const sorted = uniq(transactionData.map(({ eventType }) => eventType));
      const groupTransactions: IGroupedTransactions = [];
      sorted.forEach((transactionType: string, i) => {
        groupTransactions[i] = transactionData
          ?.filter(({ eventType }: { eventType: string }) => eventType === transactionType)
          .sort((a: ITransactionData, b: ITransactionData) =>
            compareAsc(new Date(a.eventTimestamp), new Date(b.eventTimestamp))
          );
      });
      setData(groupTransactions);
    }
  }, [data, transactionData]);

  useEffect(() => {
    if (data.length > 0 && !options) {
      setOptions(setOptionsInfo(data, splitLineColor, nftData));
    }
  }, [data, options, splitLineColor, nftData]);

  console.log(options);

  return (
    <Box>
      {options?.xAxis && (
        <ReactECharts
          option={options}
          style={{ width: '100%', height: '400px' }}
          showLoading={loading}
          onChartReady={() => setLoading(false)}
        />
      )}
      <Flex justify="center" alignItems="center">
        {['Mint', 'List', 'Sale', 'Transfer'].map((eventType: string) => (
          <Flex alignItems="center" mr="12px">
            <GiPlainCircle
              color={graphColors(eventType.toLowerCase())}
              style={{ marginRight: '4px' }}
            />
            <Text>{eventType}</Text>
          </Flex>
        ))}
      </Flex>
    </Box>
  );
};

export default NFTGraph;
