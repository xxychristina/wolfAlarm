import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Navigators
import HomeScreenNavigator from "./navigators/HomeScreenNavigator";
import MeScreenNavigator from "./navigators/MeScreenNavigator";

const Tab = createBottomTabNavigator();

// View -> UIView
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen
          name="HomeScreenNavigator"
          component={HomeScreenNavigator}
        ></Tab.Screen>
        <Tab.Screen
          name="MeScreenNavigator"
          component={MeScreenNavigator}
        ></Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
