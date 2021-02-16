import React, { useState} from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { AppRegistry } from "react-native";
import axios from "axios";
import { Provider as PaperProvider } from "react-native-paper";
import { renameKeysArr } from "./utils/renameKeys";
import {handleQuote, handleCompanyOverview} from './utils/api'
import { AutocompleteSearchBarResults } from "./components/AutocompleteSearchBarResults/AutocompleteSearchBarResults";
import { SearchBar } from "./components/SearchBar/SearchBar";
import { colors } from "./utils/colors";
import { SwipeableModal } from "./components/Modal/Modal";
import { API_KEY } from "react-native-dotenv";
import {Watchlist} from './components/Watchlist/Watchlist'
import {FilteredOptions, StockObjInfo, BestMatchesInfo} from './App.schema'

export default function App() {
  const [value, setValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState<
  FilteredOptions[] | []
  >([]);
  const [stockObjInfo, setStockObjInfo] = useState<StockObjInfo | {}>({});
  const [prices, setPrices] = useState<number[] | []>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);


  const searchURL = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${value}&apikey=${API_KEY}`;

  const handleSearch = async () => {
    try {
      const response = await axios.get(searchURL);
      if (response.data) {
        const bestMatchesArr = response.data["bestMatches"];
        renameKeysArr(bestMatchesArr);
        let filteredMatchesArr = bestMatchesArr.filter(
          (obj: BestMatchesInfo) =>
            parseFloat(obj.matchScore) > 0.2 && obj.region === "United States"
        );
        filteredMatchesArr.forEach(async (obj: FilteredOptions) => {
          const price = await handleQuote(obj.symbol);
          const companyOverview = await handleCompanyOverview(obj.symbol);
          obj.price = price;
          obj.companyOverview = companyOverview;
          if (price) {
            setPrices((prices) => {
              return {
                ...prices,
                price,
              };
            });
          }
        });
        setFilteredOptions(filteredMatchesArr.slice(0, 4));
      }
    } catch (error) {
      console.log("error", error);
    }
  };




  const handleCancelSearch = () => {
    setFilteredOptions([]);
    setValue("");
  };

  const handleModalClose = () => {
    setIsModalVisible((isModalVisible) => {
      return !isModalVisible;
    });
  };

  const options = { month: "long", day: "numeric" };


  return (
    <PaperProvider>
      <View style={styles.container}>
        {filteredOptions.length == 0 && (
                  <View style={{display: 'flex', flexDirection: 'row'}}>
                  <View>
                  <Text style={{ color: "white", fontSize: 25, fontWeight: "800" }}>
                    Stocks
                  </Text>
                  <Text
                    style={{
                      color: colors.gunsmokeGrey,
                      fontSize: 25,
                      fontWeight: "800",
                      marginBottom: 10,
                    }}
                  >
                    {new Date().toLocaleDateString(undefined, options)}
                  </Text>
                  </View>
                  <View style={{display: 'flex', justifyContent: 'flex-start', marginLeft: 150}}>
                    {/* <Text style={{ color: "#007AFF",  paddingLeft: 5, paddingTop:10, fontSize: 17}}>Edit</Text> */}
                    </View>
                  </View>
        )}
        <View style={styles.center}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <SearchBar
              value={value}
              setValue={setValue}
              filteredOptions={filteredOptions}
              handleSearch={handleSearch}
              handleCancelSearch={handleCancelSearch}
            />
            {filteredOptions && filteredOptions.length > 0 && (
              <Pressable onPress={handleCancelSearch}>
                <Text style={{ color: colors.blue, paddingBottom: 20, paddingLeft: 5}}>
                  Cancel
                </Text>
              </Pressable>
            )}
          </View>
          {filteredOptions.length === 0 && (
             (
              <Watchlist setStockObjInfo={setStockObjInfo}   setModalVisible={setIsModalVisible} />
            )
          )}
          {filteredOptions && filteredOptions.length > 0 && (
            <AutocompleteSearchBarResults
              filteredOptions={filteredOptions}
              prices={prices}
              setModalVisible={setIsModalVisible}
              setStockObjInfo={setStockObjInfo}
            />
          )}
        </View>
        {Object.keys(stockObjInfo).length > 0 && (
          <SwipeableModal
            isModalVisible={isModalVisible}
            handleModalClose={handleModalClose}
            stockObjInfo={stockObjInfo}
          />
        )}
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    paddingTop: 75,
    padding: 15,
  },
  center: {
    alignItems: "center",
  },
});

AppRegistry.registerComponent("stocks", () => App);
