import React from "react";
import {
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  View,
  Text,
  StyleSheet
} from "react-native";
import Constants from "expo-constants";

import DexList from "../components/DexList";
import dexImage from "../exports/DexImage";

class CategoryScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemonList: [],
      loading: true
    };
  }

  async componentDidMount() {
    // const newState = await this._get_pokemon_by_api();
    const newState = await this._get_pokemon_by_local();
    this.setState(newState);
  }

  async _get_pokemon_by_local() {
    // 네트워크가 안되는 환경을 위해서 로컬에서 가져온다.
    const pokemonDex = await require("../assets/json/dex_info.json");
    const newState = { pokemonList: pokemonDex.pokemon, loading: false };
    return newState;
  }

  renderItemByLocal = data => {
    // local 용
    return (
      <TouchableOpacity
        onPress={() => this._onPressMoveDetailScreen(data.item)}
      >
        <DexList
          key={data.item.key}
          navigation={this.props.navigation}
          pokemonId={data.item.id}
          koName={data.item.ko_name}
          imagePathNumber={dexImage.dexImage[data.item.key]}
        />
      </TouchableOpacity>
    );
  };

  /**
   * Detail Screen 으로 이동
   */
  _onPressMoveDetailScreen = data => {
    this.props.navigation.navigate(
      "Detail",
      Object.assign({}, data, { imagePathNumber: dexImage.dexImage[data.key] })
    );
  };

  render() {
    const { pokemonList, loading } = this.state;

    // 로딩중...
    if (loading) {
      return (
        <View style={styles.LoadingWrap}>
          <Text>포켓몬을 찾고 있어요.</Text>
          <Text>조금만 기다려주세요!</Text>
          <ActivityIndicator size="large" />
        </View>
      );
    }

    return (
      <FlatList
        data={pokemonList}
        renderItem={this.renderItemByLocal}
        keyExtractor={item => "" + item.key}
      />
    );
  }

  ////
  // 이건 좀 생각해봐야 할거 같다.
  async _get_pokemon_by_api() {
    // api 를 이용해서 값을 가져온다. (영문)
    const pokemonApiCall = await fetch("https://pokeapi.co/api/v2/pokemon/");
    const pokemon = await pokemonApiCall.json();
    const newState = { pokemonList: pokemon.results, loading: false };
    return newState;
  }
  renderItemByApi(data) {
    // api 용
    return (
      <TouchableOpacity>
        <View style={styles.listItemContainer}>
          <Text style={styles.pokeItemHeader}>{data.item.name}</Text>
          {/* <Image source={{ uri: data.item.url }} style={styles.pokeImage} /> */}
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  LoadingWrap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default CategoryScreen;
