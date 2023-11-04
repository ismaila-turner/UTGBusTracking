import {StyleSheet, View, Text,TextInput,Button, Dimensions} from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { Alert } from 'react-native';
import { useState ,useEffect} from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native';
import { Image } from 'react-native';
import { NavigationContainer} from "@react-navigation/native";

import { StackActions } from '@react-navigation/native';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

import {db} from "../../firebase"
import Icon from 'react-native-vector-icons/Ionicons';




const Report=({navigation})=> {
    const [report, setReport] = useState('');
 

  const [error, setError] = useState(false);

  function displayData() {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM ReportTable', [], (_, { rows }) =>
        console.log(JSON.stringify(rows))
      );
    });
  }
 

function refreshHomePage() {
  navigation.reset({
    index: 0,
    routes: [{ name: 'HomePage' }],
  });
}

function refresReport() {
    navigation.dispatch(StackActions.replace('Report'));
    
    }




// useEffect(() => {
//     db.transaction(tx => {
//       tx.executeSql(
//         'CREATE TABLE IF NOT EXISTS ReportTable (id INTEGER PRIMARY KEY AUTOINCREMENT, report TEXT, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP)'
//       );
//     });
//   }, []);
  
//   const insertData = (report) => {
//     if (report === '') {
//         setError(true);
//       alert('Please type something');
//     } else {
//         setError(false);
//         refresReport();
//         navigation.navigate('Report')
//         Alert.alert(
//             'Successfully',
//             'Your report has been send and we will look into it ',
//             [
//               { text: 'OK' },
//             ],
//             { cancelable: false },
//           );
//       db.transaction(tx => {
//         tx.executeSql('INSERT INTO ReportTable (report) VALUES (?)', [report]);
//       });
   
    
    
//     }
//   }

// insert a data function
const insertData = async (e) => {
  e.preventDefault();

  if (!report  ) {
    Alert.alert(
      'Error',
      'All information are required',
      [
        { text: 'OK', onPress: () => console.log('OK pressed') },
      ],
      { cancelable: false }
    );
    return;
  }
     

addDoc(collection(db, "reportTable"), {
report: report,

timestamp: new Date().toISOString(),
})
.then(() => {
  Alert.alert(
    'Success',
    'Message has been submitted.',
    [
      { text: 'OK', onPress: () => console.log('OK pressed') },
    ],
    { cancelable: false }
  );

  refresReport()
})
.catch((error) => {
  alert(error.message);
});
};

function refresReport() {
  navigation.dispatch(StackActions.replace('Report'));
  
  }


  return (

    <View style={styles.container} >
    <ScrollView style={styles.container}>
       
     <View  >
     <Text  style={{fontSize:25, textAlign:'center', fontWeight:'bold', margin:10, backgroundColor:'grey',padding:10, height:60}}    >
           Report a problem
            </Text> 


            <Text style={{color:'black',marginLeft:18, margin:20,fontWeight:'500', fontSize:17,}   } > Tell us your problem?
</Text>



<TextInput   placeholder=' write here'style={{height: 150,   borderColor: error ? 'red' : 'gray', borderWidth: 1,margin:10,marginLeft:16,padding:10, fontSize:17}     }
 multiline={true}
 numberOfLines={15}
onChangeText={text => setReport(text)} onFocus={() => setError(false)}  value={report} />



<Button title='Submit Report' style={{ padding: 10 ,color:'pink'}} onPress={insertData} /> 

{/* <Button title='SHOW' style={{ padding: 10 ,color:'pink'}} onPress={displayData} />  */}




<Text style={{margin:10,  fontSize:20, fontWeight:'bold'}}>
    Call Us NOW!
</Text>
<Text style={{margin:5, fontSize:15, fontWeight:'bold'}} >
   Telephone: +220 3999703
</Text>


</View   >

</ScrollView>





</View>
  )
}


const styles = StyleSheet.create({
    container: {
     height:'100%',
 
     width:350,



     
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


export default Report