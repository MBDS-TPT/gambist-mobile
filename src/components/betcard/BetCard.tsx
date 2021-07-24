import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import { Bet } from "../../models/Model";

interface BetCardProps {
  item: Bet;
  onTap: Function;
  keynumber: number;
}

const BetCard: React.FC<BetCardProps> = ({ item, onTap, keynumber }) => {
  return (
    <View style={styles.container}>
      <Text key={keynumber}>
        {item.betValue} parié le {item.betDate}
      </Text>
      <TouchableHighlight onPress={() => onTap(item)}>
        <View style={styles.button}>
          <Text>Voir Détails</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "yellow",
  },
  button: {
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
  },
});

export { BetCard };
