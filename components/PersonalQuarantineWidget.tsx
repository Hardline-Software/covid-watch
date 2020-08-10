import React from 'react'
import Widget from './Widget'
import { StyleSheet, Text, View } from 'react-native'
import { useAuthUser } from '../hooks/useAuthUser'
import { useQuarantineQuery } from '../generated/graphql'
import TextButton from './TextButton'
import { MaterialIcons } from '@expo/vector-icons'

const PersonalQuarantine = () => {
  const { user } = useAuthUser()

  const { data, loading, error } = useQuarantineQuery({
    variables: {
      id: user?.id!
    },
    skip: !user
  })

  return (
    <Widget
      title="Personal Quarantine"
      expandable={data?.quarantine ? true : false}
      base={
        data?.quarantine ? (
          <>
            <View style={{ ...styles.container, backgroundColor: '#b5ffc3' }}>
              <Text style={styles.big}>0</Text>
              <Text>days in quarantine</Text>
            </View>
            <TextButton
              color="green"
              toggleFunction={() => {
                // remove quarantine
              }}
            >
              <Text style={{ fontWeight: 'bold', color: 'white' }}>Finish Quarantine&nbsp;</Text>
            </TextButton>
          </>
        ) : (
          <>
            <View style={{ ...styles.container, backgroundColor: '#ffbab5' }}>
              <Text style={{ fontWeight: 'bold' }}>You are not currently quarantining.</Text>
            </View>
            <TextButton
              color="red"
              toggleFunction={() => {
                // add quarantine through mutation
              }}
            >
              <Text style={{ fontWeight: 'bold', color: 'white' }}>Begin Quarantine&nbsp;</Text>
              <MaterialIcons name="lock" size={24} color="white" />
            </TextButton>
          </>
        )
      }
    ></Widget>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  big: {
    fontWeight: 'bold',
    fontSize: 30,
    marginRight: 10
  }
})

export default PersonalQuarantine
