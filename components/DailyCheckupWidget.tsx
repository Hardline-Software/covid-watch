import React from 'react'
import Widget from './Widget'
import { StyleSheet, Text, View } from 'react-native'

const DailyCheckupWidget = () => {
  return (
    <Widget title="Your Daily Checkup">
      <View style={styles.container}>
        <View>
          <Text style={{ fontWeight: 'bold', fontSize: 28 }}>XXX.X&#186;F</Text>
        </View>
        <View style={{ alignItems: 'center', flexDirection: 'row' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 24 }}>XXX&nbsp;</Text>
          <Text>symptoms</Text>
        </View>
      </View>
    </Widget>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})

export default DailyCheckupWidget
