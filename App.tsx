import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import { Hello } from "./components/Hello";
import { Header } from "./components/Header/Header";
import { colors } from "./utils/colors";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSearch, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { renameKeysArr, renameKeysObj } from "./utils/renameKeys";
import {AutocompleteSearchBar} from './components/AutocompleteSearchBar/AutocompleteSearchBar'

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
}


// @ts-ignore
import { API_KEY } from "react-native-dotenv";

export default function App() {
  const [value, setValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);
  

  const searchURL = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${value}&apikey=${API_KEY}`;

  const handleSearch = async (e: any) => {
    try {
      const response = await axios.get(searchURL);
      if (response.data) {
        const bestMatchesArr = response.data["bestMatches"]
        renameKeysArr(bestMatchesArr)
        //@ts-ignore
        const filteredMatchesArr = bestMatchesArr.filter(obj => (parseFloat(obj.matchScore, 10)  > 0.20) && (obj.region === 'United States'))
        filteredMatchesArr.forEach( async (obj: filteredOptions) => {
          const quoteURL = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${obj.symbol}&apikey=${API_KEY}`
          const price = await handleQuote(obj.symbol, quoteURL)
          console.log('price', price)
          obj.price = price


        })
        console.log(filteredMatchesArr)
        setFilteredOptions(filteredMatchesArr);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const handleQuote= async (ticker: string, quoteURL: string)=> {
    try {
      const response = await axios.get(quoteURL)
      const searchObj = response.data["Global Quote"]
      renameKeysObj(searchObj)
      return searchObj.price
        
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

      <View
        style={{
          backgroundColor: colors.searchBackground,
          width: '90%',
          borderRadius: 20,
          padding: 5,
          marginBottom: 20
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            width: '100%'
          }}
          
        >
          <FontAwesomeIcon icon={faSearch} color={colors.gunsmokeGrey} />
          <TextInput
            style={{ height: 35, width: 200, flex: 1, paddingLeft: 7, color: colors.gunsmokeGrey}}
            value={value}
            onChangeText={(text) => setValue(text)}
            placeholder="Search"
            placeholderTextColor={colors.gunsmokeGrey}
            onSubmitEditing={(e) => handleSearch(e)}
          />
           {(filteredOptions && filteredOptions.length > 0)  && <Pressable onPressIn={handleCancelSearch}><FontAwesomeIcon icon={faTimesCircle} color={colors.gunsmokeGrey} /></Pressable>}
        </View>
      </View>
      <Text style={{color: 'white'}}>Symbols</Text>
      <AutocompleteSearchBar filteredOptions={filteredOptions}/>
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
