import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function MeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profile}>
        <View style={styles.profilePicture}></View>
        <View style={styles.detailsGrid}>
          <Text style={styles.name}>MAKABAKA</Text>
          <Text style={styles.number}>+6104111111</Text>
        </View>
        <TouchableOpacity
          // TODO: add function
          onPress={() => {
            console.log("Pressed");
          }}
          style={styles.editButton}
        >
          <MaterialCommunityIcons
            name="circle-edit-outline"
            color="#4A5C72"
            size={26}
          ></MaterialCommunityIcons>
        </TouchableOpacity>
      </View>
      {/* TODO: add onPress function  */}
      <TouchableOpacity style={styles.emergencyContact}>
        <MaterialCommunityIcons
          name="cellphone-iphone"
          color="#4A5C72"
          size={36}
        ></MaterialCommunityIcons>
        <Text style={styles.emergencyContactText}>Emergency Contact</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.help}>
        <MaterialCommunityIcons
          name="comment-question-outline"
          color="#4A5C72"
          size={36}
        ></MaterialCommunityIcons>
        <Text style={styles.helpText}>Help</Text>
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

  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    backgroundColor: "#C4C4C4",
    marginTop: 140,
    marginLeft: 50,
  },

  detailsGrid: {
    flexDirection: "column",
    alignItems: "center",
    marginLeft: 18,
  },

  name: {
    color: "#000",
    fontSize: 20,
    marginTop: 140,
  },

  number: {
    color: "#4A5C72",
    fontSize: 20,
  },

  editButton: {
    marginTop: 165,
    marginLeft: 20,
  },

  emergencyContact: {
    width: "90%",
    flexDirection: "row",
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

  help: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    borderBottomColor: "#D2D2D2",
    borderBottomWidth: 1,
  },

  helpText: {
    color: "#4A5C72",
    fontSize: 18,
    marginLeft: 7,
  },
});
