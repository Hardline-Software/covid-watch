import React, { FC } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

type TextButtonProps = {
  color: string
  toggleFunction(): void
}

const TextButton: FC<TextButtonProps> = (props) => {
  return (
    <TouchableOpacity style={{ ...styles.container, backgroundColor: props.color }} onPress={props.toggleFunction}>
      {props.children}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  },
  text: {
    color: 'white',
    fontWeight: 'bold'
  }
})

export default TextButton
