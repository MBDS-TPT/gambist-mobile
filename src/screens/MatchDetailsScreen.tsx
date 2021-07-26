import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  ImageBackground,
  ScrollView,
} from "react-native";
import { Match } from "../models/Model";
import Moment from "moment";

interface MatchDetailsProps {
  navigation: { getParam: Function; goBack: Function };
}

const MatchDetailsScreen: React.FC<MatchDetailsProps> = (props) => {
  const { getParam, goBack } = props.navigation;

  const matchitem = getParam("matchitem") as Match;

  console.log(matchitem);
  const imageA = {
    uri: matchitem.teamA?.logo,
  };
  const imageB = {
    uri: matchitem.teamB?.logo,
  };
  const dateFormatted = Moment(matchitem.matchDate).format("DD-MM-YYYY HH:mm");
  const coteTeamA = matchitem.oddsA?.toFixed(2);
  const coteTeamB = matchitem.oddsB?.toFixed(2);
  const coteMatchNul = matchitem.oddsNul?.toFixed(2);
  return (
    <View style={styles.container}>
      <View style={styles.navigationtitle}>
        <TouchableOpacity onPress={() => goBack()}>
          <Text style={styles.maintextTitle}>&lt; Retour</Text>
        </TouchableOpacity>
        <Text style={styles.textTitle}>Détail du match</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.bodyimagecontainer}>
          <View style={styles.imagecontainer}>
            <ImageBackground
              source={imageA}
              resizeMode="cover"
              style={styles.image}
            />
          </View>
          <View style={styles.imagecontainer}>
            <ImageBackground
              source={imageB}
              resizeMode="cover"
              style={styles.image}
            />
          </View>
        </View>
        <View style={styles.bodytextcontainer}>
          <Text style={styles.maintextTitle}>{matchitem.teamA?.name}</Text>
          <Text style={styles.maintextTitle}>VS</Text>
          <Text style={styles.maintextTitle}>{matchitem.teamB?.name}</Text>
          <ScrollView>
            <View style={styles.contentcontainer}>
              <Text style={styles.contentSubTitle}>Info du match </Text>
            </View>
            <View style={styles.contentcontainer}>
              <Text style={styles.contentTitle}>Catégorie du sport: </Text>
              <Text style={styles.contentDescription}>
                {matchitem.category?.label}
              </Text>
            </View>
            <View style={styles.contentcontainer}>
              <Text style={styles.contentTitle}>Date et heure du match: </Text>
              <Text style={styles.contentDescription}>{dateFormatted}</Text>
            </View>
            <View style={styles.contentcontainer}>
              <Text style={styles.contentTitle}>
                Côte de victoire {matchitem.teamA?.name} :{" "}
              </Text>
              <Text style={styles.contentDescription}>{coteTeamA}</Text>
            </View>
            <View style={styles.contentcontainer}>
              <Text style={styles.contentTitle}>
                Côte de victoire {matchitem.teamB?.name} :{" "}
              </Text>
              <Text style={styles.contentDescription}>{coteTeamB}</Text>
            </View>
            <View style={styles.contentcontainer}>
              <Text style={styles.contentTitle}>Côte match nul: </Text>
              <Text style={styles.contentDescription}>{coteMatchNul}</Text>
            </View>
            <View style={styles.contentcontainer}>
              <Text style={styles.contentSubTitle}>Formulaire de pari </Text>
            </View>
            <View style={styles.contentcontainer}>
              <Text style={styles.contentTitle}>Catégorie du sport: </Text>
              <Text style={styles.contentDescription}>
                {matchitem.category?.label}
              </Text>
            </View>
            <View style={styles.contentcontainer}>
              <Text style={styles.contentTitle}>Date et heure du match: </Text>
              <Text style={styles.contentDescription}>{dateFormatted}</Text>
            </View>
            <View style={styles.contentcontainer}>
              <Text style={styles.contentTitle}>
                Côte de victoire {matchitem.teamA?.name} :{" "}
              </Text>
              <Text style={styles.contentDescription}>{coteTeamA}</Text>
            </View>
            <View style={styles.contentcontainer}>
              <Text style={styles.contentTitle}>
                Côte de victoire {matchitem.teamB?.name} :{" "}
              </Text>
              <Text style={styles.contentDescription}>{coteTeamB}</Text>
            </View>
            <View style={styles.contentcontainer}>
              <Text style={styles.contentTitle}>Côte match nul: </Text>
              <Text style={styles.contentDescription}>{coteMatchNul}</Text>
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DDDDDD",
  },
  navigationtitle: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#DDDDDD",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 40,
    paddingLeft: 20,
    paddingRight: 20,
  },
  body: {
    flex: 9,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    width: "100%",
    overflow: "hidden",
  },
  bodyimagecontainer: {
    flex: 3,
    flexDirection: "row",
    backgroundColor: "black",
  },
  bodytextcontainer: {
    flex: 6,
    width: "100%",
  },
  imagecontainer: {
    flex: 1,
    flexDirection: "row",
  },
  image: {
    width: "100%",
  },
  textTitle: {
    fontSize: 25,
    textAlign: "center",
  },
  maintextTitle: {
    fontSize: 25,
    textAlign: "center",
    fontWeight: "bold",
  },
  contentcontainer: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    marginTop: 10,
    marginLeft: 20,
  },
  contentTitle: {
    fontSize: 15,
    textAlign: "left",
    fontWeight: "bold",
  },
  contentDescription: {
    fontSize: 15,
    textAlign: "left",
  },
  contentSubTitle: {
    fontSize: 20,
    textAlign: "left",
    fontWeight: "bold",
    color: "blue",
  },
});

export { MatchDetailsScreen };
