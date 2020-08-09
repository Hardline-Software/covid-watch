import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { ApolloProvider } from '@apollo/client'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import LogInPage from './pages/LogInPage'
import UserDashboardPage from './pages/UserDashboardPage'
import UserSignUpPage from './pages/UserSignUpPage'
import OrgSignUpPage from './pages/OrgSignUpPage'
import OrgDashboardPage from './pages/OrgDashboardPage'
import PreSignUpPage from './pages/PreSignUpPage'
import client from './client'
import Amplify from 'aws-amplify'
import configuration from './aws-exports'
import 'react-native-gesture-handler'

Amplify.configure(configuration)

const Stack = createStackNavigator()

const App = () => (
  <ApolloProvider client={client}>
    <SafeAreaProvider style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Log In" options={{ headerShown: false }} component={LogInPage} />
          <Stack.Screen name="Sign Up" options={{ headerShown: true }} component={PreSignUpPage} />
          <Stack.Screen name="User Signup" options={{ headerShown: true }} component={UserSignUpPage} />
          <Stack.Screen name="Organization Signup" options={{ headerShown: true }} component={OrgSignUpPage} />
          <Stack.Screen name="User Dashboard" options={{ headerShown: false }} component={UserDashboardPage} />
          <Stack.Screen name="Organization Dashboard" options={{ headerShown: false }} component={OrgDashboardPage} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  </ApolloProvider>
)

export default App
