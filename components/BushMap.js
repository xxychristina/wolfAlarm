import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import  MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
//import { MapView } from 'expo';
//react-native-maps

// let mapUrl = `https://www.emerency.wa.gov.au/data/incident_FCAD.json`

export default class BushMap extends Component {
    constructor(props) {
        super();
        this.mapRef = null;
    }

    render() {
        return (
            <MapView
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4323,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}
                name="homePageMap" 
                style={styles.map}
                // provider={PROVIDER_GOOGLE}
                ref={(ref) => { this.mapRef = ref }}
                onLayout = {() => this.mapRef.fitToCoordinates(this.props.myLatLongs, { edgePadding: { top: 30, right: 30, bottom: 30, left: 30 }, animated: true })}
                showsUserLocation={true}
            >
            </MapView>
        )
    }
}
// 
//                 <Marker
//                     coordinate={{
//                         latitude: 37.78825,
//                         longitude: -122.4323,
                        
//                     }}
//                     image={require('../assets/maps-and-flags.png')}
//                     title="test Title"
//                     description="test describtion"
//                 >
//                 </Marker>

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        backgroundColor: "#f8f8f8",
        alignItems: "center",
        justifyContent: "flex-start",
    },

    map: {
        width: "100%",
        height: "75%",
    }
});
