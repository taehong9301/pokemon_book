import React from "react";
import Constants from "expo-constants";
import {
  View,
  Text,
  StyleSheet,
  ToastAndroid,
  BackHandler
} from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import createAnimatedSwitchNavigator from "react-navigation-animated-switch";
import { Transition } from "react-native-reanimated";

import WelcomeScreen from "./screen/WelcomeScreen";
import CategoryScreen from "./screen/CategoryScreen";
import DetailScreen from "./screen/DetailScreen";

// 네비게이션 세팅
const AppNavigator = createAnimatedSwitchNavigator(
  {
    Welcome: WelcomeScreen,
    Category: CategoryScreen,
    Detail: DetailScreen
  },
  {
    initialRouteName: "Welcome",
    transition: (
      <Transition.Together>
        <Transition.Out
          type="slide-left"
          durationMs={400}
          interpolation="easeIn"
        />
        <Transition.In type="fade" durationMs={500} />
      </Transition.Together>
    )
  }
);

// 네비게이션 컨테이너 생성
const AppContainer = createAppContainer(AppNavigator);

class App extends React.Component {
  // 이벤트 등록
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }

  // 이벤트 해제
  componentWillUnmount() {
    this.exitApp = false;
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }

  // 이벤트 동작
  handleBackButton = () => {
    // 2000(2초) 안에 back 버튼을 한번 더 클릭 할 경우 앱 종료
    if (this.exitApp == undefined || !this.exitApp) {
      ToastAndroid.show("한번 더 누르시면 종료됩니다.", ToastAndroid.SHORT);
      this.exitApp = true;

      this.timeout = setTimeout(
        () => {
          this.exitApp = false;
        },
        2000 // 2초
      );
    } else {
      clearTimeout(this.timeout);

      BackHandler.exitApp(); // 앱 종료
    }
    return true;
  };

  render() {
    return <AppContainer />;
  }
}

export default App;
