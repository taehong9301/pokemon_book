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
import { Ionicons } from "@expo/vector-icons";
import { AdMobBanner } from "expo-ads-admob";

import DexList from "../components/DexList";
import dexImage from "../exports/DexImage";
import { ScrollView } from "react-native-gesture-handler";
import { theme } from "../constants";

const BANNER_ID = "ca-app-pub-9462926197232794/4921520930";

class CategoryScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      listLength: 0,
      pokemonList: [],
      loading: true
    };
  }

  async componentDidMount() {
    const newState = await this._get_pokemon_by_local();
    this.setState(newState);
  }

  async _get_pokemon_by_local() {
    // 네트워크가 안되는 환경을 위해서 로컬에서 가져온다.
    const pokemonDex = await require("../assets/json/dex_info.json");
    const newState = {
      pokemonList: pokemonDex.pokemon,
      listLength: pokemonDex.pokemon.length,
      loading: false
    };
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
    const { page, listLength, pokemonList, loading } = this.state;

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
      <View style={styles.Container}>
        <ScrollView>
          <AdMobBanner
            bannerSize="smartBannerPortrait"
            adUnitID={BANNER_ID}
            testDeviceID="EMULATOR"
            servePersonalizedAds // true or false
            onDidFailToReceiveAdWithError={e => console.log(e)}
          />
          <View>
            <FlatList
              data={pokemonList.slice(page, page + 30)}
              renderItem={this.renderItemByLocal}
              keyExtractor={item => "" + item.key}
            />
          </View>
        </ScrollView>

        <View style={styles.BottomButtonGroup}>
          <TouchableOpacity
            style={styles.BottomButton}
            onPress={() => {
              if (page >= 30) this.setState({ page: page - 30 });
            }}
          >
            <Text style={styles.BottomButtonText}>이전</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.BottomButton}
            onPress={() => {
              if (page <= listLength - 30) this.setState({ page: page + 30 });
            }}
          >
            <Text style={styles.BottomButtonText}>다음</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight
  },
  LoadingWrap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  BottomButtonGroup: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around"
  },
  BottomButton: {
    flex: 1,
    backgroundColor: theme.colors.muted3,
    paddingVertical: 15
  },
  BottomButtonText: {
    textAlign: "center"
  }
});

export default CategoryScreen;
