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
