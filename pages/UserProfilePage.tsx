import React, { useState } from 'react'
import { StyleSheet, ScrollView, Image, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const UserDashboardPage = () => {
  
  return (
    <ScrollView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        
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
