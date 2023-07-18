import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const DogProfilePage = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/background.png')}
        style={styles.heroBanner}
        resizeMode="cover"
      />

      <View style={styles.dogInfoContainer}>
        <Image
          source={require('../../assets/dog_image.jpg')}
          style={styles.dogImage}
          resizeMode="cover"
        />

        <View style={styles.indicatorsContainer}>
          <View style={styles.indicator}>
            <Text style={styles.indicatorLabel}>Battery</Text>
            <Text style={styles.indicatorValue}>80%</Text>
          </View>

          <View style={styles.indicator}>
            <Text style={styles.indicatorLabel}>Wi-Fi</Text>
            <Text style={styles.indicatorValue}>Connected</Text>
          </View>

          <View style={styles.indicator}>
            <Text style={styles.indicatorLabel}>GPS</Text>
            <Text style={styles.indicatorValue}>Enabled</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.gpsButton}>
          <Text style={styles.gpsButtonText}>Enable GPS</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.liveTrackingButton}>
        <Text style={styles.liveTrackingButtonText}>Start Live Tracking...</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  heroBanner: {
    width: '100%',
    height: 300,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  dogInfoContainer: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    alignItems: 'center',
  },
  dogImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 16,
  },
  indicatorsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  indicator: {
    alignItems: 'center',
  },
  indicatorLabel: {
    fontSize: 16,
    color: '#888',
  },
  indicatorValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  gpsButton: {
    backgroundColor: '#FFA500',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  gpsButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  liveTrackingButton: {
    backgroundColor: '#FFA500',
    paddingVertical: 16,
    alignItems: 'center',
  },
  liveTrackingButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default DogProfilePage;
