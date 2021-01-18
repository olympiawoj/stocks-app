import React from "react";
import { View, Text } from "react-native";
import {styles} from './styles'

interface StockObjInfo {
    currency?: string;
    marketClose?: string;
    marketOpen?: string;
    marketScore?: string;
    name?: string;
    region?: string;
    symbol?: string;
    timezone?: string;
    type?: string;
    price?: string;
    [propName: string]: any; // string index signature - allwos us to have extra properties
  }

  
export const StockInfoTable = ({stockObjInfo}:StockObjInfo) => {
    console.log(stockObjInfo)
  return (
    <View style={styles.mainContainer}>
      <View style={{ display: "flex", marginLeft: 37, marginTop: 10 }}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Open</Text>
          <Text style={styles.text}>131.32</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>High</Text>
          <Text style={styles.text}>131.32</Text>
        </View>
        <View style={styles.textContainer}>
          <Text  style={styles.text}>Low</Text>
          <Text style={styles.text}>131.32</Text>
        </View>
      </View>
      <View style={{ display: "flex", marginTop: 10 }}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Vol</Text>
          <Text style={styles.text}>131.32</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>P/E</Text>
          <Text style={styles.text}>131.32</Text>
        </View>
        <View style={styles.textContainer}>
          <Text  style={{...styles.text, paddingRight: 10}}>Mkt Cap.</Text>
          <Text style={styles.text}>131.32</Text>
        </View>
      </View>
    </View>
  );
};
