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
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";

export default function VoiceScreen() {
  const DATA = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "First Item",
      index: 1,
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: "Second Item",
      index: 2,
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      title: "Third Item",
      index: 3,
    },
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba67",
      title: "First Item",
      index: 1,
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f6365",
      title: "Second Item",
      index: 2,
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72654",
      title: "Third Item",
      index: 3,
    },
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba21",
      title: "First Item",
      index: 1,
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63435",
      title: "Second Item",
      index: 2,
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d7245",
      title: "Third Item",
      index: 3,
    },
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba2",
      title: "First Item",
      index: 1,
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f6343",
      title: "Second Item",
      index: 2,
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d724",
      title: "Third Item",
      index: 3,
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f6343h",
      title: "Second Item",
      index: 2,
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d724h",
      title: "Third Item",
      index: 3,
    },
  ];
  const [settingState, setSettingState] = React.useState(false);
  let checkbox;
  // if(settingModel){
  //   checkbox =
  //   <BouncyCheckbox
  //     size={25}
  //     fillColor="red"
  //     unfillColor="#FFFFFF"
  //     style={{marginLeft: 4}}
  //   ></BouncyCheckbox>
  // }else{
  //   checkbox = null;
  // }

  let Item = ({ title, index }) => (
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

  return (
    <SafeAreaView style={styles.container}>
      {Eicon}
      <View style={styles.list}>
        <FlatList
          data={DATA}
          renderItem={({ item, index }) => (
            <Item title={item.title} index={index + 1} />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
      <TouchableOpacity style={{ width: "100%" }}>
        <View style={styles.recordButton}>
          <MaterialCommunityIcons
            name="microphone-plus"
            size={28}
          ></MaterialCommunityIcons>
        </View>
      </TouchableOpacity>
      {/* <View styles={styles.editor}>
        <View styles={styles.editTool}>
          <TouchableOpacity>
            <MaterialCommunityIcons
                name="plus-circle-outline"
                size={26}
              ></MaterialCommunityIcons>
          </TouchableOpacity>
        </View>
        <View styles={styles.editTool}>
          <TouchableOpacity>
            <MaterialCommunityIcons
                name="plus-circle-outline"
                size={26}
              ></MaterialCommunityIcons>
          </TouchableOpacity>
        </View>
      </View> */}
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
});
