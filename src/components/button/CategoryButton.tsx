import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
} from "react-native";
import { Category } from "../../models/Model";

interface CategoryButtonProps {
  item: Category;
  onTap: Function;
  keynumber: number;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({
  item,
  onTap,
  keynumber,
}) => {
  return (
    <TouchableHighlight onPress={() => onTap(item)}>
      <View style={styles.button}>
        <Text key={keynumber}>{item.label}</Text>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "white",
    padding: 15,
  },
});

export { CategoryButton };
