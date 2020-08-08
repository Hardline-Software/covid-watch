import React from 'react'
import { StyleSheet, Image, Text, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'

const LogInPage = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/icon.png')} style={styles.icon} />
      <View>
        <View>
          <TextInput></TextInput>
        </View>
        <View style={}>
          <Text>Sign Up</Text>
        </View>
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
  icon: {
    width: 120,
    height: 120
  }
})

export default LogInPage
