import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableHighlight,
} from "react-native";
import { BetCard } from "../components/betcard/BetCard";
import { CategoryButton } from "../components/button/CategoryButton";
import { SearchBar } from "../components/searchbar/SearchBar";
import { Bet, Category } from "../models/Model";
import { BetService } from "../services/bet/bet.service";
import { CategoryService } from "../services/category/category.service";
import { useNavigation } from "../utils/useNavigation";

export const BetsScreen = () => {
  const [betslist, setBetsList] = useState<Bet[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const { navigate } = useNavigation();

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

  const getAllUserBets = async () => {
    try {
      let bets = await BetService.getUserBets();
      setBetsList(bets);
    } catch (error) {
      console.log(error);
    }
  };

  const goToBetDetailsPage = (item: Bet) => {
    try {
      navigate("BetDetailsPage", { betitem: item });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.navigationtitle}>
        <Text style={styles.maintextTitle}>Gambist</Text>
        <Text style={styles.textTitle}>Vos paris</Text>
      </View>
      <View style={styles.navigation}>
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
          <TouchableHighlight onPress={getAllUserBets}>
            <View style={styles.button}>
              <Text>Voir paris de l'user</Text>
            </View>
          </TouchableHighlight>
        </View>
        <View style={styles.betsdiv}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            scrollEnabled={true}
            data={betslist}
            renderItem={({ item, index }) => (
              <BetCard
                item={item}
                onTap={goToBetDetailsPage}
                keynumber={index}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
      <View style={styles.footer}></View>
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
    flex: 1,
    backgroundColor: "#DDDDDD",
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
  betsdiv: {
    flex: 8,
    backgroundColor: "white",
    width: "100%",
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
