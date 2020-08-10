import React, { FC } from 'react'
import { StyleSheet, Text, View } from 'react-native'

type SymptomProps = {
  desc: string
}

const Symptom: FC<SymptomProps> = ({ desc }) => {
  return (
    <View>
      <Text>{desc}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {}
})

export default Symptom
