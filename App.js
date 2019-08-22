import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import HomeScreen from './screens/Home';
import LandingScreen from './screens/Landing';
import ScannerScreen from './screens/Scanner';
import HistoryScreen from './screens/History';
import AccountScreen from './screens/Account';
import InfoScreen from './screens/Info';
import Icon from 'react-native-vector-icons/Ionicons'
import { createAppContainer, createStackNavigator, createDrawerNavigator, createBottomTabNavigator } from 'react-navigation';



//AppStack
// const AppStack = createStackNavigator(
//   {
//     Home: {
//       screen: HomeScreen
//     },
//     Landing: {
//       screen: LandingScreen
//     },

//   },
//   {
//     initialRouteName:"Home",
//   },
//   {
//     defaultNavigationOptions: {
//       headerStyle:{
//         backgroundColor: 'orange'
//       }
//     }
//   }
// );


//ScanStack
const ScanStack = createStackNavigator(
  {
    Scan: {
      screen: ScannerScreen,
      
    },
    Landing: {
      screen: LandingScreen,
      
    }
  },
  {
    // unmountInactiveRoutes: false,
    initialRouteName:"Scan",
    // defaultNavigationOptions: "Scan"
    headerMode: "none",
    // mode: 'modal',


  },
);

//Account Stack
const AccountStack = createStackNavigator(
  {
    Account: {
      screen: AccountScreen,
      
    },
    Info: {
      screen: InfoScreen
    }
  },
  {
    // unmountInactiveRoutes: false,
    initialRouteName:"Account",
    // defaultNavigationOptions: "Scan"
    // headerMode: "none"
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
  Account: {
    screen: AccountStack,
    navigationOptions:{
      tabBarLabel: 'ACCOUNT',
      tabBarIcon:({tintColor})=>(
        <Icon name='ios-person' type='ionicon' color={tintColor} size={24} />
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


//DRAWER NAV
// const AppDrawerNavigator = createDrawerNavigator(
//   {
//     Home: {
//       screen: HomeScreen
//     },
//     Landing: {
//       screen: LandingScreen
//     },
//     Scanner: {
//       screen: ScannerScreen
//     }
//   },
//   {
//     initialRouteName:"Home"
//   },
//   {
//     defaultNavigationOptions: {
//       headerStyle:{
//         backgroundColor: 'orange'
//       }
//     }
//   }
// )


const AppContainer = createAppContainer(TabNav);


export default class App extends React.Component{
  render(){
    return(
      <AppContainer/>
    )
  }
}
