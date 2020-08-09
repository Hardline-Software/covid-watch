import React, { FC, useCallback, useState } from 'react'
import { StyleSheet, Image, Text, View } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { Auth } from 'aws-amplify'

type LoginError =
  | 'UserNotConfirmedException'
  | 'PasswordResetRequiredException'
  | 'NotAuthorizedException'
  | 'UserNotFoundException'

type LoginChallenge = 'SMS_MFA' | 'SOFTWARE_TOKEN_MFA' | 'NEW_PASSWORD_REQUIRED' | 'MFA_SETUP'

const LogInPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [errorCode, setErrorCode] = useState<LoginError | null>(null)
  const [challenge, setChallenge] = useState<LoginChallenge | null>(null)
  const navigation = useNavigation()

  const login = useCallback(async () => {
    setErrorCode(null)
    setLoading(true)
    try {
      const user = await Auth.signIn(email, password)
      setUser(user)
      setChallenge(user.challengeName)
      if (user.challengeName === 'SMS_MFA' || user.challengeName === 'SOFTWARE_TOKEN_MFA') {
        console.log(user)
      } else if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
        // You need to get the new password and required attributes from the UI inputs
        // and then trigger the following function with a button click
        // For example, the email and phone_number are required attributes
        // const name = prompt('Please enter your name')
        // let newPassword: string | null = null
        // while (!newPassword) {
        //   newPassword = prompt('Please enter a new password')
        // }
        // const loggedUser = await Auth.completeNewPassword(
        //   user, // the Cognito User Object
        //   newPassword, // the new password
        //   // OPTIONAL, the required attributes
        //   {
        //     email,
        //     name
        //   }
        // )
        // console.log(loggedUser)
      } else if (user.challengeName === 'MFA_SETUP') {
        // This happens when the MFA method is TOTP
        // The user needs to setup the TOTP before using it
        // More info please check the Enabling MFA part
        Auth.setupTOTP(user)
      } else {
        // The user directly signs in
        console.log(user)
        // Redirect to home page
        navigation.reset({
          index: 0,
          routes: [{ name: 'OrgDashboard' }]
        })
      }
    } catch (err) {
      console.error(err)
      setErrorCode(err.code)
      if (err.code === 'UserNotConfirmedException') {
        // The error happens if the user didn't finish the confirmation step when signing up
        // In this case you need to resend the code and confirm the user
        // About how to resend the code and confirm the user, please check the signUp part
        console.error('User not confirmed')
      } else if (err.code === 'PasswordResetRequiredException') {
        // The error happens when the password is reset in the Cognito console
        // In this case you need to call forgotPassword to reset the password
        // Please check the Forgot Password part.
        console.error('Password reset')
      } else if (err.code === 'NotAuthorizedException') {
        // The error happens when the incorrect password is provided
        console.error('Incorrect password')
      } else if (err.code === 'UserNotFoundException') {
        // The error happens when the supplied username/email does not exist in the Cognito user pool
        console.error('User not found')
      } else {
        console.log(err)
      }
    }
    setLoading(false)
  }, [email, password])

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.icon} />
      <View>
        <View style={(styles.section, styles.split)}>
          <TextInput placeholder="Email" autoCorrect={false} autoCapitalize="none" style={styles.textfield} onChangeText={(newVal: string) => setEmail(newVal)}>
            {email}
          </TextInput>
          <TextInput
            placeholder="Password"
            style={styles.textfield}
            secureTextEntry={true}
            onChangeText={(newVal: string) => setPassword(newVal)}
          ></TextInput>
          <TouchableOpacity style={styles.button} onPress={login}>
            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Sign In</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.section} onPress={() => {}}>
          <Text>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    backgroundColor: 'deepskyblue',
    borderRadius: 15,
    alignItems: 'center',
    paddingVertical: 5,
    marginTop: 10,
    width: 120
  },
  section: {
    alignItems: 'center',
    padding: 15
  },
  split: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    alignItems: 'center',
    paddingVertical: 15
  },
  icon: {
    width: 120,
    height: 120
  },
  textfield: {
    color: 'black',
    backgroundColor: '#f2f2f2',
    fontSize: 18,
    padding: 10,
    width: 240,
    borderRadius: 7.5,
    margin: 5
  },
  signup: {
    color: 'blue'
  }
})

export default LogInPage
