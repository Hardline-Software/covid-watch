import React, { useState } from 'react'
import { StyleSheet, Image, Text, View, FlatList, ScrollView } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import Widget from '../components/Widget'
import QuarantinesWidget from '../components/QuarantinesWidget'
import { useOrgUsersQuery, useOrgQuarantinesQuery } from '../generated/graphql'
import { useAuthUser } from '../hooks/useAuthUser'
import ManageMembersWidget from '../components/ManageMembersWidget'

const OrgDashboardPage = () => {
  const { user } = useAuthUser()

  const { data: dataU, loading: loadingU, error: errorU } = useOrgUsersQuery({
    variables: {
      organizationId: user?.organizationId!
    },
    skip: !user
  })

  console.log(dataU?.orgUsers?.items)
  console.log(loadingU)
  console.log(errorU)

  var memberArray = ['Alex', 'Gent', 'Kirk']

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>The Ohio State University</Text>
        </View>

        <QuarantinesWidget />

        <ManageMembersWidget />
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
  },
  header: {
    alignItems: 'center'
  },
  headerText: {
    fontSize: 40,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  quarantineBox: {
    padding: 15
  },
  memberList: {
    fontSize: 20,
    padding: 10
  }
})

export default OrgDashboardPage
