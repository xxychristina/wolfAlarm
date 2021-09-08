import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native";
import MapView from "react-native-maps";
import { TouchableOpacity } from "react-native";
import BushMap from "../components/BushMap.js"
// import Torch from "react-native-torch";
// import RNImmediatePhoneCall from "react-native-immediate-phone-call";
// import AudioRecord from "react-native-audio-record";

const options = {
  sampleRate: 16000, // default 44100
  channels: 1, // 1 or 2, default 1
  bitsPerSample: 16, // 8 or 16, default 16
  audioSource: 6, // android only (see below)
  wavFile: "test.wav", // default 'audio.wav'
};

export default function HomeScreen({ navigation }) {
  const SOSPressHandler = () => {
    // TODO: Complete the SOS function
  };
  const AFPressHandler = () => {
    // TODO: Complete the alarm and flash function
  };
  const VoicePressHandler = () => {
    navigation.navigate("Voice");
  };
  const VirtualCallPressHandler = () => {
    navigation.navigate("VirtualCall");
  };

  return (
    <SafeAreaView style={styles.container}>
      <BushMap/>
      <View style={styles.buttonGrid}>
        <TouchableOpacity style={styles.button} onPress={SOSPressHandler}>
          <Text style={styles.buttonText}>SOS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
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
});
