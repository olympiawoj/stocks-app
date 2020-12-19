import React from "react";
import {View, Text} from "react-native"


type HeaderProps = {
    date: string;
}; /* could also use an interface*/



export const Header = ({date}: HeaderProps) => <View><Text>{date}</Text></View>


