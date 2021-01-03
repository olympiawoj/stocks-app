import React, { useEffect, useState } from 'react'
import {Chart, VerticalAxis, HorizontalAxis, Area, Line, Tooltip} from 'react-native-responsive-linechart'
import * as dateFns from 'date-fns'

interface MyObject {
    x: string;
    y: string;
}

export const ResponsiveStockChart = ({data}:any)=>{
    const [stockData, setStockData] = useState<any[]>([])
    console.log('ResponsiveStockChart', stockData)
    useEffect(()=>{
        const stockDataArr:MyObject[] = []
        let i = 0
        for (let [index, [key, value]] of Object.entries(Object.entries(data))) {
            // console.log(key)
            // console.log(value)
            // console.log(index)

            //@ts-ignore
            let newPrice = parseInt(value["close"]).toFixed(2) 
            // console.log(newPrice)
            const newObj  = {
                // x: dateFns.format(new Date(key), 'MMM-dd'),
                x: index,
                //@ts-ignore
                y: newPrice,

            }
            // console.log(newObj)
            newObj.y && stockDataArr.unshift(newObj)
          }
          //@ts-ignore
         setStockData(stockDataArr.slice(70, 100))
         return ()=>{
             setStockData([])
         }
    }, [data])

    const formatLabel = (stockData:any) => {
        console.log(stockData)
    }

    return (
 
        <>
        {stockData && (
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
                 xDomain={{ min: 0, max: 30 }}
                 yDomain={{ min: 0, max: 150 }}
               >
                 <VerticalAxis tickCount={10} theme={{ labels: { formatter: (v) => v.toFixed(0) } }} />
                 
                 <HorizontalAxis tickCount={5} theme={{ labels: { formatter: (v) => v.toFixed(0) } }}/>
                 <Area theme={{ gradient: { from: { color: '#44bd32' }, to: { color: '#44bd32', opacity: 0.2 } } }} />
                 <Line
                   tooltipComponent={<Tooltip />}
                   theme={{ stroke: { color: '#44bd32', width: 5 }, scatter: { default: { width: 8, height: 8, rx: 4, color: '#44ad32' }, selected: { color: 'red' } } }}
                 />
               </Chart>
        )}
        </>
    )
}