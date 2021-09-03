import React from "react";
import { StyleSheet, Text, ToolbarAndroidBase, View, TouchableOpacity } from "react-native";
import { NavigationContainer, useRoute } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useFonts, Sofia_400Regular } from "@expo-google-fonts/sofia";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

// Screens
import SOSScreen from "./screens/SOSScreen";
import AlarmFlashScreen from "./screens/AlarmFlashScreen";
import VoiceScreen from "./screens/VoiceScreen";
import VirtualCallScreen from "./screens/VirtualCallScreen";
import EContact from "./screens/EContact";
import Help from "./screens/Help";

// Navigators
import HomeTabNavigator from "./navigators/HomeTabNavigator";
import GetStartedNavigator from "./navigators/GetStartedNavigator";

// Components
import { AuthContext } from "./components/Context";
import { ActivityIndicator } from "react-native-paper";
import { useEffect } from "react";

import * as firebase from "firebase";
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

const Stack = createStackNavigator();
const header = {
  headerStyle: { backgroundColor: "#4A5C72" },
  headerTitleStyle: {
    color: "white",
    fontFamily: "Sofia_400Regular",
  },
  headerTitleAlign: "center",
};

// View -> UIView
export default function App() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(null);

  const initialLoginState = {
    isLoading: true,
    userName: null,
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
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case "LOGOUT":
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case "REGISTER":
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState
  );

  const authContext = React.useMemo(() => ({
    signIn: (userName) => {
      let userToken = null;
      if (userName == "123") {
        userToken = "saoidkjfowe";
      } else {
        console.log("Wrong password");
      }
      dispatch({ type: "LOGIN", id: userName, token: userToken });
    },
    signOut: () => {
      dispatch({ type: "LOGOUT" });
    },
  }));

  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 1000);
  // }, []);

  // if (isLoading) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
  //       <ActivityIndicator size="large" />
  //     </View>
  //   );
  // }

  let [fontLoaded] = useFonts({
    Sofia_400Regular,
  });

  const inviteButton = {
    headerStyle: { backgroundColor: "#4A5C72" },
    headerTitleStyle: {
      color: "white",
      fontFamily: "Sofia_400Regular",
    },
    headerTitleAlign: "center",
    headerRight: ()=>(
      <TouchableOpacity style={{alignSelf: "flex-end", paddingRight: 20}}>
      <MaterialCommunityIcons
        size={26}
        name="account-multiple-plus-outline"
      ></MaterialCommunityIcons>
    </TouchableOpacity>
    )
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {loginState.userToken == null ? (
            <Stack.Screen
              name="Start"
              component={GetStartedNavigator}
              options={{ headerShown: false }}
            />
          ) : (
            <Stack.Screen
              name="Wolf Alarm"
              component={HomeTabNavigator}
              options={({ route }) => {
                const routeName =
                  getFocusedRouteNameFromRoute(route) ?? "Wolf Alarm";
                switch (routeName) {
                  case "HomeTab": {
                    return header;
                  }
                  case "AccountTab": {
                    return { headerShown: false };
                  }
                }
              }}
            />
          )}
          <Stack.Screen
            name="SOS"
            component={SOSScreen}
            options={fontLoaded && header}
          />
          <Stack.Screen
            name="Alarm/Flash"
            component={AlarmFlashScreen}
            options={fontLoaded && header}
          />
          <Stack.Screen
            name="Voice"
            component={VoiceScreen}
            options={fontLoaded && header}
          />
          <Stack.Screen
            name="VirtualCall"
            component={VirtualCallScreen}
            options={fontLoaded && header}
          />
          <Stack.Screen
            name="Emergency Contact"
            component={EContact}
            options={fontLoaded && inviteButton}
          />
          <Stack.Screen
            name="Help"
            component={Help}
            options={fontLoaded && header}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
