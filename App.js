import React from "react";
import { useFonts, Sofia_400Regular } from "@expo-google-fonts/sofia";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Screens
import HomeScreen from "./screens/HomeScreen";
import SOSScreen from "./screens/SOSScreen";

const Stack = createStackNavigator();

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
        <Stack.Screen name="SOS" component={SOSScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
