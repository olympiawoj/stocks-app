import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import { colors } from "./utils/colors";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSearch, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { renameKeysArr, renameKeysObj } from "./utils/renameKeys";
import {AutocompleteSearchBarResults} from './components/AutocompleteSearchBarResults/AutocompleteSearchBarResults'
import {  SearchBar} from './components/SearchBar/SearchBar'

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
  price?:string;
  filteredOptions?:object;
  companyOverview?:object
}


// @ts-ignore
import { API_KEY } from "react-native-dotenv";

export default function App() {
  const [value, setValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [prices, setPrices] = useState([])
  

  const searchURL = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${value}&apikey=${API_KEY}`;

  const handleSearch = async (e: any) => {
    try {
      const response = await axios.get(searchURL);
      if (response.data) {
        const bestMatchesArr = response.data["bestMatches"]
        renameKeysArr(bestMatchesArr)
        //@ts-ignore
        let filteredMatchesArr = bestMatchesArr.filter(obj => (parseFloat(obj.matchScore, 10)  > 0.20) && (obj.region === 'United States') )
        filteredMatchesArr.forEach( async (obj: filteredOptions) => {
          const price = await handleQuote(obj.symbol)
          // const companyOverview = await handleCompanyOverview(obj.symbol)
          obj.price = price
          // obj.companyOverview = companyOverview
          if(price){
            setPrices((prices)=>{
              return {
                ...prices,
                price
              }
            })
          }
        })
        console.log(filteredMatchesArr)
        setFilteredOptions(filteredMatchesArr);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleQuote= async (ticker: string)=> {
    const quoteURL = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${API_KEY}`
    try {
      const response = await axios.get(quoteURL)
      const searchObj = response.data["Global Quote"]
      renameKeysObj(searchObj)
      if(searchObj.price){
        return searchObj.price
      } 
    } 
    catch(error){
      console.log(error)
    }
  }

  const handleCompanyOverview = async( ticker: string)=>{
    const quoteURL = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${ticker}&apikey=${API_KEY}`
    try {
      const response = await axios.get(quoteURL)
      console.log(response.data)
      // const searchObj = response.data["Global Quote"]
      // renameKeysObj(searchObj)
      return response.data
    }
    catch(error){
      console.log(error)
    }
  }

  const handleCancelSearch = ()=>{
    setFilteredOptions([])
    setValue('')
  }

  return (
    <View style={styles.container}>
      <SearchBar value={value} setValue={setValue} filteredOptions={filteredOptions} handleSearch={handleSearch} handleCancelSearch={handleCancelSearch}/>
     {filteredOptions && filteredOptions.length > 0 &&  <AutocompleteSearchBarResults filteredOptions={filteredOptions} prices={prices}/>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B0B0B",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: '20%'
  },
});
