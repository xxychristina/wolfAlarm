import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native";
import MapView from "react-native-maps";
import { TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MeScreen from "./MeScreen";

const Tab = createBottomTabNavigator();

export default function HomeScreen({ navigation }) {
  const SOSPressHandler = () => {
    navigation.navigate("SOS");
  };
  const AFPressHandler = () => {
    navigation.navigate("Alarm/Flash");
  };
  const VoicePressHandler = () => {
    navigation.navigate("Voice");
  };
  const VirtualCallPressHandler = () => {
    navigation.navigate("VirtualCall");
  };

  return (
    <SafeAreaView style={styles.container}>
      <MapView style={styles.map} />
      <View style={styles.buttonGrid}>
        <TouchableOpacity style={styles.button} onPress={SOSPressHandler}>
          <Text style={styles.buttonText}>SOS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={AFPressHandler}>
          <Text style={styles.buttonText}>Alarm/Flash</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonGrid}>
        <TouchableOpacity style={styles.button} onPress={VoicePressHandler}>
          <Text style={styles.buttonText}>Voice</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={VirtualCallPressHandler}
        >
          <Text style={styles.buttonText}>Virtual Call</Text>
        </TouchableOpacity>
      </View>
      {/* <View style={styles.footerGrid}>
        <TouchableOpacity style={styles.footerButton}>
          <Text style={styles.buttonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Text style={styles.buttonText}>Me</Text>
        </TouchableOpacity>
      </View> */}
      {/* <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Me" component={MeScreen} />
      </Tab.Navigator> */}
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
    height: "75%",
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

  footerGrid: {
    flexDirection: "row",
  },

  footerButton: {
    flex: 0.5,
    backgroundColor: "yellow",
  },
});