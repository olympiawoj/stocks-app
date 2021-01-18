import * as React from "react"
import {useEffect, useState} from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "../../utils/colors";
import axios from "axios";
import Modal from "react-native-modal";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Divider } from "react-native-paper";
import {  renameKeysObj } from "../../utils/renameKeys";
import {ResponsiveStockChart} from '../ResponsiveStockChart/ResponsiveStockChart'
import { API_KEY } from "react-native-dotenv";
import * as dateFns from "date-fns";

interface SwipeableModal {
  isModalVisible: boolean;
  handleModalClose: any;
  stockObjInfo: StockObjInfo;
  prices?: any
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

interface MyObject {
  x: string;
  y: string;
  meta: string;
}
interface MapObj {
  [i: string]: string;
}

export const SwipeableModal = ({
  isModalVisible,
  handleModalClose,
  stockObjInfo,
}: SwipeableModal) => {
    const [stockData, setStockData] = useState<any[]>([]);
    const [stockIntradayPxHistory, setStockIntradayPxHistory] = useState({})
    const [timePeriod, setTimePeriod] = useState("1M")
    const [isLoading, setIsLoading] = useState(true)
    const [dateMap, setDateMap] = useState<any>({});
    const [max, setMax] = useState("");
    const [min, setMin] = useState("");
    const dailyAdjustedURL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stockObjInfo.symbol}&outputsize=compact&apikey=${API_KEY}`;
    const intradayTimeSeriesURL = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stockObjInfo.symbol}&interval=5min&outputsize=full&apikey=${API_KEY}`

    useEffect( ()=>{
        const fetchDailyAdjustedData = async () =>{
            setIsLoading(true)
            try{
                const response = await axios.get(dailyAdjustedURL);
                if(!!response.data){
                  console.log('is LOADING FALSE!!')
                  setIsLoading(false)
                }
                // console.log("META DATA.... OBJ")

                // console.log("DAILY TIME SERIES..... OBJ")
                // console.log(response.data["Time Series (Daily)"])
                const dateMapObj: MapObj = {};
                let timeSeries:StockObjInfo = response.data["Time Series (Daily)"]
                let i = Object.entries(timeSeries).length;
                let maxPx;
                let minPx;
                let stockDataArr: MyObject[] = [];
                for (let [key, value] of Object.entries(timeSeries)) {
                    console.log(key)
                    console.log(value)

                    let newPrice = parseFloat(value["5. adjusted close"]).toFixed(2);

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

                  }
  
                maxPx && setMax(maxPx);
                minPx && setMin(minPx);

                setStockData(stockDataArr);
                setDateMap(dateMapObj);

                console.log('stockData', stockData)
                console.log(dateMap)

            }catch(error){
                console.log(error)
            }
        }
        // const fetchIntradayAdjusted = async()=>{
        //   try{
        //     const response = await axios.get(intradayTimeSeriesURL);
        //     let timeSeries = response.data["Time Series (5min)"]
        //     for (let [key, value] of Object.entries(timeSeries)) {
        //       console.log('key', key)
        //       // console.log(value)
        //       value = renameKeysObj(value)
        //       console.log(value)
        //     }
        //     setStockIntradayPxHistory(timeSeries)
        //     console.log(stockIntradayPxHistory)

        //   }catch(error){
        //     console.log(error)
        //   }
        // }

        fetchDailyAdjustedData()
        // fetchIntradayAdjusted()
        // return ()=>{
        //     setStockData([]);
        //     setStockIntradayPxHistory({})
        // }

    }, [timePeriod])

  const isObjectEmpty =(obj:{}) =>{
    return Object.keys(obj).length === 0
  }

  return (
    <Modal
      backdropOpacity={0.7}
      style={{ margin: 0 }}
      testID={"modal"}
      isVisible={isModalVisible}
      onSwipeComplete={handleModalClose}
      useNativeDriverForBackdrop
      swipeDirection={["down"]}
    >   
      <View style={styles.content}>
        <View style={styles.view}>
          <TouchableOpacity onPressIn={handleModalClose}>
            <FontAwesomeIcon icon={faTimesCircle} color={colors.gunsmokeGrey} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingBottom: 10,
          }}
        >
          <Text style={styles.contentTitle}>{stockObjInfo.symbol}</Text>
          <Text style={{ color: colors.gunsmokeGrey, fontWeight: "800" }}>
            {stockObjInfo.name}
          </Text>
        </View>
        <Divider style={{ backgroundColor: colors.searchBackground }} />
        <View
          style={{
            flexDirection: "column",
            alignItems: "flex-start",
            paddingVertical: 10,
          }}
        >
          <Text style={{ color: "white", fontSize: 20, fontWeight: "800" }}>
            {stockObjInfo.price?.slice(0, -2)}
          </Text>
          <Text style={{ color: colors.gunsmokeGrey, fontWeight: "800" }}>
            At Close
          </Text>
        </View>
        <Divider style={{ backgroundColor: colors.searchBackground, marginBottom: 20 }} />
        {/* <StockChart data={stockDailyPxHistory}/> */}
        {isLoading && <Text style={{ color: "white", fontSize: 20, fontWeight: "800" }}>Loading...</Text>}
        {!isLoading && stockData.length > 0 && <ResponsiveStockChart stockData={stockData} dateMap={dateMap} stockObjInfo={stockObjInfo} setTimePeriod={setTimePeriod} timePeriod={timePeriod} min={min} max={max}/>}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  content: {
    backgroundColor: colors.codGrey,
    borderRadius: 20,
    borderColor: "rgba(0, 0, 0, 0.1)",
    width: "100%",
    height: "80%",
    position: "absolute",
    bottom: -30,
    flex: 1,
    padding: 20,
  },
  contentTitle: {
    fontSize: 30,
    fontWeight: "800",
    color: "white",
    marginRight: 10,
  },
  pressable: {
    height: "100%",
    width: "100%",
  },
  view: {
    position: "absolute",
    right: 20,
    top: 25,
    zIndex: 1,
  },
});

export default SwipeableModal;
