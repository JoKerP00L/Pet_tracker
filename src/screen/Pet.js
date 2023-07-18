import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, ActivityIndicator, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { S3 } from 'aws-sdk';

const s3 = new S3({
    accessKeyId: 'ENTER_ACCESS_KEY',
  secretAccessKey: 'ENTER_SECRET_ACCESS_KEY',
    region: 'ENTER_REGION',
});
const bucketName = 'ENTER_BUCKET_NAME';

const Pet = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    fetchProductData();
  }, []);

  const fetchProductData = async () => {
        try {
          const response = await s3.listObjectsV2({ Bucket: bucketName, Prefix: 'ENTER_FILE_PREFIX' }).promise();
          const productKeys = response.Contents.map((object) => object.Key);
          const productData = await Promise.all(
            productKeys.map((key) => s3.getObject({ Bucket: bucketName, Key: key }).promise())
          );
          const pets = productData.map((data) => JSON.parse(data.Body.toString()));
          setPets(pets);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching product data:', error);
          // Show error message or handle the error
        }
      };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setIsModalVisible(false);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (pets.length === 0) {
    return (
      <View style={styles.container}>
        <Text>No pets found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={pets}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.productItem}
            onPress={() => handleImageClick(item.image)}
          >
            <View style={styles.imageContainer}>
              {item.image && (
                <Image source={{ uri: item.image }} style={styles.productImage} />
              )}
            </View>
            <View style={styles.productInfoContainer}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productPrice}>Owners name:- {item.ownername}</Text>
              <Text style={styles.productPrice}>PetType:- {item.PetType}</Text>
              <Text style={styles.productPrice}>Breed:- {item.breed}</Text>
              <Text style={styles.productPrice}>Gender:- {item.gender}</Text>
              <Text style={styles.productPrice}>Age:- {item.age}</Text>
              <Text style={styles.productPrice}>Weight:- {item.weight}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      <Modal visible={isModalVisible} transparent>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.modalCloseButton} onPress={closeModal}>
            <Text style={styles.modalCloseButtonText}>Close</Text>
          </TouchableOpacity>
          <Image source={{ uri: selectedImage }} style={styles.modalImage} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  imageContainer: {
    width: 120,
    height: 120,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    overflow: 'hidden',
  },
  productImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  productInfoContainer: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 16,
    color: '#888',
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 14,
    color: '#555',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalCloseButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
  },
  modalCloseButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
  modalImage: {
    width: '90%',
    height: '90%',
    resizeMode: 'contain',
  },
});

export default Pet;

//og woring code
// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';
// import * as Location from 'expo-location';

// const Pet = () => {
//   const [location, setLocation] = useState(null);
//   const [currentRegion, setCurrentRegion] = useState(null);

//   useEffect(() => {
//     getLocation();
//   }, []);

//   const getLocation = async () => {
//     const { status } = await Location.requestForegroundPermissionsAsync();

//     if (status === 'granted') {
//       const location = await Location.getCurrentPositionAsync({});
//       setLocation(location);
//       setCurrentRegion({
//         latitude: location.coords.latitude,
//         longitude: location.coords.longitude,
//         latitudeDelta: 0.02,
//         longitudeDelta: 0.02,
//       });
//     }
//   };

//   const handleRefresh = () => {
//     getLocation();
//   };

//   const handleViewCurrentLocation = () => {
//     if (location) {
//       setCurrentRegion({
//         latitude: location.coords.latitude,
//         longitude: location.coords.longitude,
//         latitudeDelta: 0.02,
//         longitudeDelta: 0.02,
//       });
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Pet Tracking</Text>

//       {location ? (
//         <View style={styles.mapContainer}>
//           <MapView
//             style={styles.map}
//             region={currentRegion}
//           >
//             <Marker
//               coordinate={{
//                 latitude: location.coords.latitude,
//                 longitude: location.coords.longitude,
//               }}
//               title="Current Location"
//             />
//           </MapView>
//         </View>
//       ) : (
//         <Text>Loading location...</Text>
//       )}

//       <TouchableOpacity style={styles.button} onPress={handleRefresh}>
//         <Text style={styles.buttonText}>Refresh Location</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.button} onPress={handleViewCurrentLocation}>
//         <Text style={styles.buttonText}>View Current Location</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 16,
//   },
//   mapContainer: {
//     width: '80%',
//     height: '50%',
//     borderWidth: 2,
//     borderColor: '#00000',
//     borderRadius: 8,
//     overflow: 'hidden',
//   },
//   map: {
//     flex: 1,
//   },
//   button: {
//     marginTop: 16,
//     paddingVertical: 12,
//     paddingHorizontal: 24,
//     backgroundColor: '#FFA500',
//     borderRadius: 8,
//   },
//   buttonText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#fff',
//   },
// });

// export default Pet;
