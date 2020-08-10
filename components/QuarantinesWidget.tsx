import React, { Component, useState, useEffect } from 'react'
import Widget from './Widget'
import { StyleSheet, Text, View, FlatList, Alert, TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Modal from 'react-native-modal'
import QuarantinePopup from '../components/QuarantinesPopup'
import { MaterialIcons } from '@expo/vector-icons'
import { useAuthUser } from '../hooks/useAuthUser'
import { useOrgQuarantinesQuery } from '../generated/graphql'

const QuarantinesWidget = () => {
  const { user } = useAuthUser()

  const { data: dataQ, loading: loadingQ, error: errorQ } = useOrgQuarantinesQuery({
    variables: {
      organizationId: user?.organizationId!
    },
    skip: !user
  })

  console.log(dataQ?.orgQuarantines?.items)

  const [isModalVisible, setModalVisible] = useState(false)

  const toggleModal = () => {
    setModalVisible(!isModalVisible)
  }
  return (
    <Widget
      title="Quarantines"
      expandable={false}
      base={
        <>
          <Modal style={styles.quarantinePopup} isVisible={isModalVisible} coverScreen={true}>
            <QuarantinePopup closeFunction={toggleModal} />
          </Modal>
          <TouchableOpacity style={{ alignItems: 'flex-end', padding: 10 }} onPress={toggleModal}>
            <MaterialIcons name="add" size={30} color="black" />
          </TouchableOpacity>
          <View>
              {loadingQ ? (
                <Text>Loading...</Text>
              ) : (
                dataQ?.orgQuarantines?.items?.map((item, key) => (
                  <Text style={styles.memberList} key={item?.id}>
                    {item?.user?.givenName} {item?.user?.familyName}
                  </Text>
                ))
              )}
            </View>
        </>
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
  },
  memberList: {
    fontSize: 20,
    padding: 10
  }
})

export default QuarantinesWidget
