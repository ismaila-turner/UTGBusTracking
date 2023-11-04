import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomePage from './screens/HomePage';
import Loginpage from "./screens/Loginpage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from './screens/Welcome';
import Register from "./screens/Register";
import StudentLogin from './screens/StudentLogin';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import Profile from './screens/Profile'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import PrivatePolicies from './screens/Settings/PrivatePolicies'
import Legal from "./screens/Settings/Legal"
import Report from './screens/Settings/Report'
import DeleteAccount from './screens/Settings/DeleteUserAccount'
import Settings from './screens/Settings/Settings'
import Contact from './screens/Contact'
import StudentHomepage from './screens/StudentHomepage';


const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: true }}>
      <Stack.Screen name="Loginpage" component={Loginpage} />
      <Stack.Screen name="HomePage" component={HomePage} />
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name ="StudentLogin" component={StudentLogin}/>
      <Stack.Screen name="Register" component={Register}/>
      <Stack.Screen name="Profile" component ={Profile}/>
      <Stack.Screen name ="Settings" component={Settings}/>
<Stack.Screen name ="Report" component={Report}/>
<Stack.Screen name ="Legal and policies" component={Legal}/>
<Stack.Screen name ="DeleteAccount" component={DeleteAccount}/>
<Stack.Screen name ="ForgetPassword" component={ForgotPasswordScreen}/>
<Stack.Screen name="Contact" component ={Contact}/>
<Stack.Screen name="StudentHomepage" component ={StudentHomepage}/>
    </Stack.Navigator>
  </NavigationContainer>
  
  </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
