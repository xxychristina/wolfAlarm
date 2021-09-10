import { View, TouchableOpacity, Text, Animated } from 'react-native';
import React from 'react';
import Modal from 'react-native-modal'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';

export default function AudioRecorder({ _onLongPress, _onPressout, showModal, _onModalHide, recording }) {
  const checkTime = (time, elapsedTime) => {
    if (time == 0 && recording) {
      _onPressout();
    }
  }

  return(
    <View>
      <TouchableOpacity 
        style={{ width: "100%" }}
        onLongPress={_onLongPress}
        onPressOut={_onPressout}
      >
      <View style={styles.recordButton}>
        <MaterialCommunityIcons
          name="microphone-plus"
          size={28}
        ></MaterialCommunityIcons>
      </View>
    </TouchableOpacity>
    <Modal isVisible={showModal} onModalHide={_onModalHide}>
      <View style={styles.modalContainer}>
        <CountdownCircleTimer
          isPlaying={true}
          duration={5}
          colors={[
            ['#C2DBD7', 0.5],
            ['#81A7B0', 0.4],
            ['#F88BAD', 0.1],
          ]}
        >
        {({ remainingTime, elapsedTime }) => (
          <View>
            {checkTime(remainingTime, elapsedTime)}
            <Animated.Text style={{ color: "#fff", fontSize: 60 }}>
              {remainingTime}
            </Animated.Text>
          </View>
        )}
        </CountdownCircleTimer>
        <View style={styles.textBox}>
          <Text style={{fontSize: 20, color: '#fff'}}>Hold to record</Text>
        </View>
      </View>
    </Modal>    
    </View>
  )
}

const styles = {
  recordButton: {
    backgroundColor: "#D5E3EC",
    marginBottom: 20,
    borderRadius: 10,
    paddingVertical: 5,
    justifyContent: "center",
    width: "80%",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  modalContainer: {
    flexDirection: "column",
    alignItems: 'center',
  },
  textBox: {
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 30,
    marginTop: 50,
  }
}