import React from "react";
import { NavigationContainer } from "@react-navigation/native"; 
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screen/home";
import DogProfilePage from "./src/screen/Dog_profile";
import PetInformationForm from "./src/screen/Pet_info";
import Pet from "./src/screen/Pet";
import AddProductScreen from "./src/screen/AddProduct";
import ProductDetailsScreen from "./src/screen/Productdetails";
import TrackingScreen from "./src/screen/Tracking";
import 'react-native-gesture-handler';

const Stack = createNativeStackNavigator();

const Mystack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen name="Dog profile" component={DogProfilePage} />
        <Stack.Screen name="Pet info" component={PetInformationForm} />
        <Stack.Screen name="Pet" component={Pet} />
        <Stack.Screen name="AddProduct" component={AddProductScreen} />
        <Stack.Screen name="Products" component={ProductDetailsScreen} />
        <Stack.Screen name="Tracking" component={TrackingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Mystack;
