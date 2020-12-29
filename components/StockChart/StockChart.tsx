import React, { useEffect, useState } from 'react'
import {Text, View} from 'react-native'
import { LineChart, Grid, XAxis } from 'react-native-svg-charts'
import * as scale from 'd3-scale'
import * as shape from 'd3-shape'
import * as dateFns from 'date-fns'
import { Item } from 'react-native-paper/lib/typescript/components/List/List'
import {colors} from '../../utils/colors'
//@ts-ignore
export const StockChart = ({data}) =>{
    const [stockData, setStockData] = useState<any[]>([])

    useEffect(()=>{
        const stockDataArr:any[] = []
        for (let [key, value] of Object.entries(data)) {
            // console.log(key)
            // console.log(value)

            //@ts-ignore
            let newPrice = Math.floor(parseInt(value["close"]), 2) 
            console.log(newPrice)
            const newObj  = {
                date: dateFns.format(new Date(key), 'MMM/dd'),
                //@ts-ignore
                price: newPrice
            }
            // console.log(newObj)
            newObj.price && stockDataArr.unshift(newObj)
          }
          //@ts-ignore
         setStockData(stockDataArr)
    }, [data])

    console.log("STOCK DATA....")
    console.log(stockData)

    return (
        <View>
        <LineChart
            style={{ height: 200, width: 330}}
            data={stockData}
            svg={{ stroke: colors.emerald }}
            contentInset={{ top: 10, bottom: 10 }}
            xScale={ scale.scaleTime }

            yAccessor={({item}) => item.price}
        >
            <Grid />
            </LineChart>
            <XAxis
                    data={ stockData }
                    svg={{
                        fill: 'white',
                        fontSize: 8,
                        fontWeight: 'bold',
                        rotation: 0,
                        originY: 30,
                        y: 5,
                    }}
                    //@ts-ignore
                    scale={ scale.scaleTime }
                    numberOfTicks={30 }
                    style={{ marginHorizontal: -15, height: 50 }}
                    contentInset={{ left: 10, right: 25 }}
                    formatLabel={ (value, index) => {
                        if(index % 2) return stockData[index].date
                        else return ''
                    }} 
                    
                />
        </View>
    )
}