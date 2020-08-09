import React, { Component, useState, useEffect } from 'react'
import Widget from './Widget'
import { StyleSheet, Text, View, FlatList, Alert, TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

const QuarantineWidget = () => {
  const [quarantines, setQuarantines] = useState<object[]>([])

  const [quarantineID, setQuarantineID] = useState('')
  const [quarantineName, setQuarantineName] = useState('')
  const [quarantineMembers, setQuarantineMembers] = useState([''])
  const [quarantineStartDate, setQuarantineStartDate] = useState('')
  const [quarantineEndDate, setQuarantineEndDate] = useState('')

  useEffect(() => {
    console.log(quarantines);
 }, [quarantines]);

  const addQuarantineHandler = (id: string, name: string, members: string[], startDate: string, endDate: string) => {
    setQuarantines([...quarantines, generateQuarantine(id, name, members, startDate, endDate)])
  }

  const generateQuarantine = (id: string, name: string, members: string[], startDate: string, endDate: string) => {
    return {
      id: id,
      name: name,
      members: members,
      startDate: startDate,
      endDate: endDate
    }
  }

  return (
    <Widget title="Quarantines">
      <View style={styles.container}>
          <TextInput style={{padding: 20}} placeholder='a' value={quarantineID} onChangeText={(newVal: string) => setQuarantineID(newVal)}></TextInput>
          <TextInput style={{padding: 20}} placeholder='b' value={quarantineName} onChangeText={(newVal: string) => setQuarantineName(newVal)}></TextInput>
          <TextInput style={{padding: 20}} placeholder='c' onChangeText={(newVal: string) => setQuarantineMembers([...quarantineMembers, newVal])}></TextInput>
          <TextInput style={{padding: 20}} placeholder='d' value={quarantineStartDate} onChangeText={(newVal: string) => setQuarantineStartDate(newVal)}></TextInput>
          <TextInput style={{padding: 20}} placeholder='e' value={quarantineEndDate} onChangeText={(newVal: string) => setQuarantineEndDate(newVal)}></TextInput>
        <TouchableOpacity style={{marginTop: 20, backgroundColor:'red'}} onPress={() => addQuarantineHandler(quarantineID, quarantineName, quarantineMembers, quarantineStartDate, quarantineEndDate)}><Text>ok</Text></TouchableOpacity>
      </View>
    </Widget>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})

export default QuarantineWidget
