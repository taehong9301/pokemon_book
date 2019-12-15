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
      key: navi.getParam("key", 0),
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
      key,
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
              {type.map((e, i) => {
                let tagColor = styles.TagColorNormal;
                if (e === "페어리") {
                  tagColor = styles.TagColorFairy;
                } else if (e === "노말") {
                  tagColor = styles.TagColorNormal;
                } else if (e === "비행") {
                  tagColor = styles.TagColorFly;
                } else if (e === "불꽃") {
                  tagColor = styles.TagColorFire;
                } else if (e === "풀") {
                  tagColor = styles.TagColorGrass;
                } else if (e === "독") {
                  tagColor = styles.TagColorPoison;
                } else if (e === "물") {
                  tagColor = styles.TagColorWater;
                } else if (e === "전기") {
                  tagColor = styles.TagColorElectron;
                } else if (e === "땅") {
                  tagColor = styles.TagColorEarth;
                } else if (e === "벌레") {
                  tagColor = styles.TagColorInsect;
                } else if (e === "얼음") {
                  tagColor = styles.TagColorIce;
                } else if (e === "에스퍼") {
                  tagColor = styles.TagColorEsper;
                } else if (e === "격투") {
                  tagColor = styles.TagColorFight;
                } else if (e === "바위") {
                  tagColor = styles.TagColorStone;
                } else if (e === "악") {
                  tagColor = styles.TagColorDark;
                } else if (e === "드래곤") {
                  tagColor = styles.TagColorDragon;
                } else if (e === "고스트") {
                  tagColor = styles.TagColorGhost;
                }
                return (
                  <Text key={i} style={[styles.TypeTag, tagColor]}>
                    {e}
                  </Text>
                );
              })}
            </View>
          </View>

          <View style={styles.DetailSection}>
            <Text style={styles.DetailSectionName}>설명</Text>
            {Object.entries(desc).map(([version, _desc], i) => {
              return (
                <View key={i}>
                  <Text style={styles.DescVersion}>{version} 버전</Text>
                  <Text style={styles.DetailItemFontSize}>{_desc}</Text>
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
            <View>
              <Text>키</Text>
              <Text style={styles.DetailItemFontSize}>{height}m</Text>
            </View>
            <View>
              <Text>몸무게</Text>
              <Text style={styles.DetailItemFontSize}>{weight}kg</Text>
            </View>
            <View>
              <Text>분류</Text>
              <Text style={styles.DetailItemFontSize}>{pokemonClass}</Text>
            </View>
            <View>
              <Text>특징</Text>
              <Text style={styles.DetailItemFontSize}>{specificity}</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
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
    ...theme.fonts.h2,
    color: theme.colors.primary,
    padding: 8
  },
  TypeTagWrap: {
    flexDirection: "row",
    flexWrap: "wrap"
  },
  TypeTag: {
    paddingHorizontal: Constants.statusBarHeight,
    paddingVertical: 5,
    margin: 3,
    borderRadius: 10,
    color: theme.colors.white
  },
  DescVersion: {
    paddingVertical: 3,
    borderRadius: 10,
    color: theme.colors.muted
  },

  // 포켓몬 타입 색상 정의
  TagColorFairy: {
    backgroundColor: theme.colors.fairy
  },
  TagColorNormal: {
    backgroundColor: theme.colors.normal
  },
  TagColorGrass: {
    backgroundColor: theme.colors.grass
  },
  TagColorPoison: {
    backgroundColor: theme.colors.poison
  },
  TagColorFire: {
    backgroundColor: theme.colors.fire
  },
  TagColorFly: {
    backgroundColor: theme.colors.fly
  },
  TagColorEarth: {
    backgroundColor: theme.colors.earth
  },
  TagColorWater: {
    backgroundColor: theme.colors.water
  },
  TagColorElectron: {
    backgroundColor: theme.colors.electron
  },
  TagColorInsect: {
    backgroundColor: theme.colors.insect
  },
  TagColorIce: {
    backgroundColor: theme.colors.ice
  },
  TagColorEsper: {
    backgroundColor: theme.colors.esper
  },
  TagColorFight: {
    backgroundColor: theme.colors.fight
  },
  TagColorStone: {
    backgroundColor: theme.colors.stone
  },
  TagColorDark: {
    backgroundColor: theme.colors.dark
  },
  TagColorDragon: {
    backgroundColor: theme.colors.dragon
  },
  TagColorGhost: {
    backgroundColor: theme.colors.ghost
  }
});
export default DetailScreen;
