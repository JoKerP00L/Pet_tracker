import React, { useState } from 'react';
import { View, TextInput, Button, Image, StyleSheet, TouchableOpacity , Text} from 'react-native';
import { S3 } from 'aws-sdk';
import * as ImagePicker from 'expo-image-picker';

const s3 = new S3({
  accessKeyId: 'ENTER_ACCESS_KEY',
  secretAccessKey: 'ENTER_SECRET_ACCESS_KEY',
  region: 'ENTER_REGION',
});

const AddProductScreen = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const handleAddProduct = async () => {
    const product = {
      name,
      price,
      description,
      image,
    };

    try {
      await storeProductData(product);
      console.log('Product data stored successfully');
      // Show success message or navigate to another screen
    } catch (error) {
      console.error('Error storing product data:', error);
      // Show error message or handle the error
    }
  };

  const storeProductData = async (product) => {
    const bucketName = 'ENTER_BUCKET_NAME';
    const objectKey = `products/${product.name}.json`;

    const params = {
      Bucket: bucketName,
      Key: objectKey,
      Body: JSON.stringify(product),
    };

    await s3.putObject(params).promise();
  };

  const handleImageUpload = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert('Permission to access camera roll is required!');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    // if (pickerResult.cancelled) {
    //   return;
    // }
    if (pickerResult.didCancel) {
                return;
    }

    setImage(pickerResult.uri);
  };

  return (
    <View style={styles.container}>
    
      <TextInput
        style={styles.input}
        placeholder="Product Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      {image && (
        <Image source={{ uri: image }} style={styles.previewImage} resizeMode="cover" />
      )}
      <TouchableOpacity style={styles.uploadButton} onPress={handleImageUpload}>
        <Text style={styles.uploadButtonText}>Upload Image</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.uploadButton} onPress={handleAddProduct}>
        <Text style={styles.uploadButtonText}>Add Product</Text>
      </TouchableOpacity>
      {/* <Button title="Add Product" onPress={handleAddProduct} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  uploadButton: {
    marginBottom: 16,
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#FFA500',
    borderRadius: 8,
  },
  uploadButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 12,
  },
  previewImage: {
    width: '100%',
    height: 200,
    marginBottom: 16,
    borderRadius: 8,
  },
});

export default AddProductScreen;


// import React, { useState } from 'react';
// import { View, TextInput, Button, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
// import { S3 } from 'aws-sdk';
// import * as ImagePicker from 'expo-image-picker';

// const s3 = new S3({
//   accessKeyId: 'AKIA3T6IPBTZF656JA3S',
//   secretAccessKey: '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',
//   region: 'us-east-1',
// });

// const AddProductScreen = () => {
//   const [name, setName] = useState('');
//   const [price, setPrice] = useState('');
//   const [description, setDescription] = useState('');
//   const [imageData, setImageData] = useState(null);

//   const handleAddProduct = async () => {
//     const product = {
//       name,
//       price,
//       description,
//       image: imageData,
//     };

//     try {
//       await storeProductData(product);
//       console.log('Product data stored successfully');
//       // Show success message or navigate to another screen
//     } catch (error) {
//       console.error('Error storing product data:', error);
//       // Show error message or handle the error
//     }
//   };

//   const storeProductData = async (product) => {
//     const bucketName = 'amplify-awesomeproject-dev-104256-deployment';
//     const objectKey = `products/${product.name}.json`;

//     const params = {
//       Bucket: bucketName,
//       Key: objectKey,
//       Body: JSON.stringify(product),
//     };

//     await s3.putObject(params).promise();
//   };

//   const handleImageUpload = async () => {
//     const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (!permissionResult.granted) {
//       alert('Permission to access camera roll is required!');
//       return;
//     }

//     const pickerResult = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       quality: 1,
//     });

//     // if (pickerResult.cancelled) {
//     //   return;
//     // }

//     if (pickerResult.didCancel) {
//         return;
//       }

//     // if (!pickerResult.canceled) {
//     //     console.log(pickerResult);
//     //   } else {
//     //     alert('You did not select any image.');
//     //   }
//     // };
  

//     const imageData = await convertImageToBase64(pickerResult.assets[0].uri);
//     setImageData(imageData);
//   };

//   const convertImageToBase64 = async (imageUri) => {
//     const response = await fetch(imageUri);
//     const blob = await response.blob();
//     const base64Data = await blobToBase64(blob);
//     return base64Data;
//   };

//   const blobToBase64 = (blob) => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onerror = reject;
//       reader.onload = () => {
//         resolve(reader.result);
//       };
//       reader.readAsDataURL(blob);
//     });
//   };

//   return (
//     <View style={styles.container}>
//       {imageData && (
//         <Image source={{ uri: `data:image/jpeg;base64,${imageData}` }} style={styles.previewImage} resizeMode="cover" />
//       )}

//       <TouchableOpacity style={styles.uploadButton} onPress={handleImageUpload}>
//         <Text style={styles.uploadButtonText}>Upload Image</Text>
//       </TouchableOpacity>

//       <TextInput
//         style={styles.input}
//         placeholder="Product Name"
//         value={name}
//         onChangeText={setName}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Price"
//         value={price}
//         onChangeText={setPrice}
//         keyboardType="numeric"
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Description"
//         value={description}
//         onChangeText={setDescription}
//         multiline
//       />
//       <Button title="Add Product" onPress={handleAddProduct} />
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
//   uploadButton: {
//     marginBottom: 16,
//     paddingVertical: 12,
//     paddingHorizontal: 24,
//     backgroundColor: '#FFA500',
//     borderRadius: 8,
//   },
//   uploadButtonText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//   input: {
//     width: '100%',
//     height: 40,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     marginBottom: 16,
//     paddingHorizontal: 12,
//   },
//   previewImage: {
//     width: '100%',
//     height: 200,
//     marginBottom: 16,
//     borderRadius: 8,
//   },
// });

// export default AddProductScreen;
