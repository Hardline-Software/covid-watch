import React, { useState } from 'react'
import { StyleSheet, Image, Text, View, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TextInput } from 'react-native-gesture-handler'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const SignUpUser = () => {
  const [organization, setOrganization] = useState('')
  const [country, setCountry] = useState('')
  const [state, setState] = useState('')
  const [city, setCity] = useState('')
  const [zip, setZip] = useState('')
  const [address, setAddress] = useState('')
  const [website, setWebsite] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
      
    <KeyboardAwareScrollView style={{ flex: 1 }}>
    <SafeAreaView style={styles.container}>
        <View style={styles.vert}>
          <TextInput
            placeholder="Organization"
            style={styles.input1}
            onChangeText={(newVal: string) => setOrganization(newVal)}
          ></TextInput>
        </View>

        <View style={styles.horz}>
          <TextInput
            placeholder="Country"
            style={styles.input2}
            onChangeText={(newVal: string) => setCountry(newVal)}
          ></TextInput>
          <TextInput
            placeholder="State"
            style={styles.input2}
            onChangeText={(newVal: string) => setState(newVal)}
          ></TextInput>
        </View>

        <View style={styles.horz}>
          <TextInput
            placeholder="City"
            style={styles.input2}
            onChangeText={(newVal: string) => setCity(newVal)}
          ></TextInput>
          <TextInput
            placeholder="Zip"
            style={styles.input2}
            onChangeText={(newVal: string) => setZip(newVal)}
          ></TextInput>
        </View>

        <View style={styles.vert}>
          <TextInput
            placeholder="Address"
            style={styles.input1}
            onChangeText={(newVal: string) => setAddress(newVal)}
          ></TextInput>
          <TextInput
            placeholder="Website"
            style={styles.input1}
            onChangeText={(newVal: string) => setWebsite(newVal)}
          ></TextInput>
          <TextInput
            placeholder="Phone Number"
            style={styles.input1}
            onChangeText={(newVal: string) => setPhone(newVal)}
          ></TextInput>
          <TextInput
            placeholder="Email"
            style={styles.input1}
            onChangeText={(newVal: string) => setEmail(newVal)}
          ></TextInput>
          <TextInput placeholder="Password" style={styles.input1} secureTextEntry={true}></TextInput>
          <TextInput
            placeholder="Confirm Password"
            style={styles.input1}
            secureTextEntry={true}
            onChangeText={(newVal: string) => setPassword(newVal)}
          ></TextInput>
        </View>

        <TouchableOpacity style={styles.signup}>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>Sign Up</Text>
        </TouchableOpacity>
    </SafeAreaView>
    
    </KeyboardAwareScrollView>
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
