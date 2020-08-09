import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import LogInPage from './pages/LogInPage'
import UserDashboardPage from './pages/UserDashboardPage'
import UserSignUpPAge from './pages/UserSignUpPage'
import OrgSignUpPage from './pages/OrgSignUpPage'
import OrgDashboardPage from './pages/OrgDashboardPage'
import PreSignUpPage from './pages/PreSignUpPage'

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <UserDashboardPage />
      </NavigationContainer>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  )
}
