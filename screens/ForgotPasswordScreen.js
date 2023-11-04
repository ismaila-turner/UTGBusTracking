import React, { useState } from 'react';
import { View, TextInput, Button, Alert,Text } from 'react-native';

import {auth} from "../firebase"
import { initializeApp } from 'firebase/app';
import {firebase} from "../firebase"
import {  signInWithEmailAndPassword ,sendPasswordResetEmail} from 'firebase/auth';
const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');

  
  const changePassword = (email) => {
    if (!email.includes('@') ) {
      Alert.alert(
        'Error',
        'Invalid email address, Email format should be  "example@example.com". ',
        [{ text: 'OK', onPress: () => console.log('Invalid email') }],
        { cancelable: false }
      );
      return;
    }
    // Send password reset email
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Show success message
        alert("Password reset email sent");
      })
      .catch((error) => {
        // Show error message
        alert("Email not found in our database. Please Register");
      });
  };
  


 

  return (
    <View >
   
      <TextInput style={{margin:20, fontSize:17, alignSelf:'center',borderWidth:1,width:300, height:40,padding:10,borderColor:'gray',backgroundColor:'lightgray',borderRadius:10}}
        placeholder="Enter Your Email"
        value={email}
        onChangeText={setEmail}
      />
  
  <Button title="Forgot Password" onPress={() => {changePassword(email)}} />

    </View>
  );
};

export default ForgotPasswordScreen;
