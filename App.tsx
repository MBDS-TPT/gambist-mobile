import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { HomeScreen } from "./src/screens/HomeScreen";
import { LoginScreen } from "./src/screens/LoginScreen";

import { Provider } from "react-redux";
import { store } from "./src/redux";

import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { BetsScreen } from "./src/screens/BetsScreen";
import { QrScreen } from "./src/screens/QrScreen";
import { MatchDetailsScreen } from "./src/screens/MatchDetailsScreen";
import { SearchScreen } from "./src/screens/SearchScreen";
import { BetDetailsScreen } from "./src/screens/BetDetailsScreen";

const switchNavigator = createSwitchNavigator({
  loginStack: {
    screen: createStackNavigator(
      {
        login: LoginScreen,
      },
      {
        defaultNavigationOptions: {
          headerShown: false,
        },
      }
    ),
  },
  homeStack: createBottomTabNavigator({
    MATCH: {
      screen: createStackNavigator(
        {
          HomePage: HomeScreen,
          SearchPage: SearchScreen,
          MatchDetailsPage: {
            screen: MatchDetailsScreen,
            navigationOptions: {},
          },
        },
        {
          defaultNavigationOptions: {
            headerShown: false,
          },
        }
      ),
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => {
          let icon =
            focused == true
              ? require("./assets/icon.png")
              : require("./assets/favicon.png");
          return <Image source={icon} style={styles.imageIcon} />;
        },
      },
    },
    PARI: {
      screen: createStackNavigator(
        {
          BetsPage: BetsScreen,
          BetDetailsPage: BetDetailsScreen,
        },
        {
          defaultNavigationOptions: {
            headerShown: false,
          },
        }
      ),
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => {
          let icon =
            focused == true
              ? require("./assets/icon.png")
              : require("./assets/favicon.png");
          return <Image source={icon} style={styles.imageIcon} />;
        },
      },
    },
    QRCODE: {
      screen: createStackNavigator(
        {
          QrPage: QrScreen,
        },
        {
          defaultNavigationOptions: {
            headerShown: false,
          },
        }
      ),
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => {
          let icon =
            focused == true
              ? require("./assets/icon.png")
              : require("./assets/favicon.png");
          return <Image source={icon} style={styles.imageIcon} />;
        },
      },
    },
  }),
});

const AppNavigation = createAppContainer(switchNavigator);

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
}

const styles = StyleSheet.create({
  imageIcon: {
    width: 30,
    height: 30,
  },
});
