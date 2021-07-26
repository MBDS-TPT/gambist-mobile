import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Bet } from "../../models/Model";
import Moment from "moment";

interface BetCardProps {
  item: Bet;
  onTap: Function;
  keynumber: number;
}

const BetCard: React.FC<BetCardProps> = ({ item, onTap, keynumber }) => {
  const imageA = {
    uri: item.match?.teamA?.logo,
  };
  const imageB = {
    uri: item.match?.teamB?.logo,
  };
  const dateFormatted = Moment(item.betDate).format("DD-MM-YYYY");
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
          <View style={styles.titlecontainer}>
            <Text style={styles.text}>Pari du {dateFormatted}</Text>
            <Text style={styles.text}>{item.match?.category?.label}</Text>
          </View>
          <Text style={styles.text}>
            {item.match?.teamA?.name} vs {item.match?.teamB?.name}
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
  titlecontainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 20,
    marginLeft: 20,
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

export { BetCard };
