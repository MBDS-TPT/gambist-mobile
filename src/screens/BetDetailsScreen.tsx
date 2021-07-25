import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Bet } from "../models/Model";

interface BetDetailsProps {
  navigation: { getParam: Function; goBack: Function };
}

const BetDetailsScreen: React.FC<BetDetailsProps> = (props) => {
  const { getParam, goBack } = props.navigation;

  const betItem = getParam("betitem") as Bet;

  return (
    <View style={styles.container}>
      <View style={styles.navigationtitle}>
        <TouchableOpacity onPress={() => goBack()}>
          <Text style={styles.maintextTitle}>&lt; Retour</Text>
        </TouchableOpacity>
        <Text style={styles.textTitle}>Détail du pari</Text>
      </View>
      <View style={styles.body}>
        <Text>pari détails</Text>
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
  textTitle: {
    fontSize: 25,
    textAlign: "center",
  },
  maintextTitle: {
    fontSize: 25,
    textAlign: "center",
    fontWeight: "bold",
  },
});

export { BetDetailsScreen };
