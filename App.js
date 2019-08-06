import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import HomeScreen from './screens/Home';
import LandingScreen from './screens/Landing';
import ScannerScreen from './screens/Scanner';

import { createAppContainer, createStackNavigator, createDrawerNavigator } from 'react-navigation';

export default class App extends React.Component{
  render(){
    return(
      <AppContainer/>
    )
  }
}


//STACK NAV
const AppStackNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    Landing: {
      screen: LandingScreen
    },
    Scanner: {
      screen: ScannerScreen
    }
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


const AppContainer = createAppContainer(AppStackNavigator);



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
