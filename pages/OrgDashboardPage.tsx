import React, { useState } from 'react'
import { StyleSheet, Image, Text, View, FlatList, ScrollView } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import Widget from '../components/Widget'
import QuarantinesWidget from '../components/QuarantinesWidget'
import { useOrgUsersQuery, useOrgQuarantinesQuery } from '../generated/graphql'
import { useAuthUser } from '../hooks/useAuthUser'
import ManageMembersWidget from '../components/ManageMembersWidget'
import { Auth } from 'aws-amplify'
import { useNavigation } from '@react-navigation/native'

const OrgDashboardPage = () => {
  const { user } = useAuthUser()
  const navigation = useNavigation()

  const { data: dataU, loading: loadingU, error: errorU } = useOrgUsersQuery({
    variables: {
      organizationId: user?.organizationId!
    },
    skip: !user
  })

  console.log(dataU?.orgUsers?.items)
  console.log(loadingU)
  console.log(errorU)

  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>The Ohio State University</Text>
        </View>

        <QuarantinesWidget />

        <ManageMembersWidget />
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity
            style={styles.healthSum}
            onPress={() => {
              Auth.signOut().then(() => {
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Log In' }]
                })
              })
            }}
          >
            <Text style={styles.currentOrgText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
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

export default OrgDashboardPage
