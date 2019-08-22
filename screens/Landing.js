import React from 'react';
import { StyleSheet, Text, View, Button, ActivityIndicator, Image } from 'react-native';
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
    //   if (tradeItemImageUrl == null){
    //   this.setState({tradeItemImageUrl: 'data:image/png;base64,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'})
    // }
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
        {/* <Image
          style={{width: 50, height: 50}}
          source={{uri: this.state.tradeItemImageUrl}}
        /> */}
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
          <Text>tradeItemImageUrl: {this.state.tradeItemImageUrl}</Text>
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
