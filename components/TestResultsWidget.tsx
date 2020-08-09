import React from 'react'
import Widget from './Widget'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import TestResult from './TestResult'
import AddTestResult from './AddTestResult'

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

const TestResultsWidget = () => {
  const testResults: TestResultData[] = [
    {
      id: 1,
      name: 'COVID-19 A',
      date: '09/21/1970',
      result: TestStatus.POSITIVE
    },
    {
      id: 2,
      name: 'COVID-19 B',
      date: '12/03/2200',
      result: TestStatus.POSITIVE
    }
  ] // TODO hook into backend

  return (
    <Widget
      title="Test Results"
      expandable={false}
      base={
        <>
          <FlatList
            data={testResults}
            renderItem={({ item }) => <TestResult data={item} />}
            keyExtractor={(item: object, index: number) => `${index}`}
          />
          <AddTestResult />
        </>
      }
    />
  )
}

const styles = StyleSheet.create({
  container: {}
})

export default TestResultsWidget
