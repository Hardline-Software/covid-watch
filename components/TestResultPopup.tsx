import React, { FC, Component, useState, useEffect } from 'react'
import Widget from './Widget'
import { StyleSheet, Text, View, FlatList, Alert, TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import {
  useCreateTestResultMutation,
  TestResultStatus,
  TestType,
  UserTestResultsQuery,
  UserTestResultsQueryVariables,
  UserTestResultsDocument
} from '../generated/graphql'
import { useAuthUser } from '../hooks/useAuthUser'

type TestResultPopupProps = {
  closeFunction(): void
}

const TestResultPopup: FC<TestResultPopupProps> = (props) => {
  const [testCenterName, setTestCenterName] = useState('')
  const [testName, setTestName] = useState('')
  const [testDay, setTestDay] = useState('')
  const [testMonth, setTestMonth] = useState('')
  const [testYear, setTestYear] = useState('')
  const [resultDay, setResultDay] = useState('')
  const [resultMonth, setResultMonth] = useState('')
  const [resultYear, setResultYear] = useState('')
  const [result, setResult] = useState('')

  const { user } = useAuthUser()

  const [createTestResult] = useCreateTestResultMutation({
    update: (cache, { data }) => {
      if (data) {
        const usersQuery = cache.readQuery<UserTestResultsQuery, UserTestResultsQueryVariables>({
          query: UserTestResultsDocument,
          variables: {
            userId: data?.createTestResult?.userId!
          }
        })
        if (usersQuery) {
          cache.writeQuery<UserTestResultsQuery, UserTestResultsQueryVariables>({
            query: UserTestResultsDocument,
            variables: {
              userId: data?.createTestResult?.userId!
            },
            data: {
              ...usersQuery,
              userTestResults: {
                ...usersQuery.userTestResults,
                items: [...usersQuery!.userTestResults!.items!, data.createTestResult!]
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
        placeholder="Test Center Name"
        value={testCenterName}
        onChangeText={(newVal: string) => setTestCenterName(newVal)}
      ></TextInput>
      <TextInput
        style={styles.textInput}
        placeholder="Result"
        value={result}
        onChangeText={(newVal: string) => setResult(newVal)}
      ></TextInput>
      <Text>Test Date</Text>
      <View style={styles.date}>
        <TextInput
          style={styles.dateInput}
          placeholder="MM"
          value={testMonth}
          onChangeText={(newVal: string) => setTestMonth(newVal)}
        ></TextInput>
        <TextInput
          style={styles.dateInput}
          placeholder="DD"
          value={testDay}
          onChangeText={(newVal: string) => setTestDay(newVal)}
        ></TextInput>
        <TextInput
          style={styles.dateInput}
          placeholder="YYYY"
          value={testYear}
          onChangeText={(newVal: string) => setTestYear(newVal)}
        ></TextInput>
      </View>
      <Text>Results Date</Text>
      <View style={styles.date}>
        <TextInput
          style={styles.dateInput}
          placeholder="MM"
          value={resultMonth}
          onChangeText={(newVal: string) => setResultMonth(newVal)}
        ></TextInput>
        <TextInput
          style={styles.dateInput}
          placeholder="DD"
          value={resultDay}
          onChangeText={(newVal: string) => setResultDay(newVal)}
        ></TextInput>
        <TextInput
          style={styles.dateInput}
          placeholder="YYYY"
          value={resultYear}
          onChangeText={(newVal: string) => setResultYear(newVal)}
        ></TextInput>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          createTestResult({
            variables: {
              userId: user!.id,
              status: strToStatus(result),
              location: testCenterName,
              type: TestType.VIRAL,
              retest: false,
              started: testYear + '-' + testMonth + '-' + testDay,
              completed: resultYear + '-' + resultMonth + '-' + resultDay,
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

const strToStatus = (str: string) => {
  switch (str.toLowerCase()) {
    case 'in progress':
      return TestResultStatus.IN_PROGRESS
    case 'negative':
      return TestResultStatus.NEGATIVE
    case 'positive':
      return TestResultStatus.POSITIVE
    case 'requested':
      return TestResultStatus.REQUESTED
    default:
      return TestResultStatus.INCONCLUSIVE
  }
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

export default TestResultPopup
