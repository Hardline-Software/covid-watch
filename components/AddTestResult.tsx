import React, { FC } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

type AddTestResultsPopupProps = {
  toggleFunction(): void
}


const AddTestResult: FC<AddTestResultsPopupProps> = (props) => {
  return (
    //TODO  make this functional
    <TouchableOpacity style={styles.container} onPress={props.toggleFunction}>
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
