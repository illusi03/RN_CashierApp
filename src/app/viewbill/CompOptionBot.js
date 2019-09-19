import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import { connect } from 'react-redux'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-community/async-storage';
import { Styles, Color } from '../../res/Styles'
import { convertToRupiah } from '../../res/Constant'
import IconIon from 'react-native-vector-icons/Ionicons'

class CompOptionBot extends Component {
  state = {
    subTotal: this.props.subTotal,
    cashierId: null,
    taxPercent: null,
    taxRp: null,
    minDiscount: null,
    discountPercent: null,
    discountRp: null,
    grandTotal: null,
    txtCash: '0',
    change: 0 - this.props.subTotal,
    txtNoTable: null
  }
  getInitData = async () => {
    const cashierId = await AsyncStorage.getItem('cashierId')
    const taxPercent = await AsyncStorage.getItem('tax')
    const minDiscount = await AsyncStorage.getItem('minDiscount')
    const discountPercent = await AsyncStorage.getItem('discount')
    const taxRp = Math.trunc((this.state.subTotal / 100) * taxPercent)
    let discountRp = 0
    if (this.state.subTotal >= minDiscount) {
      discountRp = Math.trunc((this.state.subTotal / 100) * discountPercent)
    }
    const grandTotal = (this.state.subTotal + taxRp) - discountRp
    await this.setState({
      cashierId,
      taxPercent,
      taxRp,
      minDiscount,
      discountPercent,
      discountRp,
      grandTotal
    })
    await this.props.cekChange(
      //Data Transaction
      {
        cashierId,
        noMeja:this.state.txtNoTable,
        subTotal:this.state.subTotal,
        discount:this.state.discountRp,
        tax:this.state.taxRp,
        grandTotal:this.state.grandTotal,
        cash:this.state.txtCash,
        change:0-this.state.subTotal
      }
    )
  }
  componentDidMount() {
    this.getInitData()
  }
  render() {
    return (
      this.state.cashierId != null &&
      <View style={{
        flex: 1
      }}>
        <View style={{ flexDirection: 'row', justifyContent:'space-between'}}>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
            <IconIon name='ios-clipboard' size={wp(5.5)} color={Color.darkPrimaryColor} style={{
              marginRight: hp(2)
            }}></IconIon>
            <TextInput
              placeholder='No Table'
              underlineColorAndroid={Color.accentColor}
              style={{
                fontSize: wp(4),
                width: wp(20)
              }}
              keyboardType='numeric'
              onChangeText={(text) => {
                if (text == '') {
                  text = '0'
                }
                if (text >= 999) {
                  text = '999'
                }
                this.setState({
                  txtNoTable: text,
                })
                this.props.cekChange(
                  //Data Transaction
                  {
                    cashierId:this.state.cashierId,
                    noMeja:text,
                    subTotal:this.state.subTotal,
                    discount:this.state.discountRp,
                    tax:this.state.taxRp,
                    grandTotal:this.state.grandTotal,
                    cash:this.state.txtCash,
                    change:this.state.change
                  }
                )
              }}
            />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
            <IconIon name='ios-cash' size={wp(5.5)} color={Color.darkPrimaryColor} style={{
              marginHorizontal: hp(2)
            }}></IconIon>
            <TextInput
              placeholder='Cash'
              underlineColorAndroid={Color.accentColor}
              style={{
                fontSize: wp(4),
                width: wp(50)
              }}
              keyboardType='numeric'
              onChangeText={(text) => {
                if (text == '') {
                  text = '0'
                }
                if (text >= 999999999) {
                  text = '999999999'
                }
                let change = text - this.state.grandTotal
                this.setState({
                  txtCash: text,
                  change
                })
                this.props.cekChange(
                  //Data Transaction
                  {
                    cashierId:this.state.cashierId,
                    noMeja:this.state.txtNoTable,
                    subTotal:this.state.subTotal,
                    discount:this.state.discountRp,
                    tax:this.state.taxRp,
                    grandTotal:this.state.grandTotal,
                    cash:text,
                    change
                  }
                )
              }}
            />
          </View>
        </View>

        <View style={{
          flexDirection: 'row',
          width: '100%',
          alignItems: 'center'
        }}>
          <View style={[{
            flex: 25,
            marginRight: wp(2)
          }]}>
            <Text style={[Styles.hurufKonten, StylesLocal.label1]}>Sub Total</Text>
            <Text style={[Styles.hurufKonten, StylesLocal.label1]}>Discount({this.state.discountPercent.toString()}%)</Text>
            <Text style={[Styles.hurufKonten, StylesLocal.label1]}>Tax ({this.state.taxPercent.toString()}%) </Text>
            <Text style={[Styles.hurufKonten, StylesLocal.label1]}>Cash</Text>
            <Text style={[Styles.hurufKonten, StylesLocal.label1]}>Grand Total</Text>
            <Text style={[Styles.hurufKonten, {
              fontSize: wp(4.5),
              fontWeight: 'bold',
              textAlign: 'right',
            }]}
            >Change</Text>
          </View>
          <View style={[Styles.hurufKonten, {
            flex: 20
          }]}>
            <Text style={[Styles.hurufKonten, StylesLocal.labelIsi]}>
              {convertToRupiah(this.state.subTotal)}
            </Text>
            <Text style={[Styles.hurufKonten, StylesLocal.labelIsi]}>
              {convertToRupiah(this.state.discountRp)}
            </Text>
            <Text style={[Styles.hurufKonten, StylesLocal.labelIsi]}>
              {convertToRupiah(this.state.taxRp)}
            </Text>
            <Text style={[Styles.hurufKonten, StylesLocal.labelIsi]}>
              {convertToRupiah(this.state.txtCash)}
            </Text>
            <Text style={[Styles.hurufKonten, StylesLocal.labelIsi]}>
              {convertToRupiah(this.state.grandTotal)}
            </Text>
            <Text style={[Styles.hurufKonten, StylesLocal.labelIsi, { fontSize: wp(4.5), }]}>
              {this.state.change != null && convertToRupiah(this.state.change)}
            </Text>
          </View>
        </View>
      </View>
    )
  }

}
const StylesLocal = StyleSheet.create({
  label1: {
    fontSize: wp(3.5),
    fontWeight: 'bold',
    textAlign: 'right',
    marginBottom: wp(1.5)
  },
  labelIsi: {
    fontSize: wp(3.5),
    fontWeight: 'bold',
    textAlign: 'right',
    marginRight: wp(3.5),
    marginBottom: wp(1.5)
  }
})
export default connect()(CompOptionBot)