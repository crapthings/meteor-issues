/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Meteor, { createContainer, MeteorListView } from 'react-native-meteor';

Meteor.connect('ws://192.168.1.89:3000/websocket');

class AwesomeProject extends Component {
  render() {
    Meteor.subscribe('posts');
    return (
      <View>
        <MeteorListView collection='posts' renderRow={(item) => <View style={{ marginBottom: 20}}>
          <Text>{item.title}</Text>
        </View>} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
