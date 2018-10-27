/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  WebView,
  Dimensions,
  Animated,
  Button
} from "react-native";
import { createStackNavigator } from "react-navigation";
import MainScreen from "./MainScreen";
import VideoScreen from "./VideoScreen";
sWidth = Dimensions.get("window").width;
sHeight = Dimensions.get("window").height;

const MainNav = createStackNavigator(
  {
    Main: MainScreen,
    Video: VideoScreen
  },
  { initialRouteName: "Main" }
);
export default class App extends Component {


  render() {
    return <MainNav />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  },
  backgroundVideo: {
    position: "absolute",
    top: 50,
    left: 0,
    bottom: 0,
    right: 0
  }
});
