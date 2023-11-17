import React, { useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet,Share ,useColorScheme ,Button,Alert} from 'react-native';
import {auth} from '../../firebase';
import {firebase} from "../../firebase"
import { StackActions } from '@react-navigation/native';
import {  signInWithEmailAndPassword ,sendPasswordResetEmail,EmailAuthProvider} from 'firebase/auth';

import { getAuth,  } from 'firebase/auth';


const Settings = ({ navigation }) => {

  const colorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === 'dark');
  

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

// logout function 

  const logout = () => {
    Alert.alert(
      'Confirm',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', onPress: () => console.log('Cancel pressed') },
        {
          text: 'OK',
          onPress: () => {
            auth.signOut()
              .then(() => {
                alert('Logged out successfully');
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Welcome' }],
                });
              })
              .catch(error => alert(error.message));
          },
        },
      ],
      { cancelable: false }
    );
  };
  // function logout() {
  //   navigation.reset({
  //     index: 0,
  //     routes: [{ name: 'Welcome' }],
  //   });
  // }

// const changePassword =()=>{
  
// firebase.auth().sendPasswordRestEmail(firebase.auth().currentUser.email)
// .then(() =>{
//   alert("password reset email sent")
// }).catch ((error) =>{
//   alert(error)
// })
// }
// change password function
const changePassword = () => {
  const user = auth.currentUser;
  if (!user) {
    // User is not signed in
    alert("User is not signed in");
    return;
  }
  
  // Send password reset email
  sendPasswordResetEmail(auth, user.email)
    .then(() => {
      // Prompt user to enter new password
      let newPassword 
     
      // Reset password
      user.updatePassword(newPassword)
        .then(() => {
          // Show success message
          alert("Password reset successful");
        })
        .catch((error) => {
          // Show error message
          alert("An Email has been send to you to change your password");
        });
    })
    .catch((error) => {
      // Show error message
      alert("An Email has been send to you to change your password");
    });
};

  const share = async () => {
    try {
        const result = await Share.share({
        
          message: 'Check out this awesome app called UTGBusTracking in the Play Store & App Store!',
            title: 'Invite a friend'
        });

        if (result.action === Share.sharedAction) {
            if (result.activityType) {
                // shared with activity type of result.activityType
            } else {
                // shared
            }
        } else if (result.action === Share.dismissedAction) {
            // dismissed
        }
    } catch (error) {
        alert(error.message);
    }
};


function whenaccountdeleted() {
  navigation.dispatch(StackActions.replace('Login'));
}
function deleteUserAccount() {
  Alert.alert(
    'Delete Account',
    'Are you sure you want to delete your account? This action cannot be undone.',
    [
      {
        text: 'Cancel',
        style: 'cancel'
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          const auth = getAuth();
          const user = auth.currentUser;

          // Prompt the user to reauthenticate before deleting their account
          try {
            const password = await new Promise((resolve, reject) => {
              Alert.prompt(
                'Password Required',
                'Please enter your password to delete your account.',
                [
                  { text: 'Cancel', style: 'cancel' },
                  { text: 'OK', onPress: resolve },
                ],
                'secure-text'
              );
            });
            const credential = EmailAuthProvider.credential(
              user.email,
              password
            );

            // Reauthenticate the user with the credential
            await signInWithEmailAndPassword(auth, user.email, password);

            // Delete the user account
            await user.delete();

            console.log("User account deleted successfully.");
            Alert.alert('Account Deleted', 'Your account has been deleted.');
            navigation.reset({
              index: 0,
              routes: [{ name: 'WELCOME TO NEK GAMBIA' }],
            });
          } catch (error) {
            console.log("Error deleting user account:", error);
            Alert.alert('Error', 'You  entered the wrong password');
          }
        }
      }
    ],
    { cancelable: true }
  );
}





  return (
    <ScrollView>
        <View style={[styles.container, { backgroundColor: isDarkMode ? 'black' : 'white' }]}>
        {/* <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Text  style={styles.textstyle} >Profile</Text>
        </TouchableOpacity> */}
       
       
          <TouchableOpacity  onPress={() => share()}>
          <Text  style={styles.textstyle}  >Share App</Text>
        </TouchableOpacity>
     
        {/* <Button title={isDarkMode ? 'Light Mode' : 'Dark Mode'} onPress={toggleDarkMode} /> */}
     

     
        <TouchableOpacity onPress={() => navigation.navigate('Legal and policies')}>
          <Text  style={styles.textstyle}  >Terms and Policies </Text>
        </TouchableOpacity>


        <TouchableOpacity onPress={() => navigation.navigate('Report')}>
          <Text  style={styles.textstyle} >Report a problem</Text>
        </TouchableOpacity>


        <TouchableOpacity onPress={() => navigation.navigate('Contact')}>
          <Text  style={styles.textstyle} >Contact us</Text>
        </TouchableOpacity>
{/* 
        <TouchableOpacity onPress={() => {changePassword()}}>
          <Text  style={styles.textstyle} >Change Password</Text>

        </TouchableOpacity> */}

        <TouchableOpacity onPress={logout}>
          <Text  style={styles.textstyle} >Logout</Text>

        </TouchableOpacity>
     

        <TouchableOpacity  onPress={() => navigation.navigate('DeleteAccount')}>
          <Text  style={{color:'red',fontSize:20,
margin:15,}} >Delete Acount</Text>

        </TouchableOpacity>

      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
    container: {

   margin:10,

     

paddingBottom:20,

    
   
 
     
   
    }, 
textstyle:{
fontSize:20,
margin:15,

color:'blue'

}
});

export default Settings;

