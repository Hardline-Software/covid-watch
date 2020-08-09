import React, { useState } from 'react'
import { StyleSheet, Image, Text, View, FlatList } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import Widget from '../components/Widget'
import QuarantineWidget from '../components/QuarantinesWidget'
import { useOrgUsersQuery } from '../generated/graphql'
import { useAuthUser } from '../hooks/useAuthUser'

const OrgDashboardPage = () => {
  const { user } = useAuthUser()

  const { data, loading, error } = useOrgUsersQuery({
    variables: {
      organizationId: user?.organizationId!
    },
    skip: !user
  })

  console.log(data?.orgUsers?.items)
  console.log(loading)
  console.log(error)

  var memberArray = ['Alex', 'Gent', 'Kirk']

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>The Ohio State University</Text>
      </View>

      <QuarantineWidget />

      <Widget
        title="Manage Members"
        expandable={false}
        base={
          <View style={styles.quarantineBox}>
            <View>
              {loading ? (
                <Text>Loading...</Text>
              ) : (
                data?.orgUsers?.items?.map((item, key) => (
                  <Text style={styles.memberList} key={item?.id}>
                    {item?.givenName} {item?.familyName}
                  </Text>
                ))
              )}
            </View>
          </View>
        }
      ></Widget>
    </SafeAreaView>
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
    textAlign: 'center'
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
