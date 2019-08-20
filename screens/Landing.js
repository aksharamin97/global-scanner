import React from 'react';
import { StyleSheet, Text, View, Button, ActivityIndicator } from 'react-native';
import { compose } from 'recompose';
import { getAppLoadingLifecycleEmitter } from 'expo/build/launch/AppLoading';

var api_file = require("../api_file")


export default class Profile extends React.Component{
  static navigationOptions = {
    headerStyle:{
      backgroundColor: 'white'
    }
  }

constructor(props){
  super(props);
  this.state = {
    isLoading:true,
    invalid: false,
    gtin: null,
    brandName: null,
    gpc: null,
    netContent: null,
    status: null,
    targetMarketCountryCode: null,
    tradeItemDescription: null,
    tradeItemImageUrl: null,
  }
}



componentDidMount(){
  const { navigation } = this.props;
  const barcode_num = navigation.getParam('barcode_num', 'No Number');
  const barcode_type = navigation.getParam('barcode_type', 'No Type');

  return fetch('https://api-stg.gs1.org/registry/v2/gtin/'.concat(barcode_num, '/'),{
    headers: new Headers({
      'APIKey': api_file.api_key
    })
  })
    .then((response) => {
      // console.log(response)
      if (response.ok) {
        return response.json()
      }
      else{
        // console.log('API Key')
        this.setState({
          invalid: true,
          isLoading: false
        })
      }
    })
    .then(data => {
      this.setState({
        isLoading: false,
        gtin: data.gtin,
        brandName: data.brandName,
        gpc: data.gpcCode,
        netContent: data.netContent,
        status: data.status,
        targetMarketCountryCode: data.targetMarketCountryCode,
        tradeItemDescription: data.tradeItemDescription,
        tradeItemImageUrl: data.tradeItemImageUrl,

      })
    })
  .catch(err => console.log(err))
}


  render(){
    if(this.state.isLoading){
      return(
        <View style={styles.container}>
          <ActivityIndicator/>
        </View>
      )
    }
    else if(this.state.invalid){
      return(
      <View style={styles.container}>
        <Text>Landing Screen</Text>
        <Text>API Error</Text>
      </View>
      )
    }
    else{
      return (
        <View style={styles.container}>
          <Text>Landing Screen</Text>
          <Text>GTIN: {this.state.gtin}</Text>
          {this.state.brandName.map((val, key)=> (
            <Text key={key}>Brand Name:  lang= {val.lang}{" "} value ={val.value}</Text>
            ))
          }
          <Text>GPC: {this.state.gpc}</Text>
          {this.state.netContent.map((val, key)=> (
            <Text key={key}>Net Content:  lang= {val.lang}{" "} value ={val.value}</Text>
            ))
          }
          <Text>Status: {this.state.status}</Text>
          {this.state.targetMarketCountryCode.map((val, key)=> (
            <Text key={key}>Country Code:  lang= {val.lang}{" "} value ={val.value}</Text>
            ))
          }
          {this.state.tradeItemDescription.map((val, key)=> (
            <Text key={key}>Description:  lang= {val.lang}{" "} value ={val.value}</Text>
            ))
          }
          {this.state.tradeItemImageUrl.map((val, key)=> (
            <Text key={key}>URL:  lang= {val.lang}{" "} value ={val.value}</Text>
            ))
          }
        </View>
      );
    };
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
