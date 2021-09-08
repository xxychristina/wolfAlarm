import React, { useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native";
import MapView from "react-native-maps";
import { TouchableOpacity } from "react-native";
import { Audio } from "expo-av";
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

const sound = new Audio.Sound();
sound.loadAsync(require("../sound/alarm.mp3"));
export default function HomeScreen({ navigation }) {
  const [alarmPlaying, setAlarmPlaying] = useState(false);
  const SOSPressHandler = () => {
    console.log("Total height = " + Dimensions.get("window").height);
    console.log("Reminding area = " + Dimensions.get("window").height * 0.25);
    console.log((Dimensions.get("window").height * 0.25) / 20);
    // TODO: Complete the SOS function
  };
  const AFPressHandler = async () => {
    // TODO: Complete the alarm and flash function
    if (alarmPlaying) {
      console.log("Stop");
      await sound.pauseAsync();
      setAlarmPlaying(false);
    } else {
      setAlarmPlaying(true);
      console.log("Playing sound");
      sound.setIsLoopingAsync(true);
      sound.setVolumeAsync(1);
      await sound.playAsync();
    }
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
      <View style={styles.grid}>
        <View style={styles.buttonGrid}>
          <TouchableOpacity style={styles.button} onPress={SOSPressHandler}>
            <Text style={styles.buttonText}>SOS</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={AFPressHandler}>
            <Text style={styles.buttonText}>Alarm/Flash</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.buttonGrid]}>
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
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    justifyContent: "center",
  },

  buttonText: {
    color: "#000",
    textAlign: "center",
    textAlignVertical: "center",
  },

  grid: {
    justifyContent: "space-around",
  },

  buttonGrid: {
    flexDirection: "row",
    width: "100%",
    margin: (Dimensions.get("window").height * 0.25) / 20,
    // flexGrow: 1,
    // marginTop: 20,
  },
});
