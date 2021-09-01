import React from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";

export default function Help({ navigation }) {
  return (
    <SafeAreaView>
      <Text>Help</Text>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  },

  qa: {},
});
