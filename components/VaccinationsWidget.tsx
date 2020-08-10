import React, { useState } from 'react'
import Widget from './Widget'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import Modal from 'react-native-modal'
import VaccinationsPopup from './VaccinationsPopup'
import AddVaccination from './AddTestResult'
import { useUserVaccinationsQuery } from '../generated/graphql'
import { useAuthUser } from '../hooks/useAuthUser'
import Vaccination from './Vaccination'

const VaccinationsWidget = () => {
  const [isModalVisible, setModalVisible] = useState(false)

  const { user } = useAuthUser()

  const { data, loading, error } = useUserVaccinationsQuery({
    variables: {
      userId: user?.id!
    },
    skip: !user
  })

  const toggleModal = () => {
    setModalVisible(!isModalVisible)
  }

  return (
    <Widget
      title="Vaccinations"
      expandable={false}
      base={
        <>
          <Modal isVisible={isModalVisible} coverScreen={true}>
            <VaccinationsPopup closeFunction={toggleModal} />
          </Modal>
          {data?.userVaccinations?.items &&
            (data?.userVaccinations?.items).map((item, index) => <Vaccination data={item!} key={index} />)}
          <AddVaccination toggleFunction={toggleModal} />
        </>
      }
    />
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  symptoms: {
    flexDirection: 'column'
  }
})

export default VaccinationsWidget
