import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity
} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { compose } from "recompose";
import { getAppLoadingLifecycleEmitter } from "expo/build/launch/AppLoading";
import Svg, { Circle, Path, G } from "react-native-svg";

//api_file.js contains the Key Registry key
var api_file = require("../api_file");

const entireScreenWidth = Dimensions.get("window").width;
EStyleSheet.build({
  $rem: entireScreenWidth / 380,

  $orange: "#f26334",
  $blue: "#002c6c",
  $link: "#008dbd",
  $light_gray: "#f4f4f4",
  $light_gray_shade: "#d8d8d8",
  $light_medium_gray: "#b1b3b3",
  $dark_medium_gray: "#888b8d",
  $dark_gray: "#454545",
  $blue_tint: "#335689",
  $sky: "#00b6de",
  $raspberry: "#f05587",
  $grass: "#7ac143",
  $peach: "#fbb034"
});

// function WarningBanner(props) {
//   console.log(props);
//   if (props > 1) {
//     return (
//       <View>
//         {this.state.brandName.map((val, key) => (
//           <Text key={key} style={[styles.titleText, {}]}>
//             {val.value}
//           </Text>
//         ))}
//       </View>
//     );
//   } else {
//     return (
//       <View>
//         {this.state.brandName.map((val, key) => (
//           <Text key={key} style={[styles.titleText, {}]}>
//             {val.value}
//           </Text>
//         ))}
//       </View>
//     );
//   }
// }

export default class Profile extends React.Component {
  static navigationOptions = {
    title: "Landing",
    headerStyle: {
      backgroundColor: "white"
    },
    headerTintColor: EStyleSheet.value("$orange"),
    headerTitleStyle: {
      fontWeight: "bold"
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      invalid: false,
      gtin: null,
      brandName: null,
      gpc: null,
      netContent: null,
      status: null,
      targetMarketCountryCode: null,
      tradeItemDescription: null,
      tradeItemImageUrl: null,
      active: null
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    // const barcode_num = navigation.getParam('barcode_num', 'No Number');
    const barcode_num = navigation.getParam('barcode_num', 'No Number');
    const barcode_type = navigation.getParam("barcode_type", "No Type");

    return fetch(
      "https://api-stg.gs1.org/registry/v2/gtin/".concat(barcode_num, "/"),
      {
        headers: new Headers({
          APIKey: api_file.api_key
        })
      }
    )
      .then(response => {
        // console.log(response)
        if (response.ok) {
          return response.json();
        } else {
          // console.log('API Key')
          this.setState({
            invalid: true,
            isLoading: false
          });
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
          tradeItemImageUrl: data.tradeItemImageUrl
        });
        // if (tradeItemImageUrl == null) {
        //   this.setState({
        //     tradeItemImageUrl:
        //       "data:image/png;base64,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"
        //   });
        // }
      })
      .catch(err => console.log(err));
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      );
    } else if (this.state.invalid) {
      return (
        <View>
          <Svg
            xmlns="http://www.w3.org/2000/svg"
            width="134"
            height="134"
            viewBox="0 0 134 134"
            style={{
              marginLeft: "30%",
              marginTop: "40%",
              marginBottom: "10%",
              marginRight: "50%"
            }}
          >
            <G transform="translate(-121 -342)">
              <Circle
                cx="67"
                cy="67"
                r="67"
                transform="translate(121 342)"
                fill="#CF0715"
              />
              <Path
                d="M8928.711,1015.21l-67.07,67.124"
                transform="translate(-8705.852 -638.301)"
                fill="none"
                stroke="#fff"
                strokeWidth="15"
              />
              <Path
                d="M8861.641,1015.21l67.777,67.826"
                transform="translate(-8705.852 -638.301)"
                fill="none"
                stroke="#fff"
                strokeWidth="15"
              />
            </G>
          </Svg>
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 18
            }}
          >
            API Error
          </Text>
        </View>
      );
    } else {
      if (this.state.tradeItemImageUrl.length <= 1) {
        return (
          <ScrollView style={[styles.container, {}]}>
            <View
              style={{
                paddingVertical: 10,
                backgroundColor: EStyleSheet.value("$light_gray"),
                flex: 1,
                flexDirection: "row",
                justifyContent: "center"
              }}
            >
              <Svg height="100%" width="10%" viewBox="0 0 20 20">
                <G
                  id="Group_68"
                  data-name="Group 68"
                  transform="translate(-46 -102)"
                >
                  <Circle
                    id="Ellipse_6"
                    data-name="Ellipse 6"
                    cx="10"
                    cy="10"
                    r="10"
                    transform="translate(46 102)"
                    fill="#4db101"
                  />
                  <Path
                    id="Path_55"
                    data-name="Path 55"
                    d="M8862.537,918.606l3.039,3.336,6.288-6.9"
                    transform="translate(-8811.076 -806.243)"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="2"
                  />
                </G>
              </Svg>
              <Text
                style={{
                  color: "#4db101"
                }}
              >
                This product is verified by GS1
              </Text>
            </View>

            <View>
              <View
                style={
                  {
                    // borderBottomColor: EStyleSheet.value("$light_gray_shade"),
                    // borderBottomWidth: 1.5
                  }
                }
              >
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 30,
                    marginBottom: 30,
                    marginLeft: 30,
                    marginRight: 30
                  }}
                >
                  <View style={{ width: "60%" }}>
                    {/* brandName */}
                    {this.state.brandName.map((val, key) => (
                      // <Text key={key}>Brand Name:  lang= {val.lang}{" "} value ={val.value}</Text>
                      <Text key={key} style={[styles.titleText, {}]}>
                        {val.value}
                      </Text>
                    ))}

                    {/* gpcCode */}
                    <Text style={styles.captionText}>
                      GPC: {this.state.gpc}
                    </Text>
                    {/* Custom TouchableOpacity */}
                    {/* <TouchableOpacity
                      onPress={() => Alert.alert(`Pressed`)}
                      style={[styles.btnNext, { marginVertical: 15 }]}
                    >
                      <Text style={[styles.btnText]}>Save</Text>
                    </TouchableOpacity> */}
                  </View>
                  <View>
                    {/* tradeItemImageUrl */}
                    {this.state.tradeItemImageUrl.map((val, key) => (
                      // <Text key={key}>URL:  lang= {val.lang}{" "} value ={val.value}</Text>
                      <Image
                        key={key}
                        style={{ width: 100, height: 100 }}
                        source={{ uri: val.value }}
                      />
                    ))}
                  </View>
                </View>
              </View>

              <View>
                {/* gtin */}
                <View style={styles.sectionGTIN}>
                  <Text style={styles.h5}>GTIN</Text>
                  <Text style={styles.h4}>{this.state.gtin}</Text>
                </View>

                {/* netContent */}
                <Text
                  style={[styles.h1, { marginLeft: 20, marginVertical: 15 }]}
                >
                  Net Content
                </Text>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  style={{ paddingRight: 20 }}
                >
                  {this.state.netContent.map((val, key) => (
                    <View key={key} style={styles.sectionNetContent}>
                      <Text style={styles.h5}>{val.measurementUnitCode}</Text>
                      <Text style={styles.h4}>{val.quantity}</Text>
                    </View>
                  ))}
                </ScrollView>

                <Text
                  style={[styles.h1, { marginLeft: 20, marginVertical: 15 }]}
                >
                  Country Code
                </Text>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row"
                  }}
                >
                  {this.state.targetMarketCountryCode.map((val, key) => (
                    <Text key={key} style={[styles.h3, { marginLeft: 20 }]}>
                      {this.state.targetMarketCountryCode[key]}
                    </Text>
                  ))}
                </View>

                {/* tradeItemDescription */}
                <Text
                  style={[styles.h1, { marginLeft: 20, marginVertical: 15 }]}
                >
                  Description
                </Text>
                {this.state.tradeItemDescription.map((val, key) => (
                  <View
                    key={key}
                    style={[styles.section, { marginHorizontal: 20 }]}
                  >
                    <Text
                      style={[
                        styles.h5,
                        {
                          borderBottomColor: "black",
                          borderBottomWidth: 1,
                          marginBottom: 10
                        }
                      ]}
                    >
                      {val.lang}
                    </Text>
                    <Text
                      style={[
                        styles.captionText,
                        { fontSize: 16, fontWeight: "600" }
                      ]}
                    >
                      {val.value}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </ScrollView>
        );
      } else {
        return (
          <ScrollView style={[styles.container, {}]}>
            <View
              style={{
                paddingVertical: 10,
                backgroundColor: EStyleSheet.value("$light_gray"),
                flex: 1,
                flexDirection: "row",
                justifyContent: "center"
              }}
            >
              <Svg height="100%" width="10%" viewBox="0 0 20 20">
                <G transform="translate(-46 -102)">
                  <Circle
                    cx="10"
                    cy="10"
                    r="10"
                    transform="translate(46 102)"
                    fill="#4db101"
                  />
                  <Path
                    d="M8862.537,918.606l3.039,3.336,6.288-6.9"
                    transform="translate(-8811.076 -806.243)"
                    fill="none"
                    stroke="#fff"
                    stroke-width="2"
                  />
                </G>
              </Svg>
              <Text
                style={{
                  color: "#4db101"
                }}
              >
                This product is active verified by GS1
              </Text>
            </View>

            <View>
              <View
                style={
                  {
                    // borderBottomColor: EStyleSheet.value("$light_gray_shade"),
                    // borderBottomWidth: 1.5
                  }
                }
              >
                <View
                  style={{
                    // flex: 1,
                    // flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 30,
                    marginBottom: 30,
                    marginLeft: 30,
                    marginRight: 30
                  }}
                >
                  <View style={{ width: "60%" }}>
                    {/* brandName */}
                    {this.state.brandName.map((val, key) => (
                      // <Text key={key}>Brand Name:  lang= {val.lang}{" "} value ={val.value}</Text>
                      <Text key={key} style={[styles.titleText, {}]}>
                        {val.value}
                      </Text>
                    ))}

                  {/* <WarningBanner props={this.state.brandName.length} /> */}
                  
                    {/* gpcCode */}
                    <Text style={styles.captionText}>
                      GPC: {this.state.gpc}
                    </Text>
                    {/* Custom TouchableOpacity */}
                    {/* <TouchableOpacity
                      onPress={() => Alert.alert(`Pressed`)}
                      style={[styles.btnNext, { marginVertical: 15 }]}
                    >
                      <Text style={[styles.btnText]}>Save</Text>
                    </TouchableOpacity> */}
                  </View>
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={{ paddingRight: 20 }}
                  >
                    {/* tradeItemImageUrl */}
                    {this.state.tradeItemImageUrl.map((val, key) => (
                      // <Text key={key}>URL:  lang= {val.lang}{" "} value ={val.value}</Text>
                      <Image
                        key={key}
                        style={{ width: 100, height: 100 }}
                        source={{ uri: val.value }}
                      />
                    ))}
                  </ScrollView>
                </View>
              </View>

              <View>
                {/* gtin */}
                <View style={styles.sectionGTIN}>
                  <Text style={styles.h5}>GTIN</Text>
                  <Text style={styles.h4}>{this.state.gtin}</Text>
                </View>

                {/* netContent */}
                <Text
                  style={[styles.h1, { marginLeft: 20, marginVertical: 15 }]}
                >
                  Net Content
                </Text>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  style={{ paddingRight: 20 }}
                >
                  {this.state.netContent.map((val, key) => (
                    <View key={key} style={styles.sectionNetContent}>
                      <Text style={styles.h5}>{val.measurementUnitCode}</Text>
                      <Text style={styles.h4}>{val.quantity}</Text>
                    </View>
                  ))}
                </ScrollView>

                <Text
                  style={[styles.h1, { marginLeft: 20, marginVertical: 15 }]}
                >
                  Country Code
                </Text>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row"
                  }}
                >
                  {this.state.targetMarketCountryCode.map((val, key) => (
                    <Text key={key} style={[styles.h3, { marginLeft: 20 }]}>
                      {this.state.targetMarketCountryCode[key]}
                    </Text>
                  ))}
                </View>

                {/* tradeItemDescription */}
                <Text
                  style={[styles.h1, { marginLeft: 20, marginVertical: 15 }]}
                >
                  Description
                </Text>
                {this.state.tradeItemDescription.map((val, key) => (
                  <View
                    key={key}
                    style={[styles.section, { marginHorizontal: 20 }]}
                  >
                    <Text
                      style={[
                        styles.h5,
                        {
                          borderBottomColor: "black",
                          borderBottomWidth: 1,
                          marginBottom: 10
                        }
                      ]}
                    >
                      {val.lang}
                    </Text>
                    <Text
                      style={[
                        styles.captionText,
                        { fontSize: 16, fontWeight: "600" }
                      ]}
                    >
                      {val.value}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </ScrollView>
        );
      }
    }
  }
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff"
    // borderBottomColor: EStyleSheet.value("$light_gray_shade"),
    // borderBottomWidth: 1.5
  },
  titleText: {
    fontSize: "25rem",
    fontWeight: "300",
    color: EStyleSheet.value("$blue"),
    marginBottom: "10rem"
  },
  h1: {
    fontSize: 20,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 1,
    color: EStyleSheet.value("$blue")
  },
  h2: {
    fontSize: 62,
    fontSize: "20rem",
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 1,
    color: "#ffffff"
  },
  h3: {
    fontSize: 40,
    fontWeight: "500",
    fontStyle: "normal",
    // letterSpacing: 1,
    color: EStyleSheet.value("$orange")
  },
  h4: {
    fontSize: 22,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 1,
    color: EStyleSheet.value("$dark_gray")
  },
  h5: {
    fontSize: 12,
    fontWeight: "500",
    fontStyle: "normal",
    letterSpacing: 1,
    color: EStyleSheet.value("$blue")
  },
  paragraph: {
    fontSize: 24,
    fontWeight: "normal",
    fontStyle: "normal",
    lineHeight: 1,
    letterSpacing: 1,
    color: EStyleSheet.value("$dark_gray")
  },
  captionText: {
    fontSize: "16rem",
    color: EStyleSheet.value("$dark_gray"),
    marginVertical: "2rem"
  },
  section: {
    marginTop: "20rem",
    marginBottom: "20rem"
  },
  sectionGTIN: {
    borderColor: EStyleSheet.value("$orange"),
    borderWidth: 2,
    padding: 5,
    marginHorizontal: 20,
    marginVertical: 10
  },
  sectionNetContent: {
    borderColor: EStyleSheet.value("$blue"),
    borderWidth: 2,
    paddingLeft: 5,
    paddingRight: 15,
    paddingVertical: 3,
    marginLeft: 20
  },
  btnNext: {
    width: 120,
    // height: 27,
    backgroundColor: EStyleSheet.value("$orange"),
    alignItems: "center",
    padding: 5,

    display: "flex",
    // height: 50,
    justifyContent: "center"
    // alignItems: 'center',
  },
  btnText: {
    fontSize: 15,
    fontWeight: "200",
    fontStyle: "normal",
    textAlign: "center",
    color: "#ffffff",
    letterSpacing: -0.4
  }
});
