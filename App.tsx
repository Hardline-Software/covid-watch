import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import LogInPage from './pages/LogInPage'
import UserDashboardPage from './pages/UserDashboardPage'
import UserSignUpPage from './pages/UserSignUpPage'
import OrgSignUpPage from './pages/OrgSignUpPage'
import OrgDashboardPage from './pages/OrgDashboardPage'
import PreSignUpPage from './pages/PreSignUpPage'

const Stack = createStackNavigator()

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="LogIn" component={LogInPage} />
          <Stack.Screen name="PreSignUp" component={PreSignUpPage} />
          <Stack.Screen name="UserSignUp" component={UserSignUpPage} />
          <Stack.Screen name="OrgSignUp" component={OrgSignUpPage} />
          <Stack.Screen name="UserDashboard" component={UserDashboardPage} />
          <Stack.Screen name="OrgDashboard" component={OrgDashboardPage} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  )
}
