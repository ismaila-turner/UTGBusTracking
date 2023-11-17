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


import  {useEffect } from 'react';

import { StackActions } from '@react-navigation/native';


import {db} from "../firebase"
import {firebase} from "../firebase"
import { getFirestore, collection, addDoc } from 'firebase/firestore';

 // import compat module


const Contact = ({ navigation }) => {

  // const collectionRef = db.collection('contact');



  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [time, setTime] = useState("");

  const handleNameChange = (name) => {
    setName(name);
  }

  const handleEmailChange = (email) => {
    setEmail(email);
  }

  const handleSubjectChange = (subject) => {
    setSubject(subject);
  }

  const handleMessageChange = (message) => {
    setMessage(message);
  }
  const insertData = (e) => {
        if (!name || !email || !subject || !message) {
      alert('All fields are required!.');
      return;
    }
    e.preventDefault();
  
    addDoc(collection(db, "contact"), {
      name: name,
      email: email,
      subject: subject,
      message: message,
      created_at: new Date().toISOString(),
    })
      .then(() => {
        alert("Message has been submitted.we will get back to you soon ");
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
      })
      .catch((error) => {
        alert(error.message);
      });
  };


  // const insertData = () => {
  //   if (!name || !email || !subject || !message) {
  //     alert('All fields are required!.');
  //     return;
  //   }

  //   if (!email.includes('@')) {
  //     alert('Email address is invalid!');
  //     return;
  //   }

  //   const newContactRef = push(ref(database, 'contact'));
  //   newContactRef.set(
  //     {
  //       name,
  //       email,
  //       subject,
  //       message,
  //       created_at: new Date().toISOString(),
  //     },
  //     (error) => {
  //       if (error) {
  //         console.log('Error inserting data:', error);
  //         Alert.alert(
  //           'Error',
  //           'Error inserting data: ' + error,
  //           [
  //             {
  //               text: 'OK',
  //               onPress: () => console.log('Error inserting data'),
  //             },
  //           ],
  //           { cancelable: false }
  //         );
  //       } else {
  //         console.log('Data inserted successfully!');
  //         Alert.alert(
  //           'Success',
  //           'We will get back to you soon',
  //           [{ text: 'OK' }],
  //           { cancelable: false }
  //         );
  //         navigation.navigate('Contact');
  //       }
  //     }
  //   );
  // };

  // useEffect(() => {
  //   onValue(contactRef, (snapshot) => {
  //     const data = snapshot.val();
  //     if (!data) {
  //       ref(database, 'contact').set({
  //         created_at: new Date().toISOString(),
  //         name: '',
  //         email: '',
  //         subject: '',
  //         message: '',
  //       });
  //     }
  //   });
  // }, []);

  function refresReport() {
    navigation.dispatch(StackActions.replace('Contact'));
    
    }
    function displayData() {
      db.transaction(tx => {
        tx.executeSql('SELECT * FROM contact', [], (_, { rows }) =>
          console.log(JSON.stringify(rows))
        );
      });
    }

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  
 


  // rest of your component code here


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
     <Text  style={{fontSize:25, textAlign:'center', fontWeight:'bold', margin:10, backgroundColor:'grey',padding:10, height:60}} >
            Contact US
            </Text> 

<Text style={{fontSize:17,padding:10, margin:10,textAlign:'left' , width:350}}  >
Contact The Developers
</Text>

{/* <TextInput  placeholder='Enter Name' style={styles.inputstyle} onChangeText={text => setName(text)} /> */}

  

<TextInput  placeholder='Enter Name' style={styles.inputstyle} value={name}  onChangeText={text => setName(text)} />

<TextInput style={styles.inputstyle}
        placeholder="Email" value={email} 
      
        onChangeText={text => setEmail(text)}
      />


      <TextInput style={styles.inputstyle}
        placeholder="Subject" value={subject} 
        
        onChangeText={text => setSubject(text)}
      />
   


<TextInput placeholder=' Message'style={{height: 150, borderColor: 'gray', borderWidth: 1,  shadowColor:'black',
fontSize:17,
  shadowOpacity:0.5,
  elevation:3,
  shadowOffset:{width:5,height:5},
  padding:18,
    borderWidth:0.5, 
    backgroundColor:'white',
  borderBottomColor:'blue',
    margin:19,
    width:319,
    marginLeft:20, }    }
 multiline={true}
 numberOfLines={4}
 value={message} 
onChangeText={text => setMessage(text)}/>

      <Button title="Submit" onPress={insertData} />

      {/* <Button     title='dispaly users '    style={{ padding: 10 ,color:'pink'}} onPress={displayData} /> */}

      <Text style={{margin:15, marginTop:50, fontSize:20, fontWeight:'bold'}}>
    Call Us NOW OR Send Us Email!
</Text>
<Text style={{margin:5, fontSize:15, fontWeight:'bold'}} >
   Telephone:2425949/3947425
</Text>
<Text style={{margin:10,fontSize:15, fontWeight:'bold',paddingBottom:300}}>
  Email: ismailatorres@yahoo.com
</Text>


</View   >

</ScrollView>

 



</View>
  )
}


const styles = StyleSheet.create({
    container: {
     
   margin:0,

     

paddingBottom:100,

     
    alignSelf: 'center',
   textAlign:'center',
  
     
  
  
  
     
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
  
  fontSize:15,
 
 
shadowColor:'black',
shadowOpacity:0.5,
elevation:3,
shadowOffset:{width:5,height:5},
padding:15,
  borderWidth:0.5, 
  backgroundColor:'white',
borderBottomColor:'blue',
  margin:10,
  marginTop:20,

  padding:15,
  width:330,
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius:20,
  
  color:'black',
 
  
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


export default Contact