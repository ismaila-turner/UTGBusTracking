import {StyleSheet, View, Text,TextInput,Button,ActivityIndicator } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { Alert } from 'react-native';
import { useState,useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native';
import {db} from "../firebase"
import {firebase} from "../firebase"
import { getFirestore, collection, addDoc } from 'firebase/firestore';

import NetInfo from '@react-native-community/netinfo';





import { StackActions } from '@react-navigation/native';


// import{collection, getDocs, addDoc} from "firebase/firestore"
// import firebase from 'firebase/app';
// import { initializeApp } from 'firebase/app';
// import { getFirestore } from 'firebase/firestore';
import {auth} from "../firebase"

// const firebaseConfig = {
//   // Add your Firebase config here
//   apiKey: "AIzaSyDY81JcIwZboU3ZKN5Fa2XlVRp_lgWvElg",
  
//   authDomain: "nek-gambia.firebaseapp.com",

//   projectId: "nek-gambia",

//   storageBucket: "nek-gambia.appspot.com",

//   messagingSenderId: "246701938466",

//   appId: "1:246701938466:web:64c44423c7686ba465377b",

//   measurementId: "G-79Q3W3E9F4"
// };

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getFirestore(app);

// import { initializeApp } from 'firebase/app';
// import { getFirestore } from 'firebase/firestore';
// import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
// import * as firebase from 'firebase/app';
// import 'firebase/auth';
// Example of creating a user with email and password
import { initializeApp } from 'firebase/app';
import {  createUserWithEmailAndPassword } from 'firebase/auth';
import axios from 'axios';


// const db = SQLite.openDatabase('nakgambia.db');
export default function Register  ({navigation}) {
  const [name, setName] = useState('');
  const [telephone, setTelephone] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const addEmployee = async () => {
    try {
      const isConnected = await NetInfo.fetch().then(state => state.isConnected);

      if (!isConnected) {
        Alert.alert('Please check your internet connection.');
        return;
      }

      if (!name || !address || !email || !password) {
        Alert.alert('All fields are required!');
        return;
      }

      setLoading(true);

      await addDoc(collection(db, 'studentTable'), {
        name,
        // telephone,
        address,
        email,
        password,
        time: new Date().toISOString(),
      });

      console.log('Register successfully! Please Login');
      setName('');
      // setTelephone('');
      setAddress('');
      setEmail('');
      setPassword('');
      Alert.alert('Register successfully! Please Login');
      navigation.navigate('StudentLogin');

    } catch (err) {
      console.error('Error adding Student:', err);
      Alert.alert('Error adding Student:', err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView>
      <Text style={styles.textstyle1}> Please Register by filling all the information below. Make sure you register with a vallid email address </Text>

      <TextInput
        style={styles.input}
        placeholder=" Name"
        value={name}
        onChangeText={setName}
      />
  
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="UTG Emial"
        value={email}
        onChangeText={setEmail}
      />
         <TextInput
        style={styles.input}
        placeholder="Password(MAT Number)"
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Register" onPress={addEmployee} />


      {loading && <ActivityIndicator size="large" color="blue" />}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    margin:10,
    marginTop:20,
  }, textstyle1:{
    margin:3,
    padding: 10,
    fontSize:15,
    
    justifyContent:'center',
     color:'black',
    alignSelf: 'center',
    textTransform:'capitalize',
  },
  input: {
fontSize:17,
    borderColor: 'black',
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
    borderBottomWidth:2


  },
  textstyle:{
    margin:10,
    padding: 2,
    fontSize:15,
    
    justifyContent:'center',
     color:'black',
    alignSelf: 'center',
    textTransform:'capitalize',
  },
  header: {
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 20,
  },

  avatar: {
    width: 200,
    height: 170,
    borderRadius: 100,
    marginBottom: 20,
  },


  
  inputstyle:{


borderBottomWidth:2.3,
borderBottomColor:'blue',
backgroundColor:'white',

margin:10,


padding:15,
width:330,
alignItems: 'center',
justifyContent: 'center',
marginLeft:10,
borderRadius:10,
fontSize:17


  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 10,
    height: 24,
    margin:100,
    
color:'white'
  },
});
