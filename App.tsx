import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AppRegistry } from 'react-native';
import axios from "axios";
import { Provider as PaperProvider } from 'react-native-paper';
import { renameKeysArr, renameKeysObj } from "./utils/renameKeys";
import { AutocompleteSearchBarResults } from "./components/AutocompleteSearchBarResults/AutocompleteSearchBarResults";
import { SearchBar } from "./components/SearchBar/SearchBar";
import { colors } from "./utils/colors";
import {SwipeableModal} from './components/Modal/Modal'
//@ts-ignore
import { API_KEY } from "react-native-dotenv";


interface filteredOptions {
  symbol: string;
  name: string;
  type: string;
  region: string;
  marketOpen: string;
  marketClose: string;
  timezone: string;
  currency: string;
  matchScore: string;
  price?: string;
  filteredOptions?: object;
  companyOverview?: object;
  length: number;
}

interface StockObjInfo {
    currency: string;
    marketClose: string;
    marketOpen: string;
    marketScore: string;
    name: string;
    region: string;
    symbol: string;
    timezone: string;
    type: string;
    price: string;
}

interface BestMatchesInfo {
  matchScore: string;
  region: string;
}


export default function App() {
  const [value, setValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState<filteredOptions | []>([]);
  const [stockObjInfo, setStockObjInfo] = useState<StockObjInfo | {}>({})
  const [prices, setPrices] = useState<number[] | []>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const searchURL = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${value}&apikey=${API_KEY}`;

  const handleSearch = async () => {
    try {
      const response = await axios.get(searchURL);
      if (response.data) {
        const bestMatchesArr = response.data["bestMatches"];
        renameKeysArr(bestMatchesArr);
        let filteredMatchesArr = bestMatchesArr.filter((obj:BestMatchesInfo) => parseFloat(obj.matchScore) > 0.2 && obj.region === "United States"
        );
        filteredMatchesArr.forEach(async (obj: filteredOptions) => {
          const price = await handleQuote(obj.symbol);
          // const companyOverview = await handleCompanyOverview(obj.symbol)
          obj.price = price;
          // obj.companyOverview = companyOverview
          if (price) {
            setPrices((prices) => {
              return {
                ...prices,
                price,
              };
            });
          }
        });
        // console.log(filteredMatchesArr);
        setFilteredOptions(filteredMatchesArr.slice(0, 4));
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleQuote = async (ticker: string) => {
    const quoteURL = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${API_KEY}`;
    try {
      const response = await axios.get(quoteURL);
      const searchObj = response.data["Global Quote"];
      renameKeysObj(searchObj);
      if (searchObj.price) {
        return searchObj.price;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCompanyOverview = async (ticker: string) => {
    const quoteURL = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${ticker}&apikey=${API_KEY}`;
    try {
      const response = await axios.get(quoteURL);
      console.log(response.data);
      // const searchObj = response.data["Global Quote"]
      // renameKeysObj(searchObj)
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelSearch = () => {
    setFilteredOptions([]);
    setValue("");
  };

  const handleModalClose = () =>{
    setIsModalVisible(isModalVisible =>{
      return !isModalVisible
    })
  }
  

  const options = { month: "long", day: "numeric" };

  return (
    <PaperProvider>
    <View style={styles.container}>
      <Text style={{ color: "white", fontSize: 25, fontWeight: "800"}}>
        Stocks
      </Text>
      <Text
        style={{ color: colors.gunsmokeGrey, fontSize: 25, fontWeight: "800", marginBottom: 10}}
      >
        {new Date().toLocaleDateString(undefined, options)}
      </Text>
      <View style={styles.center}>
      <SearchBar
        value={value}
        setValue={setValue}
        filteredOptions={filteredOptions}
        handleSearch={handleSearch}
        handleCancelSearch={handleCancelSearch}
      />
      {filteredOptions && filteredOptions.length > 0 && (
        <AutocompleteSearchBarResults
          filteredOptions={filteredOptions}
          prices={prices}
          setModalVisible={setIsModalVisible}
          setStockObjInfo={setStockObjInfo}
        />
      )}
      </View>
      <SwipeableModal isModalVisible={isModalVisible} handleModalClose={handleModalClose} stockObjInfo={stockObjInfo}/>
    </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    paddingTop: 100,
    padding: 15,
  },
  center: {
    alignItems: 'center'
  }
});


AppRegistry.registerComponent('stocks', () => App);
