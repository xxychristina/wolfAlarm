import React, { useState, useEffect, useMemo, useReducer } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { LogBox } from "react-native";
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
import MeTabNavigator from "./MeTabNavigator";

const Tab = createMaterialBottomTabNavigator();
LogBox.ignoreLogs(["Setting a timer"]);
export default function HomeTabNavigator() {
  const [loggedIn, setLoggedIn] = useState(false);

  const authContext = useMemo(() => ({
    login: (email, password) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        // .then((result) => {
        //   console.log(result);
        // })
        .catch((error) => {
          alert(error);
        });
    },
    logout: () => {
      firebase
        .auth()
        .signOut()
        .then(() => console.log("user sign out"));
    },
    register: (id, name, phone, email, avatar, password) => {
      console.log("Here " + password);
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          firebase
            .firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid)
            .set({ id, name, phone, email, avatar });
        })
        .catch((error) => {
          alert(error);
        });
    },
    forgotPassword: (email) => {
      firebase
        .auth()
        .sendPasswordResetEmail(email)
        .then(() => {
          alert("Please check your email...");
        })
        .catch((error) => {
          alert(error);
        });
    },
    updateUserProfile: (firebaseID, name, phone, avatar) => {
      firebase
        .firestore()
        .collection("users")
        .doc(firebaseID)
        .update({ name: name, phone: phone, avatar: avatar })
        .catch((error) => {
          alert(error);
        });
    },
  }));

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
