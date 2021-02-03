import * as React from "react";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { handleQuote, handleCompanyOverview } from "../../utils/api";
import { colors } from "../../utils/colors";
import Swipeable from "react-native-gesture-handler/Swipeable";

interface Watchlist {
  ticker: string;
  price: string;
  name: string;
  [props: string]: string;
}
export const Watchlist = () => {
  const [myWatchlist, setMyWatchlist] = useState<Watchlist[]>([]);

  useEffect(() => {
    setMyWatchlist([]);
    const getData = async () => {
      try {
        const watchlist = await AsyncStorage.getItem("watchlist");
        if (watchlist !== null) {
          // value previously stored
          console.log("value in asyncstorage", watchlist);
          let watchlistArr = JSON.parse(watchlist);
          let watchlistPricesArr: Watchlist[] = [];
          watchlistArr.forEach(async (ticker: string) => {
            try {
              const price = await handleQuote(ticker);
              const companyOverview = await handleCompanyOverview(ticker);
              const newStockObj = {
                ticker,
                price,
                name: companyOverview["Name"],
              } as Watchlist;
              //@ts-ignore
              setMyWatchlist((myWatchlist) => [...myWatchlist, newStockObj]);
            } catch (err) {
              console.log(err);
            }
          });
          console.log("arr", myWatchlist);
        }
      } catch (e) {
        // error reading value
      }
    };
    getData();
  }, []);



  return (
    <View>
      {myWatchlist.length > 0 &&
        myWatchlist.map((stock) => {
          return (
            <Swipeable
            
            friction={2}
            leftThreshold={80}
            onSwipeableOpen={() => console.log('swipe opening')}
            renderRightActions={()=>(
              <View style={{backgroundColor: 'red'}}>
                <Text>Remove</Text>
              </View>
            )}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignContent: 'center',
                  padding: 10,
                  width: 300,
                  height: 100,
                }}
              >
                <View>
                  <Text style={{ color: "white", fontSize: 17 }}>
                    {stock.ticker}
                  </Text>
                  <Text key={stock.name} style={{ color: colors.gunsmokeGrey }}>
                    {stock.name}
                  </Text>
                </View>
                <Text style={{ color: "white" }}>
                  {stock.price?.slice(0, -2)}
                </Text>
              </View>
            </Swipeable>
          );
        })}
    </View>
  );
};
