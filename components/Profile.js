import React from 'react';
import { StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal'
import {Input, Button} from 'react-native-elements'

export default function Profile({user, isVisible, toggle}) {
  return (
    <Modal isVisible={isVisible}>
      <View style={styles.modalContainer}>
        <View style={styles.profilePicture}>
        </View>
        <Input
          label='name'
          placeholder={user.name}
        ></Input>
        <Input
          label='phone'
          placeholder={user.phone}>
        </Input>
        <View style={{flexDirection: 'row', justifyContent: "space-around"}}>
          <View>
            <Button type="clear" title="Cancle" onPress={toggle}></Button>
          </View>
          <View>
            <Button type="clear" title="Save" onPress={function(){
              save();
              toggle();
            }}></Button>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const save = ()=> {
  console.log("save")
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
    justifyContent: 'center',
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    backgroundColor: "#C4C4C4",
    marginVertical: 30,
    alignSelf: "center"
  },
})