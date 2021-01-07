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
}

export const SwipeableModal = ({
  isModalVisible,
  handleModalClose,
  stockObjInfo,
}: SwipeableModal) => {
    const [stockDailyPxHistory, setStockDailyPxHistory] = useState([])
  
    const dailyAdjustedURL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stockObjInfo.symbol}&outputsize=compact&apikey=${API_KEY}`;


    useEffect( ()=>{
        const fetchDailyAdjustedData = async () =>{
            try{
                const response = await axios.get(dailyAdjustedURL);
                // console.log("META DATA.... OBJ")
                // console.log(response.data["Meta Data"]["2. Symbol"])

                // console.log("DAILY TIME SERIES..... OBJ")
                // console.log(response.data["Time Series (Daily)"])
                let timeSeries = response.data["Time Series (Daily)"]
                for (let [key, value] of Object.entries(timeSeries)) {
                    // console.log(key)
                    // console.log(value)
                    value = renameKeysObj(value)
                  }
                setStockDailyPxHistory(timeSeries)
                // console.log(stockDailyPxHistory)

            }catch(error){
                console.log(error)
            }
        }
        fetchDailyAdjustedData()
        return ()=>{
            setStockDailyPxHistory([])
        }

    }, [stockObjInfo])

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
        { !!stockDailyPxHistory && <ResponsiveStockChart data={stockDailyPxHistory} stockObjInfo={stockObjInfo}/>}
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
