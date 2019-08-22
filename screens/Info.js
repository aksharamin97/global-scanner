import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class Info extends React.Component{
  static navigationOptions = {
    headerStyle:{
      backgroundColor: 'orange'
    }
  }
  render(){
    return (  
      <View style={styles.container}>
        <Text>About this app:</Text>
        <Text></Text>
        <Text>This Application is a prototype  Barcode scanner created by GS1 global and powered by Verified by GS1</Text>
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
  },
});
