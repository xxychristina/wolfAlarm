import React, { useState, useRef } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  Image,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function EmergencyContact({
  name,
  phone,
  avatar,
  deletePressHandler,
}) {
  return (
    <View style={styles.emergencyContact}>
      {avatar === null ? (
        <View style={styles.profilePictureEmpty} />
      ) : (
        <Image source={{ uri: avatar }} style={styles.profilePicture} />
      )}
      <Text style={styles.emergencyContactName}>{name}</Text>
      {phone === null ? (
        <Text style={styles.emergencyContactNumber}>No phone</Text>
      ) : (
        <Text style={styles.emergencyContactNumber}>{phone}</Text>
      )}
      <TouchableOpacity
        // TODO: add function
        onPress={deletePressHandler}
        style={styles.editButton}
      >
        <MaterialCommunityIcons
          name="trash-can-outline"
          color="#4A5C72"
          size={26}
          onPress={deletePressHandler}
        ></MaterialCommunityIcons>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  profilePictureEmpty: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    backgroundColor: "#C4C4C4",
    marginBottom: 5,
  },

  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    marginBottom: 5,
  },

  emergencyContact: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 40,
    borderBottomColor: "#778595",
    borderBottomWidth: 2,
    alignSelf: "center",
  },

  emergencyContactName: {
    color: "#4A5C72",
    fontSize: 18,
  },

  emergencyContactNumber: {
    color: "#4A5C72",
    fontSize: 18,
  },
});
