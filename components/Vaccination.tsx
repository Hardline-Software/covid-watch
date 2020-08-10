import React, { FC } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { VaccinationFragment } from '../generated/graphql'
import { format } from 'date-fns'

type VaccinationProps = {
  data: VaccinationFragment
}

const Vaccination: FC<VaccinationProps> = ({ data }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{data.vaccine}</Text>
      <Text style={styles.text}>{format(new Date(data.createdAt), 'MM/dd/yyyy')}</Text>
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
