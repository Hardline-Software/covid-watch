import React, { useState } from 'react'
import { StyleSheet, Image, Text, View, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TextInput } from 'react-native-gesture-handler'

const SignUpPage = () => {
  const [date, setDate] = useState(new Date())

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.icon} source={require('../assets/logo.png')} />
      <TouchableOpacity style={styles.button}>
        <Text style={{ color: 'black', fontSize: 30 }}>User</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={{ color: 'black', fontSize: 30 }}>Organization</Text>
      </TouchableOpacity>
    </SafeAreaView>
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
  icon: {
    margin: '2%',
    resizeMode: 'contain',
    height: 120,
    width: 120
  },
  button: {
    width: '50%',
    alignItems: 'center',
    backgroundColor: 'deepskyblue',
    borderRadius: 7.5,
    paddingVertical: 5,
    marginTop: 10,
    textAlign: 'center'
  }
})

export default SignUpPage
