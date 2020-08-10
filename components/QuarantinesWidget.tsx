import React, { Component, useState, useEffect } from 'react'
import Widget from './Widget'
import { StyleSheet, Text, View, FlatList, Alert, TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Modal from 'react-native-modal'
import QuarantinePopup from '../components/QuarantinesPopup'
import { MaterialIcons } from '@expo/vector-icons'
import { useAuthUser } from '../hooks/useAuthUser'
import { useOrgQuarantinesQuery } from '../generated/graphql'
import AddTestResult from './AddTestResult'

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
          <View style={styles.quarantine}>
            {loadingQ ? (
              <Text>Loading...</Text>
            ) : (
              dataQ?.orgQuarantines?.items?.map((item, key) => (
                <View style={styles.memberList} key={item?.id}>
                  <View style={styles.quarantineTextHead}>
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>
                      {item?.user?.givenName} {item?.user?.familyName}
                    </Text>
                  </View>
                  <View style={styles.quarantineTextBody1}>
                    <Text>{item?.location}</Text>
                  </View>
                  <View style={styles.quarantineTextBody2}>
                    <Text>{item?.start + ' to ' + item?.end}</Text>
                  </View>
                </View>
              ))
            )}
          </View>
          <AddTestResult toggleFunction={toggleModal} />
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
    padding: 10,
    flexDirection: 'row'
  },
  quarantine: {
    alignItems: 'center'
  },
  quarantineTextHead: {
    backgroundColor: 'deepskyblue',
    borderBottomLeftRadius: 7.5,
    borderTopLeftRadius: 7.5,
    padding: 5,
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  quarantineTextBody1: {
    backgroundColor: 'white',
    width: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -5
  },
  quarantineTextBody2: {
    backgroundColor: 'white',
    borderBottomRightRadius: 7.5,
    borderTopRightRadius: 7.5,
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default QuarantinesWidget
