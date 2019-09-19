import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, Image, StyleSheet, TextInput } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import IconMaterial from 'react-native-vector-icons/MaterialIcons'
import IconIon from 'react-native-vector-icons/Ionicons'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';
import { Styles, Color } from '../../res/Styles'
import { addTransactionAxios,getTransactionAxios } from '../../_actions/Transaction'
import { addOrderAxios } from '../../_actions/Order'

import CompListOrder from './CompListOrder'
import CompOptionBot from './CompOptionBot'

class ScreenViewbill extends Component {
  state = {
    subTotal: null,
    isAdaBarang: true,
    itemTransChild: null,
    isLoading: false
  }
  convertTgl = () => {
    let tglUpdateBaru = new Date(Date.now())
    let bln = tglUpdateBaru.getMonth() + 1
    let tgl = tglUpdateBaru.getDate()
    let hari = tglUpdateBaru.getDay()
    let myDays = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', `Jum'at`, 'Sabtu']
    var myMonths = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
    let thn = tglUpdateBaru.getFullYear()
    let jam = tglUpdateBaru.getHours()
    let mnt = tglUpdateBaru.getMinutes()
    let dtk = tglUpdateBaru.getSeconds()
    tglUpdateBaru = `${tgl}-${myMonths[bln-1]}-${thn}`
    return tglUpdateBaru.toString()
  }
  cekChange = (data) => {
    this.setState({
      itemTransChild: data
    })
  }
  aksiCallBill = async () => {
    await this.setState({
      isLoading:true
    })
    await this.props.dispatch(addTransactionAxios(this.state.itemTransChild))
    const transactionId = await this.props.Transaction.dataItemAxios.id
    let dataOrderKirim = []
    await this.props.Order.dataItem.map((item) => {
      dataOrderKirim.push({ ...item, transactionId })
    })
    await this.props.dispatch(addOrderAxios(dataOrderKirim))
    await this.props.dispatch(getTransactionAxios())
    await this.props.navigation.navigate('BotNavPrivate')
    await this.setState({
      isLoading:false
    })
  }
  getOrderList = async () => {
    let subTotal = 0
    if (this.props.Order.dataItem) {
      this.props.Order.dataItem.map((item) => {
        const tmpPrice = item.qty * item.price
        subTotal = subTotal + tmpPrice
      })
    }
    await this.setState({
      subTotal
    })
  }
  componentDidMount() {
    this.getOrderList()
  }
  render() {
    return (
      this.state.subTotal != null &&
      <View style={[Styles.container, {
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: wp(1)
      }]}>
        <View style={[Styles.content, Styles.cardSimpleContainer, {
          backgroundColor: Color.whiteColor,
          width: '100%',
          height: '100%',
          justifyContent: 'flex-start',
          alignItems: 'center'
        }]}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity
              style={{ flex: 1, alignSelf: 'flex-start' }}
              onPress={() =>
                this.props.navigation.navigate('ScreenTransactionAdd')
              }
            >
              <IconIon name='md-arrow-round-back' size={wp(5)}></IconIon>
            </TouchableOpacity>
            <Text style={[Styles.hurufKonten, {
              fontSize: wp(5),
              fontWeight: 'bold',
              textAlign: 'center',
              textAlignVertical: 'center',
              marginBottom: hp(0.5),
              flex: 1
            }]}>
              Billing </Text>
            <Text style={[Styles.hurufKonten, { flex: 1, textAlign: 'right', textAlignVertical: 'center' }]}>
              {this.convertTgl()}
            </Text>
          </View>
          <View style={StylesLocal.divider} />
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: hp(0.5)
          }}>
            <Text style={[Styles.hurufKonten, StylesLocal.hurufLabel]}>Name</Text>
            <Text style={[Styles.hurufKonten, StylesLocal.hurufLabel]}>Price</Text>
            <Text style={[Styles.hurufKonten, StylesLocal.hurufLabel]}>Qty</Text>
            <Text style={[Styles.hurufKonten, StylesLocal.hurufLabel]}>Sum Price</Text>
          </View>
          {this.props.Order.dataItem != null &&
            <FlatList
              data={this.props.Order.dataItem}
              keyExtractor={(item, index) => index.toString()}
              style={{
                width: '100%',
                marginHorizontal: 15
              }}
              renderItem={({ item }) => {
                return (
                  <CompListOrder
                    name={item.product.name}
                    price={item.price}
                    qty={item.qty}
                  />
                )
              }}
            />
          }

          <View style={StylesLocal.divider} />
          <View style={[Styles.cardSimpleContainer, {
            elevation: 1,
            height: hp(30),
            alignItems: 'flex-end',
            marginBottom: wp(1.5),
          }]}>
            <CompOptionBot
              subTotal={this.state.subTotal}
              cekChange={this.cekChange}
            />
          </View>

          {this.state.itemTransChild != null &&
            this.state.itemTransChild.noMeja > 0 &&
            this.state.itemTransChild.change >= 0 &&
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: wp(4)
            }}>
              {!this.state.isLoading ? 
              <TouchableOpacity style={[Styles.cardSimpleContainer, {
                backgroundColor: Color.darkPrimaryColor,
                justifyContent: 'flex-start',
                alignItems: 'center',
                padding: wp(0.5),
                margin: wp(0.5),
                height: '100%',
                flexDirection: 'row'
              }]}
                onPress={() => this.aksiCallBill()}
              >
                <IconMaterial name='payment' size={wp(5.5)} color={Color.whiteColor} style={{
                  marginHorizontal: hp(2)
                }}></IconMaterial>
                <Text style={[Styles.hurufKonten, {
                  fontSize: wp(3.5),
                  fontWeight: 'bold',
                  textAlign: 'center',
                  color: Color.whiteColor,
                  marginRight: wp(3)
                }]}>
                  CONFIRM</Text>
              </TouchableOpacity>
              :
              <ActivityIndicator></ActivityIndicator>
              }
            </View>
          }
        </View>
      </View>
    )
  }
}



const StylesLocal = StyleSheet.create({
  divider: {
    borderBottomColor: Color.darkPrimaryColor,
    borderBottomWidth: 2,
    width: '100%',
    marginVertical: hp(0.2)
  },
  hurufLabel: {
    fontSize: wp(3.5),
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center'
  }
})
const mapStateToProps = (state) => {
  return {
    Transaction: state.Transaction,
    Order: state.Order
  }
}

export default connect(mapStateToProps)(ScreenViewbill)