import React, { FC, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

type WidgetProps = {
  title: string
}

const Widget: FC<WidgetProps> = (props) => {
  return (
    <View style={styles.outer}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{props.title}</Text>
      <View style={styles.inner}>{props.children}</View>
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
  }
})

export default Widget
