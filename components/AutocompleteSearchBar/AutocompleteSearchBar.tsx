import React from 'react'
import { StyleSheet, Text, View, TextInput } from "react-native";

//@ts-ignore
export const AutocompleteSearchBar = ({filteredOptions}) =>{
    return (
        <>
        {filteredOptions && (
        //@ts-ignore
          filteredOptions.map((option, idx) => {
            return (
              <>
                <Text style={{ color: "white" }} key={`${idx} - ${Date.now()}`}>{JSON.stringify(option)}</Text>
              </>
            );
          })
        )}
        </>
    )
}