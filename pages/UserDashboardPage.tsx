import React, { useState } from 'react'
import { StyleSheet, Image, Text, View } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import Widget from '../components/Widget'
import DailyCheckupWidget from '../components/DailyCheckupWidget'
import Navigator from '../components/Navigator'
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
      <Widget title="Test Results"></Widget>
      <Widget title="Quarantine"></Widget>
      <Widget title="Vaccinations"></Widget>
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
