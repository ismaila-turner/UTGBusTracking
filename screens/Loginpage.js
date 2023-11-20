import {StyleSheet, View, Text,TextInput,Button,ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import NetInfo from '@react-native-community/netinfo';
import { StatusBar } from 'expo-status-bar';
import { Alert  } from 'react-native';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native';
import { Image } from 'react-native';
import { NavigationContainer} from "@react-navigation/native";
// import * as Google from 'expo-google-app-auth';

import { FontAwesome } from 'react-native-vector-icons';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// import { Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {auth} from "../firebase"

import {firebase} from "../firebase"
import {  signInWithEmailAndPassword ,sendPasswordResetEmail} from 'firebase/auth';
export default function Loginpage  ({navigation}) {

  const [state, setState] = useState(null);
  const dependency1 = true;
  const dependency2 = true;
  const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [hidePassword, setHidePassword] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    

// db.transaction((tx) => {
//   tx.executeSql('DELETE FROM users WHERE id > 2');
// });


useEffect(()=>{

 const unsub= auth.onAuthStateChanged(user=>{
  setLoading(false);

  
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



const [loading, setLoading] = useState(false);

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
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          // Obtain userId from the user object
          const userId = user.uid; // Assuming Firebase user object has 'uid' property

          console.log('User ID:', userId); // Log the userId for verification

          navigation.reset({
            index: 0,
            routes: [{ name: 'HomePage', params: { userId: userId } }], // Pass userId as a parameter
          });

          if (user) {
            Alert.alert(
              'Success',
              'Welcome ',
              [{ text: 'OK', onPress: () => console.log('Success') }],
              { cancelable: false }
            );
          }
        })
        .catch((error) => {
          console.log(error);
          Alert.alert(
            'Error',
            'Email or Password is incorrect',
            [{ text: 'OK', onPress: () => console.log('Invalid password') }],
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
        [{ text: 'OK', onPress: () => console.log('OK') }],
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
     <View style={{marginTop:60}} >
          
     

 
      <Text style={styles.textstyle}> Driver's Login </Text>
<View style={{backgroundColor:'black',margin:2}}>
    

  <TextInput  placeholder='Enter Email ' style={styles.inputstyle}  value={email}     onChangeText={text => setEmail(text)}/>

  


  <View style={{backgroundColor:'black',margin:2}}>
  <TextInput 
    placeholder='Enter Password' 
    style={styles.inputstyle} 
    value={password} 
    onChangeText={text => setPassword(text)}
    secureTextEntry={!showPassword} // added secureTextEntry prop
  />
  {loading && (
        <ActivityIndicator
          size="large"
          color="white"
          style={styles.activityIndicator}
        />
      )}

  <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={{position: 'absolute', top: 20, right: 30}}>
    <Icon name={showPassword ? 'eye' : 'eye-slash'} size={25} color='white' />
  </TouchableOpacity>
</View>
    </View>
  <View style={styles.buttonstyle} >
  <Button title=" Login" color="lightblue" style={{ padding: 10, color: 'pink' }} onPress={handleSignIn} />

   </View> 


  
  {/* <View style={styles.buttonstyle}>
  <Button   title='Employee Login '  color='lightblue'   style={{ padding: 10, backgroundColor:'blue',color:'white' } } onPress={()=> navigation.push('EmployeeLogin')}
  
  />
    
</View> */}

 
{/* <Button     title='dispaly users '    style={{ padding: 10 ,color:'pink'}} onPress={displayData} /> */}

<TouchableOpacity   onPress={()=> navigation.navigate('ForgetPassword')} >

  <Text  style={{margin:20, color:'black',  alignItems: 'center',
    justifyContent: 'center',}}   href="www.google.com">              Forget password? Click here</Text>
    </TouchableOpacity>

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
    
      <Text   style={{color:'gray',fontSize:20,marginTop:250,alignSelf:'center'}}  >Deverlop By SICT</Text>
    </View>

 <StatusBar style="auto" />

</View>
</ScrollView>
  )
}
const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    paddingBottom: 100,
    backgroundColor: 'black',
    width: 400,
  },  buttonstyle:{
   
    
    margin:12,
  
    padding:5,
   
    color:'black' ,  
   backgroundColor:'red'
     
     
   
  

  },
  activityIndicator: {},
  textstyle: {
    margin: 5,
    padding: 0,
    fontSize: 30,
    color: 'red',
    alignSelf: 'center',
    fontWeight: '600',
    textTransform: 'uppercase',
    fontStyle: 'italic',
  },
  inputstyle: {
    backgroundColor: 'gray',
    fontSize: 18,
    margin: 5,
    padding: 14,
    width: 360,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 7,
  },
  footer: {
    left: 0,
    right: 0,
    bottom: 10,
    height: 24,
    marginBottom: 0,
    color: 'black',
  },
});

