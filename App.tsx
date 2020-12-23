import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import { Hello } from "./components/Hello";
import { Header } from "./components/Header/Header";
import { colors } from "./utils/colors";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSearch, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { renameKeys } from "./utils/renameKeys";
import {AutocompleteSearchBar} from './components/AutocompleteSearchBar/AutocompleteSearchBar'

// @ts-ignore
import { API_KEY } from "react-native-dotenv";

export default function App() {
  const [value, setValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);

  const searchURL = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${value}&apikey=${API_KEY}`;

  const handleSearch = async (e: any) => {
    console.log("handleSearch running...");
    try {
      const response = await axios.get(searchURL);
      console.log(response);
      const bestMatchesArr = response.data["bestMatches"]
      if (response.data) {
        renameKeys(bestMatchesArr)
        setFilteredOptions(bestMatchesArr);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleCancelSearch = ()=>{
    setFilteredOptions([])
    setValue('')
  }

  return (
    <View style={styles.container}>
      <Header date="September" />

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
           {(filteredOptions.length > 0)  && <Pressable onPressIn={handleCancelSearch}><FontAwesomeIcon icon={faTimesCircle} color={colors.gunsmokeGrey} /></Pressable>}
        </View>
      </View>
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
