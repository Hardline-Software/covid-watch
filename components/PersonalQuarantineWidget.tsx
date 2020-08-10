import React from 'react'
import Widget from './Widget'
import { StyleSheet, Text, View } from 'react-native'
import { useAuthUser } from '../hooks/useAuthUser'
import {
  useUserQuarantinesQuery,
  useCreateQuarantineMutation,
  UserQuarantinesDocument,
  UserQuarantinesQuery,
  UserQuarantinesQueryVariables,
  QuarantineLocation
} from '../generated/graphql'
import TextButton from './TextButton'
import { MaterialIcons } from '@expo/vector-icons'
import { format, differenceInDays } from 'date-fns'

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
      expandable={data?.userQuarantines && data!.userQuarantines!.items!.length > 0 ? true : false}
      base={
        data?.userQuarantines && data!.userQuarantines!.items!.length > 0 ? (
          <>
            <View style={{ ...styles.container, backgroundColor: '#b5ffc3' }}>
              <Text style={styles.big}>
                {differenceInDays(new Date(), new Date(data!.userQuarantines!.items![0]!.start))}
              </Text>
              <Text>day(s) in quarantine</Text>
            </View>
          </>
        ) : (
          <>
            <View style={{ ...styles.container, backgroundColor: '#ffbab5' }}>
              <Text style={{ fontWeight: 'bold' }}>You are not currently quarantining.</Text>
            </View>
            <TextButton
              color="red"
              toggleFunction={() => {
                createQuarantine({
                  variables: {
                    userId: user!.id,
                    start: format(new Date(), 'yyyy-MM-dd'),
                    organizationId: user!.organizationId,
                    end: format(new Date(new Date().getTime() + 1210000000), 'yyyy-MM-dd'),
                    location: QuarantineLocation.HOME // TODO make a modal selector for this
                  }
                })
              }}
            >
              <Text style={{ fontWeight: 'bold', color: 'white' }}>Begin Quarantine&nbsp;</Text>
              <MaterialIcons name="lock" size={24} color="white" />
            </TextButton>
          </>
        )
      }
    >
      <View style={{ ...styles.container, backgroundColor: '#b5ffc3' }}>
        <Text style={{ fontSize: 12 }}>
          Quarantine ends on {format(new Date(data!.userQuarantines!.items![0]!.end), 'MM/dd/yyyy')}
        </Text>
      </View>
    </Widget>
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
