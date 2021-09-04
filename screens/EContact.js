import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";

import { Input, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/EvilIcons";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import EmergencyContact from "../components/EmergencyContact";
import Modal from "react-native-modal";
import { FlatList } from "react-native-gesture-handler";

export default function EContact({ navigation }) {
  const [inviteModal, setInviteModal] = React.useState(false);

  const toggleInvite = () => {
    setInviteModal(!inviteModal);
    console.log(inviteModal);
  };

  const DATA = [
    {
      id: 1,
      name: "William",
      phone: "+61452230632",
    },
    {
      id: 2,
      name: "Chris",
      phone: "+61452230632",
    },
    {
      id: 3,
      name: "Chris",
      phone: "+61452230632",
    },
  ];

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{ alignSelf: "flex-end", paddingRight: 20 }}
          onPress={toggleInvite}
        >
          <MaterialCommunityIcons
            size={26}
            name="account-multiple-plus-outline"
          ></MaterialCommunityIcons>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.centerView}>
        <Modal isVisible={inviteModal}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={{ alignSelf: "flex-end", margin: 15 }}
              onPress={toggleInvite}
            >
              <MaterialCommunityIcons
                name="close"
                size={26}
              ></MaterialCommunityIcons>
            </TouchableOpacity>
            <Input
              placeholder="Email"
              leftIcon={<Icon name="envelope" size={30}></Icon>}
            ></Input>
            <TouchableOpacity
              onPress={() => {
                alert("send");
              }}
            >
              <View style={styles.button}>
                <Text style={{ textAlign: "center" }}>Invite</Text>
              </View>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
      <View>
        <FlatList
          data={DATA}
          renderItem={({ item, index }) => (
            <EmergencyContact
              name={item.name}
              phone={item.phone}
              id={item.id}
            ></EmergencyContact>
          )}
        ></FlatList>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  centerView: {
    // flexDirection: "column",
    // flex: 1,
    // justifyContent:  "center",
    // alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#000",
    borderStyle: "solid",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  centerText: {
    // textAlign: "center",
    fontSize: 60,
  },
  button: {
    backgroundColor: "#D5E3EC",
    padding: 10,
    borderRadius: 10,
    width: 150,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: { width: 1, height: 13 },
    marginHorizontal: 20,
  },
});
