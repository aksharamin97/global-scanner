import * as React from "react";
import {
  Animated,
  Text,
  View,
  StyleSheet,
  Button,
  SafeAreaView,
  TextInput,
  Searchbar,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import Icon from "react-native-vector-icons/Ionicons";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Camera } from "expo-camera";
import { BlurView } from "expo-blur";

const uri =
  "https://s3.amazonaws.com/exp-icon-assets/ExpoEmptyManifest_192.png";

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);
const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

export default class BarcodeScannerExample extends React.Component {
  static navigationOptions = {
    headerStyle: {
      // backgroundColor: 'orange'
    }
  };
  state = {
    hasCameraPermission: null,
    scanned: false,
    // flash: Camera.Constants.Type.back,
    text: "",
    intensity: new Animated.Value(0)
  };

  async componentDidMount() {
    this.getPermissionsAsync();
    this._animate();
  }

  _animate = () => {
    let { intensity } = this.state;
    Animated.timing(intensity, { duration: 1000, toValue: 100 }).start(() => {
      Animated.timing(intensity, { duration: 1000, toValue: 0 }).start(
        this._animate
      );
    });
  };

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
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

      <View>
        {/* <View>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
            // style={StyleSheet.absoluteFillObject}>
            style={{
              width: Dimensions.get("screen").width,
              height: Dimensions.get("screen").height
            }}
          />

          <AnimatedBlurView
            tint="light"
            intensity={this.state.intensity}
            style={StyleSheet.absoluteFill}
          />
        </View> */}
        <DismissKeyboard>
          <View>
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
              // style={StyleSheet.absoluteFillObject}>
              style={{
                width: Dimensions.get("screen").width,
                height: Dimensions.get("screen").height
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  padding: 10,
                  marginTop: 100,
                  marginHorizontal: 20,
                  backgroundColor: "white"
                }}
              >
                <Icon
                  name="ios-search"
                  size={20}
                  style={{ marginRight: 10, marginTop: 2 }}
                />
                <TextInput
                  keyboardType="default"
                  returnKeyType="search"
                  maxLength={14}
                  placeholder="Search by GTIN"
                  placeholderTextColor="grey"
                  style={{
                    flex: 1,
                    fontWeight: "700",
                    backgroundColor: "#fff"
                  }}
                  onChangeText={text => this.setState({ text })}
                  blurOnSubmit={true}
                  value={this.state.text}
                  onSubmitEditing={() => {
                    this.props.navigation.navigate("Landing", {
                      barcode_num: this.state.text,
                      barcode_type: ""
                    });
                    this.setState({
                      text: ""
                    });
                    console.log(this.state.scanned);
                  }}
                />
              </View>
            </BarCodeScanner>
          </View>
        </DismissKeyboard>

        {/* {scanned && (
          this.setState({ scanned: false })
        )} */}
      </View>
    );
  }

  handleBarCodeScanned = ({ type, data }) => {
    this.setState({ scanned: true });
    this.props.navigation.navigate("Landing", {
      barcode_num: data,
      barcode_type: type
    });
    this.setState({ scanned: false });
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  notBlurred: {
    ...StyleSheet.absoluteFill,
    top: Constants.statusBarHeight
  }
});
