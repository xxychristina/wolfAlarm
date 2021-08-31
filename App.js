import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { useFonts, Sofia_400Regular } from "@expo-google-fonts/sofia";

// Screens
import HomeScreen from "./screens/HomeScreen";
import SOSScreen from "./screens/SOSScreen";
import AlarmFlashScreen from "./screens/AlarmFlashScreen";
import VoiceScreen from "./screens/VoiceScreen";
import VirtualCallScreen from "./screens/VirtualCallScreen";

// Navigators
import HomeScreenNavigator from "./navigators/HomeScreenNavigator";
import MeScreenNavigator from "./navigators/MeScreenNavigator";
import HomeTabNavigator from "./navigators/HomeTabNavigator";

// const Tab = createBottomTabNavigator();
const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();
const header = {
  headerStyle: { backgroundColor: "#4A5C72" },
  headerTitleStyle: {
    color: "white",
    fontFamily: "Sofia_400Regular",
  },
  headerTitleAlign: "center",
};

const config = {
  animation: "spring",
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

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
          options={fontLoaded && header}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
