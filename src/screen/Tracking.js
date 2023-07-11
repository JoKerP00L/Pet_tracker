import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const TrackingScreen = () => {
  const [ownerLocation, setOwnerLocation] = useState(null);
  const [petLocation, setPetLocation] = useState(null);

  useEffect(() => {
    startTracking();
    return () => {
      stopTracking();
    };
  }, []);

  const startTracking = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.error('Location permission not granted');
      // Show error message or handle the error
      return;
    }

    Location.startLocationUpdatesAsync('owner', {
      accuracy: Location.Accuracy.High,
      distanceInterval: 10, // Update location every 10 meters
    });

    Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        distanceInterval: 10, // Update location every 10 meters
      },
      (location) => {
        setOwnerLocation(location.coords);
      },
      (error) => {
        console.error('Error watching position:', error);
        // Show error message or handle the error
      },
      'owner'
    );

    // Simulating pet's location update
    setInterval(() => {
      const randomLatitude = 19.258635;
      const randomLongitude = 73.131266;
      setPetLocation({
        latitude: randomLatitude,
        longitude: randomLongitude,
      });
    }, 5000); // Update pet's location every 5 seconds
  };

  const stopTracking = () => {
    Location.stopLocationUpdatesAsync('owner');
  };

  return (
    <View style={styles.container}>
      {ownerLocation && petLocation && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: ownerLocation.latitude,
            longitude: ownerLocation.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: ownerLocation.latitude,
              longitude: ownerLocation.longitude,
            }}
            title="Owner Location"
          />
          <Marker
            coordinate={{
              latitude: petLocation.latitude,
              longitude: petLocation.longitude,
            }}
            title="Pet Location"
          />
        </MapView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default TrackingScreen;
