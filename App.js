import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import HomeScreen from './screens/Home';
import LandingScreen from './screens/Landing';
import ScannerScreen from './screens/Scanner';

import { createAppContainer, createStackNavigator, createDrawerNavigator } from 'react-navigation';



//AppStack
const AppStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    Landing: {
      screen: LandingScreen
    },

  },
  {
    initialRouteName:"Home",
  },
  // {
  //   defaultNavigationOptions: {
  //     headerStyle:{
  //       backgroundColor: 'orange'
  //     }
  //   }
  // }
);

//RootStack
const RootStack = createStackNavigator(
  {
    Scanner: {
      screen: ScannerScreen
    },
    Main: {
      screen: AppStack
    }
  },
  {
    // unmountInactiveRoutes: true,
    initialRouteName:"Main",
    mode: 'modal',
    headerMode: 'none'

  },
);

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


const AppContainer = createAppContainer(RootStack);



export default class App extends React.Component{
  render(){
    return(
      <AppContainer/>
    )
  }
}
