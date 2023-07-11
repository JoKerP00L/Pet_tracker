// import React, { Component } from "react";
// import {
//   StyleSheet,
//   View,
//   ScrollView,
//   Text,
//   TouchableOpacity
// } from "react-native";
// import Icon from "react-native-vector-icons/Entypo";

// function Home(props) {
//   return (
//     <View style={styles.container}>
//       <View style={styles.scrollArea}>
//         <ScrollView
//           horizontal={false}
//           contentContainerStyle={styles.scrollArea_contentContainerStyle}
//         >
//           <View style={styles.rect5}></View>
//           <View style={styles.rect6}></View>
//           <View style={styles.rect7}></View>
//           <View style={styles.rect8}></View>
//         </ScrollView>
//       </View>
//       <Text style={styles.comp}>complete setup{"\n"}and start</Text>
//       <View style={styles.trackingRow}>
//         <Text style={styles.tracking}>TRACKING</Text>
//         <TouchableOpacity
//           onPress={() => props.navigation.navigate("SplashScreen")}
//           style={styles.button}
//         ></TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1
//   },
//   scrollArea: {
//     backgroundColor: "rgba(230, 230, 230,1)",
//     marginTop: 198
//   },
//   scrollArea_contentContainerStyle: {
//     height: 1000,
//     justifyContent: "space-between",
//     alignItems: "center"
//   },
//   rect5: {
//     width: 288,
//     height: 193,
//     backgroundColor: "rgba(0,0,0,1)",
//     borderRadius: 33,
//     margin: 26
//   },
//   rect6: {
//     width: 288,
//     height: 213,
//     backgroundColor: "rgba(0,0,0,1)",
//     borderRadius: 33,
//     margin: 26
//   },
//   rect7: {
//     width: 288,
//     height: 218,
//     backgroundColor: "rgba(0,0,0,1)",
//     borderRadius: 33,
//     margin: 26
//   },
//   rect8: {
//     width: 288,
//     height: 194,
//     backgroundColor: "rgba(0,0,0,1)",
//     borderRadius: 33,
//     marginTop: 0,
//     margin: 26
//   },
//   comp: {
//     fontFamily: "abel-regular",
//     color: "#121212",
//     fontSize: 26,
//     alignSelf: "flex-end"
//   },
//   tracking: {
//     fontFamily: "belanosima-700",
//     color: "#fe692e",
//     fontSize: 26,
//     width: 143,
//     height: 32,
//     marginTop: 8
//   },
//   compColumn: {
//     width: 155
//   },
//   button: {
//     width: 61,
//     height: 78,
//     backgroundColor: "#E6E6E6",
//     borderRadius: 15,
//     marginLeft: 82,
//     marginTop: 14
//   },
//   icon: {
//     color: "rgba(128,128,128,1)",
//     fontSize: 40,
//     height: 43,
//     width: 40,
//     marginTop: 17,
//     marginLeft: 11
//   },
//   compColumnRow: {
//     height: 107,
//     flexDirection: "row",
//     marginTop: -1143,
//     marginLeft: 15,
//     marginRight: 47
//   }
// });

// export default Home;

import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
// import assets from './assets';

const DogProfilePage = () => {
  return (
    <View style={styles.container}>
      <Image
        // source={require('./assets/hero_banner.jpg')}
        source={require('../../assets/background.png')}
        style={styles.heroBanner}
        resizeMode="cover"
      />

      <View style={styles.dogInfoContainer}>
        <Image
          // source={require("./assets/splash.png")}
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
