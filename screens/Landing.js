import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { compose } from 'recompose';
var api_file = require("../api_file")
export default class Profile extends React.Component{
  static navigationOptions = {
    headerStyle:{
      backgroundColor: 'white'
    }
  }
  render(){
    const { navigation } = this.props;
    const barcode_num = navigation.getParam('barcode_num', 'No Number');
    const barcode_type = navigation.getParam('barcode_type', 'No Type');

    var request = new XMLHttpRequest();
    request.onreadystatechange = (e) => {
      if (request.readyState !== 4) {
        return;
      }

      if (request.status === 200) {
        var obj = JSON.parse(request.response)
      } 
      else {
        console.warn('error');
      }
    };

    request.open('GET', 'https://api-stg.gs1.org/registry/v2/gtin/'.concat(barcode_num, '/'));
    request.setRequestHeader('APIKey', api_file.api_key)
    request.send();

    return (
      <View style={styles.container}>
        <Text>Landing Screen</Text>
        <Text>barcode_num: {JSON.stringify(barcode_num)}</Text>
        <Text>barcode_type: {JSON.stringify(barcode_type)}</Text>
        <Text></Text>
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
