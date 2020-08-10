import React, { FC, Component, useState, useEffect } from 'react'
import { StyleSheet, Text, View, FlatList, Alert, TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import {
  useCreateHealthCheckMutation,
  UserHealthChecksQuery,
  UserHealthChecksQueryVariables,
  UserHealthChecksDocument
} from '../generated/graphql'
import { useAuthUser } from '../hooks/useAuthUser'

type CheckupPopupProps = {
  closeFunction(): void
}

const CheckupPopup: FC<CheckupPopupProps> = (props) => {
  const [temperature, setTemperature] = useState('')
  const [symptoms, setSymptoms] = useState('')

  const { user } = useAuthUser()

  const [createHealthCheck] = useCreateHealthCheckMutation({
    update: (cache, { data }) => {
      if (data) {
        const usersQuery = cache.readQuery<UserHealthChecksQuery, UserHealthChecksQueryVariables>({
          query: UserHealthChecksDocument,
          variables: {
            userId: data?.createHealthCheck?.userId!
          }
        })
        if (usersQuery) {
          cache.writeQuery<UserHealthChecksQuery, UserHealthChecksQueryVariables>({
            query: UserHealthChecksDocument,
            variables: {
              userId: data?.createHealthCheck?.userId!
            },
            data: {
              ...usersQuery,
              userHealthChecks: {
                ...usersQuery.userHealthChecks,
                items: [...usersQuery!.userHealthChecks!.items!, data.createHealthCheck!]
              }
            }
          })
        }
      }
    }
  })

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Temperature (&#186;C)"
        value={temperature}
        onChangeText={(newVal: string) => setTemperature(newVal)}
      ></TextInput>
      <TextInput
        style={styles.textInput}
        placeholder="What symptoms are you feeling?"
        value={symptoms}
        onChangeText={(newVal: string) => setSymptoms(newVal)}
      ></TextInput>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          createHealthCheck({
            variables: {
              userId: user!.id,
              temperature: parseFloat(temperature),
              symptoms: [],
              organizationId: user!.organizationId
            }
          }).then(() => {
            props.closeFunction()
          })
        }
      >
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>Add Test Result</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ ...styles.button, backgroundColor: '#c70202' }} onPress={props.closeFunction}>
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>Cancel</Text>
      </TouchableOpacity>
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
  },
  textInput: {
    padding: 10,
    backgroundColor: '#F2F2F2',
    width: '60%',
    margin: 5,
    borderRadius: 7.5
  },
  button: {
    width: 170,
    alignItems: 'center',
    backgroundColor: 'deepskyblue',
    borderRadius: 15,
    paddingVertical: 5,
    margin: 5,
    textAlign: 'center'
  },
  member: {
    flexDirection: 'row',
    backgroundColor: '#F2F2F2',
    borderRadius: 7.5,
    width: '60%'
  },
  memberInput: {
    flex: 5,
    padding: 10,
    backgroundColor: '#F2F2F2',
    width: '70%',
    margin: 5,
    borderRadius: 7.5
  },
  add: {
    flex: 1,
    padding: 10,
    backgroundColor: 'deepskyblue',
    margin: 5,
    borderRadius: 7.5,
    alignContent: 'flex-end'
  },
  date: {
    flexDirection: 'row'
  },
  dateInput: {
    padding: 10,
    backgroundColor: '#F2F2F2',
    width: '10%',
    margin: 5,
    borderRadius: 7.5,
    textAlign: 'center'
  }
})

export default CheckupPopup
