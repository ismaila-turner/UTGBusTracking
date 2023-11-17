import React, { useLayoutEffect } from 'react';
import {StyleSheet, View, Text, TextInput, Image, ScrollView ,Dimensions, Share, Alert } from 'react-native';
import{TouchableOpacity} from 'react-native';
import  {  useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import firebase from '../firebase';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { Animated, LayoutAnimation, Platform } from 'react-native';
import { getDatabase, ref, set, serverTimestamp ,push,onValue ,get } from 'firebase/database';
import db from '../firebase'
// import {  FlatList,  } from 'react-native';
import MapView, { Marker,Callout  } from 'react-native-maps';
import * as Location from 'expo-location';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import NetInfo from "@react-native-community/netinfo";
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import HomePage from './HomePage';

const StudentHomepage = ({navigation}) => {
    const firebaseConfig = {
        apiKey: "AIzaSyBn4dN2LqHTEqMivhKoFR6orrvdZottX_Y",
        authDomain: "driversbustracker.firebaseapp.com",
        projectId: "driversbustracker",
        storageBucket: "driversbustracker.appspot.com",
        messagingSenderId: "710645626633",
        appId: "1:710645626633:web:7a228738a5f747a2d685d8",
        measurementId: "G-LZXYBFR4T3"
      };
      
      const app = initializeApp(firebaseConfig);
      const database = getDatabase(app);
      const auth = getAuth(app);
      const [users, setUsers] = useState([]); 
    const [driverLocations, setDriverLocations] = useState([]);
    useEffect(() => {
        const fetchUsers = async () => {
          try {
            const usersArray = [];
            const driverLocationsArray = [];
      
            const driversRef = ref(database, 'drivers');
      
            const snapshot = await get(driversRef);
            if (snapshot.exists()) {
              const driversData = snapshot.val();
      
              for (const userId in driversData) {
                const userLocations = driversData[userId].locations;
                const latestLocationKey = Object.keys(userLocations).pop();
                const latestLocation = userLocations[latestLocationKey];
      
                if (latestLocation) {
                  const { latitude, longitude } = latestLocation;
                  usersArray.push({
                    id: userId,
                    latitude,
                    longitude,
                  });
      
                  // Add location data to driverLocationsArray
                  driverLocationsArray.push({
                    id: userId,
                    latitude,
                    longitude,
                  });
                }
              }
      
              console.log('Users Array:', usersArray); // Log users array to check its contents
              console.log('Driver Locations Array:', driverLocationsArray); // Log driver locations to check its contents
      
              setUsers(usersArray);
              setDriverLocations(driverLocationsArray); // Update driverLocations state
            }
          } catch (error) {
            console.error('Error fetching users:', error);console.log("User UID:", auth.uid);

          }
        };
      
        fetchUsers();
      }, []);
      
      
  
    return (
        <View  >
    <View style={styles.container} >

    {/* layout*/}
   
 
    <Text style={{ fontSize: 15, fontWeight: 500, alignSelf: 'center' }}>Available Buses:</Text>
    {users.map((user) => (
      <View key={user.id} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 15, alignSelf: 'center' }}>Bus ID: {user.id}</Text>
        <Text style={{ fontSize: 15, marginLeft: 10, alignSelf: 'center' }}>
          Street: {user.latitude && user.longitude ? getReverseGeocode(user.latitude, user.longitude) : 'N/A'}
        </Text>
      </View>
    ))} 
        <ScrollView>
           <View style={{ height: 600 }}> 
           <MapView
  style={{ flex: 1 }}
  initialRegion={{
    latitude: 13.442427103714929,
    longitude: -16.68721186454237,
    latitudeDelta: 0.001,
    longitudeDelta: 0.4,
  }}
>
  {driverLocations.map((location) => (
    <Marker
      key={location.id}
      coordinate={{
        latitude: location.latitude,
        longitude: location.longitude,
      }}
      title={`Driver ID: ${location.id}`}
    >
      <Image
        // source={require('../assets/bu.jpg')} // Replace with the actual path to your driver icon image
        style={{ width: 30, height: 30 }} // Adjust the width and height according to your icon size
      />
    </Marker>
  ))}
</MapView>

        </View>
      
</ScrollView>
        <ScrollView horizontal={true} style={{alignSelf:'center',}}  >
<View   style={{ fontSize:7,   alignSelf: 'center',fontWeight:'bold',margin:7, color:'black', flexDirection:'row',height:'120%',backgroundColor:'white'}}  >

    {/* Render a location filter component here */}

    {/* <TouchableOpacity style={styles.buttonmenustyle}  onPress={()=>navigation.push('StudentProfile')} >
    <Icon    style={{   alignSelf: 'center', fontWeight:'bold'}}   name="ios-person" size={24} color="red" />
      <Text  style={{   textAlign: 'center', fontWeight:'bold' , fontSize:9}} >Profile</Text>
    </TouchableOpacity> */}
    {/* Render a price filter component here */}
  
      <TouchableOpacity  style={styles.buttonmenustyle}  onPress={()=>navigation.push('Settings')} >
    <Icon    style={{   alignSelf: 'center'}}   name="ios-settings" size={24} color="red" />
      <Text  style={{   textAlign: 'center', fontWeight:'bold', fontSize:9}}>Settings...</Text>
    </TouchableOpacity>
 
  </View>
  </ScrollView>


      </View>
      </View>
    );
  };
  

  

const styles = StyleSheet.create({
    container: {
     height:'100%',
   margin:0,
width:1000,
     

paddingBottom:20,

    
    alignSelf: 'center',
   textAlign:'center',
 
      backgroundColor: 'white',
     
  
  
  
     
    },calloutContainer: {
      backgroundColor: 'white', // Background color of the callout
      padding: 10,
      borderRadius: 10,
    },
    calloutText: {
      color: 'black', // Text color
    },
    rectangle: {
      height: 150,
      margin: 20,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      fontSize: 20,
      color: 'white',
      fontWeight: 'bold',
    },
    blueBackground: {
      backgroundColor: 'blue',
    },
    redBackground: {
      backgroundColor: 'red',
    },
    greenBackground: {
      backgroundColor: 'green',
    },
    
    
    facility:{
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
margin:5,  

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

export default StudentHomepage;

