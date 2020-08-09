import React, { FC, Component, useState, useEffect } from 'react'
import { StyleSheet, Text, View, FlatList, Alert, TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { VaccinationFragment } from '../generated/graphql'

type VaccinationsPopupProps = {
  closeFunction(): void
}

const VaccinationsPopup: FC<VaccinationsPopupProps> = (props) => {
  const [vaccines, setVaccines] = useState<object[]>([])
  const [name, setName] = useState('')
  const [date, setDate] = useState('')

  const addTestResultHandler = (vaccineName: string, vaccineDate: string) => {
    setVaccines([...vaccines, generateVaccine(vaccineName, vaccineDate)])
  }

  const generateVaccine = (name: string, date: string) => {
    return {
      vaccine: name,
      createdAt: date
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Vaccine Name"
        value={name}
        onChangeText={(newVal: string) => setName(newVal)}
      ></TextInput>
      <TextInput
        style={styles.textInput}
        placeholder="Vaccination Date"
        value={date}
        onChangeText={(newVal: string) => setDate(newVal)}
      ></TextInput>
      <TouchableOpacity style={styles.button} onPress={() => addTestResultHandler(name, date)}>
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>Add Vaccine</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ ...styles.button, backgroundColor: '#c70202' }} onPress={props.closeFunction}>
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>Cancel</Text>
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
    alignContent: 'flex-end'
  }
})

export default VaccinationsPopup
