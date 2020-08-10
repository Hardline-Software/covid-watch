import React, { Component, useState, useEffect } from 'react'
import Widget from './Widget'
import { StyleSheet, Text, View, FlatList, Alert, TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Modal from 'react-native-modal'
import QuarantinePopup from '../components/QuarantinesPopup'
import { MaterialIcons } from '@expo/vector-icons'
import { useAuthUser } from '../hooks/useAuthUser'
import { useOrgUsersQuery } from '../generated/graphql'
import AddTestResult from './AddTestResult'

const ManageMembersWidget = () => {
  const { user } = useAuthUser()

  const { data: dataU, loading: loadingU, error: errorU } = useOrgUsersQuery({
    variables: {
      organizationId: user?.organizationId!
    },
    skip: !user
  })

  console.log(dataU?.orgUsers?.items)

  return (
    <Widget
      title="Manage Members"
      expandable={false}
      base={
        <>
          <View style={styles.quarantineBox}>
            <View style={styles.list}>
              {loadingU ? (
                <Text>Loading...</Text>
              ) : (
                dataU?.orgUsers?.items?.map((item, key) => (
                  <View style={styles.memberList} key={item?.id}>
                    <View style={styles.membersTextHead}>
                      <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>
                        {item?.givenName} {item?.familyName}
                      </Text>
                    </View>
                    <View style={{ flexDirection: 'row', width: '50%' }}>
                      <View style={styles.membersTextBody1}>
                        <Text style={styles.memberText}>{item?.email}</Text>
                        <Text style={styles.memberText}>{item?.birthdate}</Text>
                      </View>
                      <View style={styles.membersTextBody2}>
                        <Text style={styles.memberText}>{item?.phone}</Text>
                        <Text style={styles.memberText}>{item?.sex}</Text>
                      </View>
                    </View>
                  </View>
                ))
              )}
            </View>
          </View>
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
  memberList: {
    fontSize: 20,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  list: {
    alignItems: 'center'
  },
  quarantineBox: {
    padding: 15
  },
  membersTextHead: {
    backgroundColor: 'deepskyblue',
    borderBottomLeftRadius: 7.5,
    borderTopLeftRadius: 7.5,
    padding: 5,
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 70
  },
  membersTextBody1: {
    flexDirection: 'column',
    backgroundColor: 'white',
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    height: 70
  },
  membersTextBody2: {
    flexDirection: 'column',
    backgroundColor: 'white',
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    height: 70,
    borderBottomRightRadius: 7.5,
    borderTopRightRadius: 7.5
  },
  memberText: {
      marginHorizontal: 15,
      marginVertical: 5
  }
})

export default ManageMembersWidget
