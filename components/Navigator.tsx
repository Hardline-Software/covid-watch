import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'

const Navigator = () => {
  return (
    <View style={styles.container}>
      <View style={styles.icons}>
        <TouchableOpacity>
          <MaterialIcons name="person" size={40} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialCommunityIcons name="office-building" size={40} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column'
    //backgroundColor: 'red'
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})

export default Navigator
