import React from 'react'
import Widget from './Widget'
import { StyleSheet, Text, View } from 'react-native'
import { useAuthUser } from '../hooks/useAuthUser'
import {
  useUserQuarantinesQuery,
  useCreateQuarantineMutation,
  UserQuarantinesDocument,
  UserQuarantinesQuery,
  UserQuarantinesQueryVariables
} from '../generated/graphql'
import TextButton from './TextButton'
import { MaterialIcons } from '@expo/vector-icons'

const PersonalQuarantine = () => {
  const { user } = useAuthUser()

  const { data, loading, error } = useUserQuarantinesQuery({
    variables: {
      userId: user?.id!
    },
    skip: !user
  })

  const [createQuarantine] = useCreateQuarantineMutation({
    update: (cache, { data }) => {
      if (data) {
        const usersQuery = cache.readQuery<UserQuarantinesQuery, UserQuarantinesQueryVariables>({
          query: UserQuarantinesDocument,
          variables: {
            userId: data?.createQuarantine?.userId!
          }
        })
        if (usersQuery) {
          cache.writeQuery<UserQuarantinesQuery, UserQuarantinesQueryVariables>({
            query: UserQuarantinesDocument,
            variables: {
              userId: data?.createQuarantine?.userId!
            },
            data: {
              ...usersQuery,
              userQuarantines: {
                ...usersQuery.userQuarantines,
                items: [...usersQuery!.userQuarantines!.items!, data.createQuarantine!]
              }
            }
          })
        }
      }
    }
  })

  return (
    <Widget
      title="Personal Quarantine"
      expandable={data?.userQuarantines?.items ? true : false}
      base={
        data?.userQuarantines ? (
          <>
            <View style={{ ...styles.container, backgroundColor: '#b5ffc3' }}>
              <Text style={styles.big}>{(new Date().getTime() - new Date().getTime()) / 86400000}</Text>
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
