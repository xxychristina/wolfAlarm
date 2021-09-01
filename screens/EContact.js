import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import EmergencyContact from "../components/EmergencyContact";

export default function EContact({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <EmergencyContact />
      <EmergencyContact />
      <EmergencyContact />
      <EmergencyContact />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
