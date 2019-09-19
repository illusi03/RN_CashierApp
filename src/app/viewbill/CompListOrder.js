import React, { Component } from 'react'
import { View, Text, TouchableOpacity,StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol
} from 'react-native-responsive-screen'
import { Styles, Color } from '../../res/Styles'
import { convertToRupiah } from '../../res/Constant'


const CompListOrder = (props) => {
  return (
    <View style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: wp(3)
    }}>
      <Text style={[Styles.hurufKonten,StylesLocal.hurufLocal,{marginLeft:wp(1)}]}>{props.name}</Text>
      <Text style={[Styles.hurufKonten,StylesLocal.hurufLocal,{marginLeft:wp(4.5)}]}>{convertToRupiah(props.price)}</Text>
      <Text style={[Styles.hurufKonten,StylesLocal.hurufLocal,{textAlign:'center'}]}>{props.qty}</Text>
      <Text style={[Styles.hurufKonten,StylesLocal.hurufLocal]}>{convertToRupiah(props.price * props.qty)}</Text>
    </View>
  )
}
const StylesLocal = StyleSheet.create({
  hurufLocal:{
    fontSize: wp(3),
    fontWeight: '300',
    flex: 1,
  }
})
export default CompListOrder