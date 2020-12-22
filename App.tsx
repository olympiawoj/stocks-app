import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import {Hello} from "./components/Hello"
import {Header} from './components/Header/Header'
import {colors} from './utils/colors'
// @ts-ignore
import { API_KEY} from 'react-native-dotenv'  


export default function App() {

  const [value, onChangeText] = useState('')


  interface Person {
    firstName: string;
    lastName: string;
  }

  function greeter(person:Person){
    return "Hello " + person.firstName + " " + person.lastName
  }

  let user = {firstName: "Jane", lastName: "User"};
  console.log(greeter(user))

  console.log(API_KEY)
  console.log('hi')

  
  return (
    <View style={styles.container}>
      <Header date="September"/>
      <View style={{backgroundColor: '#787B84'}}>
      <TextInput  style={{ height: 40, width: 200, borderColor: colors.codGrey, borderWidth: 1}} value={value} onChangeText={text => onChangeText(text)} placeholder='Search' placeholderTextColor="white"/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0B0B',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
