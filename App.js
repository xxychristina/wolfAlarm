import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

// Navigators
import HomeScreenNavigator from "./navigators/HomeScreenNavigator";
import MeScreenNavigator from "./navigators/MeScreenNavigator";

const Tab = createBottomTabNavigator();

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
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          gestureDirection: "horizontal",
          transitionSpec: {
            open: config,
            close: config,
          },
          showIcon: true,
        }}
      >
        <Tab.Screen
          name="HomeScreenNavigator"
          component={HomeScreenNavigator}
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
          name="MeScreenNavigator"
          component={MeScreenNavigator}
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
    </NavigationContainer>
  );
}
