import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import Profile from '../screens/Profile';
import Resume from '../screens/Resume';
import Interview from '../screens/Interview';
import NavScreen from '../screens/NavScreen';
import id from '../app/job-details/[id]';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Welcome'>
        <Stack.Screen name="Home" options={{headerShown: false}} component={HomeScreen} />
        <Stack.Screen name="Welcome" options={{headerShown: false}} component={WelcomeScreen} />
        <Stack.Screen name="Login" options={{headerShown: false}} component={LoginScreen} />
        <Stack.Screen name="SignUp" options={{headerShown: false}} component={SignUpScreen} />
        <Stack.Screen name="NavScreen" options={{headerShown: false}} component={NavScreen} />
        <Stack.Screen name="Resume" options={{headerShown: false}} component={Resume} />
        <Stack.Screen name="Interview" options={{headerShown: false}} component={Interview} />
        <Stack.Screen name="qa" options={{headerShown: false}} component={Profile} />
        <Stack.Screen name = "det" options={{headerShown: false}} component={id}/>
      </Stack.Navigator>
    </NavigationContainer>
    
  )
}