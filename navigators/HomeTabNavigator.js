import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { useFonts, Sofia_400Regular } from "@expo-google-fonts/sofia";

// Screens
import HomeScreen from "../screens/HomeScreen";
import MeScreen from "../screens/MeScreen";

const Tab = createMaterialBottomTabNavigator();

export default function HomeTabNavigator({ navigation }) {
  let [fontLoaded] = useFonts({
    Sofia_400Regular,
  });
  return (
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
