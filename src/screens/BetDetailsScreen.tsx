import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { Bet } from "../models/Model";
import Moment from "moment";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";

interface BetDetailsProps {
  navigation: { getParam: Function; goBack: Function };
}

const BetDetailsScreen: React.FC<BetDetailsProps> = (props) => {
  const { getParam, goBack } = props.navigation;

  const betItem = getParam("betitem") as Bet;
  const imageA = {
    uri: betItem.match?.teamA?.logo,
  };
  const imageB = {
    uri: betItem.match?.teamB?.logo,
  };
  const betDateFormatted = Moment(betItem.betDate).format("DD-MM-YYYY HH:mm");
  const dateFormatted = Moment(betItem.match?.matchDate).format(
    "DD-MM-YYYY HH:mm"
  );
  const coteBet = betItem.odds?.toFixed(2);
  const coteTeamA = betItem.match?.oddsA?.toFixed(2);
  const coteTeamB = betItem.match?.oddsB?.toFixed(2);
  const coteMatchNul = betItem.match?.oddsNul?.toFixed(2);

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Info du pari" },
    { key: "second", title: "Info du monde" },
  ]);

  const FirstRoute = () => (
    <ScrollView>
      <View style={styles.contentcontainer}>
        <Text style={styles.contentTitle}>Date du pari: </Text>
        <Text style={styles.contentDescription}>{betDateFormatted}</Text>
      </View>
      <View style={styles.contentcontainer}>
        <Text style={styles.contentTitle}>Valeur que vous avez parié: </Text>
        <Text style={styles.contentDescription}>{betItem.betValue}</Text>
      </View>
      <View style={styles.contentcontainer}>
        <Text style={styles.contentTitle}>
          Equipe sur laquelle vous avez parié :
        </Text>
        <Text style={styles.contentDescription}>{betItem.team?.name}</Text>
      </View>
      <View style={styles.contentcontainer}>
        <Text style={styles.contentTitle}>Côte de votre pari</Text>
        <Text style={styles.contentDescription}>{coteBet}</Text>
      </View>
    </ScrollView>
  );

  const SecondRoute = () => (
    <ScrollView>
      <View style={styles.contentcontainer}>
        <Text style={styles.contentTitle}>Catégorie du sport: </Text>
        <Text style={styles.contentDescription}>
          {betItem.match?.category?.label}
        </Text>
      </View>
      <View style={styles.contentcontainer}>
        <Text style={styles.contentTitle}>Date et heure du match: </Text>
        <Text style={styles.contentDescription}>{dateFormatted}</Text>
      </View>
      <View style={styles.contentcontainer}>
        <Text style={styles.contentTitle}>
          Côte de victoire {betItem.match?.teamA?.name} :{" "}
        </Text>
        <Text style={styles.contentDescription}>{coteTeamA}</Text>
      </View>
      <View style={styles.contentcontainer}>
        <Text style={styles.contentTitle}>
          Côte de victoire {betItem.match?.teamB?.name} :{" "}
        </Text>
        <Text style={styles.contentDescription}>{coteTeamB}</Text>
      </View>
      <View style={styles.contentcontainer}>
        <Text style={styles.contentTitle}>Côte match nul: </Text>
        <Text style={styles.contentDescription}>{coteMatchNul}</Text>
      </View>
    </ScrollView>
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: "white" }}
      style={{ backgroundColor: "black" }}
      labelStyle={{ fontWeight: "bold" }}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.navigationtitle}>
        <TouchableOpacity onPress={() => goBack()}>
          <Text style={styles.textTitle}>&lt; Retour</Text>
        </TouchableOpacity>
        <Text style={styles.maintextTitle}>Détail du pari</Text>
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
          <Text style={styles.maintextTitle}>{betItem.match?.teamA?.name}</Text>
          <Text style={styles.textTitle}>VS</Text>
          <Text style={styles.maintextTitle}>{betItem.match?.teamB?.name}</Text>
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            renderTabBar={renderTabBar}
            style={{ marginTop: 20 }}
          />
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
    fontSize: 17,
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

export { BetDetailsScreen };
