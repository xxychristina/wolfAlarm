import React, { Component, useState } from "react";
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

import firebase from "firebase";

export class Register extends Component {
  // const [phoneNumber, setPhoneNumber] = useState(null);
  // const { signIn } = React.useContext(AuthContext);
  constructor(props) {
    super(props);

    this.state = {
      phoneNumber: "",
    };

    this.onRegister = this.onRegister.bind(this);
  }

  onRegister() {
    const { phoneNumber } = this.state;
    firebase
      .firestore()
      .collection("users")
      .doc("sdoringboeurfh")
      .set({ phoneNumber });
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loginView}>
          {/* TODO: change username to phone number and link API */}
          <View style={styles.usernameView}>
            <TextInput
              style={styles.usernameInput}
              onChangeText={(phoneNumber) => {
                this.setState({ phoneNumber });
                console.log(phoneNumber);
              }}
              placeholder=" Username"
            />
          </View>
          <TouchableOpacity
            onPress={this.onRegister}
            style={styles.loginButton}
          >
            <Text style={{ fontSize: 20 }}>Register</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

export default Register;

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
