import * as React from "react";
import { useEffect, useState } from "react";
import {
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Animated,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { handleQuote, handleCompanyOverview } from "../../utils/api";
import { colors } from "../../utils/colors";
import Swipeable from "react-native-gesture-handler/Swipeable";
import {
  GestureHandlerGestureEvent,
  GestureHandlerGestureEventNativeEvent,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { GestureResponderEvent } from "react-native";

interface Watchlist {
  symbol: string;
  price: string;
  name: string;
  [props: string]: string;
}
//@ts-ignore
export const Watchlist = ({ setStockObjInfo, setModalVisible }) => {
  const [myWatchlist, setMyWatchlist] = useState<Watchlist[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setMyWatchlist([]);
    const getData = async () => {
      try {
        const watchlist = await AsyncStorage.getItem("watchlist");
        if (watchlist !== null) {
          // value previously stored1
          let watchlistArr = JSON.parse(watchlist);
          watchlistArr.length > 0 &&
            watchlistArr.forEach(async (ticker: string) => {
              try {
                const price = await handleQuote(ticker);
                const companyOverview = await handleCompanyOverview(ticker);
                const newStockObj = {
                  symbol: ticker,
                  price,
                  companyOverview: companyOverview,
                  name: companyOverview["Name"],
                };
                //@ts-ignore
                setMyWatchlist((myPrevWatchlist) => [
                  ...myPrevWatchlist,
                  newStockObj,
                ]);

                setIsLoading(false);
              } catch (err) {
                console.log(err);
              }
            });
          console.log("arr", myWatchlist);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, []);

  console.log({ myWatchlist });

  
  const renderRightAction = (
    progress: Animated.AnimatedInterpolation,
    x: number,
    item: any
  ) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0],
    });

    return (
      <Animated.View
      style={{ flex: 1, transform: [{ translateX: trans }] }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "red",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginRight: 16,
            padding: 10,
            height: 75,
          }}
          //@tsignor
          onPress={() => {
            let newWatchlist = [...myWatchlist];
            // console.log(newWatchlist, stock)
            //@ts-ignore
            newWatchlist = newWatchlist.filter(
              (stockObj) => stockObj.name !== item.name
            );
            setMyWatchlist(newWatchlist);
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>
            Remove
          </Text>
        </TouchableOpacity>
      </Animated.View>
    );


    };
  
  return (
    <View>
      {isLoading && <ActivityIndicator size="small" color="white" />}
      {myWatchlist.length > 0 && (
        <FlatList
          keyExtractor={(item) => item.name}
          data={myWatchlist}
          renderItem={({ item }) =>
            item && (
              <Swipeable
                friction={2}
                // rightThreshold={40}
                renderRightActions={(
                  progress: Animated.AnimatedInterpolation,
                  _dragAnimatedValue: Animated.AnimatedInterpolation
                ) => {
                  return (
                    <View>
                      {renderRightAction(progress, 128, item)}
                    </View>
                  )
                  
                }}
              >
                <TouchableOpacity
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignContent: "center",
                    padding: 10,
                    width: 350,
                    height: 75,
                  }}
                  onPress={() => {
                    setStockObjInfo(item);
                    setModalVisible(true);
                  }}
                >
                  <View>
                    <Text
                      style={{
                        color: "white",
                        fontSize: 17,
                        fontWeight: "bold",
                      }}
                    >
                      {item.symbol.toString()}
                    </Text>
                    <Text
                      key={item.name}
                      style={{ color: colors.gunsmokeGrey }}
                    >
                      {item.name}
                    </Text>
                  </View>
                  <Text style={{ color: "white", fontWeight: "bold" }}>
                    {item.price?.slice(0, -2)}
                  </Text>
                </TouchableOpacity>
              </Swipeable>
            )
          }
        />
      )}
    </View>
  );
};
