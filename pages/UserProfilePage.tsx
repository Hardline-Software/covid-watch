import React, { useState } from 'react'
import { StyleSheet, ScrollView, Image, Text, View, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAuthUser } from '../hooks/useAuthUser'
import { useUserDashboardQuery } from '../generated/graphql'
import Modal from 'react-native-modal'
import HealthSummaryPopup from '../components/HealthSummaryPopup'

const UserProfilePage = () => {
  const { user } = useAuthUser()

  const [isModalVisible, setModalVisible] = useState(false)

  const toggleModal = () => {
    setModalVisible(!isModalVisible)
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
      <SafeAreaView style={styles.container}>
        <Modal style={styles.healthSummaryPopup} isVisible={isModalVisible} coverScreen={true}>
          <ScrollView>
            <HealthSummaryPopup closeFunction={toggleModal} />
          </ScrollView>
        </Modal>

        <View style={styles.header}>
          <Image style={styles.icon} source={require('../assets/logo.png')} />
          <Text style={styles.headerText}>
            {user?.givenName} {user?.familyName}
          </Text>
        </View>

        <View style={styles.userInfo}>
          <Text style={styles.userInfoText}>{user?.email}</Text>
          <Text style={styles.userInfoText}>{user?.phone}</Text>
          <Text style={styles.userInfoText}>{user?.birthdate}</Text>
          <Text style={styles.userInfoText}>{user?.sex}</Text>
        </View>

        <View style={styles.currentOrg}>
          {user?.organization ? (
            <Text style={styles.currentOrgText}>{user?.organization?.name}</Text>
          ) : (
            <Text style={styles.currentOrgText}>No Organization</Text>
          )}
        </View>

        <TouchableOpacity style={{ flex: 1, width: '100%', alignItems: 'center' }} onPress={toggleModal}>
          <View style={styles.healthSum}>
            <Text style={styles.currentOrgText}>View Health Summary</Text>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
    paddingHorizontal: 10,
    alignItems: 'center',
    marginVertical: 80
  },
  icon: {
    margin: '2%',
    resizeMode: 'contain',
    height: 120,
    width: 120
  },
  header: {
    alignItems: 'center'
  },
  headerText: {
    fontSize: 40,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  userInfo: {
    alignItems: 'center'
  },
  userInfoText: {
    color: 'lightgray',
    fontSize: 15,
    marginVertical: 3
  },
  currentOrg: {
    backgroundColor: '#C4C4C4',
    borderRadius: 7.5,
    alignItems: 'center',
    padding: 15,
    width: '50%',
    marginTop: 50
  },
  currentOrgText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20
  },
  healthSum: {
    backgroundColor: 'deepskyblue',
    borderRadius: 7.5,
    alignItems: 'center',
    padding: 15,
    width: '50%',
    marginTop: 10
  },
  healthSummaryPopup: {}
})

export default UserProfilePage
