import React from "react";
import { useFonts, Sofia_400Regular } from "@expo-google-fonts/sofia";
import { createStackNavigator } from "@react-navigation/stack";

import MeScreen from "../screens/MeScreen";

const Stack = createStackNavigator();
const header = {
  headerStyle: { backgroundColor: "#4A5C72" },
  headerTitleStyle: {
    color: "white",
    fontFamily: "Sofia_400Regular",
  },
  headerTitleAlign: "center",
};

export default function MeScreenNavigator() {
  let [fontLoaded] = useFonts({
    Sofia_400Regular,
  });
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Me"
        component={MeScreen}
        options={fontLoaded && header}
      />
    </Stack.Navigator>
  );
}
