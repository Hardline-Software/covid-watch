import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import LogInPage from './pages/LogInPage'
import SignUpPage from './pages/SignUpPage'

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <SignUpPage />
      </NavigationContainer>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  )
}
