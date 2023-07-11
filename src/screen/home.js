// import React, { Component } from "react";
// import {
//   StyleSheet,
//   View,
//   ScrollView,
//   ImageBackground,
//   Text,
//   TouchableOpacity
// } from "react-native";

// function Index(props) {
//   return (
//     <View style={styles.container}>
//       <View style={styles.scrollArea}>
//         <ScrollView
//           horizontal={true}
//           contentContainerStyle={styles.scrollArea_contentContainerStyle}
//         >
//           <ImageBackground
//             style={styles.rect3}
//             imageStyle={styles.rect3_imageStyle}
//             // source={require("./assets/images/Gradient_hO4iPCr.png")}
//           ></ImageBackground>
//           <View style={styles.rect2}></View>
//           <View style={styles.rect4}></View>
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
//     width: 360,
//     height: 885
//   },
//   scrollArea: {
//     width: 360,
//     height: 737,
//     backgroundColor: "rgba(230, 230, 230,1)",
//     marginTop: 148
//   },
//   scrollArea_contentContainerStyle: {
//     width: 360,
//     height: 737
//   },
//   rect3: {
//     width: 288,
//     height: 132,
//     borderRadius: 33,
//     marginTop: 33,
//     marginLeft: 37,
//     overflow: "hidden"
//   },
//   rect3_imageStyle: {},
//   rect2: {
//     width: 288,
//     height: 236,
//     backgroundColor: "rgba(0,0,0,1)",
//     borderRadius: 33,
//     marginTop: 16,
//     marginLeft: 35
//   },
//   rect4: {
//     width: 288,
//     height: 152,
//     backgroundColor: "rgba(0,0,0,1)",
//     borderRadius: 33,
//     marginTop: 16,
//     marginLeft: 37
//   },
//   comp: {
//     fontFamily: "abel-regular",
//     color: "#121212",
//     fontSize: 26,
//     marginTop: -885,
//     marginLeft: 9
//   },
//   tracking: {
//     fontFamily: "belanosima-700",
//     color: "#fe692e",
//     fontSize: 26,
//     width: 143,
//     height: 32,
//     marginTop: 42
//   },
//   button: {
//     width: 59,
//     height: 84,
//     backgroundColor: "#E6E6E6",
//     borderRadius: 15,
//     marginLeft: 106
//   },
//   trackingRow: {
//     height: 84,
//     flexDirection: "row",
//     marginTop: 31,
//     marginLeft: 15,
//     marginRight: 37
//   }
// });

// export default Index;


import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const HomePage = (props) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ImageBackground
        source={require('../../assets/background.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Pet Tracking App</Text>
          <Text style={styles.subtitle}>Track your furry friends with ease</Text>
          <TouchableOpacity
           onPress={() => props.navigation.navigate("Dog profile")}
           style={styles.button}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>

      <View style={styles.optionsContainer}>
        <Text style={styles.sectionTitle}>My Pet</Text>
        <ScrollView style={styles.featureScrollView} showsVerticalScrollIndicator={false}>
          <TouchableOpacity style={styles.optionCard} onPress={() => props.navigation.navigate("Pet info")}>
            <Text style={styles.optionTitle}>Add Pet Information</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionCard} onPress={() => props.navigation.navigate("Pet")}>
            <Text style={styles.optionTitle}>Pets Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionCard} onPress={() => props.navigation.navigate('Tracking')}>
            <Text style={styles.optionTitle}>Tracking</Text>
          </TouchableOpacity> 
          <TouchableOpacity style={styles.optionCard} onPress={() => props.navigation.navigate('AddProduct')}>
            <Text style={styles.optionTitle}>AddProductScreen</Text>
         </TouchableOpacity>
          <TouchableOpacity style={styles.optionCard} onPress={() => props.navigation.navigate('Products')}>
            <Text style={styles.optionTitle}>Products</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.optionCard} onPress={() => props.navigation.navigate("Dog profile")}>
            <Text style={styles.optionTitle}>Dog_profile</Text>
            </TouchableOpacity> */}
        </ScrollView>
      </View>
      
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  backgroundImage: {
    height: 250,
    justifyContent: 'flex-end',
  },
  contentContainer: {
    height: 250,
    paddingHorizontal: 16,
    paddingBottom: 32,
    paddingTop: 32,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#FFA500',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  optionsContainer: {
    paddingHorizontal: 16,
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#FFA500',
  },
  featureScrollView: {
    maxHeight: 350,
  },
  optionCard: {
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    padding: 16,
    borderWidth: 1,
    borderColor: '#FFA500',
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#FFA500',
  },
  optionDescription: {
    fontSize: 16,
    color: '#888',
  },
});

export default HomePage;
