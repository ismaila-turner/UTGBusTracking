import {StyleSheet, View, Text,TextInput,Button, Dimensions} from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { Alert } from 'react-native';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native';
import { Image } from 'react-native';
import { NavigationContainer} from "@react-navigation/native";


import Icon from 'react-native-vector-icons/Ionicons';





const Legal=({navigation})=> {
  function refreshHomePage() {
    navigation.reset({
      index: 0,
      routes: [{ name: 'HomePage' }],
    });
  }

  return (

    <View style={styles.container} >
    <ScrollView style={styles.container}>
       
     <View  >
        <Text  style={{fontSize:25, textAlign:'center', fontWeight:'bold', margin:10, backgroundColor:'blue', color:'white' , padding:10, height:60}} >
           Read The Terms & Policies 
            </Text> 

            <Text  style={{fontSize:18, padding:10, textAlign:"center",margin:10}}  >
          
            <Text style={{color:'blue', fontWeight: 'bold', margin:5, fontSize:19}}>1. Free Access for Students: </Text>

            The bus tracking system app is provided free of charge to students of the university. Students can use the app without any subscription or payment requirements.

            <Text style={{color:'blue', fontWeight: 'bold', margin:0, fontSize:19}}>{'\n'}2.Ownership: </Text>


            The university retains ownership of all data entered into the app. The development team will not access, use, or share this data without the university's permission.

            <Text style={{color:'blue', fontWeight: 'bold', margin:0, fontSize:19}}>{'\n'}3.Confidentiality: </Text>
            The development team will maintain the confidentiality of all user information, including data, financial information, and personal information. User information will be used solely for the purpose of providing services to the university.

<Text style={{color:'blue', fontWeight: 'bold', margin:5, fontSize:19}}>{'\n'}4.Termination </Text>
The university can choose to terminate the use of the app at any time without any associated costs.

<Text style={{color:'blue', fontWeight: 'bold', margin:5, fontSize:19}}> {'\n'}  5.Disclaimer of Warranties:  </Text>
The development team makes no warranties, express or implied, with respect to the app, including but not limited to, the implied warranties of merchantability and fitness for a particular purpose.

<Text style={{color:'blue', fontWeight: 'bold', margin:5, fontSize:19}}>  {'\n'}  6.Modification </Text>
The development team may modify these terms and policies at any time. Users will be notified of any modifications.

<Text style={{color:'blue', fontWeight: 'bold', margin:20, fontSize:19}}>  {'\n'}  7.Entire Agreement: </Text>

These terms and policies represent the entire agreement between the university and the development team and supersede all prior negotiations, understandings, and agreements between the parties.

If you have any questions or concerns about our Privacy Policy or our handling of your personal information, please contact us .

By using our app and services, you consent to the collection, use, and sharing of your personal information as described in this Privacy Policy. If you do not agree with the terms of this Privacy Policy, please do not use our website or services.

<Text style={{color:'blue', fontWeight: 'bold', margin:20, fontSize:19}}>  {'\n'} Consent: </Text>
By using our app and services, you consent to the terms outlined in this policy. If you do not agree with these terms, please do not use our app or services.

 </Text> 
 
</View   >

</ScrollView>





</View>
  )
}


const styles = StyleSheet.create({
    container: {
     height:'100%',
   margin:0,

     

paddingBottom:20,

     
    alignSelf: 'center',
   textAlign:'center',
     
      backgroundColor: 'white',
     
  
  
  
     
    },facility:{
flexDirection:'row',
marginRight:15,
textAlign:'center',

    },
    facilitytext:{
marginLeft:5,
    color:'grey',
    
    },



    textstyle:{
      margin:20,
      padding: 5,
      fontSize:15,
     
      
      justifyContent:'center',
       color:'white',
      alignSelf: 'center',
      textTransform:'capitalize',
    },
    buttonstyle:{
     
      
      margin:5,
      backgroundColor:'lightgreen',
      padding:5,
      borderRadius:20,
     
     
     
       
       
     
    
  
    },
    inputstyle:{
  
  
 
 
shadowColor:'black',
shadowOpacity:0.5,
elevation:3,
shadowOffset:{width:5,height:5},
padding:15,
  borderWidth:0.5, 
  backgroundColor:'white',
borderBottomColor:'blue',
  margin:10,
  
  marginLeft:16,

  width:335,
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius:20,
  
  color:'black'
  
  
    },
    footer: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 10,
      height: 24,
      margin:0,
      
  color:'white'
    },





  });
;


export default Legal