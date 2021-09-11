import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { AuthContext } from "../components/Context";
import firebase from "firebase";

import Profile from "../components/Profile";

export default function MeScreen({ navigation }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [userInfo, setUserInfo] = useState({
    id: "1",
    name: "makabaka",
    phone: "+6142332323",
    email: "123@gmail.com",
    avatar: "http",
  });

  const getUser = async () => {
    let docId = await firebase.auth().currentUser.uid;
    setIsLoading(true);
    const currentUser = firebase
      .firestore()
      .collection("users")
      .doc(docId)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setUserInfo(snapshot.data());
          setIsLoading(false);
        }
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  const { logout } = useContext(AuthContext);

  // TODO: retrieve data from firebase

  const EChandler = () => {
    navigation.navigate("Emergency Contact");
  };

  const HelpHandler = () => {
    navigation.navigate("Help");
  };

  const SignOutHandler = () => {
    // TODO: signout
    logout();
  };

  const EditHandler = () => {
    setIsEditing(!isEditing);
    getUser();
  };

  const SaveHandler = () => {
    // TODO: upload data to database
    setIsEditing(false);
  };

  return (
    <View>
      {isLoading ? (
        <View
          style={{
            position: "absolute",
            alignSelf: "center",
            marginTop: Dimensions.get("window").height / 2,
          }}
        >
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <SafeAreaView style={styles.container}>
          <View style={styles.profile}>
            {userInfo.avatar === null ? (
              <View style={styles.profilePictureEmpty} />
            ) : (
              <Image
                source={{ uri: userInfo.avatar }}
                style={styles.profilePicture}
              />
            )}
            <View style={styles.detailsGrid}>
              <Text style={styles.name}>{userInfo.name}</Text>
              <Text style={styles.phone}>{userInfo.phone}</Text>
            </View>
            {isEditing ? (
              <Profile
                user={userInfo}
                isVisible={isEditing}
                toggle={EditHandler}
              ></Profile>
            ) : (
              <TouchableOpacity onPress={EditHandler} style={styles.editButton}>
                <MaterialCommunityIcons
                  name="chevron-right"
                  color="#4A5C72"
                  size={30}
                  style={{ marginRight: 15 }}
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
          <TouchableOpacity
            style={styles.navigateTabs}
            onPress={SignOutHandler}
          >
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
      )}
    </View>
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
  },

  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    backgroundColor: "#C4C4C4",
    marginTop: 140,
    marginLeft: 35,
  },

  detailsGrid: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    marginLeft: 20,
    marginTop: 140,
  },

  name: {
    color: "#000",
    fontSize: 20,
    marginLeft: 13,
  },

  phone: {
    color: "#4A5C72",
    fontSize: 20,
    marginTop: 5,
  },

  editButton: {
    marginTop: 165,
    marginHorizontal: 20,
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
