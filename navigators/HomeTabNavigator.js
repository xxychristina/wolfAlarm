import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

// Screens
import HomeScreen from "../screens/HomeScreen";
import MeScreen from "../screens/MeScreen";

const Tab = createMaterialBottomTabNavigator();
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

export default function HomeTabNavigator() {
  return (
    <Tab.Navigator
      activeColor="#4A5C72"
      screenOptions={{
        headerShown: false,
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
      <Tab.Screen
        name="AccountTab"
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
    </Tab.Navigator>
  );
}
