import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

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
    return (  
      <View style={styles.container}>
        <Text>Landing Screen</Text>
        <Text>barcode_num: {JSON.stringify(barcode_num)}</Text>
        <Text>barcode_type: {JSON.stringify(barcode_type)}</Text>
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
