import React, { useContext, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { AuthContext } from "../components/Context";
import * as Animatable from "react-native-animatable";
import { useIsFocused } from "@react-navigation/core";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

// Background Image
import Welcome from "../assets/Welcome.png";

export default function ForgotPasswordScreen({ navigation }) {
  const isFocused = useIsFocused();
  const [email, setEmail] = useState(null);

  const { forgotPassword } = useContext(AuthContext);

  const SendHandler = (email) => {
    forgotPassword(email);
  };

  const BackHandler = () => {
    navigation.navigate("Login");
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null}>
      <ImageBackground source={Welcome} style={styles.backgroundImg}>
        <SafeAreaView style={styles.container}>
          {isFocused && (
            <Animatable.View animation="fadeInUpBig" style={styles.footer}>
              <MaterialCommunityIcons
                name="alert-circle-outline"
                color="lightgreen"
                size={25}
                style={{ marginBottom: 10 }}
              />
              <Text style={{ color: "black", marginBottom: 20 }}>
                Please input your email below so we can send you a reset
                password email.
              </Text>
              <Text style={styles.text_footer}>E-mail</Text>
              <View style={styles.action}>
                <TextInput
                  editable={true}
                  placeholder="Your email"
                  style={styles.textinput}
                  onChangeText={(email) => {
                    setEmail(email);
                  }}
                />
              </View>
              <View style={styles.buttonGrid}>
                <TouchableOpacity
                  style={styles.SendButton}
                  onPress={() => {
                    SendHandler(email);
                  }}
                >
                  <Text style={[styles.buttonText, { color: "white" }]}>
                    Send
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.BackButton}
                  onPress={() => {
                    BackHandler();
                  }}
                >
                  <Text style={styles.buttonText}>Back</Text>
                </TouchableOpacity>
              </View>
            </Animatable.View>
          )}
        </SafeAreaView>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    flexDirection: "column",
  },

  backgroundImg: {
    backgroundColor: "#C4C4C4",
    width: "100%",
    height: "100%",
  },

  footer: {
    width: "100%",
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },

  text_footer: {
    color: "#000",
    fontSize: 18,
  },

  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },

  textinput: {
    flex: 1,
    paddingLeft: 10,
    color: "#05375a",
  },

  buttonGrid: {
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },

  SendButton: {
    backgroundColor: "#6495ed",
    padding: 15,
    borderRadius: 100,
    width: 325,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: { width: 1, height: 13 },
    alignItems: "center",
  },

  BackButton: {
    backgroundColor: "#D5E5EC",
    padding: 15,
    borderRadius: 100,
    width: 325,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: { width: 1, height: 13 },
    marginTop: 20,
    alignItems: "center",
  },

  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});
