import React from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import NavBar from "../navbar/NavBar";
import MainArticle from "../article/MainArticle";

function MainScreen() {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.articleContainer}>
        <MainArticle></MainArticle>
      </View>
      <View style={styles.navBarContainer}>
        <NavBar></NavBar>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#fff",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  navBarContainer: {
    flex: 1,
    width: "100%"
  },
  articleContainer: {
    flex: 9,
    width: "100%"
  }
});

export default MainScreen;
