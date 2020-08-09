import React, { Component, useState, useEffect } from 'react'
import Widget from './Widget'
import { StyleSheet, Text, View, FlatList, Alert, TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Modal from 'react-native-modal'
import QuarantinePopup from '../components/QuarantinesPopup'
import { MaterialIcons } from '@expo/vector-icons'

const QuarantineWidget = () => {
  const [isModalVisible, setModalVisible] = useState(false)

  const toggleModal = () => {
    setModalVisible(!isModalVisible)
  }
  return (
    <Widget
      title="Quarantines"
      expandable={false}
      base={<>
        <Modal style={styles.quarantinePopup} isVisible={isModalVisible} coverScreen={true}>
          <QuarantinePopup closeFunction={toggleModal} />
        </Modal>
        <TouchableOpacity style={{alignItems: 'flex-end', padding: 10}} onPress={toggleModal}>
          <MaterialIcons name="add" size={30} color="black" />
        </TouchableOpacity></>
      }
    >
      <View style={styles.container}></View>
    </Widget>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  quarantinePopup: {
    alignContent: 'center',
    justifyContent: 'center'
  }
})

export default QuarantineWidget
