import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

interface SearchScreenProps {}

const SearchScreen: React.FC<SearchScreenProps> = ({}) => {
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Text>Search détails</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  body: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    width: "100%",
    overflow: "hidden",
    marginTop: 20,
  },
});

export { SearchScreen };
