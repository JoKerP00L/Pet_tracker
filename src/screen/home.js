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
