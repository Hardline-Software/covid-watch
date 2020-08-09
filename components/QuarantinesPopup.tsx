import React, { FC, Component, useState, useEffect } from 'react'
import Widget from './Widget'
import { StyleSheet, Text, View, FlatList, Alert, TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

type QuarantinePopupProps = {
  closeFunction(): void
}

const QuarantinePopup: FC<QuarantinePopupProps> = (props) => {
  const [quarantines, setQuarantines] = useState<object[]>([])

  const [quarantineID, setQuarantineID] = useState('')
  const [quarantineName, setQuarantineName] = useState('')
  const [currentMember, setCurrentMember] = useState('')
  const [quarantineMembers, setQuarantineMembers] = useState<string[]>([])
  const [quarantineStartDate, setQuarantineStartDate] = useState('')
  const [quarantineEndDate, setQuarantineEndDate] = useState('')

  useEffect(() => {
    console.log(quarantines)
  }, [quarantines])

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
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="ID"
        value={quarantineID}
        onChangeText={(newVal: string) => setQuarantineID(newVal)}
      ></TextInput>
      <TextInput
        style={styles.textInput}
        placeholder="Quarantine Name"
        value={quarantineName}
        onChangeText={(newVal: string) => setQuarantineName(newVal)}
      ></TextInput>
      <View style={styles.member}>
        <TextInput
          style={styles.memberInput}
          placeholder="Member Names"
          onChangeText={(newVal: string) => setCurrentMember(newVal)}
        ></TextInput>
        <TouchableOpacity
          style={styles.add}
          onPress={() => setQuarantineMembers([...quarantineMembers, currentMember])}
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Add Member</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.textInput}
        placeholder="Start Date"
        value={quarantineStartDate}
        onChangeText={(newVal: string) => setQuarantineStartDate(newVal)}
      ></TextInput>
      <TextInput
        style={styles.textInput}
        placeholder="End Date"
        value={quarantineEndDate}
        onChangeText={(newVal: string) => setQuarantineEndDate(newVal)}
      ></TextInput>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          addQuarantineHandler(quarantineID, quarantineName, quarantineMembers, quarantineStartDate, quarantineEndDate)
        }
      >
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>Add Quarantine</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={props.closeFunction}>
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>Done</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: 'white',
    borderRadius: 7.5,
    paddingVertical: 10
  },
  textInput: {
      padding: 10,
      backgroundColor: '#F2F2F2',
      width: '60%',
      margin: 5,
      borderRadius: 7.5
  },
  button: {
    width: 170,
    alignItems: 'center',
    backgroundColor: 'deepskyblue',
    borderRadius: 15,
    paddingVertical: 5,
    margin: 5,
    textAlign: 'center'
  },
  member: {
      flexDirection: 'row',
      backgroundColor: '#F2F2F2',
      borderRadius: 7.5,
      width: '60%'
  },
  memberInput: {
    flex: 5,
    padding: 10,
    backgroundColor: '#F2F2F2',
    width: '70%',
    margin: 5,
    borderRadius: 7.5
  },
  add: {
      flex: 1,
    padding: 10,
    backgroundColor: 'deepskyblue',
    margin: 5,
    borderRadius: 7.5,
    alignContent: 'flex-end',
  }
})

export default QuarantinePopup
