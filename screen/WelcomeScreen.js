import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity
} from "react-native";
import Constants from "expo-constants";

import { theme } from "../constants";
import dexImage from "../exports/DexImage";

class WelcomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  _onPressMoveCategoryScreenHandler = () => {
    // 도감 스크린으로 이동
    this.props.navigation.navigate("Category");
  };

  render() {
    return (
      <SafeAreaView style={styles.WelcomeContainer}>
        <View style={styles.HeaderWrap}>
          <Text style={styles.HeaderTitle}>어서와! </Text>
          <Text style={styles.HeaderUsername}>트레이너</Text>
        </View>

        <View style={styles.GreetinWrap}>
          <Text style={styles.GreetingComment}>오늘은 어떤</Text>
          <Text style={styles.RecommandPokemon}> 포켓몬</Text>
          <Text style={styles.GreetingComment}>을 살펴볼까?</Text>
        </View>

        <TouchableOpacity
          onPress={this._onPressMoveCategoryScreenHandler}
          style={styles.ImageWrap}
        >
          <Image
            style={styles.BrandImage}
            source={dexImage.dexImage[Math.floor(Math.random() * 924) + 1]}
          ></Image>
          <Text style={styles.DexTitle}>도감보기</Text>
        </TouchableOpacity>

        <Text style={styles.FooterWrap}>Developer DevHong. ver 1.0.0.0 </Text>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  WelcomeContainer: {
    backgroundColor: "#ffffff",
    flex: 1
  },
  HeaderWrap: {
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: Constants.statusBarHeight,
    flex: 2,
    flexDirection: "row",
    alignItems: "flex-end"
  },
  HeaderTitle: theme.fonts.h1,
  HeaderUsername: {
    ...theme.fonts.h1,
    fontWeight: "bold",
    color: theme.colors.primary
  },
  GreetinWrap: {
    paddingHorizontal: Constants.statusBarHeight,
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  GreetingComment: {
    ...theme.fonts.h3,
    color: theme.colors.secondary
  },
  RecommandPokemon: {
    ...theme.fonts.h2,
    color: theme.colors.accent,
    fontWeight: "bold"
  },
  ImageWrap: {
    flex: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  BrandImage: {
    width: "100%",
    height: "50%",
    resizeMode: "contain"
  },
  DexTitle: {
    ...theme.fonts.h3,
    color: theme.colors.accent,
    textAlign: "center"
  },
  FooterWrap: {
    flex: 1,
    color: theme.colors.muted,
    textAlign: "center",
    textAlignVertical: "center"
  }
});

export default WelcomeScreen;
