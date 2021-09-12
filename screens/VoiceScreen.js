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
import DeleteConfirm from "../components/DeleteConfirm";
import { Audio } from "expo-av";
import firebase from "firebase";

export default function VoiceScreen() {
  const [settingState, setSettingState] = React.useState(false);
  const [voiceList, setVoiceList] = React.useState();
  const [helpList, setHelpList] = React.useState();
  const [sound, setSound] = React.useState();
  const [deleteModal, setDeleteModal] = React.useState(false)
  
  const getVoiceList = async () => {
    let userId = firebase.auth().currentUser.uid;
    var vList = []
    const snapshot =  await firebase
          .firestore()
          .collection('users')
          .doc(userId)
          .collection('voices')
          .orderBy('date', 'asc')
          .get()
          .catch((err) => console.error(err))
    
    snapshot.forEach((doc) => {
      vList.push({...doc.data(), id: doc.id})
    });
    setVoiceList(vList)
    setHelpList(vList)
  }

 React.useEffect(()=> {
    getVoiceList()
  }, [])

  const handleClick = (id) => {
    // console.log(id);
    // console.log(helpList)
    var tmpList;
    if(!!helpList){
      tmpList = helpList;
    }else{
      tmpList = voiceList;
    }
    let selected = tmpList.map((val, i) => {
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
    setHelpList(selected)
  };

  const playAudio = async (uri) => {
    const { sound } = await Audio.Sound.createAsync(
      { uri: uri },
    );
    setSound(sound)
    console.log('Playing Sound');
    await sound.playAsync();
  }


  let Item = ({ title, index, id, isChecked, uri }) => (
    <View style={settingState ? styles.listItemC : styles.listItem}>
      <View style={styles.dot}>
        <Text style={{ textAlign: "center" }}>{index}. </Text>
      </View>
      <TouchableOpacity style={styles.voiceButton} onPress={()=>{playAudio(uri)}}>
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
      <BouncyCheckbox
        size={25}
        fillColor="#D9AEA8"
        unfillColor="#FFFFFF"
        iconStyle={{ borderColor: "#D9AEA8" }}
        isChecked={isChecked}
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
          setDeleteModal(!deleteModal)
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
      .then(()=> {
        setSaveModal(false)
        setAudioLink(null)
        setNote(null)
        console.log("add voice!")
        getVoiceList()
      })
    },
    delete: (firebaseID, voice) => {
      firebase
      .firestore()
      .collection('users')
      .doc(firebaseID)
      .collection('voices')
      .doc(voice.id)
      .delete()
      .then(() => {
        console.log("delete")
      })
    },
  }))


  //upload audio
  const saveAudio = () => {
    //TODO: SAVE
    let userId = firebase.auth().currentUser.uid;
    let date = firebase.firestore.Timestamp.fromDate(new Date());

    const audio = {
      uri: audioLink,
      note: note,
      date: date
    }
    voice.add(userId, audio)
  }

  const deleteAudios = () => {
    let uid = firebase.auth().currentUser.uid;
    let selectedAudio = helpList.filter(audio => audio.isSelected)
    let notSelected = helpList.filter(audio => !audio.isSelected)
    for(let i = 0; i < selectedAudio.length; i++) {
      voice.delete(uid, selectedAudio[i])
    }
    setHelpList(notSelected)
    setDeleteModal(!deleteModal)
  }


  return (
    <SafeAreaView style={styles.container}>
      {Eicon}
      <View style={styles.list}>
        <FlatList
          data={helpList}
          renderItem={({ item, index }) => (
            <Item title={item.note} index={index + 1} id={item.id} isChecked={item.isSelected} uri={item.uri}/>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
      <>
        <AudioRecorder recording={!!recording} _onLongPress={_onLongPress} _onPressout={_onPressout} showModal={showAudio} _onModalHide={()=> {setSaveModal(true)}}></AudioRecorder>
        <SaveModal isVisible={showSave} saveEvent={saveAudio} toggle={unshowSave} setNote={setNote}></SaveModal>
        <DeleteConfirm isVisible={deleteModal} deleteEvent={deleteAudios} toggle={() => {setDeleteModal(!deleteModal)}}></DeleteConfirm>
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
