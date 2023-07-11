import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, ActivityIndicator, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { S3 } from 'aws-sdk';

const s3 = new S3({
    accessKeyId: 'AKIA3T6IPBTZF656JA3S',
    secretAccessKey: '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',
    region: 'us-east-1',
});
const bucketName = 'amplify-awesomeproject-dev-104256-deployment';

const ProductScreen = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    fetchProductData();
  }, []);

  const fetchProductData = async () => {
        try {
          const response = await s3.listObjectsV2({ Bucket: bucketName, Prefix: 'products/' }).promise();
          const productKeys = response.Contents.map((object) => object.Key);
          const productData = await Promise.all(
            productKeys.map((key) => s3.getObject({ Bucket: bucketName, Key: key }).promise())
          );
          const products = productData.map((data) => JSON.parse(data.Body.toString()));
          setProducts(products);
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

  if (products.length === 0) {
    return (
      <View style={styles.container}>
        <Text>No products found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
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
              <Text style={styles.productPrice}>{item.price}</Text>
              <Text style={styles.productDescription}>{item.description}</Text>
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

export default ProductScreen;
















//------------------------------------------------------------------
// import React, { useEffect, useState } from 'react';
// import { View, Text, FlatList, ActivityIndicator, StyleSheet, Image } from 'react-native';
// import { S3 } from 'aws-sdk';

// const s3 = new S3({
//     accessKeyId: 'AKIA3T6IPBTZF656JA3S',
//     secretAccessKey: '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',
//     region: 'us-east-1',
// });
// const bucketName = 'amplify-awesomeproject-dev-104256-deployment';

// const ProductScreen = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchProductData();
//   }, []);

//   const fetchProductData = async () => {
//     try {
//       const response = await s3.listObjectsV2({ Bucket: bucketName, Prefix: 'products/' }).promise();
//       const productKeys = response.Contents.map((object) => object.Key);
//       const productData = await Promise.all(
//         productKeys.map((key) => s3.getObject({ Bucket: bucketName, Key: key }).promise())
//       );
//       const products = productData.map((data) => JSON.parse(data.Body.toString()));
//       setProducts(products);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching product data:', error);
//       // Show error message or handle the error
//     }
//   };

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#000" />
//       </View>
//     );
//   }

//   if (products.length === 0) {
//     return (
//       <View style={styles.container}>
//         <Text>No products found</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={products}
//         keyExtractor={(item) => item.name}
//         renderItem={({ item }) => (
//           <View style={styles.productItem}>
//             <View style={styles.imageContainer}>
//               {item.image && (
//                 <Image source={{ uri: item.image }} style={styles.productImage} />
//               )}
//             </View>
//             <View style={styles.productInfoContainer}>
//               <Text style={styles.productName}>Name:-{item.name}</Text>
//               <Text style={styles.productPrice}>Price:-{item.price}</Text>
//               <Text style={styles.productDescription}>Description:- {item.description}</Text>
//             </View>
//           </View>
//         )}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F8F8F8',
//     paddingHorizontal: 20,
//     paddingTop: 20,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   productItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 20,
//     backgroundColor: '#FFF',
//     borderRadius: 10,
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 3,
//   },
//   imageContainer: {
//     width: 120,
//     height: 120,
//     borderTopLeftRadius: 10,
//     borderBottomLeftRadius: 10,
//     overflow: 'hidden',
//   },
//   productImage: {
//     flex: 1,
//     resizeMode: 'cover',
//   },
//   productInfoContainer: {
//     flex: 1,
//     paddingVertical: 10,
//     paddingHorizontal: 15,
//   },
//   productName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 8,
//   },
//   productPrice: {
//     fontSize: 16,
//     color: '#888',
//     marginBottom: 4,
//   },
//   productDescription: {
//     fontSize: 14,
//     color: '#555',
//   },
// });

// export default ProductScreen;
//------------------------------------------------------------









// import React, { useEffect, useState } from 'react';
// import { View, Text, FlatList, Image, ActivityIndicator, StyleSheet,} from 'react-native';
// import { S3 } from 'aws-sdk';

// const s3 = new S3({
//     accessKeyId: 'AKIA3T6IPBTZF656JA3S',
//     secretAccessKey: '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',
//     region: 'us-east-1',
// });
// const bucketName = 'amplify-awesomeproject-dev-104256-deployment';

// const ProductScreen = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchProductData();
//   }, []);

// //   const fetchProductData = async () => {
// //     try {
// //     //   const response = await s3.getObject({ Bucket: bucketName, Key: 'products.json' }).promise();
// //       const response = await s3.listObjectsV2({ Bucket: bucketName, Prefix: 'products/' }).promise();
// //       const productData = JSON.parse(response.Body.toString());
// //       setProducts(productData);
// //       setLoading(false);
// //     } catch (error) {
// //       console.error('Error fetching product data:', error);
// //       // Show error message or handle the error
// //     }
// //   };
//   const fetchProductData = async () => {
//     try {
//       const response = await s3.listObjectsV2({ Bucket: bucketName, Prefix: 'products/' }).promise();
//       const productKeys = response.Contents.map((object) => object.Key);
//       const productData = await Promise.all(
//         productKeys.map((key) => s3.getObject({ Bucket: bucketName, Key: key }).promise())
//       );
//       const products = productData.map((data) => JSON.parse(data.Body.toString()));
//       setProducts(products);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching product data:', error);
//       // Show error message or handle the error
//     }
//   };



//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#000" />
//       </View>
//     );
//   }

//   if (products.length === 0) {
//     return (
//       <View style={styles.container}>
//         <Text>No products found</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={products}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={({ item }) => (
//           <View style={styles.productItem}>
//             {item.image && (
//               <Image source={{ uri: item.image }} style={styles.productImage} />
//             )}
//             <Text style={styles.productName}>{item.name}</Text>
//             <Text style={styles.productPrice}>{item.price}</Text>
//             <Text style={styles.productDescription}>{item.description}</Text>
//           </View>
//         )}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   productItem: {
//     marginBottom: 16,
//   },
//   productImage: {
//     width: 200,
//     height: 200,
//     marginBottom: 8,
//     borderRadius: 8,
//   },
//   productName: {
//     fontSize: 24,
//     fontWeight: 'bold',
//   },
//   productPrice: {
//     fontSize: 18,
//   },
//   productDescription: {
//     fontSize: 16,
//   },
// });

// export default ProductScreen;
