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

// import { withAuthenticator } from "aws-amplify-react-native";


const Stack = createNativeStackNavigator();

const Mystack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          // options={{title: 'Welcome'}}
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


// import React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { withAuthenticator } from "aws-amplify-react-native";
// import HomeScreen from "./src/screen/home";
// import DogProfilePage from "./src/screen/Dog_profile";
// import PetInformationForm from "./src/screen/Pet_info";
// import Pet from "./src/screen/Pet";

// import Amplify from '@aws-amplify';
// import { Amplify } from "@aws-amplify/core";
// // import Amplify from "@aws-amplify/core";
// import awsExports from './src/aws-exports';
// Amplify.configure({
//   ...awsExports,
//   Analytics: {
//     disabled: true,
//   },
// });

// const Stack = createNativeStackNavigator();

// const App = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen
//           name="Home"
//           component={HomeScreen}
//           // options={{title: 'Welcome'}}
//         />
//         <Stack.Screen name="Dog profile" component={DogProfilePage} />
//         <Stack.Screen name="Pet info" component={PetInformationForm} />
//         <Stack.Screen name="Pet" component={Pet} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default withAuthenticator(App);

