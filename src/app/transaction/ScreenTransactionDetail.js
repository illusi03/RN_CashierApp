import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import IconFA from 'react-native-vector-icons/FontAwesome5';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';
import { Styles, Color } from '../../res/Styles'
import CompListProduct from './CompListProduct'
import { convertToRupiah } from '../../res/Constant'

class ScreenTransactionDetail extends Component {
  state = {
    dataLama: null
  }
  getInitData = async () => {
    const transactionId = await this.props.navigation.getParam('transactionId')
    let dataLama = await this.props.Transaction.dataItem.filter((item) => {
      if (item.id == transactionId) {
        return item
      }
    })
    dataLama = dataLama[0]
    await this.setState({
      dataLama
    })
  }
  componentDidMount() {
    this.getInitData()
  }
  convertTgl = (tglJSON) => {
    let tglUpdateBaru = new Date(tglJSON)
    let bln = tglUpdateBaru.getMonth() + 1
    let tgl = tglUpdateBaru.getDate()
    let hari = tglUpdateBaru.getDay()
    let myDays = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', `Jum'at`, 'Sabtu']
    var myMonths = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
    let thn = tglUpdateBaru.getFullYear()
    let jam = tglUpdateBaru.getHours()
    let mnt = tglUpdateBaru.getMinutes()
    let dtk = tglUpdateBaru.getSeconds()
    tglUpdateBaru = `${tgl} - ${myMonths[bln-1]} - ${thn} (${myDays[hari]})`
    return tglUpdateBaru.toString()
  }

  render() {
    let tglUpdateNya
    if (this.state.dataLama != null) {
      tglUpdateNya = this.convertTgl(this.state.dataLama.updatedAt)
    }
    return (
      this.state.dataLama != null ?
        <View style={[Styles.container, { paddingBottom: hp(1) }]}>
          <View style={[StylesLocal.headerStyle, { flexDirection: 'row' }]}>
            <TouchableOpacity style={{ flex: 1, marginLeft: wp(1.5) }}
              onPress={() => {
                this.props.navigation.navigate('BotNavPrivate')
              }}
            >
              <IconMaterial name='arrow-back' color={Color.whiteColor} size={wp(6)}></IconMaterial>
            </TouchableOpacity>
            <Text style={[Styles.hurufKonten], {
              color: Color.whiteColor,
              fontSize: wp(4.6),
              fontWeight: 'bold'
            }}>
              Detail Transaction
          </Text>
            <View style={{ flex: 1 }}></View>
          </View>

          <View style={[{ padding: wp(2) }]}>
            <View style={[{
              width: '100%',
              height: hp(30),
              backgroundColor: Color.whiteColor,
              padding: wp(2),
              borderRadius: 2
            }]}>
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}>
                <Text style={[Styles.hurufKonten]}>IDTransacion : {this.state.dataLama.id}</Text>
                <Text style={[Styles.hurufKonten]}>{tglUpdateNya}</Text>
              </View>
              <View style={{ width: '100%', height: 1, backgroundColor: Color.darkPrimaryColor, marginTop: wp(1.5) }}></View>
              <View style={{
                flexDirection: 'column',
                marginTop: wp(1)
              }}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={[Styles.hurufKonten, { flex: 1, fontWeight: '700' }]}>Cashier Name</Text>
                  <Text style={[Styles.hurufKonten, { flex: 2 }]}>{this.state.dataLama.cashier.name}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={[Styles.hurufKonten, { flex: 1, fontWeight: '700' }]}>SubTotal</Text>
                  <Text style={[Styles.hurufKonten, { flex: 2 }]}>
                    {this.state.dataLama.subTotal &&
                      convertToRupiah(this.state.dataLama.subTotal)}
                  </Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={[Styles.hurufKonten, { flex: 1, fontWeight: '700' }]}>Discount</Text>
                  <Text style={[Styles.hurufKonten, { flex: 2 }]}>{this.state.dataLama.discount &&
                    convertToRupiah(this.state.dataLama.discount)}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={[Styles.hurufKonten, { flex: 1, fontWeight: '700' }]}>Tax</Text>
                  <Text style={[Styles.hurufKonten, { flex: 2 }]}>{this.state.dataLama.tax &&
                    convertToRupiah(this.state.dataLama.tax)}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={[Styles.hurufKonten, { flex: 1, fontWeight: '700' }]}>GrandTotal</Text>
                  <Text style={[Styles.hurufKonten, { flex: 2 }]}>{this.state.dataLama.grandTotal &&
                    convertToRupiah(this.state.dataLama.grandTotal)}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={[Styles.hurufKonten, { flex: 1, fontWeight: '700' }]}>Cash</Text>
                  <Text style={[Styles.hurufKonten, { flex: 2 }]}>{this.state.dataLama.cash &&
                    convertToRupiah(this.state.dataLama.cash)}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={[Styles.hurufKonten, { flex: 1, fontWeight: '700' }]}>Change</Text>
                  <Text style={[Styles.hurufKonten, { flex: 2 }]}>
                    {convertToRupiah(this.state.dataLama.cash - this.state.dataLama.grandTotal)}
                  </Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={[Styles.hurufKonten, { flex: 1, fontWeight: '700' }]}>No.Table</Text>
                  <Text style={[Styles.hurufKonten, { flex: 2 }]}>
                    {this.state.dataLama.noMeja && this.state.dataLama.noMeja.toString()}
                  </Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={[Styles.hurufKonten, { flex: 1, fontWeight: '700' }]}>Items</Text>
                  <Text style={[Styles.hurufKonten, { flex: 2 }]}>
                    {this.state.dataLama.transactionDetails.length.toString()}
                  </Text>
                </View>
              </View>
            </View>

            <FlatList
              data={this.state.dataLama.transactionDetails}
              extraData={this.state.dataLama.transactionDetails}
              keyExtractor={(item, index) => item.id.toString()}
              showsVerticalScrollIndicator={false}
              style={{height:hp(58)}}
              renderItem={({ item }) => {
                return (
                  <CompListProduct
                    item={item}
                  />
                )
              }}
            />
          </View>
        </View>
        : false
    )
  }
}

const StylesLocal = StyleSheet.create({
  ContentHead: {
    marginTop: hp(7),
    width: wp(90),
    marginHorizontal: wp(5),
    height: hp(10),
    borderRadius: wp(2.5),
    padding: wp(4),
    alignItems: 'center'
  },
  ContentBody: {
    flex: 1,
    justifyContent: 'flex-start', //For Horizontal
    alignItems: 'center',
    marginTop: wp(2)
  },
  TouchBtnListTrans: {
    marginTop: wp(5),
    width: wp(90),
    marginHorizontal: wp(5),
    height: hp(15),
    borderRadius: wp(2),
    padding: wp(4),
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'row'
  },
  headerStyle: {
    width: wp(100),
    height: hp(7),
    backgroundColor: Color.darkPrimaryColor,
    elevation: 5,
    alignItems: 'center', //For Horizontal
    justifyContent: 'center' //For Vert.
  },
  fabStyle: {
    position: 'absolute',
    right: wp(4),
    bottom: hp(2.5),
    backgroundColor: Color.darkPrimaryColor,
    borderRadius: wp(20),
    height: hp(6.5),
    width: wp(12),
    alignItems: 'center',
    justifyContent: 'center'
  }
})
const mapStateToProps = state => {
  return {
    Transaction: state.Transaction
  }
}
export default connect(mapStateToProps)(ScreenTransactionDetail)