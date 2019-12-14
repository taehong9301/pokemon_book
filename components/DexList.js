import React from "react";
import { View, Text, Image } from "react-native";

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
      <View>
        <Text>
          {pokemonId} {koName}
        </Text>
        <Image source={imagePathNumber} />
      </View>
    );
  }
}

export default DexList;
