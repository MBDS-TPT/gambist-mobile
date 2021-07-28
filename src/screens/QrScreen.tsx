import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { MatchService } from "../services/match/match.service";
import { Match } from "../models/Model";

export const QrScreen = () => {
  const [hasPermission, setHasPermission] = useState<any>(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState(
    "Aucun QR code scanné pour le moment. Scannez le QR code d'un match pour accéder à sa page détail"
  );
  const [matchScanned, setMatchScanned] = useState<Match>();

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  };

  const handleBarCodeScanned = (type: any, data: any) => {
    setScanned(true);
    if (typeof data == "string") {
      if (data.includes("/match/get?id=")) {
        const idMatch = data.split("get?id=")[1];
        setText(
          "Le détail du match " +
            idMatch +
            " est chargé. Toucher le bouton pour scanner un nouveau match."
        );
        console.log(
          `Bar code with type ${type} and data ${data} has been scanned!`
        );
        console.log(`Un match est scanne!`);
        MatchService.getMatch(idMatch)
          .then((data) => {
            console.log(data);
            setMatchScanned(data);
          })
          .catch((error) => {
            setText("Une erreur est survenue: " + error);
          });
      } else {
        console.log(
          `Bar code with type ${type} and data ${data} has been scanned!`
        );
        const stringErrorScan =
          "Veuillez scanner un QR Code de Match provenant de Gambist";
        setText(stringErrorScan);
      }
    }
  };

  const resetTextScanned = (isScanned: boolean) => {
    setScanned(isScanned);
    setText("Scannez le QR code d'un match pour accéder à sa page détail");
    setMatchScanned(undefined);
  };

  useEffect(() => {
    askForCameraPermission();
  }, []);

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <View style={styles.navigationtitle}>
          <Text style={styles.maintextTitle}>Gambist</Text>
          <Text style={styles.textTitle}>Scan QR de match</Text>
        </View>
        <View style={styles.bodywithoutQr}>
          <Text>Demande de permission</Text>
        </View>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <View style={styles.navigationtitle}>
          <Text style={styles.maintextTitle}>Gambist</Text>
          <Text style={styles.textTitle}>Scan QR de match</Text>
        </View>
        <View style={styles.bodywithoutQr}>
          <Text>Permission non accordée</Text>
          <TouchableOpacity
            onPress={() => askForCameraPermission()}
            style={styles.button}
          >
            <View>
              <Text>Demander la permission pour la caméra</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.navigationtitle}>
        <Text style={styles.maintextTitle}>Gambist</Text>
        <Text style={styles.textTitle}>Scan match</Text>
      </View>
      <View style={styles.body}>
        <BarCodeScanner
          onBarCodeScanned={({ type, data }) => {
            scanned ? undefined : handleBarCodeScanned(type, data);
          }}
          style={styles.qrcodestyle}
        />
      </View>
      <View style={styles.bodyTextAndButton}>
        <Text style={styles.textScanned}>{text}</Text>
        {matchScanned && (
          <TouchableOpacity
            onPress={() => resetTextScanned(false)}
            style={styles.button}
          >
            <View>
              <Text>Accéder au détail du match</Text>
            </View>
          </TouchableOpacity>
        )}
        {scanned && (
          <TouchableOpacity
            onPress={() => resetTextScanned(false)}
            style={styles.button}
          >
            <View>
              <Text>Toucher pour scanner une nouvelle fois</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
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
  bodywithoutQr: {
    flex: 9,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    width: "100%",
    overflow: "hidden",
  },
  body: {
    flex: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    width: "100%",
    overflow: "hidden",
  },
  bodyTextAndButton: {
    flex: 4,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    width: "100%",
    overflow: "hidden",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    height: 50,
    width: "100%",
    justifyContent: "center",
    borderRadius: 50,
    margin: 5,
  },
  qrcodestyle: {
    height: 800,
    width: 800,
  },
  textScanned: {
    fontSize: 20,
    color: "black",
    textAlign: "center",
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
