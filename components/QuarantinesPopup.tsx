import React, { FC, Component, useState, useEffect } from 'react'
import Widget from './Widget'
import { StyleSheet, Text, View, FlatList, Alert, TextInput, Picker } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import {
  QuarantineLocation,
  useCreateQuarantineMutation,
  OrgQuarantinesQuery,
  OrgQuarantinesQueryVariables,
  OrgQuarantinesDocument
} from '../generated/graphql'
import { useOrgUsersQuery } from '../generated/graphql'
import { useAuthUser } from '../hooks/useAuthUser'

type QuarantinesPopupProps = {
  closeFunction(): void
}

const QuarantinesPopup: FC<QuarantinesPopupProps> = (props) => {
  const { user } = useAuthUser()

  const [isPickerVisible, setPickerVisible] = useState(false)

  const togglePicker = () => {
    setPickerVisible(!isPickerVisible)
  }

  const { data, loading, error } = useOrgUsersQuery({
    variables: {
      organizationId: user?.organizationId!
    },
    skip: !user
  })
    const [createQuarantine] = useCreateQuarantineMutation({
      update: (cache, { data }) => {
        if (data) {
          const usersQuery = cache.readQuery<OrgQuarantinesQuery, OrgQuarantinesQueryVariables>({
            query: OrgQuarantinesDocument,
            variables: {
              organizationId: data?.createQuarantine?.organizationId!
            }
          })
          if (usersQuery) {
            cache.writeQuery<OrgQuarantinesQuery, OrgQuarantinesQueryVariables>({
              query: OrgQuarantinesDocument,
              variables: {
                organizationId: data?.createQuarantine?.organizationId!
              },
              data: {
                ...usersQuery,
                orgQuarantines: {
                  ...usersQuery.orgQuarantines,
                  items: [...usersQuery!.orgQuarantines!.items!, data.createQuarantine!]
                }
              }
            })
          }
        }
      }
    })


  const [quarantines, setQuarantines] = useState<object[]>([])

  const [quarantineLocation, setQuarantineLocation] = useState<QuarantineLocation>()
  const [quarantineMemberID, setQuarantineMemberID] = useState('')
  const [quarantineStartDay, setQuarantineStartDay] = useState('')
  const [quarantineStartMonth, setQuarantineStartMonth] = useState('')
  const [quarantineStartYear, setQuarantineStartYear] = useState('')
  const [quarantineEndDay, setQuarantineEndDay] = useState('')
  const [quarantineEndMonth, setQuarantineEndMonth] = useState('')
  const [quarantineEndYear, setQuarantineEndYear] = useState('')

  const memberState = {
    memberID: ''
  }

  useEffect(() => {
    console.log(quarantines)
  }, [quarantines])

  const addQuarantineHandler = (
    location: QuarantineLocation,
    memberID: string,
    startMonth: string,
    startDay: string,
    startYear: string,
    endMonth: string,
    endDay: string,
    endYear: string
  ) => {
    setQuarantines([
      ...quarantines,
      generateQuarantine(
        location,
        memberID,
        startYear + '-' + startMonth + '-' + startDay,
        endYear + '-' + endMonth + '-' + endDay
      )
    ]),
      createQuarantine({
        variables: {
          start: startYear + '-' + startMonth + '-' + startDay,
          end: endYear + '-' + endMonth + '-' + endDay,
          location: location,
          userId: quarantineMemberID,
          organizationId: user?.organizationId!
        }
      })
  }

  const generateQuarantine = (location: QuarantineLocation, memberID: string, startDate: string, endDate: string) => {
    return {
      location: location,
      memberID: memberID,
      startDate: startDate,
      endDate: endDate
    }
  }

  return (
    <View style={styles.container}>
      <Text>Start Date</Text>
      <View style={styles.date}>
        <TextInput
          style={styles.dateInput}
          placeholder="MM"
          value={quarantineStartMonth}
          onChangeText={(newVal: string) => setQuarantineStartMonth(newVal)}
        ></TextInput>
        <TextInput
          style={styles.dateInput}
          placeholder="DD"
          value={quarantineStartDay}
          onChangeText={(newVal: string) => setQuarantineStartDay(newVal)}
        ></TextInput>
        <TextInput
          style={styles.dateInput}
          placeholder="YYYY"
          value={quarantineStartYear}
          onChangeText={(newVal: string) => setQuarantineStartYear(newVal)}
        ></TextInput>
      </View>
      <Text style={{ paddingTop: 10 }}>End Date</Text>
      <View style={styles.date}>
        <TextInput
          style={styles.dateInput}
          placeholder="DD"
          value={quarantineEndMonth}
          onChangeText={(newVal: string) => setQuarantineEndMonth(newVal)}
        ></TextInput>
        <TextInput
          style={styles.dateInput}
          placeholder="DD"
          value={quarantineEndDay}
          onChangeText={(newVal: string) => setQuarantineEndDay(newVal)}
        ></TextInput>
        <TextInput
          style={styles.dateInput}
          placeholder="YYYY"
          value={quarantineEndYear}
          onChangeText={(newVal: string) => setQuarantineEndYear(newVal)}
        ></TextInput>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Picker
          style={{ marginTop: -20, height: 200, width: 150 }}
          selectedValue={quarantineMemberID}
          enabled={isPickerVisible}
          onValueChange={(itemValue, itemIndex) => setQuarantineMemberID(itemValue)}
        >
          {!loading &&
            data?.orgUsers?.items?.map((user, key) => (
              <Picker.Item key={user?.id} label={user?.givenName + ' ' + user?.familyName} value={user?.id} />
            ))}
        </Picker>
        <Picker
          style={{ marginTop: -20, height: 200, width: 150 }}
          selectedValue={quarantineLocation}
          enabled={isPickerVisible}
          onValueChange={(itemValue, itemIndex) => setQuarantineLocation(itemValue)}
        >
          <Picker.Item label="Home" value={QuarantineLocation.HOME} />
          <Picker.Item label="Hotel" value={QuarantineLocation.HOTEL} />
          <Picker.Item label="Housing" value={QuarantineLocation.HOUSING} />
        </Picker>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          addQuarantineHandler(
            quarantineLocation!,
            quarantineMemberID,
            quarantineStartMonth,
            quarantineStartDay,
            quarantineStartYear,
            quarantineEndMonth,
            quarantineEndDay,
            quarantineEndYear
          )
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
    paddingVertical: 20
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
  date: {
    flexDirection: 'row'
  },
  dateInput: {
    padding: 10,
    backgroundColor: '#F2F2F2',
    width: '10%',
    margin: 5,
    borderRadius: 7.5,
    textAlign: 'center'
  }
})

export default QuarantinesPopup
