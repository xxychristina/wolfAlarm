import React, { useContext, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  Dimensions,
  TextInput,
} from "react-native";
import { AuthContext } from "../components/Context";
import * as Animatable from "react-native-animatable";
import { useIsFocused } from "@react-navigation/core";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

// Background Image
import Welcome from "../assets/Welcome.png";

const { width, height } = Dimensions.get("window");

export default function RegisterScreen({ navigation }) {
  const isFocused = useIsFocused();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [name, setName] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [phone, setPhone] = useState(null);

  const { register } = useContext(AuthContext);

  const BackHandler = () => {
    navigation.navigate("Login");
  };

  const RegisterHandler = (email, phone, password) => {
    register(email, phone, password);
  };

  const ShowPasswordHandler = () => {
    if (showPassword) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
  };

  return (
    <ImageBackground source={Welcome} style={styles.backgroundImg}>
      <SafeAreaView style={styles.container}>
        {isFocused && (
          <Animatable.View animation="fadeInUpBig" style={styles.footer}>
            <Text style={styles.text_footer}>E-mail</Text>
            <View style={styles.action}>
              <MaterialCommunityIcons
                name="account-outline"
                color="#4A5C72"
                size={25}
              />
              <TextInput
                placeholder="Your email"
                style={styles.textinput}
                onChangeText={(email) => {
                  setEmail(email);
                }}
              />
            </View>
            <Text style={[styles.text_footer, { marginTop: 20 }]}>
              Phone number
            </Text>
            <View style={styles.action}>
              <MaterialCommunityIcons
                name="phone-outline"
                color="#4A5C72"
                size={25}
              />
              <TextInput
                placeholder="Your phone number"
                style={styles.textinput}
                onChangeText={(phone) => {
                  setPhone(phone);
                }}
              />
            </View>
            <Text style={[styles.text_footer, { marginTop: 20 }]}>Name</Text>
            <View style={styles.action}>
              <MaterialCommunityIcons
                name="pencil-outline"
                color="#4A5C72"
                size={25}
              />
              <TextInput
                placeholder="Your name"
                style={styles.textinput}
                onChangeText={(name) => {
                  setName(name);
                }}
              />
            </View>
            <Text style={[styles.text_footer, { marginTop: 20 }]}>
              Password
            </Text>
            <View style={styles.action}>
              <MaterialCommunityIcons
                name="lock-outline"
                color="#4A5C72"
                size={25}
              />
              <TextInput
                placeholder="Your password"
                style={styles.textinput}
                onChangeText={(password) => {
                  setPassword(password);
                }}
              />
              <TouchableOpacity onPress={ShowPasswordHandler}>
                {showPassword ? (
                  <MaterialCommunityIcons
                    name="eye-off"
                    color="gray"
                    size={25}
                  />
                ) : (
                  <MaterialCommunityIcons
                    name="eye"
                    color="#4169e1"
                    size={25}
                  />
                )}
              </TouchableOpacity>
            </View>
            <Text style={[styles.text_footer, { marginTop: 20 }]}>
              Confirm Password
            </Text>
            <View style={styles.action}>
              <MaterialCommunityIcons
                name="lock-outline"
                color="#4A5C72"
                size={25}
              />
              <TextInput
                placeholder="Confirm password"
                style={styles.textinput}
                onChangeText={(confirmPassword) => {
                  setConfirmPassword(confirmPassword);
                }}
              />
              <TouchableOpacity onPress={ShowPasswordHandler}>
                {showPassword ? (
                  <MaterialCommunityIcons
                    name="eye-off"
                    color="gray"
                    size={25}
                  />
                ) : (
                  <MaterialCommunityIcons
                    name="eye"
                    color="#4169e1"
                    size={25}
                  />
                )}
              </TouchableOpacity>
            </View>
            <View style={styles.buttonGrid}>
              <TouchableOpacity
                style={styles.RegisterButton}
                onPress={() => {
                  // console.log("This is " + data.email);
                  console.log(email);
                  RegisterHandler(email, phone, password);
                }}
              >
                <Text style={[styles.buttonText, { color: "white" }]}>
                  Register
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

  RegisterButton: {
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
  },
});
