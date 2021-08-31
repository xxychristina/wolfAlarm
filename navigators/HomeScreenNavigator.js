import React from "react";
import { useFonts, Sofia_400Regular } from "@expo-google-fonts/sofia";
import { createStackNavigator } from "@react-navigation/stack";

// Screens
import HomeScreen from "../screens/HomeScreen";
import SOSScreen from "../screens/SOSScreen";
import AlarmFlashScreen from "../screens/AlarmFlashScreen";
import VoiceScreen from "../screens/VoiceScreen";
import VirtualCallScreen from "../screens/VirtualCallScreen";

const Stack = createStackNavigator();

export default function HomeScreenNavigator() {
  let [fontLoaded] = useFonts({
    Sofia_400Regular,
  });
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Wolf Alarm"
        component={HomeScreen}
        options={{
          headerStyle: { backgroundColor: "#4A5C72" },
          headerTitleStyle: {
            color: "white",
            fontFamily: "Sofia_400Regular",
          },
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="SOS"
        component={SOSScreen}
        options={{
          headerStyle: { backgroundColor: "#4A5C72" },
          headerTitleStyle: {
            color: "white",
            fontFamily: "Sofia_400Regular",
          },
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="Alarm/Flash"
        component={AlarmFlashScreen}
        options={{
          headerStyle: { backgroundColor: "#4A5C72" },
          headerTitleStyle: {
            color: "white",
            fontFamily: "Sofia_400Regular",
          },
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="Voice"
        component={VoiceScreen}
        options={{
          headerStyle: { backgroundColor: "#4A5C72" },
          headerTitleStyle: {
            color: "white",
            fontFamily: "Sofia_400Regular",
          },
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="VirtualCall"
        component={VirtualCallScreen}
        options={{
          headerStyle: { backgroundColor: "#4A5C72" },
          headerTitleStyle: {
            color: "white",
            fontFamily: "Sofia_400Regular",
          },
          headerTitleAlign: "center",
        }}
      />
    </Stack.Navigator>
  );
}
