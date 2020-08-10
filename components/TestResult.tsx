import React, { FC } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TestResultFragment, TestResultStatus } from '../generated/graphql'
import { format } from 'date-fns'

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
        {format(new Date(data!.updatedAt!), 'MM/dd/yyyy')}
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

const getBackgroundColor = (result: TestResultStatus) => {
  switch (result) {
    case TestResultStatus.POSITIVE:
      return 'darkred'
    case TestResultStatus.IN_PROGRESS:
      return '#dea300'
    case TestResultStatus.NEGATIVE:
      return '#26bf00'
    default:
      return '#E8E8E8'
  }
}

export default TestResult
