import React from 'react';
import { View, TextInput } from 'react-native';
import Modal from 'react-native-modal'
import { Button } from 'react-native-elements';

export default function SaveModal({isVisible, saveEvent, toggle}) {
  return (
    <Modal isVisible={isVisible}>
      <View style={styles.modalContainer}>
        <TextInput
          style={{
            borderBottomColor: '#000000',
            borderBottomWidth: 1,
            width: "80%",
            fontSize: 20,
            alignSelf: "center"
          }}
          placeholder="under 20 characters"
        >
        </TextInput>
        <View style={styles.buttonGrid}>
          <View>
            <Button type="clear" title="Cancle" onPress={toggle}></Button>
          </View>
          <View>
            <Button type="clear" title="Save" onPress={saveEvent}></Button>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = {
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
    paddingTop: 40
  },
  buttonGrid: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: 'space-around'
  }
}