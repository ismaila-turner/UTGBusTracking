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

const HomePage = ({navigation}) => {
  const route = useRoute();
  const { userId } = route.params;

  const [userAddress, setUserAddress] = useState('');
  const [users, setUsers] = useState([]); 
  const [userAddresses, setUserAddresses] = useState({}); 
  const handleMarkerClick = (userId) => {
    // Handle marker click event here
    console.log(`Marker clicked for User ID: ${userId}`);
  };
  
  const [region, setRegion] = useState({
    latitude: 13.442427103714929, // Initial latitude (Gambia's latitude)
    longitude: -16.68721186454237, // Initial longitude (Gambia's longitude)
    latitudeDelta: 0.001, // Zoom level. Higher value means lower zoom
    longitudeDelta: 0.4,
  });
  const [userLocation, setUserLocation] = useState(null);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Reference to the 'drivers' node in Firebase Realtime Database
        const driversRef = ref(getDatabase(), 'drivers');
  
        // Listen for changes on the 'drivers' node
        onValue(driversRef, (snapshot) => {
          if (snapshot.exists()) {
            const driversData = snapshot.val();
  
            // Track the latest locations for each user
            const latestLocations = {};
  
            // Iterate through users and their locations
            for (const userId in driversData) {
              const userLocations = driversData[userId].locations;
              
              if (userLocations) {
                // Find the latest location for each user
                const latestLocationId = Object.keys(userLocations).reduce((latestId, locationId) => {
                  if (!latestId || userLocations[locationId].timestamp > userLocations[latestId].timestamp) {
                    return locationId;
                  } else {
                    return latestId;
                  }
                }, null);
  
                // Add the latest location to the tracked locations
                if (latestLocationId) {
                  latestLocations[userId] = {
                    id: userId,
                    latitude: userLocations[latestLocationId].latitude,
                    longitude: userLocations[latestLocationId].longitude,
                  };
                }
              }
            }
  
            // Update the users state with the latest locations
            setUsers(Object.values(latestLocations));
          }
        });
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
  
    // Call the fetchUsers function when the component mounts
    fetchUsers();
  }, []);
  




  useEffect(() => {
    // Get the user's current location
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      setRegion({
        ...region,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      
      // Perform reverse geocoding to get the user's address (street name)
      const addressResponse = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      // Extract the street name from the address response
      if (addressResponse && addressResponse.length > 0) {
        setUserAddress(addressResponse[0].street);
     
      }
    })();
  }, []);




  useEffect(() => {
    
    const startTracking = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      // Get the current location
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      // Create a reference to the Firebase location node for the current user
      const locationRef = push(ref(getDatabase(), `drivers/${userId}/locations`));

      // Update location data in Firebase Realtime Database
      set(locationRef, {
        latitude,
        longitude,
        timestamp: serverTimestamp(),
      });

      const address = await getReverseGeocode(latitude, longitude);
      setUserAddresses(prevAddresses => ({
        ...prevAddresses,
        [userId]: address || 'Address not available',
      }));


      // Perform reverse geocoding to get the formatted address
      getReverseGeocode(latitude, longitude);
    };

    // Start tracking when the component mounts
    startTracking();
  },    [ userId]);

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  // Code for reverse geocoding

  const [driverLocations, setDriverLocations] = useState([]);
  useEffect(() => {
    const fetchDriverLocations = () => {
      const driversRef = ref(getDatabase(), 'drivers');
      onValue(driversRef, (snapshot) => {
        if (snapshot.exists()) {
          const driversData = snapshot.val();
          const latestLocations = [];
          for (const userId in driversData) {
            const userLocations = driversData[userId].locations;
            if (userLocations) {
              const latestLocationId = Object.keys(userLocations).reduce((latestId, locationId) => {
                if (!latestId || userLocations[locationId].timestamp > userLocations[latestId].timestamp) {
                  return locationId;
                } else {
                  return latestId;
                }
              }, null);
              if (latestLocationId) {
                latestLocations.push({
                  id: userId,
                  latitude: userLocations[latestLocationId].latitude,
                  longitude: userLocations[latestLocationId].longitude,
                });
              }
            }
          }
          setDriverLocations(latestLocations);
        }
      });
    };

    fetchDriverLocations();
  }, []);
  const [address, setAddress] = useState('');
  const getReverseGeocode = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyBRSqbeQbTsjzOs6wSwvadHltel8eK18Xw`
      );
  
      // Extract the formatted address from the response
      const formattedAddress = response.data.results[0].formatted_address;
      console.log('Formatted Address:', formattedAddress);
      console.log('User Latitude:', latitude);
      console.log('User Longitude:', longitude);
  
      setAddress(formattedAddress);

      // Update the address in the users array based on user ID
      setUsers((prevUsers) => {
        return prevUsers.map((user) => {
          if (user.latitude === latitude && user.longitude === longitude) {
            return {
              ...user,
              address: address,
            };
          }
          return user;
        });
      });
    } catch (error) {
      console.error('Error fetching reverse geocode:', error);
    }
  };
  

  

  const unixTimestamp = 1698422476312; // Replace this with your timestamp

  const date = new Date(unixTimestamp);
  const humanReadableDate = date.toLocaleString(); // Converts the date to a local date and time string
  
  console.log(humanReadableDate);
  







const [isConnected, setIsConnected] = useState(true);

// Check internet connection status
useEffect(() => {
  const unsubscribe = NetInfo.addEventListener(state => {
    setIsConnected(state.isConnected);
    if (!state.isConnected) {
      Alert.alert(
        'OUT OF TRACK',
        'Bus is out of track. Not connected to the internet.',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
      );
    }
  });

  return () => {
    unsubscribe();
  };
}, []);




  return (

    <View  >
    
    
    <View style={styles.container} >



      {/* <TextInput  style={styles.inputstyle}
        placeholder="Search Location to see available houses"
        value={searchText}
        onChangeText={setSearchText}
      /> */}



  <ScrollView>

    
  <Text style={{
        fontSize: 15,
        fontWeight: 600,
        padding: 20,
        textTransform: 'capitalize',
        alignSelf: 'center',
        color: isConnected ? 'blue' : 'red', // Change text color to red when not connected
      }}>
        the bus is currently {isConnected ? 'on track. Make sure to keep your internet connection on.' : 'out of track. Not connected to the internet.'}
      </Text>
      <Text style={{ fontSize: 15, fontWeight: '300', alignSelf: 'center' }}>This is Your Bus ID: {userId}</Text>
      <Text style={styles.calloutText}>
             Current Address: {address} {/* Replace user.address with the actual property where you store the address */}
            </Text>
<View style={{ height: 700 }}>
  <MapView style={{ flex: 1 }} region={region} showsUserLocation={true}>
    {users.map((user) => (
      <Marker
        key={user.id}
        coordinate={{ latitude: user.latitude, longitude: user.longitude }}
        title={`Bus ID: ${user.id}`}
        onPress={() => handleMarkerClick(user.id)} // Add onPress event to the marker
      >
        <Image
          source={require('../assets/bu.jpg')} // Replace 'bus-icon.png' with the actual path to your bus icon image
          style={{ width: 30, height: 40 }} // Adjust the width and height according to your icon size
        />
        <Callout>
          <View>
          
            <Text style={styles.calloutText}>
             Current Address: {address} {/* Replace user.address with the actual property where you store the address */}
            </Text>
          </View>
        </Callout>
      </Marker>
    ))}
  </MapView>
</View>

    </ScrollView>

    




<ScrollView horizontal={true} style={{alignSelf:'center',}}  >
<View   style={{ fontSize:7,   alignSelf: 'center',fontWeight:'bold',margin:7, color:'black', flexDirection:'row',height:'120%',backgroundColor:'white'}}  >

    {/* Render a location filter component here */}

    <TouchableOpacity style={styles.buttonmenustyle}  onPress={()=>navigation.push('Profile')} >
    <Icon    style={{   alignSelf: 'center', fontWeight:'bold'}}   name="ios-person" size={24} color="red" />
      <Text  style={{   textAlign: 'center', fontWeight:'bold' , fontSize:9}} >Profile</Text>
    </TouchableOpacity>
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



}

const styles = StyleSheet.create({
    container: {
     height:'100%',
   margin:0,

     

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
      color: 'black',
      width:200, margin:5,
      fontSize:16,
 
      fontWeight:'500',alignSelf: 'center' 
       // Text color
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





buttonmenustyle:{
  
  textTransform:'uppercase',
fontWeight:'bold',
fontSize:15,

  borderBottomWidth:0,

 
 
margin:7,
alignSelf:'center',
padding:2,
backgroundColor:'white',

shadowColor:'black',
// shadowOpacity:7,
// elevation:3,

shadowOffset:{width:5,height:10},
color:'white'





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
  

viewtextforsales:{
  width: 0,
          height: 100,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius:100

}


  });
;

export default HomePage;