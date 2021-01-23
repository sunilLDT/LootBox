import React, { useEffect, useState } from 'react';
import { View, Image } from 'react-native';
import MapView from 'react-native-maps'
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoder';

const latitudeDelta = 0.025;
const longitudeDelta = 0.025;
export const GoogleMap = (props) => {
  let mapRef = React.createRef();
  const [region, setRegion] = useState({
    latitude: 33.7444613,
    longitude: -118.3870173,
    latitudeDelta,
    longitudeDelta
  });
  const [marginBottom, setMarginBottom] = useState(1)

  useEffect(() => {
    handleCurrentLocation()
    setTimeout(() => {
      setMarginBottom(0)
    }, 100);
  }, [])

  const handleCurrentLocation = () => {
    Geolocation.getCurrentPosition(pos => {
      mapRef &&  mapRef.animateToRegion({
        ...region,
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude
      })

      getAddress(pos.coords.latitude, pos.coords.longitude)

      setRegion((prev) => ({
        ...prev,
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude
      }))
    }, err => alert(err));
  }

  getAddress = async(lat,lng) => {
    await Geocoder.fallbackToGoogle('AIzaSyAFnuK5g04r4aqBoLt1sdzCDcL9TJW9z4A');
    let res = await Geocoder.geocodePosition({lat, lng});
    let addrs = res[0];
    props.handleAddress(addrs)
    // alert(JSON.stringify(addrs))
  }

  const onRegionChange = (region) => {
    setRegion(region);
    getAddress(region.latitude, region.longitude)
  }
  return (
    <View style={{flex:1, position: 'relative', zIndex: 1 }}>
      <MapView
        style={{ flex: 1, marginBottom }}
        initialRegion={region}
        showsUserLocation={true}
        showsMyLocationButton={true}
        onRegionChangeComplete={onRegionChange}
        ref={(ref) => mapRef = ref}
      />
      <View style={{top: '50%', left: '50%', marginLeft: -24, marginTop: -48, position: 'absolute'}}>
      <Image style={{width: 48, height: 48}} source={require('../assets/marker.png')} />
      </View>
    </View>
  )
}