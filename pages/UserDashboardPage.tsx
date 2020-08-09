import React, { useState } from 'react'
import { StyleSheet, Image, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import DailyCheckupWidget from '../components/DailyCheckupWidget'
import TestResultsWidget from '../components/TestResultsWidget'
import Navigator from '../components/Pulldown'
import { useAuthUser } from '../hooks/useAuthUser'
import { useUserDashboardQuery } from '../generated/graphql'

const UserDashboardPage = () => {
  const { user } = useAuthUser()
  const { data, loading } = useUserDashboardQuery({
    variables: {
      userId: user?.id!
    },
    skip: !user
  })
  console.log(data?.user)
  return (
    <SafeAreaView style={styles.container}>
      <Navigator />
      <DailyCheckupWidget />
      <TestResultsWidget />
    </SafeAreaView>
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
