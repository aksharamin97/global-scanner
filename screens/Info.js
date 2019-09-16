import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
 
export default class Info extends React.Component{
  static navigationOptions = {
    headerStyle:{
      // backgroundColor: 'orange'
    }
  }
  render(){
    return (  
      <View style={styles.container}>
        <Text style={styles.titleText}>About</Text>
        <Text></Text>
        <Text>This Application is a prototype  Barcode scanner created by GS1 Global and powered by Verified by GS1</Text>
        <Text></Text>
        <Text>Application was built using React Native. Ran and tested through Expo. Barcode scanner is built by Expo's own Barcode scanner api</Text>
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  titleText: {
    fontSize: 25,
    fontWeight: "300",
    color: "#002c6c",
    marginBottom: 10
  },
});