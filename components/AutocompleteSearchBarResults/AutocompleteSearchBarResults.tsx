import React, { useState } from "react";
import { View, Text, ScrollView, FlatList, SafeAreaView, TouchableHighlight } from "react-native";
import { colors } from "../../utils/colors";
import { Divider } from 'react-native-paper';

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
export const AutocompleteSearchBarResults = ({ filteredOptions, prices, setModalVisible, setStockObjInfo }) => {
  const [itemInfo, setItemInfo] = useState('')
  //@ts-ignore
  const onRowPress = (e, item) => {
    setModalVisible(true)
    //@ts-ignore
    // filteredOptions.forEach(option => {
    //   console.log(option.symbol, option.name)
    // })
    console.log('on row press...')
    // console.log(item)
    setStockObjInfo(item)
    
  }

  //@ts-ignore
  const renderItem = ({ item }) => {
    return (

      //@ts-ignore
        <TouchableHighlight onPress={(e)=>onRowPress(e, item)}>
        <View
          key={`${item.name} - ${Date.now()}`}
        >
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
                <Text style={{ color: colors.gunsmokeGrey, marginBottom: 10 }}>{item.name}</Text>
                {/* <Text style={{ color: colors.gunsmokeGrey }}>
                  {(Number(
                    item.companyOverview["MarketCapitalization"]) / 1000000000000)
                  .toFixed(2) + "T" || ''}
                </Text> */}
              </View>
              <Divider style={{backgroundColor:colors.codGrey}}/>
        </View>
        </TouchableHighlight>
    );
  };

  return (
    <>
      <SafeAreaView style={{ width: "90%" }}>
      <Text style={{color: 'white', fontSize: 25, fontWeight: '600', marginBottom: 10}}>Symbols</Text>

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
