import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  FlatList,
  ScrollView,
  Pressable,
  Animated,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Value } from "react-native-reanimated";
import AudioRecorder from "../components/AudioRecorder";
import SaveModal from "../components/SaveModal";
import { Audio } from "expo-av";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import Modal from "react-native-modal";

export default function VoiceScreen() {
  const DATA = [
    {
      id: "1",
      title: "First Item",
    },
    {
      id: "2",
      title: "Second Item",
    },
    {
      id: "3",
      title: "Third Item",
    },
    // {
    //   id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba67",
    //   title: "First Item",
    // },
    // {
    //   id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f6365",
    //   title: "Second Item",
    // },
    // {
    //   id: "58694a0f-3da1-471f-bd96-145571e29d72654",
    //   title: "Third Item",
    // },
    // {
    //   id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba21",
    //   title: "First Item",
    // },
    // {
    //   id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63435",
    //   title: "Second Item",
    // },
    // {
    //   id: "58694a0f-3da1-471f-bd96-145571e29d7245",
    //   title: "Third Item",
    // },
    // {

    //   id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba2",
    //   title: "First Item",
    // },
    // {
    //   id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f6343",
    //   title: "Second Item",
    // },
    // {
    //   id: "58694a0f-3da1-471f-bd96-145571e29d724",
    //   title: "Third Item",
    // },
    // {
    //   id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f6343h",
    //   title: "Second Item",
    // },
    // {
    //   id: "58694a0f-3da1-471f-bd96-145571e29d724h",
    //   title: "Third Item",
    // },
  ];
  const [settingState, setSettingState] = React.useState(false);

  var newData = DATA;
  var audioUri = 0;

  let handleClick = (id) => {
    // console.log(id);
    let selected = newData.map((val, i) => {
      if (val.id == id) {
        if (val.isSelected == null || val.isSelected == false) {
          return { ...val, isSelected: true };
        } else {
          return { ...val, isSelected: false };
        }
      } else {
        return val;
      }
    });
    newData = selected;
    console.log(newData);
  };

  const playAudio = async () => {
    const { sound } = await Audio.Sound.createAsync(
      { uri: audioUri },
      { shouldPlay: false }.uri
    );
    setSound(sound);
    setPlaying(true);
    console.log("Playing Sound");
    await sound.playAsync();
  };

  let Item = ({ title, index, id }) => (
    <View style={settingState ? styles.listItemC : styles.listItem}>
      <View style={styles.dot}>
        <Text style={{ textAlign: "center" }}>{index}. </Text>
      </View>
      <TouchableOpacity style={styles.voiceButton}>
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
      <BouncyCheckbox
        size={25}
        fillColor="#D9AEA8"
        unfillColor="#FFFFFF"
        iconStyle={{ borderColor: "#D9AEA8" }}
        style={
          settingState
            ? { display: "flex", marginLeft: 5 }
            : { display: "none" }
        }
        onPress={() => handleClick(id)}
      ></BouncyCheckbox>
    </View>
  );

  const editIcon = (
    <TouchableOpacity>
      <MaterialCommunityIcons
        style={{
          alignSelf: "flex-end",
          marginRight: "6%",
          marginTop: 15,
          position: "relative",
        }}
        name="circle-edit-outline"
        size={26}
        onPress={() => {
          setSettingState(!settingState);
        }}
      ></MaterialCommunityIcons>
    </TouchableOpacity>
  );

  const deleteIcon = (
    <TouchableOpacity>
      <MaterialCommunityIcons
        style={{
          alignSelf: "flex-end",
          marginRight: "6%",
          marginTop: 15,
          position: "relative",
        }}
        name="delete-outline"
        size={26}
        onPress={() => {
          setSettingState(!settingState);
        }}
      ></MaterialCommunityIcons>
    </TouchableOpacity>
  );

  let Eicon = settingState ? deleteIcon : editIcon;

  // audio record function
  const [showAudio, setsShowAudio] = React.useState(false);
  const [showSave, setSaveModal] = React.useState(false);

  const [recording, setRecording] = React.useState();
  const [audio, setAudio] = React.useState();

  const _onLongPress = async () => {
    try {
      setsShowAudio(true);
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      await recording.startAsync();
      setRecording(recording);
      console.log("Recording Start");
    } catch (err) {
      console.error(err);
    }
  };
  React.useEffect(() => {
    (async () => {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
    })();
  }, []);

  const _onPressout = async () => {
    try {
      if (!!recording) {
        console.log("Stopping recording..");
        setsShowAudio(false);
        setRecording(undefined);
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        setAudio({
          uri: { uri },
        });
        console.log(uri);
      }
    } catch (err) {
      console.error("error from stop recordint" + err);
    }
  };

  const saveAudio = () => {
    //TODO: SAVE
    console.log("save");
    setSaveModal(false);
  };

  const unshowSave = () => {
    setSaveModal(false);
  };

  const checkTime = (time, elapsedTime) => {
    if (time == 0 && !!recording) {
      _onPressout();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {Eicon}
      <View style={styles.list}>
        <FlatList
          data={DATA}
          renderItem={({ item, index }) => (
            <Item title={item.title} index={index + 1} id={item.id} />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
      <>
        <AudioRecorder
          recording={!!recording}
          _onLongPress={_onLongPress}
          _onPressout={_onPressout}
          showModal={showAudio}
          _onModalHide={() => {
            setSaveModal(true);
          }}
        ></AudioRecorder>
        <SaveModal
          isVisible={showSave}
          saveEvent={saveAudio}
          toggle={unshowSave}
        ></SaveModal>
      </>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    // justifyContent: "center",
    // alignContent: "center"
  },
  list: {
    flexDirection: "column",
    width: "95%",
    height: "85%",
    marginBottom: 10,
    marginLeft: 10,
    // flex:1
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 60,
  },
  listItemC: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
    height: 60,
  },
  voiceButton: {
    backgroundColor: "#D5E3EC",
    marginVertical: 8,
    borderRadius: 10,
    paddingLeft: 6,
    paddingVertical: 15,
    width: "70%",
  },
  recordButton: {
    backgroundColor: "#D5E3EC",
    marginBottom: 20,
    borderRadius: 10,
    paddingVertical: 5,
    justifyContent: "center",
    width: "80%",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  dot: {
    backgroundColor: "#C4C4C4",
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 20,
    justifyContent: "center",
  },
  text: {
    color: "#000",
    fontSize: 14,
    textAlignVertical: "center",
    textAlign: "center",
  },
  editor: {
    backgroundColor: "#ffff",
    height: "10%",
    // bottom: 0,
    position: "absolute",
    flexDirection: "row",
  },
  editTool: {
    flexDirection: "column",
  },
  ecordButton: {
    backgroundColor: "#D5E3EC",
    marginBottom: 20,
    borderRadius: 10,
    paddingVertical: 5,
    justifyContent: "center",
    width: "80%",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  modalContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  textBox: {
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 30,
    marginTop: 50,
  },
});
