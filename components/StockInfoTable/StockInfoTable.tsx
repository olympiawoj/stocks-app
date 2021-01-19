import React from "react";
import { View, Text, ScrollView } from "react-native";
import { styles } from "./styles";

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

export const StockInfoTable = ({ stockObjInfo, latestData }: StockObjInfo) => {
  console.log(stockObjInfo);
  console.log("latestData", latestData);
  return (
    // <View style={{ flex: 1, height: 100 }}>
      <ScrollView
      horizontal={true}
      decelerationRate={0}
        contentContainerStyle={{ 
            height: 100, 
            width: 500, 
            flexGrow: 1}}
      >
        <View style={{ marginLeft: 37, marginTop: 10 }}>
          <View style={styles.textContainer}>
            <Text style={styles.textLabel}>Open</Text>
            <Text style={styles.text}>{latestData.open}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.textLabel}>High</Text>
            <Text style={styles.text}>{latestData.high}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.textLabel}>Low</Text>
            <Text style={styles.text}>{latestData.low}</Text>
          </View>
        </View>
        <View style={{ marginTop: 10 }}>
          <View style={styles.textContainer}>
            <Text style={styles.textLabel}>Vol</Text>
            <Text style={styles.text}>{latestData.volume}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.textLabel}>P/E</Text>
            <Text style={styles.text}>
              {latestData.companyOverview["PERatio"]}
            </Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={{ ...styles.textLabel, paddingRight: 10 }}>
              Mkt Cap.
            </Text>
            <Text style={styles.text}>
              {Math.floor(
                latestData.companyOverview["MarketCapitalization"] / 1000000000
              )}{" "}
              B
            </Text>
          </View>
        </View>
        <View style={{ marginTop: 10 }}>
          <View style={styles.textContainer}>
            <Text style={styles.textLabel}>52W H</Text>
            <Text style={styles.text}>
              {latestData.companyOverview["52WeekHigh"]}
            </Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.textLabel}>52W L</Text>
            <Text style={styles.text}>
              {latestData.companyOverview["52WeekLow"]}
            </Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={{ ...styles.textLabel, paddingRight: 10 }}>
              200DMA
            </Text>
            <Text style={styles.text}>
              {Math.floor(
                latestData.companyOverview["200DayMovingAverage"] / 1000000000
              )}{" "}
              B
            </Text>
          </View>
        </View>
      </ScrollView>
    // </View>
  );
};
