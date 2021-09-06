import React, { useContext, useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { AuthContext } from "../components/Context";
import * as ImagePicker from "expo-image-picker";
import firebase from "firebase";

export default function MeScreen({ navigation }) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("MAKABAKA");
  const [prevName, setPrevName] = useState(name);
  const [phone, setPhone] = useState("+6104111111");
  const [prevPhone, setPrevPhone] = useState(phone);
  const [user, setUser] = useState(firebase.auth().currentUser.uid);
  const [avatar, setAvatar] = useState(null);

  const { logout, updateUserProfile } = useContext(AuthContext);

  // TODO: retrieve data from firebase

  const EChandler = () => {
    navigation.navigate("Emergency Contact");
  };

  const HelpHandler = () => {
    navigation.navigate("Help");
  };

  const SignOutHandler = () => {
    logout();
  };

  const EditHandler = () => {
    if (!isEditing) {
      setIsEditing(true);
    }
  };

  const SaveHandler = () => {
    // TODO: upload data to database
    setIsEditing(false);
  };

  const CancelHandler = () => {
    setName(prevName);
    setPhone(prevPhone);
    setIsEditing(false);
  };

  let changeAvatar = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Need to access your camera roll for your avatar.");
      return;
    }
    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled === true) {
      return;
    }
    setAvatar(pickerResult.uri);
    updateUserProfile(user, name, phone, pickerResult.uri);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profile}>
        <TouchableOpacity onPress={changeAvatar}>
          <View style={styles.profilePictureEmpty}>
            {avatar != null && (
              <Image source={{ uri: avatar }} style={styles.profilePicture} />
            )}
          </View>
        </TouchableOpacity>

        <View style={styles.detailsGrid}>
          <TextInput
            editable={isEditing}
            // style={isEditing ? styles.editing : styles.name}
            style={styles.name}
            onChangeText={(name) => {
              setName(name);
            }}
          >
            {name}
          </TextInput>
          <TextInput
            editable={isEditing}
            // style={isEditing ? styles.editing : styles.phone}
            style={styles.phone}
            onChangeText={(phone) => {
              setPhone(phone);
            }}
          >
            {phone}
          </TextInput>
        </View>
        {isEditing ? (
          <View style={styles.buttonGird}>
            <TouchableOpacity onPress={SaveHandler}>
              <MaterialCommunityIcons
                name="content-save-outline"
                color="#4A5C72"
                size={26}
              ></MaterialCommunityIcons>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={CancelHandler}
              style={styles.cancelButton}
            >
              <MaterialCommunityIcons
                name="cancel"
                color="#4A5C72"
                size={26}
              ></MaterialCommunityIcons>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity onPress={EditHandler} style={styles.editButton}>
            <MaterialCommunityIcons
              name="circle-edit-outline"
              color="#4A5C72"
              size={26}
            ></MaterialCommunityIcons>
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity style={styles.navigateTabs} onPress={EChandler}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MaterialCommunityIcons
            name="cellphone-iphone"
            color="#4A5C72"
            size={36}
          ></MaterialCommunityIcons>
          <Text style={styles.emergencyContactText}>Emergency Contact</Text>
        </View>
        <MaterialCommunityIcons
          name="chevron-right"
          color="#4A5C72"
          size={30}
          style={{ marginRight: 15 }}
        ></MaterialCommunityIcons>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navigateTabs} onPress={HelpHandler}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MaterialCommunityIcons
            name="help-circle-outline"
            color="#4A5C72"
            size={36}
          ></MaterialCommunityIcons>
          <Text style={styles.helpContactText}>Help</Text>
        </View>
        <MaterialCommunityIcons
          name="chevron-right"
          color="#4A5C72"
          size={30}
          style={{ marginRight: 15 }}
        ></MaterialCommunityIcons>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navigateTabs} onPress={SignOutHandler}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MaterialCommunityIcons
            name="exit-to-app"
            color="#4A5C72"
            size={36}
          ></MaterialCommunityIcons>
          <Text style={styles.helpContactText}>Sign Out</Text>
        </View>
        <MaterialCommunityIcons
          name="chevron-right"
          color="#4A5C72"
          size={30}
          style={{ marginRight: 15 }}
        ></MaterialCommunityIcons>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  },

  profile: {
    backgroundColor: "lightblue",
    width: "100%",
    height: "60%",
    alignItems: "center",
    flexDirection: "row",
  },

  profilePictureEmpty: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    backgroundColor: "#C4C4C4",
    marginTop: 140,
    marginLeft: 35,
  },

  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
  },

  detailsGrid: {
    flexDirection: "column",
    alignItems: "center",
    marginLeft: 20,
    marginTop: 140,
  },

  name: {
    color: "#000",
    fontSize: 20,
  },

  phone: {
    color: "#4A5C72",
    fontSize: 20,
  },

  editButton: {
    marginTop: 165,
    marginLeft: 20,
  },

  buttonGird: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 165,
    marginLeft: 20,
  },

  cancelButton: {
    marginLeft: 10,
  },

  navigateTabs: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 40,
    borderBottomColor: "#D2D2D2",
    borderBottomWidth: 1,
  },

  emergencyContactText: {
    color: "#4A5C72",
    fontSize: 18,
    marginLeft: 7,
  },

  helpContactText: {
    color: "#4A5C72",
    fontSize: 18,
    marginLeft: 9,
  },
});
