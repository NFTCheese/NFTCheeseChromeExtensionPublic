import { Flex, Box, Grid, HStack, Text, Center } from "@chakra-ui/layout";
// import { ParentSize } from '@visx/responsive';
import { LinearGradient } from '@visx/gradient';
import { Progress, Select, useColorModeValue, useToken } from '@chakra-ui/react'
import { useUser } from '../utils/user'

import {
  AnimatedAxis,
  AnimatedGrid,
  AnimatedAreaSeries,
  XYChart,
  Tooltip,
  buildChartTheme,
  AnimatedBarSeries,
} from '@visx/xychart';
import format from 'date-fns/format';
import groupBy from 'lodash/groupBy';
import { /* curveLinear, curveStep,  */curveCardinal } from '@visx/curve';
import EthIcon from "./icons/EthIcon";
import { useEffect, useMemo, useState } from "react";
import { fetchSalesActivity, SaleActivityResponse } from "../utils/api";
import { weiToEth } from "../utils/ethereum";
import { sortBy } from "lodash";
import Card from "../ui/Card";
import { LineWobble } from '@uiball/loaders'

// const theme: any = {
//   colors: ['#474747', 'yellow'],
// };

const height = 150;

function getSum(rest: number[]) {
  return rest.reduce((final, item) => final + item);
}

function getMin(arr: number[]): number {
  let min = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (min > arr[i]) {
      min = arr[i]
    }
  }
  return min
}
function getMax(arr: number[]): number {
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (max < arr[i]) {
      max = arr[i]
    }
  }
  return max
}

type Point = {
  x: string,
  y: number
}

function convertMetricsToGraphData(metric: { key: string, value: number }[], calulation: 'average' | 'sum' = 'average') {
  let data: Point[] = sortBy(metric
    .map(({ key, value }) => ({
      x: format(new Date(key), 'MM-dd-yyyy'),
      y: Math.round(weiToEth(value) * 100) / 100
    })), 'x');

  let groups = groupBy(data, 'x')

  data = Object.keys(groups).reduce((final, dateStr) => {
    const items = groups[dateStr];
    const y = calulation === 'average' ?
      getSum(items.map(item => item.y)) / items.length :
      getSum(items.map(item => item.y));
    return [...final, {
      x: dateStr,
      y: y
    }]
  }, [] as { x: string, y: number }[])

  return data;
}

function convertToGraphData(data: SaleActivityResponse): {
  average: Point[]
  totalSales: Point[]
  volume: Point[]
  volumeToAverageRatio: number
} {
  const volume = convertMetricsToGraphData(data.volume, 'sum');
  const average = convertMetricsToGraphData(data.average);
  const maxAveragePrice = getMax(average.map((item) => item.y));
  const maxVolume = getMax(volume.map((item) => item.y));

  const volumeToAverageRatio = maxAveragePrice / maxVolume * 0.5;

  return {
    average: convertMetricsToGraphData(data.average),
    totalSales: convertMetricsToGraphData(data.totalSales, 'sum'),
    volume: convertMetricsToGraphData(data.volume, 'sum')
      .map((item) => ({ ...item, y: item.y * volumeToAverageRatio })),
    volumeToAverageRatio
  }
}

type ISalesActivityProps = {
  collectionSlug: string
  collectingData?: boolean
  minRank: number
  maxRank: number
  traits?: {
    name: string
    value: string
  }[]
}

export default function SalesActivity(props: ISalesActivityProps) {
  const [saleData, setSaleData] = useState<SaleActivityResponse | null>(null);
  const [intervalTime, setIntervalTime] = useState<string>('7d');
  const [loading, setLoading] = useState(false);

  const accessors = {
    xAccessor: (d: any) => d.x,
    yAccessor: (d: any) => d.y,
  };
  const user = useUser();

  const traitHash = (props.traits || []).map(({ name, value }) => `${name}=${value}`).join(';');

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    fetchSalesActivity({
      traits: props.traits,
      collectionSlug: props.collectionSlug,
      intervalTime,
      rarityRange: [props.minRank, props.maxRank],
      signal: controller.signal,
    }).then((data) => {
      setLoading(false);
      if (!controller.signal.aborted) {
        setSaleData(data)
      }
    }).catch((error) => {
      console.error(error);
      setLoading(false);
    });

    return () => {
      controller.abort()
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    props.collectionSlug,
    intervalTime,
    props.minRank,
    props.maxRank,
    traitHash
  ])

  const graphData = useMemo(() => {
    return saleData ? convertToGraphData(saleData) : null;
  }, [saleData]);

  const averagePriceValues = useMemo(
    () => saleData ?
      saleData.average.map(({ value }) => weiToEth(value)) :
      [],
    [saleData]
  )

  const lowestAveragePrice = saleData ? getMin(averagePriceValues) : NaN;
  const highestAveragePrice = saleData ? getMax(averagePriceValues) : NaN;

  const [borderColor, textColor, _, layoverBgColor, gray200] = useToken(
    'colors',
    ['border-color', 'text', 'card-bg', 'layover-bg', 'gray.200', 'gray.900']
  );

  const theme = buildChartTheme({
    backgroundColor: layoverBgColor,
    colors: ['rgba(255,231,143,0.8)', '#6a097d', '#d6e0f0'],
    gridColor: '#336d88',
    gridColorDark: '#1d1b38',
    // svgLabelBig: { fill: '#1d1b38' },
    tickLength: 3,
  });

  const barColor = useColorModeValue(gray200, '#404042');
  const loadingLayoverBg = useColorModeValue('black', 'white');

  return (
    <Card w={'100%'} position="relative">
      {loading &&
        <Center top={0} left={0} position={'absolute'} w='full' h='full' zIndex={2} bg='card-bg' opacity={0.9}>
          <LineWobble
            size={80}
            lineWeight={5}
            speed={1.75}
            color={loadingLayoverBg}
          />
        </Center>
      }
      <Text marginBottom={'.5rem'}>Sale activities of your NFT selection:</Text>
      <Flex justify="space-between">
        <HStack gap={1} align="center" marginBottom="1rem">
          <Text fontWeight="bold">In the last</Text>
          <Box w={130}>
            <Select color={'text'} borderColor="border-color" defaultValue={intervalTime} onChange={(e) => setIntervalTime(e.target.value)}>
              {/* <option value='24h'>24h</option> */}
              <option value='7d'>7 days</option>
              {user?.role === 'FREE' ?
                <option disabled value='30d'>30 days - MEMBER ONLY</option>:
                <option value='30d'>30 days</option>
              }
            </Select>
          </Box>
        </HStack>
      </Flex>
      {props.collectingData &&
        <>
          <Text>NFTCheese is collection sale data for this collection. Try again in 1 minute</Text>
          <Progress size='xs' isIndeterminate />
        </>
      }
      {!props.collectingData &&
        <Box color="text">
          <XYChart
            width={Math.max(300, 464)}
            theme={theme}
            height={height}
            xScale={{ type: 'band', paddingInner: 0.3 }}
            yScale={{ type: 'linear', paddingOuter: 0 }}
            margin={{
              top: 10, right: 10, bottom: 25, left: 40,
            }}
          >
            <AnimatedAxis
              orientation="left"
              hideZero
              hideTicks
              tickLabelProps={() => ({
                transform: 'translate(0, 4)',
                fontSize: 13,
                fill: textColor,
              })}
              numTicks={4}
              stroke={borderColor}
            />
            <AnimatedAxis
              orientation="bottom"
              numTicks={3}
              stroke={'transparent'}
              tickStroke="transparent"
              tickLabelProps={() => ({
                // transform: "translate(-50%, 0)",
                textAnchor: 'middle',
                fontSize: 13,
                fill: textColor,
              })}
            />
            <AnimatedGrid columns={false} numTicks={4} stroke={borderColor} strokeWidth={1} lineStyle={{ stroke: borderColor }} />
            <LinearGradient id="area-gradient" from={'#E07D00'} to={'#E07D00'} fromOpacity={0.26} toOpacity={0} />
            <AnimatedBarSeries
              colorAccessor={() => barColor}
              barPadding={intervalTime === '7d' ? 0.8 : 0.5}
              dataKey="Volume"
              data={graphData?.volume || []}
              xAccessor={accessors.xAccessor}
              yAccessor={accessors.yAccessor}
            />
            <AnimatedAreaSeries
              renderLine={true}
              lineProps={{
                stroke: '#E07D00'
              }}
              // stroke="black"
              dataKey="Average Price"
              curve={curveCardinal}
              fill="url(#area-gradient)"
              data={graphData?.average || []}
              xAccessor={accessors.xAccessor}
              yAccessor={accessors.yAccessor}
              strokeWidth={0}
            />
            <Tooltip
              glyphStyle={{
                fill: '#EF7800'
              }}
              snapTooltipToDatumX
              snapTooltipToDatumY
              showVerticalCrosshair
              showSeriesGlyphs
              verticalCrosshairStyle={{
                stroke: borderColor
              }}
              renderTooltip={({ tooltipData }) => (
                <div style={{ color: textColor }}>
                  {Object.entries(tooltipData?.datumByKey || {})
                    .map(([label, datum], index) => {
                      const { datum: { x, y } } = datum as any;
                      // const value = Math.round(y * 100) / 100;
                      const value = label.toLowerCase() === 'volume' ? y / (graphData?.volumeToAverageRatio || 1) : y;
                      const displayValue = Math.round(value * 100) / 100;

                      return (
                        <Box fontWeight={'normal'} key={label}>
                          {index === 0 && <Text marginTop={0}>{format(new Date(x), 'MM-dd-yyyy')}</Text>}
                          <HStack>
                            <span>
                              {label}
                              :
                              {' '}
                            </span>
                            <EthIcon width=".5rem" />
                            <Box>
                              <b>{displayValue}</b>
                            </Box>
                          </HStack>
                        </Box>
                      );
                    })}
                </div>
              )}
            />
          </XYChart>
        </Box>
      }
      {!props.collectingData &&
        <Grid marginTop="2rem" templateColumns="repeat(2, 1fr)" columnGap="1rem" rowGap=".2rem">
          {highestAveragePrice &&
            <>
              <Text fontWeight="bold">
                Highest price sold for:
              </Text>
              <Box>
                <HStack>
                  <EthIcon width=".7rem" />
                  <Text>{Math.round(highestAveragePrice * 100) / 100}</Text>
                </HStack>
              </Box>
            </>
          }
          {lowestAveragePrice &&
            <>
              <Text fontWeight="bold">
                Lowest price sold for:
              </Text>
              <Box>
                <HStack>
                  <EthIcon width=".7rem" />
                  <Text>{Math.round(lowestAveragePrice * 100) / 100}</Text>
                </HStack>
              </Box>
            </>
          }
        </Grid>
      }
    </Card>
  )
}