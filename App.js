import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import HomeScreen from './screens/Home';
import LandingScreen from './screens/Landing';
import ScannerScreen from './screens/Scanner';
import CameraScreen from './screens/Camera';
import HistoryScreen from './screens/History';
import InfoScreen from './screens/Info';

import Icon from 'react-native-vector-icons/Ionicons'
import { createAppContainer, createStackNavigator, createBottomTabNavigator } from 'react-navigation';



//ScanStack
const ScanStack = createStackNavigator(
  {
    Scan: {
      screen: CameraScreen,
      navigationOptions:{
        header: null
      }
      
    },
    Landing: {
      screen: LandingScreen,
      
    }
  },
  {
    // unmountInactiveRoutes: false,
    initialRouteName:"Scan",
    // defaultNavigationOptions: "Scan"
    // headerMode: "none",
    // mode: 'modal',


  },
);

//TAB NAV
const TabNav = createBottomTabNavigator({
  Scan: {
    screen: ScanStack,
    navigationOptions:{
      tabBarLabel: 'SCAN',
      tabBarIcon:({tintColor})=>(
        <Icon name='ios-barcode' type='ionicon' color={tintColor} size={24} />
      ),
    }
  },
  History: {
    screen: HistoryScreen,
    navigationOptions:{
      tabBarLabel: 'HISTORY',
      tabBarIcon:({tintColor})=>(
        <Icon name='ios-time' type='ionicon' color={tintColor} size={24} />
      )
    }
  },
  Info: {
    screen: InfoScreen,
    navigationOptions:{
      tabBarLabel: 'INFO',
      tabBarIcon:({tintColor})=>(
        <Icon name='ios-information-circle-outline' type='ionicon' color={tintColor} size={24} />
      )
    }
  },
},
  {
    initialRouteName: "Scan",
    // mode: 'modal',
    // headerMode: 'none',
    swipeEnabled: true,
    resetOnBlur: true,
    animationEnabled: true
  },
)



const AppContainer = createAppContainer(TabNav);


export default class App extends React.Component{
  render(){
    return(
      <AppContainer/>
    )
  }
}
