import React, { useState } from 'react'
import { StyleSheet, ScrollView, Image, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import DailyCheckupWidget from '../components/DailyCheckupWidget'
import TestResultsWidget from '../components/TestResultsWidget'
import Pulldown from '../components/Pulldown'
import { useAuthUser } from '../hooks/useAuthUser'
import { useUserDashboardQuery } from '../generated/graphql'
import VaccinationsWidget from '../components/VaccinationsWidget'

const UserDashboardPage = () => {
  const { user } = useAuthUser()
  const { data, loading } = useUserDashboardQuery({
    variables: {
      userId: user?.id!
    },
    skip: !user
  })
  return (
    <ScrollView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <Pulldown name={data?.user?.givenName} />
        <DailyCheckupWidget />
        <TestResultsWidget />
        <VaccinationsWidget />
      </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
    paddingHorizontal: 10
  }
})

export default UserDashboardPage
