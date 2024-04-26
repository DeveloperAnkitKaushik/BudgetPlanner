import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../utils/Colors';

const ColorPicker = ({ selectedColor, setSelectedColor }) => {
  return (
    <View style={styles.iconInput}>
      {Colors.colorList.map((col, ind) => (
        <TouchableOpacity key={ind} style={[{
          width: 30,
          height: 30,
          backgroundColor: col,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 100,
        }, selectedColor == col && { borderColor: Colors.black, borderWidth: 4 }]}
          onPress={() => setSelectedColor(col)}
        >
        </TouchableOpacity>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  iconInput: {
    flexDirection: 'row',
    marginTop: 40,
    gap: 10,
    paddingHorizontal: 80,
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default ColorPicker