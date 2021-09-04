import React, { useContext, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Input } from "react-native-elements";
import { AuthContext } from "../components/Context";

export default function WelcomeScreen() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const { login, register } = useContext(AuthContext);

  const LoginHandler = (email) => {
    // navigation.navigate("Login");
    login(email);
  };

  const RegisterHandler = (email) => {
    register(email);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.backgroundImg}>
        <Text>Background</Text>
      </View> */}
      <Input
        placeholder="Email"
        onChangeText={(email) => {
          setData({ email: email });
        }}
      />
      <View style={styles.buttonGrid}>
        <TouchableOpacity
          style={styles.LoginButton}
          onPress={() => {
            LoginHandler(data.email);
          }}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.LoginButton}
          onPress={() => {
            RegisterHandler(data.email);
          }}
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-end",
    alignItems: "center",
    flexDirection: "column",
  },

  backgroundImg: {
    backgroundColor: "#C4C4C4",
    width: "100%",
    height: "90%",
  },

  buttonGrid: {
    width: "100%",
    alignItems: "center",
    height: "30%",
  },

  LoginButton: {
    width: "100%",
    height: "50%",
    backgroundColor: "#D2D2D2",
    backgroundColor: "yellow",
    alignItems: "center",
  },

  buttonText: {
    alignItems: "center",
    fontSize: 20,
  },
});
