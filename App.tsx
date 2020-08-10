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
import UserProfilePage from './pages/UserProfilePage'
import { AppLoading } from 'expo'
import client from './client'
import Amplify from 'aws-amplify'
import configuration from './aws-exports'
import 'react-native-gesture-handler'
import {
  useFonts as useNunito,
  Nunito_200ExtraLight,
  Nunito_200ExtraLight_Italic,
  Nunito_300Light,
  Nunito_300Light_Italic,
  Nunito_400Regular,
  Nunito_400Regular_Italic,
  Nunito_600SemiBold,
  Nunito_600SemiBold_Italic,
  Nunito_700Bold,
  Nunito_700Bold_Italic,
  Nunito_800ExtraBold,
  Nunito_800ExtraBold_Italic,
  Nunito_900Black,
  Nunito_900Black_Italic
} from '@expo-google-fonts/nunito'
import {
  useFonts as useNunitoSans,
  NunitoSans_200ExtraLight,
  NunitoSans_200ExtraLight_Italic,
  NunitoSans_300Light,
  NunitoSans_300Light_Italic,
  NunitoSans_400Regular,
  NunitoSans_400Regular_Italic,
  NunitoSans_600SemiBold,
  NunitoSans_600SemiBold_Italic,
  NunitoSans_700Bold,
  NunitoSans_700Bold_Italic,
  NunitoSans_800ExtraBold,
  NunitoSans_800ExtraBold_Italic,
  NunitoSans_900Black,
  NunitoSans_900Black_Italic
} from '@expo-google-fonts/nunito-sans'

Amplify.configure(configuration)

const Stack = createStackNavigator()

const App = () => {
  const [nunitoSansLoaded] = useNunitoSans({
    NunitoSans_200ExtraLight,
    NunitoSans_200ExtraLight_Italic,
    NunitoSans_300Light,
    NunitoSans_300Light_Italic,
    NunitoSans_400Regular,
    NunitoSans_400Regular_Italic,
    NunitoSans_600SemiBold,
    NunitoSans_600SemiBold_Italic,
    NunitoSans_700Bold,
    NunitoSans_700Bold_Italic,
    NunitoSans_800ExtraBold,
    NunitoSans_800ExtraBold_Italic,
    NunitoSans_900Black,
    NunitoSans_900Black_Italic
  })
  const [nunitoLoaded] = useNunito({
    Nunito_200ExtraLight,
    Nunito_200ExtraLight_Italic,
    Nunito_300Light,
    Nunito_300Light_Italic,
    Nunito_400Regular,
    Nunito_400Regular_Italic,
    Nunito_600SemiBold,
    Nunito_600SemiBold_Italic,
    Nunito_700Bold,
    Nunito_700Bold_Italic,
    Nunito_800ExtraBold,
    Nunito_800ExtraBold_Italic,
    Nunito_900Black,
    Nunito_900Black_Italic
  })
  if (!nunitoLoaded || !nunitoSansLoaded) {
    return <AppLoading />
  }
  return (
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
            <Stack.Screen name="Profile" options={{ headerShown: true }} component={UserProfilePage} />
          </Stack.Navigator>
        </NavigationContainer>
        <StatusBar style="auto" />
      </SafeAreaProvider>
    </ApolloProvider>
  )
}

export default App
