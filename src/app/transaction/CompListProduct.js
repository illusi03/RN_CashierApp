import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, Alert, ActivityIndicator } from 'react-native'
import IconFA from 'react-native-vector-icons/FontAwesome5';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';
import { Styles, Color } from '../../res/Styles'
import { convertToRupiah } from '../../res/Constant'
import { deleteProductAxios,getProductAxios } from '../../_actions/Product'

class CompListProduct extends Component {

  render() {
    return (
      <View style={[Styles.cardSimpleContainer,StylesLocal.TouchBtnListTrans, {
        alignItems: 'flex-start',
        marginVertical: wp(0.5),
        elevation:2
      }]}>
        <View style={{
          flex: 1
        }}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{
              backgroundColor: Color.accentColor,
              borderRadius: wp(2),
              height: hp(12),
              width: wp(20)
            }}>
              <Image source={require('../../assets/food_dummy.png')}
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: wp(2),
                }}></Image>
            </View>
          </View>
        </View>
        <View style={{
          flex: 2.5
        }}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ marginRight: wp(1.5) }}>
              <Text style={StylesLocal.hurufLabel}>Name </Text>
              <Text style={StylesLocal.hurufLabel}>Qty </Text>
              <Text style={StylesLocal.hurufLabel}>Price </Text>
              <Text style={StylesLocal.hurufLabel}>Total </Text>
            </View>
            <View>
              <Text style={[StylesLocal.hurufLabel, { fontWeight: '100' }]}>
                {this.props.item.product.name && this.props.item.product.name}
              </Text>
              <Text style={[StylesLocal.hurufLabel, { fontWeight: '100' }]}>
                {this.props.item.qty && this.props.item.qty}
              </Text>
              <Text style={[StylesLocal.hurufLabel, { fontWeight: '100' }]}>
                {this.props.item.price && convertToRupiah(this.props.item.price)}
              </Text>
              <Text style={[StylesLocal.hurufLabel, { fontWeight: '100' }]}>
                {convertToRupiah(this.props.item.price*this.props.item.qty)}
              </Text>
            </View>
          </View>
        </View>
      </View>

    )
  }
}

const StylesLocal = StyleSheet.create({
  hurufLabel: {
    fontSize: wp(3.5),
    fontWeight: 'bold',
    textAlignVertical: 'center',
    color: Color.blackTextColor,
    marginBottom: hp(0.5)
  },
  TouchBtnListTrans: {
    marginTop: wp(2),
    width: wp(95),
    height: hp(15),
    alignSelf:'center',
    borderRadius: wp(2),
    padding: wp(3),
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'row'
  },
  btnAksi: {
    position: 'absolute',
    right: wp(2.5)
  }
})

const mapStateToProps = state => {
  return {
    Product: state.Product
  }
}
export default connect(mapStateToProps)(CompListProduct)