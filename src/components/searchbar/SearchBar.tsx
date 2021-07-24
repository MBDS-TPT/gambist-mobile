import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

interface SearchBarProps {
  onEndEditing?: any | undefined;
  didTouch?: any | undefined;
  autoFocus?: boolean | undefined;
  onTextChange: Function;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onEndEditing,
  didTouch,
  autoFocus = false,
  onTextChange,
}) => {
  return (
    <TextInput
      style={styles.input}
      placeholder="Rechercher un match"
      autoFocus={autoFocus}
      onTouchStart={didTouch}
      onEndEditing={onEndEditing}
      onChangeText={(text) => onTextChange(text)}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: "100%",
    width: "100%",
    margin: 0,
    borderWidth: 1,
    borderRadius: 50,
    paddingLeft: 20,
  },
});

export { SearchBar };
