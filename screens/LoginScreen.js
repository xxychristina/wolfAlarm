import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// Components
import { AuthContext } from "../components/Context";

export default function LoginScreen() {
  const [phoneNumber, setPhoneNumber] = useState(null);
  const { signIn } = React.useContext(AuthContext);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.loginView}>
        {/* TODO: change username to phone number and link API */}
        <View style={styles.usernameView}>
          <TextInput
            style={styles.usernameInput}
            onSubmitEditing={(event) => {
              setPhoneNumber(event.nativeEvent.text);
              console.log(event.nativeEvent.text);
            }}
            placeholder=" Username"
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            signIn(phoneNumber);
          }}
          style={styles.loginButton}
        >
          <Text style={{ fontSize: 20 }}>Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  loginView: {
    marginTop: 90,
    backgroundColor: "#C4C4C4",
    width: "70%",
    height: "70%",
    borderRadius: 20,
    justifyContent: "space-evenly",
  },

  loginButton: {
    width: "100%",
    height: "10%",
    backgroundColor: "yellow",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },

  usernameView: {
    height: 40,
    backgroundColor: "azure",
    fontSize: 20,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  usernameInput: {
    width: "90%",
  },
});
