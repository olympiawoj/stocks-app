import React, { useEffect, useState } from 'react'
import {Text as RNText, View} from 'react-native'
import { AreaChart, LineChart, Grid, XAxis } from 'react-native-svg-charts'
import * as scale from 'd3-scale'
import * as shape from 'd3-shape'
import * as dateFns from 'date-fns'
import { Item } from 'react-native-paper/lib/typescript/components/List/List'
import {colors} from '../../utils/colors'

import { Circle, G, Line, Rect, Text } from 'react-native-svg'
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
                date: dateFns.format(new Date(key), 'MMM-dd'),
                //@ts-ignore
                price: newPrice
            }
            // console.log(newObj)
            newObj.price && stockDataArr.unshift(newObj)
          }
          //@ts-ignore
         setStockData(stockDataArr.slice(70, 100))
    }, [data])

    console.log("STOCK DATA....")
    console.log(stockData[0], stockData[stockData.length -1])
    //@ts-ignore
    const Decorator = ({ x, y, stockData }:any) => {
        //@ts-ignore
        return stockData.map((value, index) => (
            <Circle
                key={ index }
                cx={ x(index) }
                cy={ y(value.price) }
                r={ 4 }
                stroke={colors.emerald }
                fill={ colors.emerald }
            />
        ))
    }

    // //@ts-ignore
    // const Tooltip = ({x, y, stockData}:any)=> {
    //     console.log('stockData', stockData)
    //     return (
    //         <G
    //         x={ x(5) - (75 / 2) }
    //         key={ 'tooltip' }
    //         onPress={ () => console.log('tooltip clicked') }
    //     >
    //         <G y={ 50 }>
    //             <Rect
    //                 height={ 40 }
    //                 width={ 75 }
    //                 stroke={ 'grey' }
    //                 fill={ 'white' }
    //                 ry={ 10 }
    //                 rx={ 10 }
    //             />
    //             <Text
    //                 x={ 75 / 2 }
    //                 dy={ 20 }
    //                 alignmentBaseline={ 'middle' }
    //                 textAnchor={ 'middle' }
    //                 stroke={ 'rgb(134, 65, 244)' }
    //             >
    //                 { `${stockData[5].price}` }
    //             </Text>
    //         </G>
    //         <G x={ 75 / 2 }>
    //             <Line
    //                 y1={ 50 }
    //                 y2={ (stockData[ 5 ].price) }
    //                 stroke={ 'grey' }
    //                 strokeWidth={ 2 }
    //             />
    //             <Circle
    //                 cy={ (stockData[ 5 ]) }
    //                 r={ 6 }
    //                 stroke={ 'rgb(134, 65, 244)' }
    //                 strokeWidth={ 2 }
    //                 fill={ 'white' }
    //             />
    //         </G>
    //     </G>
    //     )
    // }
    
    

    return (
        <AreaChart
        style={{height: 200}}
        data={stockData}
        svg={{ fill: 'rgba(134, 65, 244, 0.2)' }}
        contentInset={{ top: 20, bottom: 30 }}
        >
        <LineChart
            style={{ height: 200, width: 330}}
            data={stockData}
            svg={{ stroke: colors.emerald }}
            contentInset={{ top: 10, bottom: 10 }}
            xScale={ scale.scaleTime }

            yAccessor={({item}) => item.price}
        >
            <Grid svg={{
                stroke: colors.searchBackground
            }}/>

            <Decorator stockData={stockData}/>
            {/* <Tooltip stockData={stockData}/> */}
            </LineChart>
            <XAxis
                    data={ stockData }
                    svg={{
                        fill: 'white',
                        fontSize: 7,
                        fontWeight: 'bold',
                        rotation: 0,
                        originY: 30,
                        y: 5,
                    }}
                    //@ts-ignore
                    // scale={ scale.scaleTime }
                    numberOfTicks={5}
                    style={{ marginHorizontal: -15, height: 50 }}
                    contentInset={{ left: 10, right: 25 }}
                    formatLabel={ (value, index) => {
                        console.log(`value: ${value}`)
                        if(index % 2 != 0) return stockData[index].date
                        else return ''
                    }} 
                    
                />
        </AreaChart>
    )
}