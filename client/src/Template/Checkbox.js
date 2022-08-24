import React from 'react'
import { View, Text, Svg, Path, Polygon } from '@react-pdf/renderer'

export default function Checkbox({ label, checked }) {
  return (
    <View style={{ display: 'flex', flexDirection: 'row' }}>
      {checked ? (
        <Svg width="10" height="10" viewBox="0 0 32 32" id="icon" xmlns="http://www.w3.org/2000/svg">
          <Path fill="black" d="M26,4H6A2,2,0,0,0,4,6V26a2,2,0,0,0,2,2H26a2,2,0,0,0,2-2V6A2,2,0,0,0,26,4ZM6,26V6H26V26Z"/>
          <Polygon fill="black" points="14 21.5 9 16.54 10.59 15 14 18.35 21.41 11 23 12.58 14 21.5"/>
        </Svg>
      ) : (
        <Svg width="10" height="10" viewBox="0 0 32 32" id="icon" xmlns="http://www.w3.org/2000/svg">
          <Path fill="black" d="M26,4H6A2,2,0,0,0,4,6V26a2,2,0,0,0,2,2H26a2,2,0,0,0,2-2V6A2,2,0,0,0,26,4ZM6,26V6H26V26Z"/>
        </Svg>
      )}
      <Text>{label}</Text>
    </View>
  )
}