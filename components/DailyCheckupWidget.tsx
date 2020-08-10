import React from 'react'
import Widget from './Widget'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import Symptom from '../components/Symptom'
import { useAuthUser } from '../hooks/useAuthUser'
import { useHealthCheckQuery } from '../generated/graphql'

const DailyCheckupWidget = () => {
  const { user } = useAuthUser()

  const { data, loading, error } = useHealthCheckQuery({
    variables: {
      id: user?.id!
    },
    skip: !user
  })

  const healthCheck = data?.healthCheck || undefined
  return (
    <Widget
      title="Your Daily Checkup"
      expandable={true}
      base={
        <>
          <View style={styles.container}>
            <View>
              <Text style={{ fontWeight: 'bold', fontSize: 28 }}>
                {healthCheck ? `${healthCheck.temperatureF!.toFixed(1)}&#186;F` : '--'}
              </Text>
            </View>
            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
              <Text style={{ fontWeight: 'bold', fontSize: 24 }}>
                {healthCheck ? `${healthCheck.symptoms!.length}&nbsp;` : '0 '}
              </Text>
              <Text>symptoms</Text>
            </View>
          </View>
          {healthCheck && (healthCheck.temperatureF! > 37.778 || healthCheck.symptoms!.length > 2) && (
            <View style={styles.container}>
              <Text style={{ fontWeight: 'bold', fontSize: 14, color: 'red' }}>
                You may want to speak with your primary care provider.
              </Text>
            </View>
          )}
        </>
      }
    >
      <View style={styles.container}>
        <View>
          <Text style={{ fontWeight: 'bold', fontSize: 14 }}>
            {healthCheck && healthCheck.symptoms!.length > 0
              ? 'Today you are feeling:'
              : "You didn't report any symptoms today!"}
          </Text>
          {healthCheck && healthCheck.symptoms!.length > 0 && <View style={styles.symptoms}></View>}
        </View>
      </View>
    </Widget>
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

export default DailyCheckupWidget
