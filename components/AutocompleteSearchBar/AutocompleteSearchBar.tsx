import React from 'react'
import { View, Text, ScrollView, FlatList, SafeAreaView } from "react-native";
import { colors } from '../../utils/colors';

//@ts-ignore
export const AutocompleteSearchBar = ({filteredOptions}) =>{
    //@ts-ignore
    const renderItem = ({item})=>(

        <View style={{borderBottomColor: colors.codGrey, borderBottomWidth: 0.5}}>
                <Text style={{ color: "white" }} key={`${item.name} - ${Date.now()}`}>{item.symbol}</Text>
                 <Text style={{color: colors.gunsmokeGrey}}>{item.name}</Text>
        </View>
    )
    return (
        <>
        <SafeAreaView>
        <FlatList
         data={filteredOptions}
         renderItem={renderItem}
         keyExtractor={item => item.id}
        
        />
        </SafeAreaView>
        </>
    )
}