import React, { useState } from 'react';
import { Alert, View, TextInput, Button,Text, } from 'react-native';
import { getAuth, signInWithEmailAndPassword, EmailAuthProvider } from 'firebase/auth';

import {auth} from '../../firebase';
function DeleteUserAccount({ navigation }) {
  const [promptVisible, setPromptVisible] = useState(false);
  const [password, setPassword] = useState('');
  
  const handlePromptSubmit = async () => {
    setPromptVisible(false);
  
    const auth = getAuth();
    const user = auth.currentUser;
  
    try {
        const credential = EmailAuthProvider.credential(
            user.email,
            password
          );
  
      // Reauthenticate the user with the credential
      await signInWithEmailAndPassword(auth, user.email, password);
  
      // Delete the user account
      await user.delete();
  
      console.log('User account deleted successfully.');
      Alert.alert('Account Deleted', 'Your account has been deleted.');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Welcome' }],
      });
    } catch (error) {
      console.log('Error deleting user account:', error);
      Alert.alert('Error', 'You entered the wrong password');
    }
  };
  
  const handlePromptCancel = () => {
    setPromptVisible(false);
  };
  // when users want to delete account function
  const handleDeletePress = async () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            const auth = getAuth();
            const user = auth.currentUser;
  
            setPassword('');
            setPromptVisible(true);
          },
        },
      ],
      { cancelable: true }
    );
  };
  
  return (
    <View>


 
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8 }}>Password Required</Text>
        <Text style={{ fontSize: 14, marginBottom: 16 }}>Please enter your password to delete your account.</Text>
        <TextInput
          secureTextEntry
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 4, padding: 8, marginBottom: 16 }}
        />
        <Button title='OK' onPress={() => handlePromptSubmit(password)} />
        <Button title='Cancel' onPress={handlePromptCancel} />
      </View>
   
  </View>
  );
  
}
export default DeleteUserAccount;