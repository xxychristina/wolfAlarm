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

export default function MeScreen({ navigation }) {
  const EChandler = () => {
    navigation.navigate("Emergency Contact")
  }

  const HelpHandler = () => {
    navigation.navigate("Help")
  }
  

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
      <TouchableOpacity style={styles.emergencyContact} onPress={EChandler}>
        <View style={{flexDirection: "row", alignItems: "center"}}>
          <MaterialCommunityIcons
            name="cellphone-iphone"
            color="#4A5C72"
            size={36}
          ></MaterialCommunityIcons>
          <Text 
            style={styles.emergencyContactText}
          >Emergency Contact</Text>
        </View>
        <MaterialCommunityIcons
          name="chevron-right"
          color="#4A5C72"
          size={30}
          style={{marginRight: 15}}
        ></MaterialCommunityIcons>
      </TouchableOpacity>
      <TouchableOpacity style={styles.emergencyContact} onPress={HelpHandler}>
        <View style={{flexDirection: "row", alignItems: "center"}}>
          <MaterialCommunityIcons
            name="help-circle-outline"
            color="#4A5C72"
            size={36}
          ></MaterialCommunityIcons>
          <Text 
            style={styles.helpContactText}
          >Help</Text>
        </View>
        <MaterialCommunityIcons
          name="chevron-right"
          color="#4A5C72"
          size={30}
          style={{marginRight: 15}}
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

  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    backgroundColor: "#C4C4C4",
    marginTop: 140,
    marginLeft: 35,
  },

  detailsGrid: {
    flexDirection: "column",
    alignItems: "center",
    marginLeft: 23,
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

  // help: {
  //   width: "90%",
  //   flexDirection: "row",
  //   alignItems: "center",
  //   marginTop: 20,
  //   borderBottomColor: "#D2D2D2",
  //   borderBottomWidth: 1,
  // },

  helpText: {
    color: "#4A5C72",
    fontSize: 18,
    marginLeft: 7,
  },
});
