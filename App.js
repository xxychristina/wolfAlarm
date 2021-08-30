import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Header } from "react-native-elements/dist/header/Header";
import { SafeAreaView } from "react-native";
import MapView from "react-native-maps";
import { useFonts, Sofia_400Regular } from "@expo-google-fonts/sofia";
import { TouchableNativeFeedback } from "react-native";
import { TouchableHighlight } from "react-native";
import { TouchableOpacity } from "react-native";

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
      <View style={styles.buttonGrid}>
        <TouchableOpacity
          style={styles.sosButton}
          onPress={() => console.log("SOS")}
        >
          <Text style={styles.sosText}>SOS</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.sosButton}
          onPress={() => console.log("Alarm/Flash")}
        >
          <Text style={styles.sosText}>Alarm/Flash</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonGrid}>
        <TouchableOpacity
          style={styles.sosButton}
          onPress={() => console.log("Voice")}
        >
          <Text style={styles.sosText}>Voice</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.sosButton}
          onPress={() => console.log("Virtual Call")}
        >
          <Text style={styles.sosText}>Virtual Call</Text>
        </TouchableOpacity>
      </View>
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
    height: "62%",
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
    backgroundColor: "#D5E3EC",
    padding: 19,
    borderRadius: 10,
    width: 100,
    flex: 1,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: { width: 1, height: 13 },
  },

  sosText: {
    color: "#000",
    textAlign: "center",
    textAlignVertical: "center",
  },

  buttonGrid: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-between",
  },
});
