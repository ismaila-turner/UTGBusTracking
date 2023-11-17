import React, { useState, useEffect } from 'react';
import {Share, View, Text, Image, StyleSheet, ScrollView, Button, TextInput ,Alert} from 'react-native';
// import * as MediaLibrary from 'expo-media-library';
// import * as ImagePicker from 'expo-image-picker';
// import * as SQLite from 'expo-sqlite'
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {auth} from "../firebase"
import {  signInWithEmailAndPassword ,sendPasswordResetEmail} from 'firebase/auth';
import firebase from 'firebase/app';
import Icon from 'react-native-vector-icons/Ionicons';
import { StackActions } from '@react-navigation/native';
import {  createUserWithEmailAndPassword,EmailAuthProvider,reauthenticateWithCredential } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { getAuth,  } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

import { initializeApp } from 'firebase/app';
const StudentProfile = ({ navigation }) => {
  const [name, setname] = useState('');
  const [address, setAddress] = useState('');
  const [nationality, setNationality] = useState('');
  const [telephone, setTelephone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [imageurl, setImageurl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [creationTime, setCreationTime] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [lastSignInTime, setLastSignInTime] = useState(null);


  const firebaseConfig = {
    // Add your Firebase config here
    apiKey: "AIzaSyBn4dN2LqHTEqMivhKoFR6orrvdZottX_Y",
    authDomain: "driversbustracker.firebaseapp.com",
    projectId: "driversbustracker",
    storageBucket: "driversbustracker.appspot.com",
    messagingSenderId: "710645626633",
    appId: "1:710645626633:web:7a228738a5f747a2d685d8",
    measurementId: "G-LZXYBFR4T3"
  
  };
  
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);



  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      try {
        if (user) {
          const studentTableRef = collection(db, 'studentTable');
          const studentQuery = query(studentTableRef, where('email', '==', user.email));
          const snapshot = await getDocs(studentQuery);
  
          if (!snapshot.empty) {
            snapshot.forEach((doc) => {
              const userData = doc.data();
              setEmail(userData.email);
              setAddress(userData.address);
              // Set other user data as needed
            });
          }
        } else {
          // User is not signed in, redirect to the login screen
          console.warn('User is not signed in. Redirecting to login screen.');
          // Replace 'Login' with your actual login screen name
          // For example, if you're using React Navigation:
          // navigation.navigate('Login');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    });
  
    // Clean up the observer when the component unmounts
    return () => unsubscribe();
  }, []);
  
  



function whenaccountdeleted() {
  navigation.dispatch(StackActions.replace('Loginpage'));
}

// button 

function refreshHomePage() {
  navigation.reset({
    index: 0,
    routes: [{ name: 'HomePage' }],
  });
}
// function signout() {
//   navigation.reset({
//     index: 0,
//     routes: [{ name: 'WELCOME TO NEK GAMBIA' }],
//   });
// }
// const handleActiveClick = () => {
//   if (isActive) {
//     alert('You are logged in!');
//   } else {
//     navigation.navigate('Loginpage');
//   }
// }
  return (
    <View style={styles.container}  >
    <ScrollView >
    <View>
      <View style={styles.header}>
   <TouchableOpacity>
    
   <Image   style={{ width: 100, height: 100 }}  source={require('../assets/BUSS.jpg')}  />
         
   
    
         
      
   </TouchableOpacity>
</View>




      
      <View style={styles.section}>
      {/* <Text style={{fontSize:24, fontWeight:'bold',alignSelf:'center', marginTop:-34,margin:10,padding:10}}> {name}</Text> */}

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <View   
        style={{
          width: 8,
          height: 8,
          borderRadius: 4,
          backgroundColor: isActive ? '#00FF00' : '#D3D3D3',
          marginLeft: 100,
          alignSelf:'center', alignItems: 'center',
          textAlign:'center',justifyContent:'center',
          fontWeight:'bold'
          ,margin:10
        }}
      />
       {/* <TouchableOpacity onPress={handleActiveClick}>
      <Text style={{ fontSize: 15, marginLeft: 5, textAlign: 'center', justifyContent: 'center',margin:10 }}>
        {isActive ? `Active ` : 'Login'}
      </Text>
    </TouchableOpacity> */}
    </View>

        <Text style={styles.sectionTitle}>Profile Information </Text>
        <View style={styles.sectionContent}>



      
          <Text style={styles.sectionContentText}>Email:  {email}</Text>
          <Text style={styles.sectionContentText}>Address: {address}</Text>
          <Text  style={styles.sectionContentText} >Latest Sign in date: {lastSignInTime && new Date(lastSignInTime).toDateString()}</Text>
          {/* <Text style={styles.sectionContentText}>Telephone:           {telephone}</Text>
   <View style={{ padding: 10, backgroundColor: 'white' }}>     
   
   <Text style={styles.sectionContentText}>Email:                      {email}</Text> */}
   
<View style={{ padding: 10, backgroundColor: 'white' }}>
 <Button
  title='Share To Friends'
  color='blue'
  onPress={async () => {
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
  }}
  style={{ padding: 10, backgroundColor: 'white', color: 'blue' }}
/>
</View>

       </View>
      </View>
      <View style={styles.buttonContainer}>

  
      <View style={{ padding: 10, backgroundColor: 'white', marginTop:-30}}>

      <Button
  title='Change Password'
  color='blue'
  onPress={() => {
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
            alert("An Email will be send to you to change your password");
          });
      })
      .catch((error) => {
        // Show error message
        alert("An Email has been send to you to change your password");
      });
  }}
  style={{ padding: 5, backgroundColor: 'blue', color: 'white' }}
/>
</View>

        {/* <TouchableOpacity onPress={()=> navigation.push('WELCOME TO NEK GAMBIA')}  >
        <Text  style={{alignSelf:'center', fontSize:20, marginTop:40, fontWeight:'500', color:'blue'}}  >Sign out</Text>
        </TouchableOpacity> */}
<View style={{ padding: 10, backgroundColor: 'white', marginBottom: 30, margin: 15 }}>
  <Button
    title='Sign out'
    color='blue'
    onPress={() => {
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
      logout();
    }}
  />
</View>


     
      </View>
      </View>
    </ScrollView>




    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white',

  },

  

  header: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20,
  },
  avatar: {
    width: 200,
    height: 150,
    borderRadius: 100,
    marginBottom: 0,
  },
  section: {
    marginTop: 10,
    alignSelf:'center'
  },
  sectionTitle: {
    fontSize: 24,
    textAlign:'center'
   
  },
  sectionContent: {
    marginTop: 20,
  },
  sectionContentText: {
    fontSize: 18,
    margin:5,
textAlign:'left'
    
  },
  buttonContainer: {
    marginTop: 40,
  },   noImageContainer: {
    width: 150,
    height: 150,
    borderRadius: 100,
    marginBottom: 20,
    backgroundColor:'lightgrey'
  },
});

export default StudentProfile;

