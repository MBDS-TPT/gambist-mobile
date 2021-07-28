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

interface HomeProps {
  navigation: { getParam: Function };
}

const HomeScreen: React.FC<HomeProps> = (props) => {
  const { navigate } = useNavigation();
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [matcheslist, setMatchesList] = useState<Match[]>([]);
  const { getParam } = props.navigation;

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

  const goToSearchPage = () => {
    try {
      navigate("SearchPage");
    } catch (error) {
      console.log(error);
    }
  };

  const goToMatchDetailsPage = (item: Match) => {
    try {
      navigate("MatchDetailsPage", { matchitem: item });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserName();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.navigationtitle}>
        <Text style={styles.maintextTitle}>Gambist</Text>
        <Text style={styles.textTitle}>Les matches</Text>
      </View>
      <View style={styles.navigation}>
        <View style={styles.searchdiv}>
          <SearchBar didTouch={() => {}} onTextChange={() => {}} />
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
                onTap={goToMatchDetailsPage}
                keynumber={index}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DDDDDD",
  },
  navigationtitle: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#DDDDDD",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 40,
    marginLeft: 20,
    marginRight: 20,
  },
  navigation: {
    flex: 2,
    backgroundColor: "red",
  },
  searchdiv: {
    flex: 1,
    backgroundColor: "white",
    borderBottomWidth: 3,
    borderBottomColor: "#DDDDDD",
  },
  categoriesdiv: {
    flex: 1,
    backgroundColor: "white",
  },
  body: {
    flex: 7,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    width: "100%",
  },
  matchesdiv: {
    flex: 8,
    backgroundColor: "white",
    width: "100%",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
  },
  buttontestdiv: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "white",
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

export { HomeScreen };
