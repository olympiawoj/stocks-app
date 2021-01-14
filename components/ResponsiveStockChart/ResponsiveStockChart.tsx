import React, { useEffect, useState, useRef } from "react";
import {GestureResponderEvent, Text} from 'react-native'
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
  data: StockObjInfo[];
  stockObjInfo: StockObjInfo;
}

interface MapObj {
  [i: string]: string;
}
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
    ['1W']: 5,
    ['1M']: 21,
    ['3M']: 63,
    ['6M']: 126,
    ['1Y']: 252,
    ['2Y']: 504,
}

export const ResponsiveStockChart = ({
  data,
  stockObjInfo,
}: ResponsiveStockChartProps) => {
  const [stockData, setStockData] = useState<any[]>([]);
  const [dateMap, setDateMap] = useState<any>({});
  const [max, setMax] = useState("");
  const [min, setMin] = useState("");
  const [timePeriod, setTimePeriod] = useState("1M")
  // console.log('ResponsiveStockChart', data)

  useEffect(() => {
    const stockDataArr: MyObject[] = [];
    const dateMapObj: MapObj = {};
    let maxPx;
    let minPx;
    let i = Object.entries(data).length;
    for (let [key, value] of Object.entries(data)) {
      console.log(key);
      console.log(value);

      let newPrice = parseFloat(value["adjusted close"]).toFixed(2);
      // console.log(newPrice)
      const newObj: MyObject = {
        // x: dateFns.format(new Date(key), 'MMM-dd'),
        x: i.toString(),
        y: newPrice,
        meta: dateFns.format(new Date(key), "MMM-dd"),
      };

      dateMapObj[i.toString()] = dateFns.format(new Date(key), "MMM-dd");

      // Is there a max or min?
      if (!maxPx || !minPx) {
        maxPx = newPrice;
        minPx = newPrice;
      }
      if (minPx && minPx > newPrice) {
        minPx = newPrice;
      }
      if (maxPx && maxPx < newPrice) {
        maxPx = newPrice;
      }

      i--;
      newObj.y && stockDataArr.unshift(newObj);
      // mapObj.i && mapObjArr.unshift(mapObj)
      //unshift adds newObj to the BEGINNING of stockDataArr
      //Adds Aug-10 to the beginning
      // PUSH adds to the END of the stockDataArr, e.g.
    }

    // console.log(`maxPx: ${maxPx}, minPx:${minPx}`);
    maxPx && setMax(maxPx);
    minPx && setMin(minPx);
    //https://stackoverflow.com/questions/57086672/element-implicitly-has-an-any-type-because-expression-of-type-string-cant-b
    setStockData(stockDataArr.slice(0, timeToDaysMap[timePeriod]));
    setDateMap(dateMapObj);
    console.log('************************')
    console.log(stockDataArr, dateMapObj)
    return () => {
      setStockData([]);
    };
  }, [data, timePeriod]);



  interface CustomCellProps {
      text: string
  }
  const CustomCell = ({text}:CustomCellProps)=>{
    
    const onTextPress = () =>{
        console.log(text)
        setTimePeriod(text)
      }

    return (
    <DataTable.Cell numeric><Text style={{color: 'white', fontWeight: 'bold'}} onPress={onTextPress}>{text}</Text></DataTable.Cell>
    )
  }

  return (
    <>
      {stockData.length > 0 && (
        <>
          <DataTable.Row style={{marginRight: 15}}>
            <CustomCell text="1W"/>
            <CustomCell text="1M"/>
            <CustomCell text="3M"/>
            <CustomCell text="1Y"/>
            <CustomCell text="2Y"/>
          </DataTable.Row>
          <Chart
            style={{ height: 250, width: "100%", alignContent: 'center' }}
            // data={[
            //   { x: -2, y: 15 },
            //   { x: -1, y: 10 },
            //   { x: 10, y: 18 },
            // ]}
            data={stockData}
            padding={{ left: 40, bottom: 20, right: 20, top: 20 }}
            xDomain={{ min: 0, max: 100 }}
            yDomain={{
              min: Math.floor(parseFloat(min) - 5),
              max: Math.ceil(parseFloat(max) + 5),
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
              tickCount={6}
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
