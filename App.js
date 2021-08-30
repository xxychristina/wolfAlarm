import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Header } from "react-native-elements/dist/header/Header";
import { SafeAreaView } from "react-native";
import MapView from "react-native-maps";
import { useFonts, Sofia_400Regular } from "@expo-google-fonts/sofia";
import { TouchableNativeFeedback } from "react-native";

// Component
// import WolfAlarmHeader from "./components/Header/WolfAlarmHeader";

// View -> UIView
export default function App() {
  let [fontLoaded] = useFonts({
    Sofia_400Regular,
  });
  return (
    <SafeAreaView style={styles.container}>
    {fontLoaded && (
      <Header
        centerComponent={{
          text: "Wolf Alarm",
          style: styles.heading,
        }}
        containerStyle={styles.headerContainer}
      />
    )}
      <MapView style={styles.map} />
      <TouchableNativeFeedback onPress={() => console.warn("Hello")}>
        <View style={styles.sosButton}>
          <Text>SOS</Text>
        </View>
      </TouchableNativeFeedback>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "#f8f8f8",
    alignItems: "center",
    justifyContent: "flex-start",
  },

  map: {
    width: "100%",
    height: "50%",
  },

  heading: {
    color: "#fff",
    fontFamily: "Sofia_400Regular",
    fontSize: 20,
  },

  headerContainer: {
    flexDirection: "row",
    backgroundColor: "#4A5C72",
  },

  sosButton: {
    position: "absolute",
    top: 600,
  },
});
