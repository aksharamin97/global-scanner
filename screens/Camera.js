import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, SafeAreaView, TextInput } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import Icon from 'react-native-vector-icons/Ionicons'

export default class CameraExample extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    flashMode: Camera.Constants.FlashMode.off,
    autoFocus: Camera.Constants.AutoFocus.on,
    scanned: false,
  };


  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  render() {
    const { hasCameraPermission, scanned } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
          <View style={{ flex: 1 }}>
            <Camera style={{ flex: 1 }} type={this.state.type} flashMode={this.state.flashMode} onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned }>
              <View style={{flexDirection: 'row', padding: 10, backgroundColor: 'white', marginHorizontal: 20, shadowOffset:{width: 0, height: 0}, shadowColor: 'black', shadowOpacity: 0.2, elevation: 1, marginTop: 50}}>
                <Icon name='ios-search' size={20}/>
                <TextInput placeholder = '  Enter GTIN' placeholderTextColor= 'grey' style={{flex:1, fontWeight: '700', backgroundColor:'white'}} underlineColorAndroid= 'transparent'/>
              </View>
              <View
                style={{
                  flex: 1,
                  backgroundColor: 'transparent',
                  flexDirection: 'row',
                }}>
                <TouchableOpacity
                  style={{
                    flex: 0.5,
                    alignSelf: 'flex-end',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    this.setState({
                      type:
                        this.state.type === Camera.Constants.Type.back
                          ? Camera.Constants.Type.front
                          : Camera.Constants.Type.back,
                    });
                  }}>
                  
                  {/* <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text> */}
                  <Icon name='ios-reverse-camera' type='ionicon' color='white' size={48} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    flex: 0.5,
                    alignSelf: 'flex-end',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    this.setState({
                      flashMode:
                        this.state.flashMode === Camera.Constants.FlashMode.off
                          ? Camera.Constants.FlashMode.torch
                          : Camera.Constants.FlashMode.off,
                    });
                  }}>
                  
                  {/* <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flash </Text> */}
                  <Icon name='ios-flash' type='ionicon' color='white' size={40} />
                </TouchableOpacity>
              </View>
            </Camera>
          </View>
        // </View>
      );
    }
  }
  handleBarCodeScanned = ({ type, data }) => {
    // this.setState({ scanned: true })
    // console.log(data)
    this.setState({flashMode: Camera.Constants.FlashMode.off})
    this.props.navigation.navigate('Landing', {
        barcode_num: data,
        barcode_type: type
    });

    // this.setState({ scanned: false });
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };
}
