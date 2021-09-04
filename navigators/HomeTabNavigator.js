import React, { useState, useEffect, useMemo, useReducer } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { ActivityIndicator } from "react-native-paper";
import { View } from "react-native";
import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyAgtcJ6QegU_wgbGP_9tUB7GA39CP-0n0E",
  authDomain: "wolf-alarm.firebaseapp.com",
  projectId: "wolf-alarm",
  storageBucket: "wolf-alarm.appspot.com",
  messagingSenderId: "329230643226",
  appId: "1:329230643226:web:c0ee25c14bc21c4559a1a3",
  measurementId: "G-H19FZ2P52V",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

// Screens
import HomeScreen from "../screens/HomeScreen";
import MeScreen from "../screens/MeScreen";

// Components
import { AuthContext } from "../components/Context";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import MeTabNavigator from "./MeTabNavigator";

const Tab = createMaterialBottomTabNavigator();

export default function HomeTabNavigator() {
  const [isLoading, setIsLoading] = useState(false);
  // const [email, setEmail] = useState("test@gmail.com");
  const [email, setEmail] = useState(null);

  const [password, setPassword] = useState("1234");

  const [loggedIn, setLoggedIn] = useState(false);

  const initialLoginState = {
    isLoading: true,
    email: null,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case "RETRIEVE_TOKEN":
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case "LOGIN":
        return {
          ...prevState,
          email: action.email,
          userToken: action.token,
          isLoading: false,
        };
      case "LOGOUT":
        return { ...prevState, email: null, userToken: null, isLoading: false };
      case "REGISTER":
        return {
          ...prevState,
          email: action.email,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

  const authContext = useMemo(() => ({
    login: (email, password) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((result) => {
          console.log(result);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    logout: () => {
      firebase
        .auth()
        .signOut()
        .then(() => console.log("user sign out"));
    },
    register: (email, phone, password) => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((result) => {
          console.log(result);
          firebase
            .firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid)
            .set({ email, phone });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  }));

  // useEffect(() => {
  //   setTimeout(() => {
  //     dispatch({ type: "RETRIEVE_TOKEN", token: "123" });
  //   }, 1000);
  // }, []);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        setLoggedIn(false);
        console.log("loggedIn " + loggedIn);
      } else {
        setLoggedIn(true);
        console.log("loggedIn " + loggedIn);
      }
    });
  });

  // if (loginState.isLoading) {
  //   // console.log(initialLoginState.isLoading);
  //   return (
  //     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
  //       <ActivityIndicator size="large" />
  //     </View>
  //   );
  // }

  return (
    <AuthContext.Provider value={authContext}>
      <Tab.Navigator
        activeColor="#4A5C72"
        screenOptions={{
          showIcon: true,
        }}
        barStyle={{ backgroundColor: "#fff" }}
      >
        <Tab.Screen
          name="HomeTab"
          component={HomeScreen}
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="home"
                color={color}
                size={26}
              ></MaterialCommunityIcons>
            ),
          }}
        ></Tab.Screen>
        {loggedIn ? (
          <Tab.Screen
            name="MeTab"
            component={MeScreen}
            options={{
              title: "Me",
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons
                  name="account"
                  color={color}
                  size={26}
                ></MaterialCommunityIcons>
              ),
            }}
          ></Tab.Screen>
        ) : (
          <Tab.Screen
            name="MeTab"
            component={MeTabNavigator}
            options={{
              title: "Me",
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons
                  name="account"
                  color={color}
                  size={26}
                ></MaterialCommunityIcons>
              ),
            }}
          ></Tab.Screen>
        )}
      </Tab.Navigator>
    </AuthContext.Provider>
  );
}
