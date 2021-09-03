import React, { useState, useRef } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  TextInput,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function EmergencyContact() {
  const [isEditing, setIsEditing] = useState(false);
  const [number, setNumber] = useState("+6104111111");
  const [name, setName] = useState("Tony");
  const numberInputRef = useRef();
  const nameInputRef = useRef();

  const EditPressHandler = () => {
    setIsEditing(true);
    // nameInputRef.current.select();
    nameInputRef.current.focus();
  };

  return (
    <View style={styles.emergencyContact}>
      <View style={styles.profilePicture}></View>
      {/* <Text style={styles.emergencyContactName}>Tony</Text> */}
      <TextInput
        value={name}
        onChangeText={(value) => setName(value)}
        onBlur={() => setIsEditing(false)}
        onSubmitEditing={() => setIsEditing(false)}
        style={styles.emergencyContactName}
        editable={isEditing}
        ref={nameInputRef}
      />
      <TextInput
        value={number}
        onChangeText={(value) => setNumber(value)}
        onBlur={() => setIsEditing(false)}
        onSubmitEditing={() => setIsEditing(false)}
        style={styles.emergencyContactNumber}
        editable={isEditing}
        // ref={numberInputRef}
      />
      {/* <Text style={styles.emergencyContactNumber}>+6104111111</Text> */}
      <TouchableOpacity
        // TODO: add function
        onPress={EditPressHandler}
        style={styles.editButton}
      >
        <MaterialCommunityIcons
          name="circle-edit-outline"
          color="#4A5C72"
          size={26}
        ></MaterialCommunityIcons>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    backgroundColor: "#C4C4C4",
    marginBottom: 5,
  },

  emergencyContact: {
    width: "85%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 40,
    borderBottomColor: "#778595",
    borderBottomWidth: 2,
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
