import React from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";

function MainArticle() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>포켓몬의 정석</Text>

      <View style={styles.buttonWrap}>
        <Button
          color="#7048e8"
          title="번호순"
          onPress={() => Alert.alert("번호순", "도감 번호순으로 나오게 하자")}
        />
        <Button
          color="#7048e8"
          title="이름순"
          onPress={() => Alert.alert("이름순", "포켓몬 이름순으로 나오게 하자")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  title: {
    marginTop: 50,
    padding: 10,
    fontSize: 40,
    fontWeight: "bold",
    flex: 9
  },
  buttonWrap: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  button: {
    width: 100,
    color: "#f3d9fa"
  }
});

export default MainArticle;
