import {StyleSheet, View, Text,TextInput,Button, Dimensions,ActivityIndicator} from 'react-native'
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
const [loading, setLoading] = useState(false);
// insert a data function
const insertData = async (e) => {
  e.preventDefault();

  if (!report) {
    Alert.alert(
      'Error',
      'All information is required',
      [
        { text: 'OK', onPress: () => console.log('OK pressed') },
      ],
      { cancelable: false }
    );
    return;
  }

  setLoading(true); // Set loading to true before the asynchronous operation

  try {
    await addDoc(collection(db, "reportTable"), {
      report: report,
      timestamp: new Date().toISOString(),
    });

    Alert.alert(
      'Success',
      'Message has been submitted.',
      [
        { text: 'OK', onPress: () => console.log('OK pressed') },
      ],
      { cancelable: false }
    );

    refresReport();
  } catch (error) {
    alert(error.message);
  } finally {
    setLoading(false); // Set loading to false regardless of success or failure
  }
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
{loading && <ActivityIndicator size="large" color="blue" />}
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

 
     width:350,



     
    alignSelf: 'center',
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