import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { UserService } from "../services/user/user.service";
import { useNavigation } from "../utils/useNavigation";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const LoginScreen = () => {
  const [loginEmail, setLoginEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>();
  const [isInLocalStorage, setIsInLocalStorage] = useState<boolean>(false);
  const [isSignIn, setIsSignIn] = useState<boolean>(false);

  const { navigate } = useNavigation();

  const onLogin = () => {
    UserService.login(loginEmail, password)
      .then((res) => {
        if (res.message == "OK") {
          const userIdToString = res.data.id.toString();
          AsyncStorage.setItem("userId", userIdToString)
            .then(() => {
              AsyncStorage.setItem("userName", res.data.username)
                .then(() => {
                  navigate("homeStack");
                })
                .catch((error) => {
                  setErrorMessage(error + "");
                });
            })
            .catch((error) => {
              setErrorMessage(error + "");
            });
        } else {
          setErrorMessage(res.message);
        }
      })
      .catch((error) => {
        setErrorMessage(error + "");
      });
  };

  const onSignIn = () => {
    alert("Inscription à faire");
  };

  const goToSignIn = () => {
    setErrorMessage(undefined);
    setIsSignIn(true);
  };

  const goToLogin = () => {
    setErrorMessage(undefined);
    setIsSignIn(false);
  };

  const resetLoginCache = () => {
    AsyncStorage.clear()
      .then(() => {
        setIsInLocalStorage(false);
        setIsSignIn(false);
      })
      .catch((error) => {
        setErrorMessage(error + "");
      });
  };

  const onLoginWithCache = () => {
    try {
      navigate("homeStack");
    } catch (error) {
      alert(error);
    }
  };

  const getUserName = () => {
    try {
      AsyncStorage.getItem("userName")
        .then((value) => {
          if (value != null) {
            setIsInLocalStorage(true);
            setUsername(value);
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
    <View style={styles.mainContainer}>
      {isInLocalStorage ? (
        <View style={styles.container}>
          <Image
            source={require("../../assets/favicon.png")}
            style={styles.imageHeader}
          />
          <Text style={styles.textTitle}>Gambist</Text>
          <TouchableOpacity onPress={onLoginWithCache} style={styles.button}>
            <View>
              <Text>Continuer en tant que {username}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={resetLoginCache} style={styles.lastbutton}>
            <View>
              <Text style={styles.lastButtonText}>
                Se connecter avec un autre compte
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.container}>
          <Image
            source={require("../../assets/favicon.png")}
            style={styles.imageHeader}
          />
          <Text style={styles.textTitle}>Gambist</Text>
          {isSignIn ? (
            <Text style={styles.semiTitle}>Sign in</Text>
          ) : (
            <Text style={styles.semiTitle}>Login</Text>
          )}
          <TextInput
            style={styles.input}
            onChangeText={setLoginEmail}
            placeholder="Login email"
            textContentType="emailAddress"
          />
          {isSignIn && (
            <TextInput
              style={styles.input}
              onChangeText={setUsername}
              placeholder="UserName"
            />
          )}
          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            secureTextEntry={true}
            textContentType="password"
            placeholder="Password"
          />
          {isSignIn && (
            <TextInput
              style={styles.input}
              onChangeText={setRepeatPassword}
              secureTextEntry={true}
              textContentType="password"
              placeholder="Repeat Password"
            />
          )}
          {errorMessage && (
            <Text style={styles.errorMessage}>{errorMessage}</Text>
          )}
          {isSignIn ? (
            <TouchableOpacity onPress={onSignIn} style={styles.button}>
              <View>
                <Text style={styles.buttonText}>S'inscrire</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={onLogin} style={styles.button}>
              <View>
                <Text style={styles.buttonText}>Se connecter</Text>
              </View>
            </TouchableOpacity>
          )}
          {isSignIn ? (
            <TouchableOpacity onPress={goToLogin} style={styles.lastbutton}>
              <View>
                <Text style={styles.lastButtonText}>
                  Déjà inscrit? Connectez-vous
                </Text>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={goToSignIn} style={styles.lastbutton}>
              <View>
                <Text style={styles.lastButtonText}>
                  Pas encore inscrit? Inscrivez-vous dès maintenant
                </Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  imageHeader: {
    width: 100,
    height: 100,
  },
  textTitle: {
    fontSize: 50,
  },
  semiTitle: {
    fontSize: 25,
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
  lastbutton: {
    alignItems: "center",
    backgroundColor: "white",
    height: 50,
    width: "100%",
    marginBottom: 50,
    justifyContent: "center",
    borderRadius: 50,
    margin: 5,
  },
  buttonText: {
    fontSize: 20,
  },
  lastButtonText: {
    fontSize: 15,
    color: "blue",
    textAlign: "center",
  },
  input: {
    height: 50,
    width: "100%",
    margin: 5,
    borderWidth: 1,
    borderRadius: 50,
    paddingLeft: 20,
  },
  errorMessage: {
    color: "red",
    textAlign: "center",
  },
});
