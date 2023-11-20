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

const Profile = ({ navigation }) => {
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

 


  // const getLoggedInUserIdFromStorage = async () => {
  //   // Retrieve the logged in user's ID from local storage
  //   const loggedInUserId = await AsyncStorage.getItem('loggedInUserId');

  //   // Return the logged in user's ID
  //   return loggedInUserId;
  // };
  // // const getLoggedInUser = async () => {
  //   try {
  //     // Retrieve the logged in user's ID from local storage
  //     const loggedInUserId = await AsyncStorage.getItem('loggedInUserId');
  
  //     if (!loggedInUserId) {
  //       console.log('Logged in user ID not found in storage');
  //       return;
  //     }
      
  //     db.transaction((tx) => {
  //     // Select the user with the logged in user's ID from the 'users' table
  //     tx.executeSql(`SELECT * FROM users WHERE id = ?`, [loggedInUserId], (tx, results) => {
  //   const rows = results.rows;
  //   if (rows.length > 0) {
  //       // Get the current row
  //       const user = rows.item(0);
  //       // Set the state variables with the data from the row
  //       setname(user.name);
  //       setAddress(user.address);
  //       setNationality(user.nationality);
  //       setTelephone(user.telephone);
  //       setEmail(user.email);
  //       setPassword(user.password);
  //       setImageurl(user.imageurl);
  //     } else {
  //       console.log('User not found');
  //     }
  //   })
  //   });
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   // Set the loading state to false once the data has been fetched
  //   setIsLoading(false);
  // };
  
  // useEffect(() => {
  //   getLoggedInUser();
  // }, []);

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
  

  // const handleDeleteUser = async () => {
  //   try {
  //     // Retrieve the logged in user's ID from local storage
  //     const loggedInUserId = await AsyncStorage.getItem('loggedInUserId');
  
  //     if (!loggedInUserId) {
  //       console.log('Logged in user ID not found in storage');
  //       return;
  //     }
  
  //     // Show an "Are you sure?" alert before deleting the user
  //     Alert.alert(
  //       'Are you sure?',
  //       'Deleting your account will remove all your data permanently. This action cannot be undone.',
  //       [
  //         {
  //           text: 'Cancel',
  //           style: 'cancel'
  //         },
  //         {
  //           text: 'Delete',
  //           style: 'destructive',
  //           onPress: () => {
  //             db.transaction((tx) => {
  //               // Delete the user from the 'users' table
  //               tx.executeSql(`DELETE FROM users WHERE id = ?`, [loggedInUserId]);
  
  //               // Delete the user's images from the 'user_images' table
  //               tx.executeSql(`DELETE FROM user_images WHERE user_id = ?`, [loggedInUserId]);
  //             });
  
  //             // Clear the logged in user ID from local storage
  //             AsyncStorage.removeItem('loggedInUserId');
  
  //             // Navigate to the login screen
  //             navigation.navigate('Login');
  //           }
  //         }
  //       ]
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  


  // const handlePickImage = async () => {
  //   try {
  //     // Check if we have permission to access the media library
  //     const { status } = await MediaLibrary.requestPermissionsAsync();
  //     if (status !== 'granted') {
  //       alert('Sorry, we need media library permissions to make this work!');
  //     }
  
  //     // Pick an image from the media library
  //     const result = await ImagePicker.launchImageLibraryAsync({
  //       mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     });
  //     if (!result.canceled) {
       
  //       // Save the image to the database
  //  db.transaction(tx => {
  //         // Create the user_images table if it doesn't already exist
  //         tx.executeSql(
  //           'CREATE TABLE IF NOT EXISTS user_images (id INTEGER PRIMARY KEY, user_id INTEGER, image_url TEXT)'
  //         );
  
  //         // Get the user id for the provided email
  //         tx.executeSql(
  //           'SELECT id FROM users WHERE email = ?',
  //           [email],
  //           (_, { rows }) => {
  //             const userId = rows._array[0].id;
  
  //             // Insert the image into the user_images table
  //             tx.executeSql(
  //               'INSERT INTO user_images (user_id, image_url) VALUES (?, ?)',
  //               [userId,result.assets[0].uri]
  //             );
  //           }
  //         );
  //       });
  
  //       // Set the image state
  //       setImage(result.assets[0].uri);
  //     }
  //   } catch (error) {
  //     console.log('Error picking image: ', error);
  //   }
  // }
  
  // function removeImage() {
  //   setImage(null);
  // }

  // Display the time they registered
  useEffect(() => {
    if (auth.currentUser) {
      setCreationTime(auth.currentUser.metadata.creationTime);
    }
  }, []);

  // TO DISPLAY THE USER SIGN IN DATE 
  useEffect(() => {
    if (auth.currentUser) {
      setCreationTime(auth.currentUser.metadata.creationTime);
      setLastSignInTime(auth.currentUser.metadata.lastSignInTime);
    }
  }, []);



// active if the user is log in
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsActive(!!user);
    });

    return unsubscribe;
  }, []);


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
            alert("An Email will be  send to you to change your password");
          });
      })
      .catch((error) => {
        // Show error message
        alert("An Email has been send to you to change your password");
      });
  };

// deleting user from database

// Create an input field for the password


function whenaccountdeleted() {
  navigation.dispatch(StackActions.replace('Loginpage'));
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
        onPress: () => {
          const auth = getAuth();
          const user = auth.currentUser;

          // Prompt the user to reauthenticate before deleting their account
          
          Alert.prompt(
            'Password Required',
            'Please enter your password to delete your account.',
            [
              { text: 'Cancel', style: 'cancel' },
              {
                text: 'OK',
                onPress: (password) => {
                  const credential = EmailAuthProvider.credential(
                    user.email,
                    password
                  );

                  // Reauthenticate the user with the credential
                  const userCredential = signInWithEmailAndPassword(auth, user.email, password);
                  userCredential.then((userCredential) => {
                    userCredential.user.delete().then(() => {
                      console.log("User account deleted successfully.");
                      Alert.alert('Account Deleted', 'Your account has been deleted.');
                      whenaccountdeleted();

                      // Redirect user to a different page or show success message
                    }).catch((error) => {
                      console.log("Error deleting user account:", error);
                      Alert.alert('Error', 'There was an error deleting your account.');
                    });
                  }).catch((error) => {
                    console.log("Error reauthenticating user:", error);
                    Alert.alert('Error', 'You entered a wrong password for this account ');
                  });
                }
              }
            ],
            'secure-text'
          );
        }
      }
    ],
    { cancelable: true }
  );
}


// button 
const share = async () => {
  try {
      const result = await Share.share({
        url: 'https://expo.io',
          message: 'Check out this awesome app!',
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

function refreshHomePage() {
  navigation.reset({
    index: 0,
    routes: [{ name: 'HomePage' }],
  });
}
function signout() {
  navigation.reset({
    index: 0,
    routes: [{ name: 'WELCOME TO NEK GAMBIA' }],
  });
}
const handleActiveClick = () => {
  if (isActive) {
    alert('You are logged in!');
  } else {
    navigation.navigate('Loginpage');
  }
}
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
       <TouchableOpacity onPress={handleActiveClick}>
      <Text style={{ fontSize: 15, marginLeft: 5, textAlign: 'center', justifyContent: 'center',margin:10 }}>
        {isActive ? `Active ` : 'Login'}
      </Text>
    </TouchableOpacity>
    </View>

        <Text style={styles.sectionTitle}>Profile Information </Text>
        <View style={styles.sectionContent}>



      
          <Text style={styles.sectionContentText}>Email:  {auth.currentUser?.email}</Text>
          <Text  style={styles.sectionContentText} >Registered date: {creationTime && new Date(creationTime).toDateString()}</Text>
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
    backgroundColor:'lightgrey',
    
  },
});

export default Profile;

