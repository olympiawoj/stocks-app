import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import { colors } from "../../utils/colors";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSearch, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { renameKeysArr, renameKeysObj } from "../../utils/renameKeys";

//@ts-ignore
export const SearchBar = ({ value, setValue, filteredOptions, handleSearch, handleCancelSearch}) => {
  return (
    <View
    style={{
      backgroundColor: colors.searchBackground,
      width: filteredOptions.length > 0 ? '85%' : '100%',
      borderRadius: 20,
      padding: 5,
      marginBottom: 20,
    }}
  >
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: '100%',
      }}
      
    >
      <FontAwesomeIcon icon={faSearch} color={colors.gunsmokeGrey} style={{marginLeft:  5}} />
      <TextInput
        style={{ height: 35, width: 200, flex: 1, paddingLeft: 7, color: colors.gunsmokeGrey}}
        value={value}
        onChangeText={(text) => setValue(text)}
        placeholder="Search"
        placeholderTextColor={colors.gunsmokeGrey}
        onSubmitEditing={handleSearch}
      />
       {(filteredOptions && filteredOptions.length > 0)  && <Pressable onPressIn={handleCancelSearch}><FontAwesomeIcon icon={faTimesCircle} color={colors.gunsmokeGrey} style={{marginRight:5}}/></Pressable>}
    </View>
  </View>
  )

}