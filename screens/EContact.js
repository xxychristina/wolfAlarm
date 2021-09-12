import React, { useEffect } from "react";
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
import DeleteConfirm from "../components/DeleteConfirm";
import firebase from "firebase";

export default function EContact({ navigation }) {
  const [inviteModal, setInviteModal] = React.useState(false);
  const [deleteModal, setDeleteModal] = React.useState(false);
  const [deleteItem, setDeleteItem] = React.useState(0);
  const [inviteEmail, setInviteEmail] = React.useState(null);
  const [Contacts, setContacts] = React.useState(null);

  const currentUser = firebase.auth().currentUser;

  const handleDelete = () => {
    if (deleteItem != 0) {
      console.log(deleteItem);
      setDeleteModal(!deleteModal);
    }
  };

  const toggleInvite = () => {
    setInviteModal(!inviteModal);
    console.log(inviteModal);
  };

  const Invitehandler = () => {
    if (currentUser.email === inviteEmail) {
      alert("Cannot add youself as emergency contact");
    } else {
      const userDetails = firebase
        .firestore()
        .collection("users")
        .where("email", "==", inviteEmail)
        .get()
        .then((snapshot) => {
          if (snapshot.empty) {
            alert("User not found");
          } else {
            snapshot.docs.forEach((doc) => {
              addEContact(doc.id, doc.data());
            });
          }
        });
    }
  };

  const addEContact = (userId, EContact) => {
    firebase
      .firestore()
      .collection("users")
      .doc(currentUser.uid)
      .collection("Emergency Contacts")
      .where("id", "==", userId)
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          firebase
            .firestore()
            .collection("users")
            .doc(currentUser.uid)
            .collection("Emergency Contacts")
            .doc(userId)
            .set(EContact);
          alert("User added as emergency contact");
        } else {
          alert("You already have this user as emergency contact");
        }
      });
  };

  const getEContact = async () => {
    const contactList = [];
    await firebase
      .firestore()
      .collection("users")
      .doc(currentUser.uid)
      .collection("Emergency Contacts")
      .get()
      .then((collectionSnapshot) => {
        collectionSnapshot.forEach((documentSnapshot) => {
          contactList.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
      });
    setContacts(contactList);
  };

  useEffect(() => {
    getEContact();
  }, []);

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
              onChangeText={(email) => {
                setInviteEmail(email);
              }}
            ></Input>
            <TouchableOpacity onPress={Invitehandler}>
              <View style={styles.button}>
                <Text style={{ textAlign: "center" }}>Invite</Text>
              </View>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
      <View>
        <FlatList
          // data={DATA}
          // keyExtractor={(item) => item.id.toString()}
          // renderItem={({ item, index }) => (
          //   <EmergencyContact
          //     name={item.name}
          //     phone={item.phone}
          //     id={item.id}
          //     deletePressHandler={function () {
          //       setDeleteItem(item.id);
          //       setDeleteModal(!deleteModal);
          //     }}
          //   ></EmergencyContact>
          // )}

          data={Contacts}
          keyExtractor={(item) => item.key.toString()}
          renderItem={({ item, index }) => (
            <EmergencyContact
              name={item.name}
              phone={item.phone}
              id={item.key}
              deletePressHandler={function () {
                setDeleteItem(item.key);
                setDeleteModal(!deleteModal);
              }}
            ></EmergencyContact>
          )}
        ></FlatList>
      </View>
      <DeleteConfirm
        isVisible={deleteModal}
        deleteEvent={handleDelete}
        toggle={() => {
          setDeleteModal(!deleteModal);
        }}
      ></DeleteConfirm>
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
