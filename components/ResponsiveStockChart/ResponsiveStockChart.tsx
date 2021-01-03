import React, { useEffect, useState } from 'react'
import {Chart, VerticalAxis, HorizontalAxis, Area, Line, Tooltip} from 'react-native-responsive-linechart'
import * as dateFns from 'date-fns'
import { colors } from '../../utils/colors'

interface MyObject {
    x: string;
    y: string;
    date: string;
}

export const ResponsiveStockChart = ({data}:any)=>{
    const [stockData, setStockData] = useState<any[]>([])
    console.log('ResponsiveStockChart', data)
    useEffect(()=>{
        const stockDataArr:MyObject[] = []
        let i = Object.entries(data).length
        for (let [key, value] of Object.entries(data)) {
            console.log(key)
            console.log(value)

            //@ts-ignore
            let newPrice = parseInt(value["adjusted close"], 10).toFixed(2) 
            // console.log(newPrice)
            const newObj:MyObject  = {
                // x: dateFns.format(new Date(key), 'MMM-dd'),
                x: i.toString(),
                y: newPrice,
                date: dateFns.format(new Date(key), 'MMM-dd')

            }
            // console.log(newObj)
            i--
            newObj.y && stockDataArr.unshift(newObj)
            //unshift adds newObj to the BEGINNING of stockDataArr
            //Adds Aug-10 to the beginning
            // PUSH adds to the END of the stockDataArr, e.g. 
          }
          console.log('stockDataArr')
          console.log(stockDataArr)
          //@ts-ignore
         setStockData(stockDataArr)
         return ()=>{
             setStockData([])
         }
    }, [data])

    const formatLabel = (stockData:any) => {
        console.log(stockData)
    }

    return (
 
        <>
        {stockData.length>0 && (
                 <Chart
                 style={{ height: 200, width: '100%' }}
                 // data={[
                 //   { x: -2, y: 15 },
                 //   { x: -1, y: 10 },
                 //   { x: 0, y: 12 },
                 //   { x: 1, y: 7 },
                 //   { x: 2, y: 6 },
                 //   { x: 3, y: 3 },
                 //   { x: 4, y: 5 },
                 //   { x: 5, y: 8 },
                 //   { x: 6, y: 12 },
                 //   { x: 7, y: 14 },
                 //   { x: 8, y: 12 },
                 //   { x: 9, y: 13.5 },
                 //   { x: 10, y: 18 },
                 // ]}
                 data={stockData}
                 padding={{ left: 40, bottom: 20, right: 20, top: 20 }}
                 xDomain={{ min: 0, max: 100 }}
                 yDomain={{ min: 0, max: 150 }}
               >
                 <VerticalAxis tickCount={10} theme={{ labels: { formatter: (v) => v.toFixed(0), label: {color: colors.manatee} } }} />
                 
                 <HorizontalAxis tickCount={10} theme={{ labels: { formatter: (v) => v.toFixed(0) , label: {color: colors.manatee}} }}/>
                 <Area theme={{ gradient: { from: { color: '#44bd32' }, to: { color: '#44bd32', opacity: 0.2 } } }} />
                 <Line
                   tooltipComponent={<Tooltip />}
                   theme={{ stroke: { color: '#44bd32', width: 5 }, scatter: { default: { width: 4, height: 4, rx: 4, color: '#44ad32' }, selected: { color: 'white' } } }}
                 />
               </Chart>
        )}
        </>
    )
}