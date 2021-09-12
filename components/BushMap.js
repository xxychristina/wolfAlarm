import React, { Component, useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import * as Location from "expo-location";
//import { MapView } from 'expo';
//react-native-maps

// let mapUrl = `https://www.emerency.wa.gov.au/data/incident_FCAD.json`

export default class BushMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0,
      error: null,
      mapRegion: null,
      lastLat: null,
      lastLong: null,
    };
  }

  componentDidMount() {
    const perssion = Location.requestForegroundPermissionsAsync();
    const getper = Location.getForegroundPermissionsAsync();
    Location.installWebGeolocationPolyfill();
    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        let region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.00922 * 1.5,
          longitudeDelta: 0.00421 * 1.5,
        };
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          mapRegion: region,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
        distanceFilter: 10,
      }
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }

  render() {
    return (
      <React.Fragment>
        <MapView
          name="homePageMap"
          style={styles.map}
          initialRegion={this.state.mapRegion}
          showsUserLocation={true}
          followUserLocation={true}
        >
          {/* <Marker
                        coordinate={ this.state }
                        title="test Title"
                        description="test describtion"

                    >
                    </Marker> */}
        </MapView>
        {/* <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>Latitude: {this.state.latitude}</Text>
                    <Text>Longitude: {this.state.longitude}</Text>
                    {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
                </View> */}
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "75%",
  },
});
