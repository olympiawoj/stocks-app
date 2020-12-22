import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { Hello } from "./components/Hello";
import { Header } from "./components/Header/Header";
import { colors } from "./utils/colors";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

// @ts-ignore
import { API_KEY } from "react-native-dotenv";

export default function App() {
  const [value, onChangeText] = useState("");

  interface Person {
    firstName: string;
    lastName: string;
  }

  const searchValue = "AAPL";
  const searchURL = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchValue}&apikey=${API_KEY}`;
  axios
    .get(searchURL)
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err));
  console.log(API_KEY);
  console.log("hi");

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
          />
        </View>
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
