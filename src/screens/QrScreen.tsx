import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

export const QrScreen = () => {
  const [hasPermission, setHasPermission] = useState<any>(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState(
    "Aucun QR code scanné pour le moment. Scannez le QR code d'un match pour accéder à sa page détail"
  );

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  };

  const handleBarCodeScanned = (type: any, data: any) => {
    setScanned(true);
    setText(data);
    console.log(
      `Bar code with type ${type} and data ${data} has been scanned!`
    );
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
        {scanned && (
          <TouchableOpacity
            onPress={() => setScanned(false)}
            style={styles.button}
          >
            <View>
              <Text>Tap to Scan Again</Text>
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
