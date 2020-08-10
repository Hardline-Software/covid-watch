import React, { FC, Component, useState, useEffect } from 'react'
import Widget from './Widget'
import { StyleSheet, Text, View, FlatList, Alert, TextInput, TouchableOpacity } from 'react-native'
import { useAuthUser } from '../hooks/useAuthUser'

type HealthSummaryPopupProps = {
  closeFunction(): void
}

const HealthSummaryPopup: FC<HealthSummaryPopupProps> = (props) => {
  const { user } = useAuthUser()

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={props.closeFunction}>
        <Text>Quit</Text>
      </TouchableOpacity>

      <Widget />

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: 'white',
    borderRadius: 7.5,
    paddingVertical: 10
  }
})

export default HealthSummaryPopup
