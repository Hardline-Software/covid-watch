import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

const AddTestResult = () => {
  return (
    //TODO  make this functional
    <TouchableOpacity style={styles.container} onPress={() => console.log('Ocatvian popup magic')}>
      <MaterialIcons name="add-circle" size={24} color="white" />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'deepskyblue',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: 'white',
    fontWeight: 'bold'
  }
})

export default AddTestResult
