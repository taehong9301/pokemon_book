import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import WelcomeScreen from "./screen/WelcomeScreen";
import CategoryScreen from "./screen/CategoryScreen";
import DetailScreen from "./screen/DetailScreen";

// 네비게이션 세팅
const AppNavigator = createStackNavigator(
  {
    Welcome: WelcomeScreen,
    Category: CategoryScreen,
    Detail: DetailScreen
  },
  {
    initialRouteName: "Welcome"
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
