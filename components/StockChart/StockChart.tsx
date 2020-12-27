import React, { useEffect, useState } from 'react'
import {Text, View} from 'react-native'
import { LineChart, Grid, XAxis } from 'react-native-svg-charts'
import * as scale from 'd3-scale'
import * as shape from 'd3-shape'
import * as dateFns from 'date-fns'

//@ts-ignore
export const StockChart = ({data}) =>{
    const numbers = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]


    const [stockData, setStockData] = useState<any[]>([])

    interface valInteface {
        close?: string;
    }

    useEffect(()=>{
        const stockDataArr:any[] = []
        for (let [key, value] of Object.entries(data)) {
            // console.log(key)
            // console.log(value)

            const newObj  = {
                date: dateFns.format(new Date(key), 'yyyy-MM-dd'),
                //@ts-ignore
                price: value["close"]
            }
            // console.log(newObj)
            stockDataArr.push(newObj)
          }
          //@ts-ignore
         setStockData(stockDataArr)
    }, [data])

    console.log("STOCK DATA....")
    console.log(stockData)

    return (
        <View>
        <LineChart
            style={{ height: 200, width: 300}}
            data={stockData}
            svg={{ stroke: 'rgb(134, 65, 244)' }}
            contentInset={{ top: 20, bottom: 20 }}
            xScale={ scale.scaleTime }
            //@ts-ignore
            xAccessor={({item}) => item.date}
                //@ts-ignore
            yAccessor={({item}) => item.price}
            // formatLabel={({item}) => `${item.date}`}}
        >
            <Grid />
            {/* <XAxis
                    data={ stockData }
                    svg={{
                        fill: 'black',
                        fontSize: 8,
                        fontWeight: 'bold',
                        rotation: 20,
                        // originY: 30,
                        // y: 5,
                    }}
                    //@ts-ignore
                    xAccessor={ ({ item }) => item.date }
                    scale={ scale.scaleTime }
                    numberOfTicks={ 100 }
                    style={{ marginHorizontal: -15, height: 50 }}
                    contentInset={{ left: 10, right: 25 }}
                    // formatLabel={ (date) => date }
                    
                /> */}
        </LineChart>
        </View>
    )
}