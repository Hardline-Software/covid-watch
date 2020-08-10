import React, { FC, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'

type WidgetProps = {
  title: string
  base: React.ReactNode
  expandable: boolean
}

const Widget: FC<WidgetProps> = ({ title, base, children, expandable }) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <View style={styles.outer}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{title}</Text>
      <View style={styles.inner}>
        {base}
        {expanded && children}
      </View>
      {expandable && (
        <MaterialCommunityIcons
          style={styles.expandIcon}
          name={expanded ? 'chevron-up-circle' : 'chevron-down-circle'}
          size={30}
          color="deepskyblue"
          onPress={() => {
            setExpanded(!expanded)
          }}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  outer: {
    flexDirection: 'column',
    margin: 10
  },
  inner: {
    backgroundColor: '#E8E8E8',
    borderRadius: 7.5,
    flexDirection: 'column',
    overflow: 'hidden'
  },
  expandIcon: {
    position: 'absolute',
    //backgroundColor: 'red',
    width: 30,
    height: 30,
    bottom: -14,
    right: -14
  }
})

export default Widget
