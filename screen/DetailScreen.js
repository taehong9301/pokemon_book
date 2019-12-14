import React from "react";
import { ScrollView, View, Text, Image, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Constants from "expo-constants";

import { theme } from "../constants";

class DetailScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: "뒤로가기"
  };

  constructor(props) {
    super(props);
    const navi = this.props.navigation;
    this.state = {
      id: navi.getParam("id", "0"),
      ko_name: navi.getParam("ko_name", "미지의 포켓몬"),
      type: navi.getParam("type", ["알수없는 타입"]),
      desc: navi.getParam("desc", { sun: "알수없는 미지의 포켓몬" }),
      gender: navi.getParam("gender", {
        female: false,
        male: false
      }),
      height: navi.getParam("height", 0.1),
      weight: navi.getParam("weight", 0.1),
      pokemonClass: navi.getParam("class", "미지의포켓몬"),
      specificity: navi.getParam("specificity", "특징을 알수없음"),
      imagePathNumber: navi.getParam(
        "imagePathNumber",
        "../assets/pokemon/0.png"
      )
    };
  }

  render() {
    const {
      id,
      ko_name,
      type,
      desc,
      gender,
      height,
      weight,
      pokemonClass,
      specificity,
      imagePathNumber
    } = this.state;

    return (
      <View style={styles.Container}>
        <LinearGradient
          style={styles.ImageWrap}
          colors={[theme.colors.secondary, theme.colors.white]}
        >
          <Image source={imagePathNumber} style={styles.PokemonImage} />
        </LinearGradient>

        <ScrollView style={styles.DetailContainer}>
          <View style={styles.DetailSection}>
            <Text style={styles.DetailSectionName}>No.{id} - 도감번호</Text>
            <Text style={styles.DetailItemFontSize}>{ko_name}</Text>
          </View>

          <View style={styles.DetailSection}>
            <Text style={styles.DetailSectionName}>타입</Text>
            <View style={styles.TypeTagWrap}>
              {type.map(e => {
                let tagColor = styles.TagColorGrass;
                if (e === "풀") {
                  tagColor = styles.TagColorGrass;
                } else if (e === "독") {
                  tagColor = styles.TagColorPoison;
                }
                return <Text style={[styles.TypeTag, tagColor]}>{e}</Text>;
              })}
            </View>
          </View>

          <View style={styles.DetailSection}>
            <Text style={styles.DetailSectionName}>설명</Text>
            {Object.entries(desc).map(([key, value]) => {
              return (
                <View>
                  <Text>{key} 버전</Text>
                  <Text style={styles.DetailItemFontSize}>{value}</Text>
                </View>
              );
            })}
          </View>

          <View style={styles.DetailSection}>
            <Text style={styles.DetailSectionName}>성별</Text>
            {(gender.male == true) & (gender.female == true) ? (
              <Text style={styles.DetailItemFontSize}>♂/♀</Text>
            ) : (gender.male == true) & (gender.female == false) ? (
              <Text style={styles.DetailItemFontSize}>♂</Text>
            ) : (
              <Text style={styles.DetailItemFontSize}>♀</Text>
            )}
          </View>

          <View style={styles.DetailSection}>
            <Text style={styles.DetailSectionName}>상세정보</Text>
            <Text style={styles.DetailItemFontSize}>키: {height}m</Text>
            <Text style={styles.DetailItemFontSize}>몸무게: {weight}kg</Text>
            <Text style={styles.DetailItemFontSize}>분류: {pokemonClass}</Text>
            <Text style={styles.DetailItemFontSize}>특징: {specificity}</Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    alignItems: "center"
  },
  ImageWrap: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  PokemonImage: {
    flex: 1,
    width: "80%",
    height: "60%",
    resizeMode: "contain"
  },
  DetailContainer: {
    flex: 5,
    padding: Constants.statusBarHeight / 2
  },
  DetailSection: {
    marginBottom: Constants.statusBarHeight
  },
  DetailSectionName: {
    ...theme.fonts.h3,
    marginBottom: 10
  },
  DetailItemFontSize: {
    ...theme.fonts.h2
  },
  TypeTagWrap: {
    flexDirection: "row",
    flexWrap: "wrap"
  },
  TypeTag: {
    paddingHorizontal: Constants.statusBarHeight,
    margin: 1,
    borderRadius: 5
  },
  TagColorGrass: {
    backgroundColor: theme.colors.grass
  },
  TagColorPoison: {
    backgroundColor: theme.colors.poison
  }
});
export default DetailScreen;
