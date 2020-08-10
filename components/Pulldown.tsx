import React, { FC } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { MaterialIcons } from '@expo/vector-icons'

type PulldownProps = {
  name: string | undefined
}

const Pulldown: FC<PulldownProps> = ({ name }) => {
  return (
    <View style={styles.container}>
      <View style={styles.icons}>
        <TouchableOpacity>
          <MaterialIcons name="person" size={40} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.header}>
        <Text style={styles.headerText}>Welcome, {name}!</Text>
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
    justifyContent: 'flex-end'
  },
  header: {
    alignItems: 'center',
    fontSize: 36
  },
  headerText: {
    fontSize: 36
  }
})

export default Pulldown
