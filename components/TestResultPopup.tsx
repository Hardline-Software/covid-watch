import React, { FC, Component, useState, useEffect } from 'react'
import Widget from './Widget'
import { StyleSheet, Text, View, FlatList, Alert, TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

type TestResultPopupProps = {
  closeFunction(): void
}

const TestResultPopup: FC<TestResultPopupProps> = (props) => {
  const [testResults, setTestResults] = useState<object[]>([])

  const [testCenterName, setTestCenterName] = useState('')
  const [testName, setTestName] = useState('')
  const [testDate, setTestDate] = useState('')
  const [resultDate, setResultDate] = useState('')
  const [result, setResult] = useState('')

  useEffect(() => {
    console.log(testResults)
  }, [testResults])

  const addTestResultHandler = (testCenterName: string, testName: string, testDate: string, resultDate: string, result: string) => {
    setTestResults([...testResults, generateTestResult(testCenterName, testName, testDate, resultDate, result)])
  }

  const generateTestResult = (centerName: string, testName: string, testDate: string, resultDate: string, result: string) => {
    return {
      centerName: centerName,
      testName: testName,
      testDate: testDate,
      resultDate: resultDate,
      result: result
    }
  }

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
        placeholder="Test Name"
        value={testName}
        onChangeText={(newVal: string) => setTestName(newVal)}
      ></TextInput>
      <TextInput
        style={styles.textInput}
        placeholder="Test Date"
        value={testDate}
        onChangeText={(newVal: string) => setTestDate(newVal)}
      ></TextInput>
      <TextInput
        style={styles.textInput}
        placeholder="Result Date"
        value={resultDate}
        onChangeText={(newVal: string) => setResultDate(newVal)}
      ></TextInput>
      <TextInput
        style={styles.textInput}
        placeholder="Result"
        value={result}
        onChangeText={(newVal: string) => setResult(newVal)}
      ></TextInput>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          addTestResultHandler(testCenterName, testName, testDate, resultDate, result)
        }
      >
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>Add Test Result</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={props.closeFunction}>
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>Done</Text>
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
    alignContent: 'flex-end',
  }
})

export default TestResultPopup
