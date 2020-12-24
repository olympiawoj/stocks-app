import React, { useState } from "react";
import { View, Text, ScrollView, FlatList, SafeAreaView } from "react-native";
import { colors } from "../../utils/colors";

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
}

//@ts-ignore
export const AutocompleteSearchBarResults = ({ filteredOptions, prices }) => {
  console.log(filteredOptions);
  //@ts-ignore
  const renderItem = ({ item }) => {
    console.log(item.companyOverview)
    return (
      <View
        style={{
          borderBottomColor: colors.gunsmokeGrey,
          borderBottomWidth: 0.5,
          padding: 7,
        }}
        key={`${item.name} - ${Date.now()}`}
      >
            <Text style={{color: 'white'}}>Symbols</Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ color: "white" }}>{item.symbol}</Text>
              <Text style={{ color: "white" }}>{item.price}</Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ color: colors.gunsmokeGrey }}>{item.name}</Text>
              {/* <Text style={{ color: colors.gunsmokeGrey }}>
                {(Number(
                  item.companyOverview["MarketCapitalization"]) / 1000000000000)
                .toFixed(2) + "T" || ''}
              </Text> */}
            </View>

      </View>
    );
  };

  return (
    <>
      <SafeAreaView style={{ width: "90%" }}>
        <FlatList
          data={filteredOptions}
          renderItem={renderItem}
          keyExtractor={(item) => item.symbol}
          extraData={prices}
        />
      </SafeAreaView>
    </>
  );
};
