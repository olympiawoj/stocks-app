import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Hello} from "./components/Hello"
import {Header} from './components/Header/Header'


export default function App() {

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
      <Header date="September 10"/>
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
