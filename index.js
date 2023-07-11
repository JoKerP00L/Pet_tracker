// import { AppRegistry } from "react-native";
// import App from "./App";
// import { name as appName } from "./app.json";
// import Amplify from "aws-amplify";
// import awsconfig from "./aws-exports";
// import { Component } from "react/cjs/react.production.min";

// Amplify.configure({
//   ...awsconfig,
//   Analytics: {
//     disabled: true,
//   },
// });

// AppRegistry.registerComponent(appName, componentProvider:() => App);

import {AppRegistry} from 'react-native';
import App from './App';
import name  from './app.json';
import 'react-native-gesture-handler';
// import awsconfig from './src/aws-exports';
// import Amplify from 'aws-amplify';
// import { Amplify } from "aws-amplify";
// import Amplify from "@aws-amplify/core";

// Amplify.configure({
//   ...awsconfig,
//   Analytics: {
//     disabled: true,
//   },
// });

import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './src/aws-exports';

Amplify.configure(awsconfig);

// >>New - Configuring Auth Module
Auth.configure(awsconfig);
AppRegistry.registerComponent(name, () => App);