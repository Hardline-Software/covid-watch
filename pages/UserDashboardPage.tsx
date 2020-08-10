import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, ScrollView, Image, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import DailyCheckupWidget from '../components/DailyCheckupWidget'
import TestResultsWidget from '../components/TestResultsWidget'
import Pulldown from '../components/Pulldown'
import { useAuthUser } from '../hooks/useAuthUser'
import { useUserDashboardQuery } from '../generated/graphql'
import VaccinationsWidget from '../components/VaccinationsWidget'
import PersonalQuarantineWidget from '../components/PersonalQuarantineWidget'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import Modal from 'react-native-modal'
import CheckupPopup from '../components/CheckupPopup'

const UserDashboardPage = () => {
  const { user } = useAuthUser()
  const { data, loading } = useUserDashboardQuery({
    variables: {
      userId: user?.id!
    },
    skip: !user
  })

  const [isModalVisible, setModalVisible] = useState(false)

  const toggleModal = () => {
    setModalVisible(!isModalVisible)
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <SafeAreaView style={styles.container}>
          <Pulldown name={data?.user?.givenName} />
          <DailyCheckupWidget />
          <TestResultsWidget />
          <VaccinationsWidget />
          <PersonalQuarantineWidget />
        </SafeAreaView>
      </ScrollView>
      <Modal isVisible={isModalVisible} coverScreen={true}>
        <CheckupPopup closeFunction={toggleModal} />
      </Modal>
      <TouchableOpacity
        style={styles.thermo}
        onPress={() => {
          toggleModal()
        }}
      >
        <MaterialCommunityIcons name="thermometer-plus" size={40} color="white" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
    paddingHorizontal: 10
  },
  thermo: {
    backgroundColor: 'lightpink',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20
  }
})

export default UserDashboardPage
