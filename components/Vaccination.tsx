import React, { FC } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { VaccinationFragment } from '../generated/graphql'

type VaccinationProps = {
  data: VaccinationFragment
}

const Vaccination: FC<VaccinationProps> = ({ data }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{data.vaccine}</Text>
      <Text style={styles.text}>{data.updatedAt}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between'
  },
  text: {
    color: 'black',
    fontWeight: 'bold'
  }
})

export default Vaccination
