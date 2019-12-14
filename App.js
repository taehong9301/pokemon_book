import React from "react";
import Constants from "expo-constants";
import { View, Text, StyleSheet } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import WelcomeScreen from "./screen/WelcomeScreen";
import CategoryScreen from "./screen/CategoryScreen";

// 네비게이션 세팅
const AppNavigator = createStackNavigator(
  {
    Welcome: WelcomeScreen,
    Category: CategoryScreen
  },
  {
    initialRouteName: "Welcome",
    /* The header config from HomeScreen is now here */
    defaultNavigationOptions: {
      header: null
    }
  }
);

// 네비게이션 컨테이너 생성
const AppContainer = createAppContainer(AppNavigator);

class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

export default App;
