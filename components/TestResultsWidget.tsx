import React, { useState } from 'react'
import Widget from './Widget'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import TestResult from './TestResult'
import AddTestResult from './AddTestResult'
import Modal from 'react-native-modal'
import TestResultPopup from '../components/TestResultPopup'
import { useUserTestResultsQuery, TestResultFragment } from '../generated/graphql'
import { useAuthUser } from '../hooks/useAuthUser'

const TestResultsWidget = () => {
  const [isModalVisible, setModalVisible] = useState(false)

  const toggleModal = () => {
    setModalVisible(!isModalVisible)
  }

  const { user } = useAuthUser()

  const { data, loading, error } = useUserTestResultsQuery({
    variables: {
      userId: user?.id!
    },
    skip: !user
  })

  return (
    <Widget
      title="Test Results"
      expandable={false}
      base={
        <>
          <Modal style={styles.testResultPopup} isVisible={isModalVisible} coverScreen={true}>
            <TestResultPopup closeFunction={toggleModal} />
          </Modal>
          {data?.userTestResults?.items &&
            (data?.userTestResults?.items).map((item, index) => <TestResult data={item!} key={index} />)}
          <AddTestResult toggleFunction={toggleModal} />
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
