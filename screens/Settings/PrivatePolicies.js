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





const PrivatePolicies=({navigation})=> {
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
        <Text  style={{fontSize:20, textAlign:'center', fontWeight:'bold', margin:10, backgroundColor:'blue', color:'white', padding:10, height:60}} >
        Read The Private Policies
            </Text> 

            <Text  style={{fontSize:18, padding:10, textAlign:"center",margin:10}}  >
            At Nek Gambia Real Estate, we are committed to protecting the privacy of our customers and website visitors. This Privacy Policy outlines the types of personal information we collect, how we use it, and the steps we take to ensure your information is kept secure.          
            <Text style={{color:'blue', fontWeight: 'bold', margin:20, fontSize:19}}>                                                Personal Information We Collect:    </Text>

When you visit our website or use our services, we may collect personal 
information such as your name, email address, phone number, and home address.
 We may also collect information about your property preferences and past transactions. 
 This information is used to provide you with the best possible service, including personalized 
 property recommendations and updates on new listings that match your search criteria. Additionally,
  we may also collect information about your browsing and search history on our website, as well 
  as information about your device and internet connection.

  <Text style={{color:'blue', fontWeight: 'bold', margin:20, fontSize:19}}>                                 How We Use Your Personal Information:                                                       </Text>

Your personal information is used to provide you with the best possible service, including personalized property recommendations and updates on new listings that match your search criteria. We may also use your information to contact you regarding your property search or to send you promotional materials and special offers. Additionally, we may use your information for internal research and analysis to improve our services and website.

We do not share or sell your personal information to any third parties, except as required by law or with your express consent. We take steps to ensure that your information is kept secure and only shared with trusted third parties for the purpose of providing our services.

<Text style={{color:'blue', fontWeight: 'bold', margin:20, fontSize:19}}>                         Security Measures:                                      </Text>

We take the security of your personal information very seriously and have implemented several measures to protect your information from unauthorized access or use. We use industry-standard encryption techniques to protect your information during transmission, and we store your information on secure servers that are protected by firewalls and other security measures. We also regularly review and update our security systems to ensure that they are up-to-date and effective in protecting your information.

<Text style={{color:'blue', fontWeight: 'bold', margin:20, fontSize:19}}>          Accessing and Updating Your Personal Information:                              </Text>

You have the right to access and update your personal information at any time. You can do this by logging into your account on our website or by contacting us directly. Additionally, you have the right to request that we delete your personal information, and we will comply with your request as long as we are not legally required to retain your information.

<Text style={{color:'blue', fontWeight: 'bold', margin:20, fontSize:19}}>                                          Cookies and Tracking Technologies:                                               </Text>

We use cookies and other tracking technologies to improve your experience on our website and to understand how you use our services. Cookies are small data files that are stored on your device when you visit our website. They allow us to recognize your device and to remember your preferences and settings.

We also use third-party analytics tools to understand how our website is used and to improve our services. These tools may collect information about your browsing and search history, as well as information about your device and internet connection. We do not share or sell this information to any third parties, except as required by law or with your express consent.

<Text style={{color:'blue', fontWeight: 'bold', margin:20, fontSize:19}}>  Changes to Our Privacy Policy:                       </Text>

We may update this Privacy Policy from time to time to reflect changes in our services or to comply with legal requirements. We will notify you of any material changes to this Privacy Policy by posting the updated policy on our website. We encourage you to review this Privacy Policy periodically to stay informed about how we collect, use, and protect your personal information.

<Text style={{color:'blue', fontWeight: 'bold', margin:20, fontSize:19}}>  Contact Us:                                                      </Text>

If you have any questions or concerns about our Privacy Policy or our handling of your personal information, please contact us .

By using our app and services, you consent to the collection, use, and sharing of your personal information as described in this Privacy Policy. If you do not agree with the terms of this Privacy Policy, please do not use our website or services.
 </Text> 

</View   >

</ScrollView>
<ScrollView horizontal={true}   >
<View   style={{ fontSize:10,   alignSelf: 'center',fontWeight:'bold',margin:10, color:'black', flexDirection:'row',height:'120%',backgroundColor:'white'}}  >
<TouchableOpacity style={styles.buttonmenustyle}    onPress={refreshHomePage} >
     
      <Icon    style={{   alignSelf: 'center'}}   name="home" size={22} color="blue" />
      <Text   style={{   textAlign: 'center', fontWeight:'bold', fontSize:12}}    >Home</Text>
    </TouchableOpacity    >
    {/* Render a list of available properties here */}
    <TouchableOpacity style={styles.buttonmenustyle}   onPress={()=>navigation.push('Search')}  >
    <Icon    style={{   alignSelf: 'center'}}   name="ios-search" size={22} color="blue" />
      <Text  style={{   textAlign: 'center' , fontWeight:'bold' , fontSize:12}} >Search</Text>
    </TouchableOpacity>
    {/* Render a list of popular properties here */}
    <TouchableOpacity style={styles.buttonmenustyle} >
    <Icon    style={{   alignSelf: 'center'}}   name="ios-people" size={22} color="blue" />
      <Text style={{   textAlign: 'center', fontWeight:'bold', fontSize:12}}  >Peoploe</Text>
    </TouchableOpacity>
    {/* Render a location filter component here */}

    <TouchableOpacity style={styles.buttonmenustyle}  onPress={()=>navigation.push('Profile')} >
    <Icon    style={{   alignSelf: 'center', fontWeight:'bold'}}   name="ios-person" size={22} color="blue" />
      <Text  style={{   textAlign: 'center', fontWeight:'bold' , fontSize:12}} >Profile</Text>
    </TouchableOpacity>
    {/* Render a price filter component here */}
  
   
    <TouchableOpacity style={styles.buttonmenustyle}  onPress={()=>navigation.push('Settings')} >
    <Icon    style={{   alignSelf: 'center', fontWeight:'bold'}}   name="ios-settings" size={22} color="blue" />
      <Text  style={{   textAlign: 'center', fontWeight:'bold' , fontSize:12}} >Settings</Text>
    </TouchableOpacity>
    {/* Render a price filter component here */}
  
   
  </View>
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
card:{
height:400,
backgroundColor:'white',
elevation:10,
shadowColor:'grey',

width: 340, marginRight:0,
marginLeft:-10,
borderRadius:20,
margin:5

},
menucontainer:{
    marginTop:'30',
    alignItems:'center',
  
  justifyContent: 'flex-end', padding: 0, 
  flexDirection:'row',
  
  justifyContent:'space-between',
  borderTopColor:'black',

  textTransform:'uppercase',
margin:5,
   borderInStyle: 'solid',
borderColor:'black',
borderColor: 'black', borderStyle: 'solid' ,

textTransform:'uppercase',


bottom:0,
left: 0,
right: 0,


},


topmenu:{
 

  justifyContent: 'flex-end', padding: 0, 
  flexDirection:'row',
  
  justifyContent:'space-between',
  borderTopColor:'black',

  textTransform:'uppercase',
margin:4,
   borderInStyle: 'solid',
borderColor:'black',
borderColor: 'black', borderStyle: 'solid' ,

textTransform:'uppercase',
fontWeight:'bold',

bottom:0,
left: 0,
right: 0,


},

topmenustyle:{
  textTransform:'capitalize',
  textTransform:'uppercase',
  fontWeight:'bold',
  fontSize:20,
    borderInStyle: 'solid',
    borderBottomWidth:0,
    borderRightWidth:0,
    
    borderColor:'black',
    borderWidth: 0, borderColor: 'black', borderStyle: 'solid' ,
  borderRadius:5,
  margin:5,
  padding:7,
  backgroundColor:'white',
  fontWeight:'bold',
  shadowColor:'blue',
  shadowOpacity:6,
  elevation:3,
  shadowOffset:{width:5,height:5},
  color:'white'






},
buttonmenustyle:{
  
  textTransform:'uppercase',
fontWeight:'bold',
fontSize:22,
  borderInStyle: 'solid',
  borderBottomWidth:0,
  borderRightWidth:1,
  borderColor:'black',
  borderWidth: 0, borderColor: 'black', borderStyle: 'solid' ,
borderRadius:10,
margin:10,
alignSelf:'center',
padding:2,
backgroundColor:'white',
fontWeight:'bold',
shadowColor:'black',
shadowOpacity:7,
elevation:3,
shadowOffset:{width:5,height:10},
color:'white'





},

menubuttonstyle:{
  
  textTransform:'uppercase',

  borderInStyle: 'solid',
  borderColor:'black',
  borderWidth: 2, borderColor: 'black', borderStyle: 'solid' ,

padding:10,
backgroundColor:'white',
flex: 0, 
bottom:0,
fontWeight:'bold'




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
  padding:15,
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


export default PrivatePolicies