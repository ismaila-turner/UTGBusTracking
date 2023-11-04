import {StyleSheet, View, Text,TextInput,Button,ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import NetInfo from '@react-native-community/netinfo';
import { StatusBar } from 'expo-status-bar';
import { Alert } from 'react-native';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native';
import { Image } from 'react-native';
import { NavigationContainer} from "@react-navigation/native";
// import * as Google from 'expo-google-app-auth';

import { FontAwesome } from 'react-native-vector-icons';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Svg } from 'react-native-svg';
// import { Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {auth} from "../firebase"
import { initializeApp } from 'firebase/app';
import {firebase} from "../firebase"
import { getFirestore, collection, addDoc ,onSnapshot, query, where, getDocs } from 'firebase/firestore';


import {  signInWithEmailAndPassword ,sendPasswordResetEmail} from 'firebase/auth';
export default function EmployeeLogin  ({navigation}) {

  const [state, setState] = useState(null);
  const dependency1 = true;
  const dependency2 = true;
  const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [hidePassword, setHidePassword] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    

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




// db.transaction((tx) => {
//   tx.executeSql('DELETE FROM users WHERE id > 2');
// });

const [loading, setLoading] = useState(false);
useEffect(()=>{

 const unsub= auth.onAuthStateChanged(user=>{


  
  })

return unsub
}, [dependency1, dependency2] )

// if (loading) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <ActivityIndicator />
//       <Text style={{ color:"red" }}  >Loading...</Text>
//     </View>
//   );
// }



function homepage() {
  navigation.reset({
    index: 0,
    routes: [{ name: 'HomePage' }],
  });
}

// const setLoggedInUserId = async (id) => {
//   await AsyncStorage.setItem('loggedInUserId',  id.toString());
// }
// const handleLogin = async() => {
//   // Query the database for the user with the given email


//   db.transaction(tx => {
//     tx.executeSql('SELECT * FROM users WHERE email = ?', [username], (_, { rows }) => {
//       // If no user was found, show an error message
//       if (rows.length === 0) {
//         Alert.alert(
//           'Error',
//           'No user found ',
//           [
//             { text: 'OK', onPress: () => console.log('OK pressed') },
//           ],
//           { cancelable: false },
//         );
//         return;
//       }

//       // If the user was found, check if the password matches
//       const user = rows.item(0);
//       if (user.password !== password) {

//         Alert.alert(
//           'Error',
//           'Incorrect password Click below forget password',
//           [
//             { text: 'OK', onPress: () => console.log('OK pressed') },
//           ],
//           { cancelable: false },
//         );
//         return;
//       }
//       if (username.length===0 && password.length===0 ) {
//         Alert.alert(
//           'Error',
//           'All information are required',
//           [
//             { text: 'OK', onPress: () => console.log('OK pressed') },
//           ],
//           { cancelable: false }
//         );
//         return;
//       }
   
//       // If the credentials are correct, navigate to the HomePage
//       if (user.password === password) {
//         homepage()
//       setLoggedInUserId(user.id);
//       Alert.alert(
//         'Sucessfully',
//         'Welcome To Nek Gambia',
//         [
//           { text: 'OK', onPress: () => console.log('OK pressed') },
//         ],
//         { cancelable: false },
//       );
//     }
     
//     });
//   });
// };
const handleSignIn = () => {
  if (!email || !password) {
    Alert.alert(
      'Error',
      'All information is required',
      [{ text: 'OK', onPress: () => console.log('OK pressed') }],
      { cancelable: false }
    );
    return;
  }
  setLoading(true);

  NetInfo.fetch().then((state) => {
    if (state.isConnected) {
      const employeesCol = collection(db, 'studentTable');
      const q = query(employeesCol, where('email', '==', email), where('password', '==', password));

      getDocs(q)
        .then((querySnapshot) => {
          if (!querySnapshot.empty) {
            const employee = querySnapshot.docs[0].data();
            navigation.reset({
              index: 0,
              routes: [{ name: 'StudentHomepage' }],
            });
            Alert.alert(
              'Success',
              'You Can Now Track The Buses',
              [{ text: 'OK', onPress: () => console.log('ERRO') }],
              { cancelable: false }
            );
          } else {
            Alert.alert(
              'Error',
              'Email or Password is incorrect',
              [{ text: 'OK', onPress: () => console.log('Invalid email or password') }],
              { cancelable: false }
            );
          }
        })
        .catch((error) => {
          console.log(error);
          Alert.alert(
            'Error',
            'Something went wrong. Please try again later',
            [{ text: 'OK', onPress: () => console.log('Error') }],
            { cancelable: false }
          );
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      Alert.alert(
        'No Internet Connection',
        'Please connect to the internet',
        [{ text: 'OK', onPress: () => console.log('ok') }],
        { cancelable: false }
      );
      setLoading(false);
    }
  });
};


const changePassword = (email) => {
  // Send password reset email
  sendPasswordResetEmail(auth, email)
    .then(() => {
      // Show success message
      alert("Password reset email sent");
    })
    .catch((error) => {
      // Show error message
      alert(error.message);
    });
};


  return (
    <ScrollView style={styles.container}>
     <View  >
          
     

 
      <Text style={styles.textstyle}>PLEASE  LOGIN AS A STUDENT  </Text>
<View style={{backgroundColor:'black',margin:2}} >
    

  <TextInput  placeholder='Enter Email ' style={styles.inputstyle}  value={email}     onChangeText={text => setEmail(text)}/>

  


  <View style={{backgroundColor:'black',margin:2}}>
  <TextInput 
    placeholder='Enter Password' 
    style={styles.inputstyle} 
    value={password} 
    onChangeText={text => setPassword(text)}
    secureTextEntry={!showPassword} // added secureTextEntry prop
    
  />
   

  <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={{position: 'absolute', top: 12, right: 10}}>
    <Icon name={showPassword ? 'eye' : 'eye-slash'} size={20} color='black' />
  </TouchableOpacity>
</View>

    </View>
 


  
  <View style={styles.buttonstyle}>
  <Button   title=' Login '  color='lightblue'   style={{ padding: 10, backgroundColor:'red',color:'white' } }onPress={handleSignIn}
  
  />
</View>




{loading && (
        <ActivityIndicator
          size="large"
          color="blue"
          style={styles.activityIndicator}
        />
      )}
 
{/* <Button     title='dispaly users '    style={{ padding: 10 ,color:'pink'}} onPress={displayData} /> */}

<TouchableOpacity   onPress={()=> navigation.navigate('ForgetPassword')} >

  <Text  style={{margin:20, color:'white',  alignSelf: 'center',
    justifyContent: 'center',}}   href="www.google.com">              Forget password? Click here</Text>
    </TouchableOpacity>


    <View style={styles.buttonstyle}>
  <Button   title='Register  '  color='lightblue'   style={{ padding: 10, backgroundColor:'red',color:'white' } }onPress={()=> navigation.push('Register')}
  
  />
</View>
{/* 
<View style={{flexDirection:'row', alignSelf:'center', padding:20}}>
<TouchableOpacity style={{borderColor:'blue', borderWidth:2, borderRadius:20, margin:10, paddingHorizontal:10, height:40,backgroundColor:'blue'}}  onPress={googleAuth } >
<FontAwesome name="google" size={35} color='white'   />

</TouchableOpacity>


<TouchableOpacity style={{borderColor:'blue', borderWidth:2, borderRadius:20, margin:10, paddingHorizontal:10, height:40,backgroundColor:'blue'}}  onPress={openWebpage  } >
<FontAwesome name="facebook" size={35} color='white'   />

</TouchableOpacity>

<TouchableOpacity style={{borderColor:'blue', borderWidth:2, borderRadius:20, margin:10, paddingHorizontal:10, height:40,backgroundColor:'blue'}}  >
<FontAwesome name="instagram" size={35} color='white'   />

</TouchableOpacity>

<TouchableOpacity style={{borderColor:'blue', borderWidth:2, borderRadius:20, margin:10, paddingHorizontal:10, height:40,backgroundColor:'blue'}}  >
<FontAwesome name="twitter" size={35} color='white'   />

</TouchableOpacity>

</View> */}




  <View style={styles.container}>
    
      <Text   style={{color:'white',fontSize:20,marginTop:250,alignSelf:'center'}}  >Deverlop By Ismaila-Turner</Text>
    </View>

 <StatusBar style="auto" />

</View>
</ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    
    flex: 1,
    alignSelf: 'center',
 
   marginBottom:0,
    margin:5,
    padding:10,
    width:400,
   
    paddingBottom:100,

   backgroundColor:'black',


   
  },
  textstyle:{
    margin:10,
    padding: 10,
    fontSize:13,
    
 
     color:'black',
    alignSelf: 'center',
   
    fontWeight:'600',
  },
  buttonstyle:{
   
    
    margin:12,
  
    padding:5,
    borderRadius:10,
    color:'black' ,  
   backgroundColor:'red'
     
     
   
  

  },
  inputstyle:{



borderBottomColor:'black',
borderBottomWidth:1.9,
backgroundColor:'white',
fontSize:18,
margin:10,

marginLeft:8,
padding:14,
width:320,
justifyContent:'center',
alignItems:'center',


borderRadius:10,



  },inputstyle:{




    backgroundColor:'gray',
    fontSize:18,
    margin:5,
    
    // marginLeft:8,
    padding:14,
    width:360,
    justifyContent:'center',
    alignItems:'center',
    alignSelf:'center',
    
    borderRadius:7,
    
    
    
      },
  footer: {
    
    left: 0,
    right: 0,
    bottom: 10,
    height: 24,
    marginBottom:0,
    
color:'black'
  },
});
