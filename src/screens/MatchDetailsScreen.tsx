import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  ImageBackground,
  ScrollView,
  useWindowDimensions,
  TextInput,
  Modal,
  Alert,
} from "react-native";
import { Bet, Match } from "../models/Model";
import Moment from "moment";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import RNPickerSelect from "react-native-picker-select";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BetService } from "../services/bet/bet.service";

interface MatchDetailsProps {
  navigation: { getParam: Function; goBack: Function };
}

const MatchDetailsScreen: React.FC<MatchDetailsProps> = (props) => {
  const { getParam, goBack } = props.navigation;
  const [valueBet, setValueBet] = useState<string>("");
  const [winnerTeam, setWinnerTeam] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>();
  const [oddChosed, setOddChosed] = useState<string>();
  const [winnings, setWinnings] = useState<string>();

  const matchitem = getParam("matchitem") as Match;

  const imageA = {
    uri: matchitem.teamA?.logo,
  };
  const imageB = {
    uri: matchitem.teamB?.logo,
  };
  const dateFormatted = Moment(matchitem.matchDate).format("DD-MM-YYYY HH:mm");
  const coteTeamA = matchitem.oddsA?.toFixed(2);
  const coteTeamB = matchitem.oddsB?.toFixed(2);
  const coteMatchNul = matchitem.oddsNul?.toFixed(2);

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Info du match" },
    { key: "second", title: "Faire un pari" },
  ]);

  const convertValueBet = (e: any) => {
    if (e.nativeEvent.text === "") {
      setValueBet("");
      setErrorMessage("Remplir le champs Montant que vous pariez Pari");
    } else {
      const valBetinteger = parseInt(e.nativeEvent.text);
      if (valBetinteger.toString() === "NaN") {
        setValueBet("");
        setErrorMessage("Remplir le champs Montant que vous pariez Pari");
      } else {
        const valWinning =
          valBetinteger * Number.parseFloat(oddChosed ? oddChosed : "0");
        setWinnings(valWinning.toFixed(2));
        setValueBet(valBetinteger.toString());
        setErrorMessage(undefined);
      }
    }
  };

  const chooseWinnerTeam = (team: any) => {
    setWinnerTeam(team);
    if (team === "A") {
      setOddChosed(coteTeamA);
    } else if (team === "B") {
      setOddChosed(coteTeamB);
    } else {
      setOddChosed(coteMatchNul);
    }
    setErrorMessage(undefined);
    setWinnings(undefined);
    setValueBet("");
  };

  const makeBet = async () => {
    try {
      if (winnerTeam === "" || winnerTeam == null) {
        setErrorMessage("Veuillez choisir un résultat pour le match");
      } else if (valueBet === "") {
        setErrorMessage("Remplir le champs Montant que vous pariez Pari");
      } else {
        setErrorMessage(undefined);
        const userId = await AsyncStorage.getItem("userId");
        const bet: Bet = {
          betDate: new Date(),
          betValue: Number.parseInt(valueBet),
          matchId: matchitem.id,
          userId: userId,
        };
        if (winnerTeam === "A") {
          bet.teamId = matchitem.teamA?.id;
          bet.odds = matchitem.oddsA;
        } else if (winnerTeam === "B") {
          bet.teamId = matchitem.teamB?.id;
          bet.odds = matchitem.oddsB;
        }

        BetService.postBet(bet).then((res) => {
          if (res.result !== "KO") {
            Alert.alert(
              "Pari enregistré",
              "Votre pari a bien été enregistré! Vous pourrez le voir en rafraichissant la page de vos pari (draggez l'écran vers le bas)",
              [{ text: "OK", onPress: () => goBack() }]
            );
          } else {
            setErrorMessage("Erreur survenue:" + res.message);
          }
        });
        console.log(bet);
        console.log(valueBet);
        console.log(winnerTeam);
        console.log(Number.isInteger(valueBet));
      }
    } catch (error) {
      setErrorMessage("Erreur: " + error);
    }
  };

  const FirstRoute = () => (
    <ScrollView>
      <View style={styles.contentcontainer}>
        <Text style={styles.contentTitle}>Catégorie du sport: </Text>
        <Text style={styles.contentDescription}>
          {matchitem.category?.label}
        </Text>
      </View>
      <View style={styles.contentcontainer}>
        <Text style={styles.contentTitle}>Date et heure du match: </Text>
        <Text style={styles.contentDescription}>{dateFormatted}</Text>
      </View>
      <View style={styles.contentcontainer}>
        <Text style={styles.contentTitle}>
          Côte de victoire {matchitem.teamA?.name} :{" "}
        </Text>
        <Text style={styles.contentDescription}>{coteTeamA}</Text>
      </View>
      <View style={styles.contentcontainer}>
        <Text style={styles.contentTitle}>
          Côte de victoire {matchitem.teamB?.name} :{" "}
        </Text>
        <Text style={styles.contentDescription}>{coteTeamB}</Text>
      </View>
      <View style={styles.contentcontainer}>
        <Text style={styles.contentTitle}>Côte match nul: </Text>
        <Text style={styles.contentDescription}>{coteMatchNul}</Text>
      </View>
    </ScrollView>
  );

  const SecondRoute = () => (
    <ScrollView>
      {winnerTeam != "" && winnerTeam != null ? (
        <View>
          <Text>Saisissez votre mise (uniquement un nombre entier)</Text>
          <Text>(Côte de votre choix: {oddChosed})</Text>
          {winnings != null && winnings != "" && (
            <Text>(Votre gain sera de: {winnings})</Text>
          )}
        </View>
      ) : (
        <View>
          <Text>Choisissez le gagnant du match</Text>
          <Text>(Vos gains seront calculés de la manière suivante:</Text>
          <Text>Valeur de votre mise x Côte)</Text>
        </View>
      )}
      <RNPickerSelect
        onValueChange={(value) => {
          chooseWinnerTeam(value);
        }}
        style={pickerSelectStyles}
        placeholder={{
          label: "Choisissez le gagnant du match:",
          value: null,
        }}
        items={[
          {
            label: matchitem.teamA?.name ? matchitem.teamA?.name : "Team A",
            value: "A",
          },
          {
            label: matchitem.teamB?.name ? matchitem.teamB?.name : "Team B",
            value: "B",
          },
          { label: "Match nul", value: "aucun" },
        ]}
        value={winnerTeam}
      />

      {winnerTeam != "" && winnerTeam != null && (
        <TextInput
          style={styles.input}
          placeholder="Mise de votre pari"
          keyboardType="numeric"
          onSubmitEditing={(e) => convertValueBet(e)}
          defaultValue={valueBet}
        />
      )}

      {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
      <TouchableOpacity onPress={() => makeBet()} style={styles.button}>
        <View>
          <Text style={styles.textStyle}>Parier</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: "white" }}
      style={{ backgroundColor: "black" }}
      labelStyle={{ fontWeight: "bold" }}
    />
  );
  return (
    <View style={styles.container}>
      <View style={styles.navigationtitle}>
        <TouchableOpacity onPress={() => goBack()}>
          <Text style={styles.textTitle}>&lt; Retour</Text>
        </TouchableOpacity>
        <Text style={styles.maintextTitle}>Détail du match</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.bodyimagecontainer}>
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
        <View style={styles.bodytextcontainer}>
          <Text style={styles.maintextTitle}>{matchitem.teamA?.name}</Text>
          <Text style={styles.textTitle}>VS</Text>
          <Text style={styles.maintextTitle}>{matchitem.teamB?.name}</Text>
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            renderTabBar={renderTabBar}
            style={{ marginTop: 20 }}
          />
        </View>
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
  bodyimagecontainer: {
    flex: 3,
    flexDirection: "row",
    backgroundColor: "black",
  },
  bodytextcontainer: {
    flex: 6,
    width: "100%",
  },
  imagecontainer: {
    flex: 1,
    flexDirection: "row",
  },
  image: {
    width: "100%",
  },
  textTitle: {
    fontSize: 17,
    textAlign: "center",
  },
  maintextTitle: {
    fontSize: 25,
    textAlign: "center",
    fontWeight: "bold",
  },
  contentcontainer: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    marginTop: 10,
    marginLeft: 20,
  },
  contentTitle: {
    fontSize: 15,
    textAlign: "left",
    fontWeight: "bold",
  },
  contentDescription: {
    fontSize: 15,
    textAlign: "left",
  },
  contentSubTitle: {
    fontSize: 20,
    textAlign: "left",
    fontWeight: "bold",
    color: "blue",
  },
  input: {
    height: 50,
    width: "100%",
    margin: 0,
    borderWidth: 0,
    borderRadius: 50,
    paddingLeft: 7,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    width: "100%",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "100%",
    height: 500,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    height: 50,
    width: "100%",
    justifyContent: "center",
    borderRadius: 50,
    marginTop: 10,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  errorMessage: {
    color: "red",
    textAlign: "center",
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

export { MatchDetailsScreen };
