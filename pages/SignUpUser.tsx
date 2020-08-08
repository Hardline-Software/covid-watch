import React, { useState } from 'react'
import { StyleSheet, Image, Text, View, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TextInput } from 'react-native-gesture-handler'

const SignUpUser = () => {
  const [first, setFirst] = useState('')
  const [last, setLast] = useState('')
  const [DOB, setDOB] = useState('')
  const [sex, setSex] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPswd, setConfirmPswd] = useState('')

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.icon} source={require('../assets/logo.png')} />
      <View style={styles.horz}>
        <TextInput
          placeholder="First"
          style={styles.input2}
          onChangeText={(newVal: string) => setFirst(newVal)}
        ></TextInput>
        <TextInput
          placeholder="Last"
          style={styles.input2}
          onChangeText={(newVal: string) => setLast(newVal)}
        ></TextInput>
      </View>
      <View style={styles.horz}>
        <TextInput
          placeholder="Date of Birth"
          style={styles.input2}
          onChangeText={(newVal: string) => setDOB(newVal)}
        ></TextInput>
        <TextInput
          placeholder="Sex"
          style={styles.input2}
          onChangeText={(newVal: string) => setSex(newVal)}
        ></TextInput>
      </View>
      <View style={styles.vert}>
        <TextInput
          placeholder="Email"
          style={styles.input1}
          onChangeText={(newVal: string) => setEmail(newVal)}
        ></TextInput>
        <TextInput
          placeholder="Password"
          style={styles.input1}
          secureTextEntry={true}
          onChangeText={(newVal: string) => setPassword(newVal)}
        ></TextInput>
        <TextInput
          placeholder="Confirm Password"
          style={styles.input1}
          secureTextEntry={true}
          onChangeText={(newVal: string) => setConfirmPswd(newVal)}
        ></TextInput>
      </View>
      <TouchableOpacity
        style={styles.signup}
        onPress={() => {
          if (password !== confirmPswd) {
            // do something
            return
          }
        }}
      >
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>Sign Up</Text>
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
  horz: {
    flexDirection: 'row'
  },
  vert: {
    width: '100%',
    alignItems: 'center'
  },
  signup: {
    width: 120,
    alignItems: 'center',
    backgroundColor: 'deepskyblue',
    borderRadius: 15,
    paddingVertical: 5,
    marginTop: 50,
    textAlign: 'center'
  },
  input1: {
    color: 'black',
    backgroundColor: '#F2F2F2',
    fontSize: 18,
    borderRadius: 7.5,
    padding: 15,
    margin: '2%',
    textAlign: 'center',
    width: '80%'
  },
  input2: {
    color: 'black',
    backgroundColor: '#F2F2F2',
    fontSize: 18,
    borderRadius: 7.5,
    padding: 15,
    margin: '2%',
    textAlign: 'center',
    width: '38%'
  }
})

export default SignUpUser
