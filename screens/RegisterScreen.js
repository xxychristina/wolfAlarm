import React from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";

export default function RegisterScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Register</Text>
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
