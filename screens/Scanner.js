import * as React from 'react';
import { Text, View, StyleSheet, Button, SafeAreaView, TextInput } from 'react-native';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import Icon from 'react-native-vector-icons/Ionicons'
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class BarcodeScannerExample extends React.Component {
  static navigationOptions = {
    headerStyle:{
      // backgroundColor: 'orange'
    }
  }
  state = {
    hasCameraPermission: null,
    scanned: false,
  };

  async componentDidMount() {
    this.getPermissionsAsync();
  }

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
    
  };

  render() {
    const { hasCameraPermission, scanned } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      // <SafeAreaView style={{flex:1}}>
      //   <View style={{flexDirection: 'row', padding: 10, backgroundColor: 'white', marginHorizontal: 20, shadowOffset:{width: 0, height: 0}, shadowColor: 'black', shadowOpacity: 0.2, elevation: 1}}>
      //     <Icon name='ios-search' size={20}/>
      //     <TextInput placeholder = '  Enter GTIN' placeholderTextColor= 'grey' style={{flex:1, fontWeight: '700', backgroundColor:'white'}} underlineColorAndroid= 'transparent'/>
      //   </View>
      //   <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end'}}>
      //     <BarCodeScanner onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned} style={StyleSheet.absoluteFillObject}/>
      //   </View>
      // </SafeAreaView>


      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end'}}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
        

        {/* {scanned && (
          this.setState({ scanned: false })
        )} */}
        
      </View>
    );
  }

  handleBarCodeScanned = ({ type, data }) => {
    // this.setState({ scanned: true });
    this.forceUpdate()
    this.props.navigation.navigate('Landing', {
        barcode_num: data,
        barcode_type: type
    });
    // this.setState({ scanned: false });
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };
}