import React from 'react'
import { View, Text, ScrollView, FlatList, SafeAreaView } from "react-native";
import { colors } from '../../utils/colors';

//@ts-ignore
export const AutocompleteSearchBar = ({filteredOptions}) =>{
    //@ts-ignore
    const renderItem = ({item})=>(
        <View style={{
        borderBottomColor: colors.gunsmokeGrey,
        borderBottomWidth: 0.5, 
        padding: 7}}>
            <Text style={{ color: "white" }} key={`${item.name} - ${Date.now()}`}>{item.symbol}</Text>
            <Text style={{color: colors.gunsmokeGrey}}>{item.name}</Text>
        </View>
    )
    return (
        <>
        <SafeAreaView style={{width: '90%'}}>
        <FlatList
         data={filteredOptions}
         renderItem={renderItem}
         keyExtractor={item => item.id}
        
        />
        </SafeAreaView>
        </>
    )
}