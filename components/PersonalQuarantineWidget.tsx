import React from 'react'
import Widget from './Widget'
import { StyleSheet, Text, View } from 'react-native'
import { useAuthUser } from '../hooks/useAuthUser'
import { useQuarantineQuery } from '../generated/graphql'

const PersonalQuarantine = () => {
  const { user } = useAuthUser()

  return (
    <Widget
      title="Personal Quarantine"
      expandable={true}
      base={
        <>
          <View style={styles.container}>
            <Text>0 days in quarantine</Text>
          </View>
        </>
      }
    ></Widget>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})

export default PersonalQuarantine
