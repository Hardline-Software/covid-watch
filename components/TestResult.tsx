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
    <View style={{ ...styles.container, backgroundColor: getBackgroundColor(data.result) }}>
      <Text
        style={
          data.result == TestStatus.REQUESTED
            ? { color: 'black', fontWeight: 'bold' }
            : { color: 'white', fontWeight: 'bold' }
        }
      >
        {data.name}
      </Text>
      <Text
        style={
          data.result == TestStatus.REQUESTED
            ? { color: 'black', fontWeight: 'bold' }
            : { color: 'white', fontWeight: 'bold' }
        }
      >
        {data.result == TestStatus.REQUESTED
          ? 'Requested'
          : data.result == TestStatus.POSITIVE
          ? 'Positive'
          : data.result == TestStatus.NEGATIVE
          ? 'Negative'
          : data.result == TestStatus.INPROGRESS
          ? 'In Progress'
          : 'Unknown'}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#E8E8E8',
    justifyContent: 'space-between'
  }
})

const getBackgroundColor = (result: TestStatus) => {
  switch (result) {
    case TestStatus.POSITIVE:
      return 'darkred'
      break
    case TestStatus.INPROGRESS:
      return '#dea300'
      break
    case TestStatus.NEGATIVE:
      return '#26bf00'
      break
    default:
      return '#E8E8E8'
      break
  }
}

export default TestResult
