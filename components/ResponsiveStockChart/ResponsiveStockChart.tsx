import React, { useEffect, useState } from 'react'
import {Text} from 'react-native'
import {Chart, VerticalAxis, HorizontalAxis, Area, Line, Tooltip} from 'react-native-responsive-linechart'
import * as dateFns from 'date-fns'
import { colors } from '../../utils/colors'

interface MyObject {
    x: string;
    y: string;
    meta: string;
}

export const ResponsiveStockChart = ({data, stockObjInfo}:any)=>{
    const [stockData, setStockData] = useState<any[]>([])
    const [dateMap, setDateMap] = useState<any>({})
    console.log('ResponsiveStockChart', data)
    useEffect(()=>{
        const stockDataArr:MyObject[] = []
        const mapObj = {}
        let i = Object.entries(data).length
        for (let [key, value] of Object.entries(data)) {
            console.log(key)
            console.log(value)

            //@ts-ignore
            let newPrice = parseFloat(value["adjusted close"]).toFixed(2) 
            // console.log(newPrice)
            const newObj:MyObject  = {
                // x: dateFns.format(new Date(key), 'MMM-dd'),
                x: i.toString(),
                y: newPrice,
                meta: dateFns.format(new Date(key), 'MMM-dd')
            }  
            //@ts-ignore
            mapObj[i.toString()] = dateFns.format(new Date(key), 'MMM-dd')


            // console.log(newObj)
            i--
            newObj.y && stockDataArr.unshift(newObj)
            // mapObj.i && mapObjArr.unshift(mapObj)
            //unshift adds newObj to the BEGINNING of stockDataArr
            //Adds Aug-10 to the beginning
            // PUSH adds to the END of the stockDataArr, e.g. 
          }
          console.log('stockDataArr')
          console.log(stockDataArr)
          console.log("*****************************")
          console.log(mapObj)
          //@ts-ignore
         setStockData(stockDataArr)
         setDateMap(mapObj)
         return ()=>{
             setStockData([])
         }
    }, [data])

    return (
 
        <>
        {stockData.length>0 && (
            <>
                <Text>{}</Text>

                 <Chart
                 style={{ height: 200, width: '100%' }}
                 // data={[
                 //   { x: -2, y: 15 },
                 //   { x: -1, y: 10 },
                 //   { x: 10, y: 18 },
                 // ]}
                 data={stockData}
                 padding={{ left: 40, bottom: 20, right: 20, top: 20 }}
                 xDomain={{ min: 0, max: 100 }}
                 yDomain={{ min: 100, max: 140 }}
               >
                 <VerticalAxis tickCount={5} theme={{ labels: { formatter: (v) => v.toFixed(0), label: {color: colors.manatee} }, ticks: {visible: false} }} />
                 
                 <HorizontalAxis tickCount={6} theme={{ labels: { formatter:  (v) => dateMap[v.toString()], label: {color: colors.manatee}}, ticks: {visible: false}  }}/>
                 <Area theme={{ gradient: { from: { color: colors.emerald }, to: { color: '#44bd32', opacity: 0.2 } } }} />
                 <Line
                   smoothing={"cubic-spline"}
                   tooltipComponent={<Tooltip theme={{shape:{width: 100, color: 'transparent'}, formatter: (v) => v.y.toString()+' ('+v.meta.toString()+")"}}/>}
                   theme={{ stroke: { color: colors.emerald, width: 5 }, scatter: {  selected: { width: 4, height: 4, rx: 4,color: 'white' } } }}
                 />
               </Chart>
               </>
        )}
        </>
    )
}