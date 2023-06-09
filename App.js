import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import { useState, useEffect } from 'react';

import { initializeApp } from 'firebase/app';
import { getFirestore, disableNetwork, enableNetwork } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNetInfo } from '@react-native-community/netinfo';

import Start from './components/Start';
import Chat from './components/Chat';

// Create the navigator
const Stack = createNativeStackNavigator();

const App = () => {

    // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBrUw4X3DkHBPeiCmgbWTdz8Cg5rwzOi3c",
    authDomain: "hello-world-f2462.firebaseapp.com",
    projectId: "hello-world-f2462",
    storageBucket: "hello-world-f2462.appspot.com",
    messagingSenderId: "576904109475",
    appId: "1:576904109475:web:100cbf16ec474163fdce16"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);
   // Initialize Firebase Storage and get a reference to the service
  const storage = getStorage(app);

  const connectionStatus = useNetInfo();

  useEffect(() => {
    if(connectionStatus.isConnected === false){
      Alert.alert('Connection lost!');
      disableNetwork(db);
    } else if(connectionStatus.isConnected === true){
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  return (
    <NavigationContainer>
      
      <Stack.Navigator
        initialRouteName='Start'
      >
        <Stack.Screen
          name='Start'
          component={Start}
        />
        <Stack.Screen
          name='Chat'
        >
          {props => <Chat
            isConnected={connectionStatus.isConnected}
            db={db}
            storage={storage}
            {...props}
          />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center'
//   },
//   textInput: {
//     width: '88%',
//     borderWidth: 1,
//     height: 50,
//     padding: 10
//   },
//   textDisplay: {
//     height: 50,
//     lineHeight: 50,
//     backgroundColor: 'blue'
//   }
// });

export default App;
