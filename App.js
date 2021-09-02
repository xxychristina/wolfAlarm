import React from "react";
import { NavigationContainer, useRoute } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useFonts, Sofia_400Regular } from "@expo-google-fonts/sofia";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { TouchableOpacity } from 'react-native';
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

// const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const header = {
  headerStyle: { backgroundColor: "#4A5C72" },
  headerTitleStyle: {
    color: "white",
    fontFamily: "Sofia_400Regular",
  },
  headerTitleAlign: "center",
};
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

// View -> UIView
export default function App() {
  let [fontLoaded] = useFonts({
    Sofia_400Regular,
  });

  return (
    <NavigationContainer>
      <Stack.Navigator>
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
  );
}
