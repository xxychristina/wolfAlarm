import React from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";

export default function MeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Me</Text>
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
