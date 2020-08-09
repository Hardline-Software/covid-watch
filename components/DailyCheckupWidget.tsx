import React from 'react'
import Widget from './Widget'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import Symptom from '../components/Symptom'

const DailyCheckupWidget = () => {
  const symptoms: object[] = [{}, {}] // TODO hook into backend
  const temp = 38

  const cToF = (c: number) => {
    return (c * 9) / 5 + 32
  }

  return (
    <Widget
      title="Your Daily Checkup"
      expandable={true}
      base={
        <>
          <View style={styles.container}>
            <View>
              <Text style={{ fontWeight: 'bold', fontSize: 28 }}>{cToF(temp).toFixed(1)}&#186;F</Text>
            </View>
            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
              <Text style={{ fontWeight: 'bold', fontSize: 24 }}>{symptoms.length}&nbsp;</Text>
              <Text>symptoms</Text>
            </View>
          </View>
          {(temp > 37.778 || symptoms.length > 2) && (
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
            {symptoms.length > 0 ? 'Today you are feeling:' : "You didn't report any symptoms today!"}
          </Text>
          {symptoms.length > 0 && (
            <View style={styles.symptoms}>
              <FlatList
                data={symptoms}
                renderItem={({ item, index }) => <Symptom desc={'symptom ' + index} />}
                keyExtractor={(item: object, index: number) => `${index}`}
              />
            </View>
          )}
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
