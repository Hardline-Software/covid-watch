import React, { useState } from 'react'
import { StyleSheet, Image, Text, View } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'

const LogInPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.icon} />
      <View>
        <View style={(styles.section, styles.split)}>
          <TextInput placeholder="Email" style={styles.textfield} onChangeText={(newVal: string) => setEmail(newVal)}>
            {email}
          </TextInput>
          <TextInput
            placeholder="Password"
            style={styles.textfield}
            secureTextEntry={true}
            onChangeText={(newVal: string) => setPassword(newVal)}
          ></TextInput>
          <TouchableOpacity style={styles.button}>
            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Sign In</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.section}>
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
