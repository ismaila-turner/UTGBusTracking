import React, { useEffect, useState } from 'react';
import {StyleSheet, View, Image, Text,ScrollView,TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { ref, onValue, set ,get } from 'firebase/database';
import { getDatabase } from 'firebase/database';
import Icon from 'react-native-vector-icons/Ionicons';
import NetInfo from "@react-native-community/netinfo";
import axios from 'axios';
const HomePage2= ({navigation}) => {
  const [driverLocations, setDriverLocations] = useState([]);

  // Function to fetch driver locations from Firebase and update state
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
                latitude: parseFloat(userLocations[latestLocationId].latitude),
                longitude: parseFloat(userLocations[latestLocationId].longitude),
                address: userLocations[latestLocationId].address,
              });
            }
          }
        }
  
        // Update the state with the latest driver locations
        setDriverLocations(latestLocations);
      }
    });
  };
  
  // Fetch driver locations on component mount
  useEffect(() => {
    fetchDriverLocations();
  }, []);
  





  const [isConnected, setIsConnected] = useState(true);

  // Check internet connection status
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
      if (!state.isConnected) {
        Alert.alert(
          'OUT OF TRACK',
          ' Out of track. Not connected to the internet.',
          [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
        );
      }
    });
  
    return () => {
      unsubscribe();
    };
  }, []);

  const [region, setRegion] = useState({
    latitude: 13.442427103714929, // Initial latitude (Gambia's latitude)
    longitude: -16.68721186454237, // Initial longitude (Gambia's longitude)
    latitudeDelta: 0.001, // Zoom level. Higher value means lower zoom
    longitudeDelta: 0.4,
  });

  const [address, setAddress] = useState('');
  const getReverseGeocode = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyBRSqbeQbTsjzOs6wSwvadHltel8eK18Xw`
      );

      const formattedAddress = response.data.results[0].formatted_address;
      setAddress(formattedAddress);
    } catch (error) {
      console.error('Error fetching reverse geocode:', error);
    }
  };

  const handleMarkerClick = (driver) => {
    getReverseGeocode(driver.latitude, driver.longitude);
  };

  const renderMarkers = () => {
    return driverLocations.map((driver) => (
      <Marker
        key={driver.id}
        coordinate={{ latitude: driver.latitude, longitude: driver.longitude }}
        title={`Driver ID: ${driver.id}`}
        onPress={() => handleMarkerClick(driver)}
      >
        <Image source={require('../assets/bu.jpg')} style={{ width: 30, height: 40 }} />
        <Callout>
          <View>
            <Text style={{ fontSize: 16 ,width:249,height:50}}>Driver ID: {driver.id}</Text>
            <Text style={{ fontSize: 16, width:250 ,height:50  }}>Current Address: {address}</Text>
          </View>
        </Callout>
      </Marker>
    ));
  };

  return (
  <View>
    <View style={styles.container} >
  


    <ScrollView>
        <Text style={{
          fontSize: 15,
          fontWeight: 600,
          padding: 20,
          textTransform: 'capitalize',
          alignSelf: 'center',
          color: isConnected ? 'blue' : 'red',
        }}>
          You are currently {isConnected ? 'Tracking Buses. Make sure to keep your internet connection on. Click on the buses to see their current location' : 'out of track. Not connected to the internet.'}
        </Text>
      

        <View style={{ height: 700 }}>
          <MapView style={{ flex: 1 }} region={region} showsUserLocation={true}>
            {renderMarkers()}
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
    <Icon    style={{   alignSelf: 'center'}}   name="ios-settings" size={30} color="red" />
      <Text  style={{   textAlign: 'center', fontWeight:'bold', fontSize:13}}>Settings...</Text>
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

     

paddingBottom:20,

    
    alignSelf: 'center',
   textAlign:'center',
 
      backgroundColor: 'white',
     
     
  
  
     
    },
    calloutText: {
      color: 'black',
      width:200, margin:5,
      fontSize:16,
  
      fontWeight:'500',alignSelf: 'center' 
       // Text color
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

 





    textstyle:{
      margin:20,
      padding: 5,
      fontSize:15,
     
      
      justifyContent:'center',
       color:'white',
      alignSelf: 'center',
      textTransform:'capitalize',
    },
   
    inputstyle:{
  
  
 
 
shadowColor:'black',
shadowOpacity:0.5,
elevation:3,
shadowOffset:{width:5,height:5},

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

export default HomePage2;
