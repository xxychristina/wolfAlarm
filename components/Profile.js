import React, { useState, useContext } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import Modal from "react-native-modal";
import { Input, Button } from "react-native-elements";
import { AuthContext } from "../components/Context";
import firebase from "firebase";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

export default function Profile({ user, isVisible, toggle }) {
  const [newUserInfo, setNewUserInfo] = useState({
    name: user.name,
    phone: user.phone,
  });

  const userId = firebase.auth().currentUser.uid;

  const [newAvatar, setNewAvatar] = useState(user.avatar);

  const { updateUserProfile } = useContext(AuthContext);

  const save = () => {
    let loaded = updateUserProfile(
      userId,
      newUserInfo.name,
      newUserInfo.phone,
      newAvatar
    );
  };

  const AvatarChangeHandler = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (pickerResult.cancelled === true) {
      return;
    }

    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", pickerResult.uri, true);
      xhr.send(null);
    });

    const ref = firebase.storage().ref(`avatar/${userId}`);
    const snapshot = await ref.put(blob);
    blob.close();
    const downloadUrl = await snapshot.ref.getDownloadURL();
    setNewAvatar(downloadUrl);
  };

  const NameChangeHandler = (newName) => {
    setNewUserInfo((prevState) => ({ ...prevState, name: newName }));
  };

  const PhoneChangeHandler = (newPhone) => {
    setNewUserInfo((prevState) => ({ ...prevState, phone: newPhone }));
  };

  const changeButton = (
    <View>
      <Button type="outline" title="change"></Button>
    </View>
  );

  return (
    <Modal isVisible={isVisible}>
      <View style={styles.modalContainer}>
        {newAvatar === null ? (
          <View style={styles.profilePictureEmpty} />
        ) : (
          <Image source={{ uri: newAvatar }} style={styles.profilePicture} />
        )}
        <TouchableOpacity onPress={AvatarChangeHandler}>
          <Text style={{ color: "#4169e1", alignSelf: "center" }}>
            Edit avatar
          </Text>
        </TouchableOpacity>
        <Input
          label="name"
          placeholder={user.name}
          onChangeText={NameChangeHandler}
        ></Input>
        {/* TODO: change phone */}
        <Input
          label="phone"
          editable={false}
          rightIcon={changeButton}
          defaultValue={user.phone}
          placeholderTextColor="#000"
        ></Input>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <View>
            <Button type="clear" title="Cancle" onPress={toggle}></Button>
          </View>
          <View>
            <Button
              type="clear"
              title="Save"
              onPress={function () {
                save();
                toggle();
              }}
            ></Button>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#000",
    borderStyle: "solid",
    flexDirection: "column",
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 20,
    justifyContent: "center",
  },
  profilePictureEmpty: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    backgroundColor: "#C4C4C4",
    marginVertical: 10,
    alignSelf: "center",
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    alignSelf: "center",
  },
});
