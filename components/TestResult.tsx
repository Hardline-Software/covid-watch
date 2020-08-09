import React, { FC } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TestResultFragment, TestResultStatus } from '../generated/graphql'

type TestResultProps = {
  data: TestResultFragment
}

const TestResult: FC<TestResultProps> = ({ data }) => {
  return (
    <View style={{ ...styles.container, backgroundColor: getBackgroundColor(data.status) }}>
      <Text
        style={
          data.status == TestResultStatus.REQUESTED
            ? { color: 'black', fontWeight: 'bold' }
            : { color: 'white', fontWeight: 'bold' }
        }
      >
        COVID-19
        {`\n`}
        {data.location}
      </Text>
      <Text
        style={
          data.status == TestResultStatus.REQUESTED
            ? { color: 'black', fontWeight: 'bold' }
            : { color: 'white', fontWeight: 'bold' }
        }
      >
        {data.status == TestResultStatus.REQUESTED
          ? 'Requested'
          : data.status == TestResultStatus.POSITIVE
          ? 'Positive'
          : data.status == TestResultStatus.NEGATIVE
          ? 'Negative'
          : data.status == TestResultStatus.IN_PROGRESS
          ? 'In Progress'
          : 'Unknown'}
        {`\n`}
        {data.updatedAt}
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
