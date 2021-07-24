import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  ActivityIndicator,
  TouchableHighlight,
  Alert,
} from "react-native";
import { CategoryButton } from "../components/button/CategoryButton";
import { MatchCard } from "../components/matchcard/MatchCard";
import { SearchBar } from "../components/searchbar/SearchBar";
import { Category, Match } from "../models/Model";
import { CategoryService } from "../services/category/category.service";
import { MatchService } from "../services/match/match.service";
import { useNavigation } from "../utils/useNavigation";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const HomeScreen = () => {
  const { navigate } = useNavigation();
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [matcheslist, setMatchesList] = useState<Match[]>([]);

  const getAllCategories = () => {
    CategoryService.getCategories()
      .then((data) => {
        let categoriesTOUpdate = [
          {
            id: -1,
            label: "All sports",
            state: 0,
          },
          ...(data || []),
        ];
        setCategories(categoriesTOUpdate);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getAllMatches = async () => {
    try {
      let matches = await MatchService.getAllMatch();
      setMatchesList(matches.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getUserName = () => {
    try {
      AsyncStorage.getItem("userName")
        .then((value) => {
          if (value != null) {
            Alert.alert(
              "Bienvenue",
              value + ", nous vous souhaitons la bienvenue sur Gambist!",
              [{ text: "OK", onPress: () => console.log("OK Pressed") }]
            );
          }
        })
        .catch((error) => {
          setErrorMessage(error + "");
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserName();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.navigation}>
        <View style={styles.searchdiv}>
          <SearchBar onTextChange={() => {}} />
        </View>
        <View style={styles.categoriesdiv}>
          <ScrollView>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={categories}
              renderItem={({ item, index }) => (
                <CategoryButton
                  item={item}
                  onTap={() => {
                    alert(
                      item.id + " is the id and " + item.label + " is the label"
                    );
                  }}
                  keynumber={index}
                />
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </ScrollView>
        </View>
      </View>
      <View style={styles.body}>
        <View style={styles.buttontestdiv}>
          <TouchableHighlight onPress={getAllCategories}>
            <View style={styles.button}>
              <Text>Voir categories</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={getAllMatches}>
            <View style={styles.button}>
              <Text>Voir matches</Text>
            </View>
          </TouchableHighlight>
        </View>
        <View style={styles.matchesdiv}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            scrollEnabled={true}
            data={matcheslist}
            renderItem={({ item, index }) => (
              <MatchCard
                item={item}
                onTap={() => {
                  alert(
                    item.id +
                      " is the id and " +
                      item.teamA?.name +
                      " is the team A and " +
                      item.teamB?.name +
                      " is the team B"
                  );
                }}
                keynumber={index}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
      <View style={styles.footer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "green",
  },
  navigation: {
    flex: 2,
    backgroundColor: "red",
  },
  searchdiv: {
    flex: 1,
    backgroundColor: "white",
  },
  categoriesdiv: {
    flex: 1,
    backgroundColor: "white",
  },
  body: {
    flex: 9,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  matchesdiv: {
    flex: 8,
    backgroundColor: "white",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
  },
  footer: {
    flex: 1,
    backgroundColor: "cyan",
  },
  buttontestdiv: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "white",
  },
});
