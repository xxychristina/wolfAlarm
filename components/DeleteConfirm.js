import React from 'react';
import { View } from 'react-native';
import Modal from 'react-native-modal'
import { Button } from 'react-native-elements';

export default function DeleteConfirm({isVisible, deleteEvent, toggle}) {
  return (
    <Modal isVisible={isVisible}>
      <View style={styles.modalContainer}>
        <View>
          <Button type="clear" title="Cancle" onPress={toggle}></Button>
        </View>
        <View>
          <Button type="clear" title="Delete" onPress={deleteEvent}></Button>
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
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 20,
    justifyContent: 'space-around',
    alignItems: 'flex-end',
  },
}