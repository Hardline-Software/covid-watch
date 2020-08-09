import React, { useState } from 'react'
import Widget from './Widget'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import TestResult from './TestResult'
import AddTestResult from './AddTestResult'
import Modal from 'react-native-modal'
import TestResultPopup from '../components/TestResultPopup'

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
  const [isModalVisible, setModalVisible] = useState(false)

  const toggleModal = () => {
    setModalVisible(!isModalVisible)
  }

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
      result: TestStatus.REQUESTED
    }
  ] // TODO hook into backend

  return (
    <Widget
      title="Test Results"
      expandable={false}
      base={
        <>
          <Modal style={styles.testResultPopup} isVisible={isModalVisible} coverScreen={true}>
            <TestResultPopup closeFunction={toggleModal} />
          </Modal>
          <FlatList
            data={testResults}
            renderItem={({ item }) => <TestResult data={item} />}
            keyExtractor={(item: object, index: number) => `${index}`}
          />
          <AddTestResult toggleFunction={toggleModal}/>
        </>
      }
    />
  )
}

const styles = StyleSheet.create({
  container: {},
  testResultPopup: {}
})

export default TestResultsWidget
