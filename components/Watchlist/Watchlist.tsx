import * as React from "react";
import { useEffect, useState } from "react";
import { Text, View , FlatList} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { handleQuote, handleCompanyOverview } from "../../utils/api";
import { colors } from "../../utils/colors";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { GestureHandlerGestureEvent, GestureHandlerGestureEventNativeEvent, TouchableOpacity } from "react-native-gesture-handler";
import { GestureResponderEvent } from "react-native";

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
        console.log(e)
      }
    };
    getData();
  }, []);


  return (
    <View>
     { myWatchlist.length > 0 && 
     <FlatList
        keyExtractor={(item) => item.name}
        data={myWatchlist}
        renderItem={({item})=> (
          <Swipeable
          friction={2}
          leftThreshold={125}
          overshootFriction={50}
          onSwipeableOpen={() => console.log("swipe opening")}
          renderRightActions={() => (
            <TouchableOpacity
              style={{
                backgroundColor: "red",
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "center",
                marginRight: 16,
                padding: 10,
                height: 75
              }}
              //@tsignor
              onPress={()=>{
                let newWatchlist = [...myWatchlist]
                // console.log(newWatchlist, stock)
                //@ts-ignore
                newWatchlist = newWatchlist.filter((stockObj) => stockObj.name !== item.name)
                setMyWatchlist(newWatchlist)
              }}
            >
              <Text style={{color: 'white', fontWeight: 'bold'}}>Remove</Text>
            </TouchableOpacity>
          )}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignContent: "center",
              padding: 10,
              width: 350,
              height: 75,
            }}
          >
            <View>
              <Text style={{ color: "white", fontSize: 17, fontWeight: 'bold' }}>
                {item.ticker}
              </Text>
              <Text key={item.name} style={{ color: colors.gunsmokeGrey }}>
                {item.name}
              </Text>
            </View>
            <Text style={{ color: "white", fontWeight: 'bold' }}>
              {item.price?.slice(0, -2)}
            </Text>
          </View>
        </Swipeable>
        )}

      />
}
    </View>
  );
};
