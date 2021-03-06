import React from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";

export default function AlarmFlashScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Alarm/Flash</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  },

  text: {
    color: "#000",
    fontSize: 30,
  },
});
