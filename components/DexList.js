import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { theme } from "../constants";

class DexList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemonId: this.props.pokemonId,
      koName: this.props.koName,
      imagePathNumber: this.props.imagePathNumber
    };
  }

  render() {
    const { pokemonId, koName, imagePathNumber } = this.state;
    return (
      <View style={styles.RowContainer}>
        <Image style={styles.PokemonImage} source={imagePathNumber} />
        <View style={styles.PokemonInfoWrap}>
          <Text style={styles.PokemonDexNum}>No.{pokemonId}</Text>
          <Text style={styles.PokemonName}>{koName}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  RowContainer: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 10,
    alignItems: "center",
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.muted2
  },
  PokemonInfoWrap: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  PokemonImage: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    marginRight: 5
  },
  PokemonDexNum: {
    ...theme.fonts.h3,
    marginHorizontal: 10
  },
  PokemonName: {
    ...theme.fonts.h2,
    textAlign: "center",
    flex: 1
  }
});

export default DexList;
