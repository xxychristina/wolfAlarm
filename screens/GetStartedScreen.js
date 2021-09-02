import React from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function GetStartedScreen({ navigation }) {
  const LoginHandler = () => {
    navigation.navigate("Login");
  };
  const RegisterHandler = () => {
    navigation.navigate("Register");
  };
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Place holder for image</Text>
      </View>
      <View style={styles.bottomGrid}>
        <TouchableOpacity onPress={LoginHandler}>
          <LinearGradient
            start={[0, 0.5]}
            end={[1, 0.5]}
            colors={["#EFBB35", "#4AAE9B"]}
            style={{ borderRadius: 5 }}
          >
            <View style={styles.circleGradient}>
              <Text style={styles.text}>Login</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity onPress={RegisterHandler}>
          <LinearGradient
            start={[0, 0.5]}
            end={[1, 0.5]}
            colors={["#EFBB35", "#4AAE9B"]}
            style={{ borderRadius: 5 }}
          >
            <View style={styles.circleGradient}>
              <Text style={styles.text}>Register</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
  },

  circleGradient: {
    margin: 1,
    backgroundColor: "white",
    borderRadius: 5,
  },

  bottomGrid: {
    width: "100%",
  },

  text: {
    margin: 4,
    paddingHorizontal: 10,
    paddingVertical: 10,
    textAlign: "center",
    backgroundColor: "white",
    color: "#008f68",
    fontSize: 20,
  },
});
