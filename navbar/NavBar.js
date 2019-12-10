import React from "react";
import { View, Text, StyleSheet } from "react-native";

function NavBar() {
  return (
    <View style={styles.container}>
      <Text>Nav bar</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%"
  }
});

export default NavBar;
