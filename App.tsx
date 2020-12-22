import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { Hello } from "./components/Hello";
import { Header } from "./components/Header/Header";
import { colors } from "./utils/colors";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { renameKeys } from "./utils/renameKeys";

// @ts-ignore
import { API_KEY } from "react-native-dotenv";

export default function App() {
  const [value, onChangeText] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);

  const searchValue = "AAPL";
  const searchURL = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${value}&apikey=${API_KEY}`;

  const handleSearch = async (e: any) => {
    console.log("handleSearch running...");
    try {
      const response = await axios.get(searchURL);
      console.log(response.data["bestMatches"]);
      if (response.data) {
        setFilteredOptions(response.data["bestMatches"]);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <View style={styles.container}>
      <Header date="September" />

      <View
        style={{
          backgroundColor: colors.searchBackground,
          width: 275,
          borderRadius: 20,
          padding: 5,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <FontAwesomeIcon icon={faSearch} color={colors.gunsmokeGrey} />
          <TextInput
            style={{ height: 35, width: 200, flex: 1, paddingLeft: 7 }}
            value={value}
            onChangeText={(text) => onChangeText(text)}
            placeholder="Search"
            placeholderTextColor={colors.gunsmokeGrey}
            onSubmitEditing={(e) => handleSearch(e)}
          />
        </View>
        <Text style={{ color: "white" }}>List</Text>
        {filteredOptions.map((option, idx) => {
          return (
            <>
              <Text style={{ color: "white" }} key={idx}>{JSON.stringify(option)}</Text>
            </>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B0B0B",
    alignItems: "center",
    justifyContent: "center",
  },
});
