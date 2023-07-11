import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { S3 } from 'aws-sdk';
import * as ImagePicker from 'expo-image-picker';

const s3 = new S3({
  accessKeyId: 'AKIA3T6IPBTZF656JA3S',
  secretAccessKey: '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',
  region: 'us-east-1',
});

const PetInformationForm = () => {
  const [name, setName] = useState("");
  const [ownername, setOwnerName] = useState("");
  const [PetType, setSelected] = React.useState("");
  const [breed, setBreed] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async () => {
    const Pet = {
      name,
      ownername,
      PetType,
      breed,
      gender,
      age,
      weight,
      image,
    };

    try {
      await storePetData(Pet);
      console.log('Pet data stored successfully');
      // Show success message or navigate to another screen
    } catch (error) {
      console.error('Error storing Pet data:', error);
      // Show error message or handle the error
    }
  };

  const storePetData = async (Pet) => {
    const bucketName = 'amplify-awesomeproject-dev-104256-deployment';
    const objectKey = `Pets/${Pet.name}.json`;

    const params = {
      Bucket: bucketName,
      Key: objectKey,
      Body: JSON.stringify(Pet),
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
    // setImage(image.assets);
  };

  const data = [
    { key: "1", value: "Dog" },
    { key: "2", value: "Cat" },
    { key: "3", value: "Bird"},
    { key: "4", value: "Cow" },
    { key: "5", value: "Horse" },
    { key: "6", value: "Goat" },
    { key: "7", value: "Hamster" },
  ];

  return (
    <ScrollView>
    <View style={styles.container}>
      <Text style={styles.title}>Pet Information Form</Text>

      <Text style={styles.label}>Owner Name :</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter name"
        value={ownername}
        onChangeText={setOwnerName}
      />

      <Text style={styles.label}>Pet Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Name"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Pet Type:</Text>
      <SelectList
        setSelected={(val) => setSelected(val)}
        data={data}
        save="value"
      />

      <Text style={styles.label}>Gender:</Text>
      <View style={styles.radioGroup}>
        <TouchableOpacity
          style={[
            styles.radioButton,
            gender === "male" && styles.radioButtonSelected,
          ]}
          onPress={() => setGender("male")}
        >
          <Text
            style={[
              styles.radioButtonLabel,
              gender === "male" && styles.radioButtonLabelSelected,
            ]}>Male
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.radioButton,
            gender === "female" && styles.radioButtonSelected,
          ]}
          onPress={() => setGender("female")}
        >
          <Text
            style={[
              styles.radioButtonLabel,
              gender === "female" && styles.radioButtonLabelSelected,
            ]}
          >
            Female
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Breed:</Text>
      <TextInput
        style={styles.input}
        placeholder="Breed"
        value={breed}
        onChangeText={setBreed}
      />

      <Text style={styles.label}>Age:</Text>
      <TextInput
        style={styles.input}
        placeholder="Age"
        value={age}
        onChangeText={setAge}
      />

      <Text style={styles.label}>Weight:</Text>
      <TextInput
        style={styles.input}
        placeholder="Weight"
        value={weight}
        onChangeText={setWeight}
      />
      {image && (
        <Image source={{ uri: image }} style={styles.previewImage} resizeMode="cover" />
      )}
      {/* <Image source={{uri:pickerResult[0].uri}} style={styles.imageStyle}/> */}

      <TouchableOpacity style={styles.uploadButton} onPress={handleImageUpload}>
        <Text style={styles.uploadButtonText}>Upload Image</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.uploadButton} onPress={handleSubmit}>
        <Text style={styles.uploadButtonText}>Add Pet</Text>
      </TouchableOpacity>

      {/* <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity> */}
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
    backgroundColor: "#fff",
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  radioGroup: {
    flexDirection: "row",
    marginBottom: 16,
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  radioButtonSelected: {
    borderColor: "#FFA500",
  },
  radioButtonLabel: {
    fontSize: 16,
    marginLeft: 8,
    color: "#888",
  },
  radioButtonLabelSelected: {
    color: "#FFA500",
  },

  button: {
    backgroundColor: "#FFA500",
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  previewImage: {
    width: '100%',
    height: 200,
    marginBottom: 16,
    borderRadius: 8,
  },
});

export default PetInformationForm;




// import React, { useState } from 'react';
// import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

// const PetInformationForm = () => {
//   const [name, setName] = useState('');
//   const [ownername, setOwnerName] = useState('');
//   const [type, setType] = useState('');
//   const [breed, setBreed] = useState('');
//   const [gender, setGender] = useState('');
//   const [age, setAge] = useState('');
//   const [weight, setWeight] = useState('');

//   const handleSubmit = () => {
//     // Handle form submission here
//     console.log('Form submitted');
//     console.log('Name:', name);
//     console.log('ownername:', ownername);
//     console.log('Type:', type);
//     console.log('Breed:', breed);
//     console.log('Gender:', gender);
//     console.log('Age:', age);
//     console.log('Weight:', weight);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Pet Information Form</Text>

//       <TextInput
//         style={styles.input}
//         placeholder="Name of the pet"
//         value={name}
//         onChangeText={setName}
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Name of the pet owner"
//         value={ownername}
//         onChangeText={setOwnerName}
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Type of pet"
//         value={type}
//         onChangeText={setType}
//       />

//      {/* <RadioGroup
//       style={styles.input}
//       placeholder="select gender of pet"
//       value={gender}
//       onChangeText={setGender}
//       /> */}

//     <Text style={styles.label}>Gender:</Text>
//       <View style={styles.radioGroup}>
//         <TouchableOpacity
//           style={[styles.radioButton, gender === 'male' && styles.radioButtonSelected]}
//           onPress={() => setGender('male')}
//         >
//           <Text style={[styles.radioButtonLabel, gender === 'male' && styles.radioButtonLabelSelected]}>Male</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[styles.radioButton, gender === 'female' && styles.radioButtonSelected]}
//           onPress={() => setGender('female')}
//         >
//           <Text style={[styles.radioButtonLabel, gender === 'female' && styles.radioButtonLabelSelected]}>Female</Text>
//         </TouchableOpacity>
//       </View>

//       <TextInput
//         style={styles.input}
//         placeholder="Breed"
//         value={breed}
//         onChangeText={setBreed}
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Age"
//         value={age}
//         onChangeText={setAge}
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Weight"
//         value={weight}
//         onChangeText={setWeight}
//       />

//       <TouchableOpacity style={styles.button} onPress={handleSubmit}>
//         <Text style={styles.buttonText}>Submit</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     paddingHorizontal: 16,
//     backgroundColor: '#fff',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 24,
//     textAlign: 'center',
//   },
//   input: {
//     height: 40,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     marginBottom: 16,
//     paddingHorizontal: 12,
//   },
//   button: {
//     backgroundColor: '#FFA500',
//     paddingVertical: 12,
//     borderRadius: 8,
//   },
//   buttonText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#fff',
//     textAlign: 'center',
//   },
// });

// export default PetInformationForm;