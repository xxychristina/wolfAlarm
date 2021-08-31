import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native";
import MapView from "react-native-maps";
import { TouchableOpacity } from "react-native";

export default function HomeScreen({ navigation }) {
  const SOSPressHandler = () => {
    navigation.navigate("SOS");
  };

  return (
    <SafeAreaView style={styles.container}>
      <MapView style={styles.map} />
      <View style={styles.buttonGrid}>
        <TouchableOpacity style={styles.button} onPress={SOSPressHandler}>
          <Text style={styles.buttonText}>SOS</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => console.log("Alarm/Flash")}
        >
          <Text style={styles.buttonText}>Alarm/Flash</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonGrid}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => console.log("Voice")}
        >
          <Text style={styles.buttonText}>Voice</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => console.log("Virtual Call")}
        >
          <Text style={styles.buttonText}>Virtual Call</Text>
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
    height: "68%",
  },

  heading: {
    color: "#fff",
    fontFamily: "Sofia_400Regular",
    fontSize: 20,
  },

  headerContainer: {
    backgroundColor: "#4A5C72",
  },

  button: {
    backgroundColor: "#D5E3EC",
    padding: 19,
    borderRadius: 10,
    width: 150,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: { width: 1, height: 13 },
    marginHorizontal: 20,
  },

  buttonText: {
    color: "#000",
    textAlign: "center",
    textAlignVertical: "center",
  },

  buttonGrid: {
    flexDirection: "row",
    marginVertical: 10,
  },
});
