import React, { FC, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'

type WidgetProps = {
  title: string
}

const Widget: FC<WidgetProps> = (props) => {
  return (
    <View style={styles.outer}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{props.title}</Text>
      <View style={styles.inner}>{props.children}</View>
      <TouchableOpacity>
        <MaterialIcons
          style={styles.expandIcon}
          name="arrow-drop-down-circle"
          size={24}
          color="deepskyblue"
          onPress={() => {
            // TODO flip  the arrow
          }}
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  outer: {
    flexDirection: 'column',
    margin: 10
  },
  inner: {
    backgroundColor: '#E8E8E8',
    padding: 10,
    borderRadius: 7.5
  },
  expandIcon: {
    position: 'absolute',
    bottom: -14,
    left: '46%'
  }
})

export default Widget
