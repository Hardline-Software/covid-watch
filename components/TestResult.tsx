import React, { FC } from 'react'
import { StyleSheet, Text, View } from 'react-native'

// TODO remove duplicate type declarations
enum TestStatus {
  REQUESTED,
  INPROGRESS,
  POSITIVE,
  NEGATIVE
}

type TestResultData = {
  id: number
  name: string
  date: string
  result: TestStatus
}

type TestResultProps = {
  data: TestResultData
}

const TestResult: FC<TestResultProps> = ({ data }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Result</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10
  },
  text: {}
})

const getBackgroundColor = (status: TestStatus) => {
  if (status == TestStatus.POSITIVE) return '#d94d48'
  if (status == TestStatus.NEGATIVE) return '#48d97d'
  if (status == TestStatus.INPROGRESS) return '#e6cb35'
  return '#E8E8E8'
}

export default TestResult
