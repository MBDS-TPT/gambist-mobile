import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Match } from "../../models/Model";

interface MatchCardProps {
  item: Match;
  onTap: Function;
  keynumber: number;
}

const MatchCard: React.FC<MatchCardProps> = ({ item, onTap, keynumber }) => {
  const imageA = {
    uri: item.teamA?.logo,
  };
  const imageB = {
    uri: item.teamB?.logo,
  };
  return (
    <View style={styles.container}>
      <View style={styles.imagecontainer}>
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
      <View style={styles.infocontainer}>
        <View>
          <Text style={styles.text}>{item.category?.label}</Text>
          <Text style={styles.text}>
            {item.teamA?.name} vs {item.teamB?.name}
          </Text>
        </View>
        <View style={styles.buttoncontainer}>
          <TouchableOpacity onPress={() => onTap(item)}>
            <View style={styles.button}>
              <Text style={styles.textlink}>Voir Détails &gt;</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    marginBottom: 15,
  },
  imagecontainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "black",
  },
  infocontainer: {
    flex: 1,
    flexDirection: "column",
  },
  buttoncontainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    marginRight: 10,
  },
  image: {
    height: 200,
    width: "100%",
  },
  button: {
    alignItems: "flex-end",
    backgroundColor: "white",
    padding: 10,
    width: "100%",
  },
  textlink: {
    color: "blue",
  },
  text: {
    color: "black",
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export { MatchCard };
