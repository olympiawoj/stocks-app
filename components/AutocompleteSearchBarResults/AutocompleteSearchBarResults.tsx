import React, {useState} from "react";
import { View, Text, FlatList, SafeAreaView, TouchableHighlight, ListRenderItem } from "react-native";
import { colors } from "../../utils/colors";
import { Divider } from 'react-native-paper';
import { Dispatch, SetStateAction } from "react";

interface filteredOption {
  symbol: string;
  name?: string;
  type?: string;
  region?: string;
  marketOpen?: string;
  marketClose?: string;
  timezone?: string;
  currency?: string;
  matchScore?: string;
  price?: string;
  companyOverview?: {[propName: string]: any; };
  [propName: string]: any; // string index signature - allwos us to have extra properties
}

interface AutoCompleteSearchBarResultsProps {
  filteredOptions: filteredOption[];
  prices: number[];
  setModalVisible:  Dispatch<SetStateAction<boolean>>;
  setStockObjInfo: Dispatch<SetStateAction<filteredOption>>;
}

export const AutocompleteSearchBarResults = ({ filteredOptions, prices, setModalVisible, setStockObjInfo }:AutoCompleteSearchBarResultsProps) => {
  
  const onRowPress = (item:filteredOption) => {
    const newItem = {
      price: item.price,
      companyOverview: item.companyOverview,
      symbol: item.symbol,
      name: item.companyOverview && item["companyOverview"]["Name"],
    }

    console.log('item', item)
    setModalVisible(true)
    setStockObjInfo(newItem)
  }

  const renderItem:ListRenderItem<filteredOption> = ({ item }) => {
    return (
        <TouchableHighlight onPress={()=>onRowPress(item)}>
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
                <Text style={{ color: "white" }}>{item.price?.slice(0, -2)}</Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ color: colors.gunsmokeGrey, marginBottom: 10 }}>{item.name}</Text>
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
