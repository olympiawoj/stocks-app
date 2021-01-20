import React, { useEffect, useState, useRef } from "react";
import {GestureResponderEvent, Text, FlatList, View} from 'react-native'
import {
  Chart,
  VerticalAxis,
  HorizontalAxis,
  Area,
  Line,
  Tooltip,
} from "react-native-responsive-linechart";
import * as dateFns from "date-fns";
import { colors } from "../../utils/colors";
import { DataTable } from "react-native-paper";
import { GestureDirection } from "@react-navigation/stack/lib/typescript/src/types";
import { text } from "@fortawesome/fontawesome-svg-core";

interface MyObject {
  x: string;
  y: string;
  meta: string;
}

interface StockObjInfo {
  currency?: string;
  marketClose?: string;
  marketOpen?: string;
  marketScore?: string;
  name?: string;
  region?: string;
  symbol?: string;
  timezone?: string;
  type?: string;
  price?: string;
  [propName: string]: any; // string index signature - allwos us to have extra properties
}

interface ResponsiveStockChartProps {
  // data: StockObjInfo;
  stockObjInfo: StockObjInfo;
  setTimePeriod: any;
  min: any;
  max: any;
  timePeriod: string;
  dateMap: any;
  stockData: any
}

interface MapObj {
  [i: string]: string;
}
//https://www.typescriptlang.org/docs/handbook/interfaces.html
interface timeToDaysMap {
    [index: string]: number;
}
const timeToDaysMap:timeToDaysMap = {
    // 252 trading days
    // 1 week = 5 days
    // 1 month = 21
    // 3 months = 63
    // 6 months = 126
    // 1 year = 252
    // 2 years = 504
    ['1D']: 1,
    ['1W']: 5,
    ['1M']: 21,
    ['3M']: 63,
    ['6M']: 126,
    ['1Y']: 252,
    ['2Y']: 504,
}

export const ResponsiveStockChart = ({
  stockData,
  dateMap,
  stockObjInfo,
  min,
  max,
  setTimePeriod,
  timePeriod
}: ResponsiveStockChartProps) => {

  
  interface RenderItemProps{
    item: string;
  }
  const renderItem = ({item}:RenderItemProps)=>{
    const onTextPress = () =>{
      setTimePeriod(item)
    }

    return (
      <View style={{backgroundColor: item === timePeriod ? colors.searchBackground : colors.codGrey, height: 30, width: 50, justifyContent: 'center', display: 'flex', alignContent: 'center', borderRadius: 5, paddingLeft: 12, marginLeft: 5
      }}>
      <Text style={{color: 'white', fontWeight: 'bold', paddingRight: 20}} onPress={onTextPress}>{item}</Text>
      </View>
    )
  }
  



  return (
    <>
      {(stockData.length > 0) && (
        <>
          {/* <DataTable.Row style={{marginRight: 15}}>
            <CustomCell text="1W"/>
            <CustomCell text="1M"/>
            <CustomCell text="3M"/>
            <CustomCell text="6M"/>
            <CustomCell text="1Y"/>
            <CustomCell text="2Y"/>
          </DataTable.Row> */}
          <FlatList 
          
          horizontal data={["1D", "1W", "1M", "3M", "6M", "1Y","2Y"]} renderItem={renderItem} keyExtractor={item => item} style={{  flexGrow: 0}}
          />
          <Chart
            style={{ height: 250, width: "100%", alignContent: 'center' }}
            // data={[
            //   { x: -2, y: 15 },
            //   { x: -1, y: 10 },
            //   { x: 10, y: 18 },
            // ]}
            data={stockData}
            padding={{ left: 40, bottom: 20, right: 20, top: 20 }}
            xDomain={{ min: Math.max(stockData.length - timeToDaysMap[timePeriod] -1, 1), max: stockData.length }}
            yDomain={{
              min: Math.floor(parseFloat(min) - 2),
              max: Math.ceil(parseFloat(max) + 2),
            }}
          >
            <VerticalAxis
              tickCount={5}
              theme={{
                labels: {
                  formatter: (v) => v.toFixed(0),
                  label: { color: colors.white, fontWeight: 700 },
                },
                ticks: { visible: false },
              }}
            />

            <HorizontalAxis
              tickCount={7}
              theme={{
                labels: {
                  formatter: (v) => dateMap[v.toString()],
                  label: { color: colors.white, fontWeight: 700  },
                },
                ticks: { visible: false },
              }}
            />
            <Area
              theme={{
                gradient: {
                  from: { color: colors.emerald },
                  to: { color: "#44bd32", opacity: 0.2 },
                },
              }}
            />
            <Line
              smoothing={"cubic-spline"}
              tooltipComponent={
                <Tooltip
                  theme={{
                    shape: { width: 100, color: "transparent" },
                    formatter: (v) =>
                      v.y.toString() + " (" + v.meta.toString() + ")",
                  }}
                />
              }
              theme={{
                stroke: { color: colors.emerald, width: 5 },
                scatter: {
                  selected: { width: 4, height: 4, rx: 4, color: "white" },
                },
              }}
            />
          </Chart>
        </>
      )}
    </>
  );
};
