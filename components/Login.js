import React, { Component, useState } from "react";
import {
  Alert,
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

export class Login extends Component {
  // const [phoneNumber, setPhoneNumber] = useState(null);
  // const { signIn } = React.useContext(AuthContext);
  // findCoordinates = () => {
  //   navigator.geolocation.getCurrentPosition(
  //     (position) => {
  //       const location = JSON.stringify(position);
  //       this.setState({ location });
  //     },
  //     (error) => Alert.alert(error.message),
  //     { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
  //   );
  // };

  constructor(props) {
    super(props);

    this.state = {
      phoneNumber: "",
    };

    this.onLogin = this.onLogin.bind(this);
  }

  onLogin() {
    const { phoneNumber } = this.state;
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
            // onPress={() => {
            //   signIn(phoneNumber);
            // }}
            style={styles.loginButton}
          >
            <Text style={{ fontSize: 20 }}>Login</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

export default Login;

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
