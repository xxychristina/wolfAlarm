import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import AudioRecorder from "../components/AudioRecorder";
import SaveModal from "../components/SaveModal";
import { Audio } from "expo-av";
import firebase from "firebase";

export default function VoiceScreen() {
  const [settingState, setSettingState] = React.useState(false);
  const [voiceList, setVoiceList] = React.useState();
  const [sound, setSound] = React.useState();
  
  const getVoiceList = async () => {
    let userId = firebase.auth().currentUser.uid;
    var vList = []
    const snapshot =  await firebase
          .firestore()
          .collection('users')
          .doc(userId)
          .collection('voices')
          .get()
    
    snapshot.forEach((doc) => {
      vList.push(doc.data())
    });
    setVoiceList(vList)
  }

 React.useEffect(()=> {
    getVoiceList()
  }, [])

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

  const playAudio = async (uri) => {
    const { sound } = await Audio.Sound.createAsync(
      { uri: uri },
    );
    setSound(sound)
    console.log('Playing Sound');
    await sound.playAsync();
  }


  let Item = ({ title, index, id }) => (
    <View style={settingState ? styles.listItemC : styles.listItem}>
      <View style={styles.dot}>
        <Text style={{ textAlign: "center" }}>{index}. </Text>
      </View>
      <TouchableOpacity style={styles.voiceButton} onPress={()=>{playAudio(id)}}>
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
  const [audioLink, setAudioLink] = React.useState();
  const [note, setNote] = React.useState();
  
  const unshowSave = () => {
    setSaveModal(false);
  };
  
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
            playsInSilentModeIOS: true
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
        setAudioLink(uri)
        console.log(uri)
      }
    } catch (err) {
      console.error("error from stop recordint" + err);
    }
  }

  //firebase interface
  const voice = React.useMemo(()=> ({
    add: (firebaseID, voice) => {
      firebase
      .firestore()
      .collection('users')
      .doc(firebaseID)
      .collection('voices')
      .add(voice)
      .then(()=> (console.log("add voice!")))
    },
  }))

  //upload audio
  const saveAudio = () => {
    //TODO: SAVE
    let userId = firebase.auth().currentUser.uid;
    const audio = {
      uri: audioLink,
      note: note
    }
    voice.add(userId, audio)
    setSaveModal(false)
    setAudioLink(null)
    setNote(null)
    console.log("save")
    getVoiceList()
  }


  return (
    <SafeAreaView style={styles.container}>
      {Eicon}
      <View style={styles.list}>
        <FlatList
          data={voiceList}
          renderItem={({ item, index }) => (
            <Item title={item.note} index={index + 1} id={item.uri}/>
          )}
          keyExtractor={(item) => item.uri.toString()}
        />
      </View>
      <>
        <AudioRecorder recording={!!recording} _onLongPress={_onLongPress} _onPressout={_onPressout} showModal={showAudio} _onModalHide={()=> {setSaveModal(true)}}></AudioRecorder>
        <SaveModal isVisible={showSave} saveEvent={saveAudio} toggle={unshowSave} setNote={setNote}></SaveModal>
      </>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
  },
  list: {
    flexDirection: "column",
    width: "95%",
    height: "85%",
    marginBottom: 10,
    marginLeft: 10,
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
