import React from 'react';
import { SafeAreaView, Text, StyleSheet, FlatList, TouchableOpacity, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export default function EContact({ navigation }) {

  const DATA = [
    {
      id:1,
      name: 'Tony',
      phone: '+610452230832'
    },
    {
      id:2,
      name: 'Tony',
      phone: '+610452230832'
    },
    {
      id:3,
      name: 'Tony',
      phone: '+610452230832'
    }
  ]
  const Item = ({id, name, phone}) => (
    <View style={styles.card}>
      <View style={styles.avatar}></View>
      <Text>{name}</Text>
      <Text>{phone}</Text>
      <TouchableOpacity>
        <MaterialCommunityIcons
          name="square-edit-outline"
          size={26}
        ></MaterialCommunityIcons>
      </TouchableOpacity>
      
    </View>
  )




  return(
    <SafeAreaView>
      {/* <TouchableOpacity style={{alignSelf: "flex-end", paddingRight: 20}}>
        <MaterialCommunityIcons
          size={26}
          name="account-multiple-plus-outline"
        ></MaterialCommunityIcons>
      </TouchableOpacity> */}
      <View style={styles.list}>
        <FlatList
          data={DATA}
          renderItem={({ item }) => <Item id={item.id} name={item.name} phone={item.phone}  />}
          keyExtractor={item => item.id}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1
  },
  list: {
    marginTop: 5
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderBottomWidth: 1,
    borderBottomColor: "grey", 
    marginVertical: 20,
    paddingVertical: 10,
    alignItems: "center"
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "grey"
  }
})