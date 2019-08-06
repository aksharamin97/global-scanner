import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class Home extends React.Component{
  static navigationOptions = {
    headerStyle:{
      backgroundColor: 'orange'
    }
  }
  render(){
    return (  
      <View style={styles.container}>
        <Text>Home Screen</Text>
        <Button
          title="Go to Scanner"
          onPress={() => this.props.navigation.navigate("Scanner")}
        />
      </View>
    );
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
