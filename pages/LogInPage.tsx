import React, { FC, useCallback, useState } from 'react'
import { StyleSheet, Image, Text, View, ActivityIndicator } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { Auth } from 'aws-amplify'
import { useApolloClient } from '@apollo/client'
import { UserQuery, UserQueryVariables, UserDocument, UserRole } from '../generated/graphql'

type LoginError =
  | 'UserNotConfirmedException'
  | 'PasswordResetRequiredException'
  | 'NotAuthorizedException'
  | 'UserNotFoundException'

type LoginChallenge = 'SMS_MFA' | 'SOFTWARE_TOKEN_MFA' | 'NEW_PASSWORD_REQUIRED' | 'MFA_SETUP'

const LogInPage = () => {
  const client = useApolloClient()
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [newPasswordRequired, setNewPasswordRequired] = useState(false)
  const [newPasswordInvalid, setNewPasswordInvalid] = useState(false)
  const [confirmPasswordError, setConfirmPasswordError] = useState(false)
  const [errorCode, setErrorCode] = useState<LoginError | null>(null)
  const [challenge, setChallenge] = useState<LoginChallenge | null>(null)
  const [mfaCode, setMfaCode] = useState('')
  const [mfaCodeRequired, setMfaCodeRequired] = useState(false)
  const [invalidMfaCode, setInvalidMfaCode] = useState(false)
  const [user, setUser] = useState<any>(null)
  const navigation = useNavigation()

  const redirect = useCallback(
    async (user) => {
      const { data } = await client.query<UserQuery, UserQueryVariables>({
        query: UserDocument,
        variables: {
          id: user.username
        }
      })
      if (data?.user?.role === UserRole.MANAGER) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Organization Dashboard' }]
        })
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: 'User Dashboard' }]
        })
      }
    },
    [client, navigation]
  )

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
        console.log('New password required')
      } else if (user.challengeName === 'MFA_SETUP') {
        // This happens when the MFA method is TOTP
        // The user needs to setup the TOTP before using it
        // More info please check the Enabling MFA part
        Auth.setupTOTP(user)
      } else {
        // The user directly signs in
        console.log(user)
        // Redirect to user dasboard page
        redirect(user)
      }
    } catch (err) {
      console.log(err)
      setErrorCode(err.code)
      if (err.code === 'UserNotConfirmedException') {
        // The error happens if the user didn't finish the confirmation step when signing up
        // In this case you need to resend the code and confirm the user
        // About how to resend the code and confirm the user, please check the signUp part
        console.log('User not confirmed')
      } else if (err.code === 'PasswordResetRequiredException') {
        // The error happens when the password is reset in the Cognito console
        // In this case you need to call forgotPassword to reset the password
        // Please check the Forgot Password part.
        console.log('Password reset')
      } else if (err.code === 'NotAuthorizedException') {
        // The error happens when the incorrect password is provided
        console.log('Incorrect password')
      } else if (err.code === 'UserNotFoundException') {
        // The error happens when the supplied username/email does not exist in the Cognito user pool
        console.log('User not found')
      } else {
        console.log(err)
      }
    }
    setLoading(false)
  }, [email, password])

  const createPassword = useCallback(async () => {
    setLoading(true)
    try {
      const loggedUser = await Auth.completeNewPassword(user, newPassword, {
        email,
        birthdate: '2000-01-01',
        family_name: 'Family',
        given_name: 'Given',
        gender: 'FEMALE'
      })
      console.log(loggedUser)
      // Redirect to dashboard page
      navigation.reset({
        index: 0,
        routes: [{ name: 'UserDashboard' }]
      })
    } catch (err) {
      console.log(err)
      if (err.code === 'InvalidPasswordException') {
        setNewPasswordInvalid(true)
      }
    }
    setLoading(false)
  }, [newPassword, user])

  const confirmSignIn = useCallback(async () => {
    setLoading(true)
    try {
      await Auth.confirmSignIn(user, mfaCode).then(() => {
        // Redirect to dashboard page
        redirect(user)
      })
    } catch (err) {
      console.error(err)
      setInvalidMfaCode(true)
    }
    setLoading(false)
  }, [user, mfaCode])

  const forceResetPassword = useCallback(async () => {
    setLoading(true)
    try {
      await Auth.forgotPasswordSubmit(email, mfaCode, newPassword)
      setErrorCode(null)
    } catch (err) {
      console.log(err)
      if (err.code === 'CodeMismatchException' || err.code === 'ExpiredCodeException') {
        setInvalidMfaCode(true)
      } else if (err.code === 'InvalidParameterException') {
        setNewPasswordInvalid(true)
      }
    }
    setLoading(false)
  }, [email, mfaCode, newPassword])

  const forgotPassword = useCallback(async () => {
    setLoading(true)
    try {
      await Auth.forgotPassword(email)
    } catch (err) {
      console.log(err)
    }
    setLoading(false)
  }, [email])

  let emailError
  let passwordError

  switch (errorCode) {
    case 'NotAuthorizedException':
      passwordError = 'Incorrect Password'
      break
    case 'UserNotFoundException':
      emailError = 'User not found'
      break
    case 'UserNotConfirmedException':
      emailError = 'Please confirm your email address'
      break
  }

  let content

  if (errorCode === 'PasswordResetRequiredException') {
    content = (
      <View>
        <View style={(styles.section, styles.split)}>
          <Text style={{ textAlign: 'center', padding: 24 }}>
            A password reset code as been sent to {email}. Please enter the code below to reset your password.
          </Text>
          <TextInput
            autoFocus
            autoCapitalize="none"
            placeholder="6-Digit Code"
            maxLength={6}
            keyboardType="numeric"
            style={styles.textfield}
            value={mfaCode}
            onChangeText={(newVal: string) => setMfaCode(newVal)}
          />
          {invalidMfaCode && <Text style={styles.errorText}>Invalid verification code</Text>}
          {mfaCodeRequired && <Text style={styles.errorText}>You must enter a code to re-activate your account</Text>}
          <TextInput
            placeholder="New Password"
            style={styles.textfield}
            secureTextEntry={true}
            value={newPassword}
            onChangeText={(newVal: string) => setNewPassword(newVal)}
          />
          {newPasswordRequired && <Text style={styles.errorText}>You must enter a new password</Text>}
          {newPasswordInvalid && (
            <Text style={styles.errorText}>
              Your new password must be at least 8 characters long and contain a number
            </Text>
          )}
          <TextInput
            placeholder="Confirm Password"
            style={styles.textfield}
            secureTextEntry={true}
            value={confirmPassword}
            onChangeText={(newVal: string) => setConfirmPassword(newVal)}
          />
          {confirmPasswordError && <Text style={styles.errorText}>The passwords must match</Text>}
          {loading ? (
            <ActivityIndicator style={styles.spinner} size="small" color="deepskyblue" />
          ) : (
            <TouchableOpacity
              style={{
                ...styles.button,
                width: 200
              }}
              onPress={() => {
                if (!mfaCode) {
                  setMfaCodeRequired(true)
                } else {
                  if (!newPassword) {
                    setNewPasswordRequired(true)
                  } else if (newPassword !== confirmPassword) {
                    setConfirmPasswordError(true)
                  } else {
                    setInvalidMfaCode(false)
                    setMfaCodeRequired(false)
                    setConfirmPasswordError(false)
                    forceResetPassword()
                  }
                }
              }}
            >
              <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Reset Password</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    )
  } else if (challenge === 'NEW_PASSWORD_REQUIRED') {
    content = content = (
      <View>
        <View style={(styles.section, styles.split)}>
          <Text style={{ textAlign: 'center', padding: 24 }}>
            In order to secure your account, you must create a new password.
          </Text>
          <TextInput
            placeholder="New Password"
            style={styles.textfield}
            secureTextEntry={true}
            value={newPassword}
            onChangeText={(newVal: string) => setNewPassword(newVal)}
          />
          {newPasswordRequired && <Text style={styles.errorText}>You must enter a new password</Text>}
          {newPasswordInvalid && (
            <Text style={styles.errorText}>
              Your new password must be at least 8 characters long and contain a number
            </Text>
          )}
          <TextInput
            placeholder="Confirm Password"
            style={styles.textfield}
            secureTextEntry={true}
            value={confirmPassword}
            onChangeText={(newVal: string) => setConfirmPassword(newVal)}
          />
          {confirmPasswordError && <Text style={styles.errorText}>The passwords must match</Text>}
          {loading ? (
            <ActivityIndicator style={styles.spinner} size="small" color="deepskyblue" />
          ) : (
            <TouchableOpacity
              style={{
                ...styles.button,
                width: 200
              }}
              onPress={(e) => {
                if (!newPassword) {
                  setNewPasswordRequired(true)
                } else if (newPassword !== confirmPassword) {
                  setConfirmPasswordError(true)
                } else {
                  setNewPasswordRequired(false)
                  setNewPasswordInvalid(false)
                  setConfirmPasswordError(false)
                  createPassword()
                }
              }}
            >
              <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Reset Password</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    )
  } else if (challenge === 'SMS_MFA') {
    content = (
      <View>
        <View style={(styles.section, styles.split)}>
          <Text>
            We&apos;ve sent a verification code via {user.challengeParam.CODE_DELIVERY_DELIVERY_MEDIUM} to{' '}
            {user.challengeParam.CODE_DELIVERY_DESTINATION}{' '}
          </Text>
          <TextInput
            autoFocus
            autoCapitalize="none"
            placeholder="6-Digit Code"
            maxLength={6}
            keyboardType="numeric"
            style={styles.textfield}
            value={mfaCode}
            onChangeText={(newVal: string) => setMfaCode(newVal)}
          />
          {invalidMfaCode && <Text style={styles.errorText}>Invalid verification code</Text>}
          {mfaCodeRequired && <Text style={styles.errorText}>You must enter a code to re-activate your account</Text>}
          {loading ? (
            <ActivityIndicator style={styles.spinner} size="small" color="deepskyblue" />
          ) : (
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                if (!mfaCode) {
                  setMfaCodeRequired(true)
                } else {
                  setInvalidMfaCode(false)
                  setMfaCodeRequired(false)
                  confirmSignIn()
                }
              }}
            >
              <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Sign In</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    )
  } else {
    content = (
      <View>
        <View style={(styles.section, styles.split)}>
          <TextInput
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Email"
            style={styles.textfield}
            value={email}
            onChangeText={(newVal: string) => setEmail(newVal)}
          />
          {emailError && <Text style={styles.errorText}>{emailError}</Text>}
          <TextInput
            placeholder="Password"
            autoCapitalize="none"
            style={styles.textfield}
            secureTextEntry={true}
            value={password}
            onChangeText={(newVal: string) => setPassword(newVal)}
          />
          {passwordError && <Text style={styles.errorText}>{passwordError}</Text>}
          {loading ? (
            <ActivityIndicator style={styles.spinner} size="small" color="deepskyblue" />
          ) : (
            <TouchableOpacity style={styles.button} onPress={login}>
              <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Sign In</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.icon} />
      {content}
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
    padding: 15,
    marginBottom: 0
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
  },
  errorText: {
    color: 'red'
  },
  spinner: {
    marginTop: 15
  }
})

export default LogInPage
