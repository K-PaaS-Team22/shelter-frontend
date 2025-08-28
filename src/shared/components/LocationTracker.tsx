import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import { useForegroundPermissions } from "expo-location";

interface Location {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

const LocationTracker: React.FC = () => {
  const [location, setLocation] = useState<Location>({
    latitude: 37.5665,
    longitude: 126.978,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01
  });

  const [locationPermission, requestPermission] = useForegroundPermissions();

  useEffect(() => {
    const initializeLocation = async () => {
      try {
        const permission = await requestPermission();

        if (permission.granted) {
          const currentLocation = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.BestForNavigation
          });

          const { latitude, longitude } = currentLocation.coords;

          setLocation({
            latitude,
            longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01
          });
        }
      } catch (error) {
        // 에러 무시
      }
    };

    initializeLocation();
  }, []);

  const onRegionChange = (newRegion: Location) => {
    setLocation(newRegion);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={location}
        region={location}
        onRegionChangeComplete={onRegionChange}
        showsUserLocation={true}
        showsMyLocationButton={true}
        showsCompass={true}
        showsScale={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    flex: 1
  }
});

export default LocationTracker;
