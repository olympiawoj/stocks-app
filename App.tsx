import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import {Hello} from "./components/Hello"
import {Header} from './components/Header/Header'


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

  
  return (
    <View style={styles.container}>
      <Header date="September"/>
      <TextInput  style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1 }} value={value} onChangeText={text => onChangeText(text)}/>
      <Text>Hi</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
