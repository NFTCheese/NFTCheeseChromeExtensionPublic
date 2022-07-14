import {
  Box,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Heading,
  useColorModeValue,
  Text,
  Icon,
} from '@chakra-ui/react';
import { compareDesc, format, formatDistance } from 'date-fns';
import { useEffect, useState } from 'react';
import NFTImage from './NFTImage';
import { ITransactionData } from './NFTTransactions';
import { scrollBarStyle } from './TraitSelection';
import { FaGasPump } from 'react-icons/fa';
import { capitalize, uniq } from 'lodash';

const NFTTable = ({ transactionData }: { transactionData: ITransactionData[] }) => {
  const [transactions, setTransactions] = useState<any[]>([]);
  // const [dates, setDates] = useState<string[] | []>([]);
  const scrollBarBG = useColorModeValue('gray.100', 'gray.800');
  const scrollBarOutlineColor = useColorModeValue('nftcheese-bg-light', 'nftcheese-bg-dark');
  const scrollBarThumbBG = useColorModeValue('nftcheese-bg-dark', 'nftcheese-bg-light');

  useEffect(() => {
    if (transactionData.length > 0) {
      // this grabs each date once so I don't group duplicate dates
      const dates = uniq(
        transactionData.map(({ eventTimestamp }: { eventTimestamp: string }) =>
          format(new Date(eventTimestamp), 'M/d')
        )
      );

      // this groups(2d array) data based on date to properly display transactions
      const groupTransactions: any[] = [];
      dates.forEach((date: string) => {
        groupTransactions.push(
          transactionData.filter(
            ({ eventTimestamp }: { eventTimestamp: string }) =>
              format(new Date(eventTimestamp), 'M/d') === date
          )
        );
      });
      setTransactions(groupTransactions);
    }
  }, [transactionData]);

  return (
    <Box
      mt="20px"
      maxH="302px"
      overflowY="auto"
      sx={scrollBarStyle(scrollBarBG, scrollBarOutlineColor, scrollBarThumbBG)}
      pr="8px"
      color="text"
    >
      {transactions.length > 0 &&
        transactions.map((group) => (
          <>
            <Heading as="h3" size="xs" mb="8px" color="#969696">
              {format(new Date(group[0].eventTimestamp), 'MMM d, yyyy')}
            </Heading>
            <Table mb="16px" variant="unstyled">
              <Thead bg="gray.800" shadow="md">
                <Tr>
                  <Th pl="12px" pr="0">
                    From
                  </Th>
                  <Th px="0">To</Th>
                  <Th>Value</Th>
                  <Th>Type</Th>
                  <Th>Date</Th>
                </Tr>
              </Thead>
              <Tbody>
                {group.map(
                  ({
                    from: { address: fromAddress, profileURL },
                    to_account: { address: toAddress, profile_img_url },
                    price,
                    bidAmount,
                    gas,
                    eventType,
                    eventTimestamp,
                  }: ITransactionData) => (
                    <Tr>
                      <Td px="12px" fontSize="0.9rem">
                        <Box display="flex" alignItems="center">
                          <NFTImage src={profileURL} width={30} borderRadius="full" />
                          <Text ml="4px">{fromAddress.slice(0, 6)}</Text>
                        </Box>
                      </Td>
                      <Td px="12px" fontSize="0.9rem">
                        <Box display="flex" alignItems="center">
                          <NFTImage src={profile_img_url} width={30} borderRadius="full" />
                          <Text ml="4px">{toAddress.slice(0, 6)}</Text>
                        </Box>
                      </Td>
                      <Td px="12px">
                        <Box fontSize="0.9rem">
                          Ξ{' '}
                          {typeof price === 'number' && !bidAmount
                            ? price
                            : typeof bidAmount === 'number' && !price
                            ? bidAmount
                            : null}
                        </Box>
                        <Box display="flex" alignItems="center" fontSize="0.7rem" color="gray.600">
                          <span>Ξ {gas}</span> <Icon as={FaGasPump} boxSize="8px" ml="2px" />
                        </Box>
                      </Td>
                      <Td fontSize="0.9rem">{capitalize(eventType)}</Td>
                      <Td fontSize="0.9rem">
                        {formatDistance(new Date(), new Date(eventTimestamp)) + ' ago'}
                      </Td>
                    </Tr>
                  )
                )}
              </Tbody>
            </Table>
          </>
        ))}
    </Box>
  );
};

export default NFTTable;
