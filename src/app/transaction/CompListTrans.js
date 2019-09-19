import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, ScrollView, TouchableOpacity, StyleSheet,Alert } from 'react-native'
import IconFA from 'react-native-vector-icons/FontAwesome5';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';
import { Styles, Color } from '../../res/Styles'
import { convertToRupiah } from '../../res/Constant'
import { getTransactionAxios,deleteTransactionAxios } from '../../_actions/Transaction'


class CompListTrans extends Component {
  state = {
    isLoadingBtn: false
  }
  detailItem = async (id) => {
    await this.setState({
      isLoadingBtn: true
    })
    await this.props.detailAksi(id)
    await this.setState({
      isLoadingBtn: false
    })
  }
  removeItem = async (id) => {
    await this.setState({
      isLoadingBtn: true
    })
    await this.props.dispatch(deleteTransactionAxios(id))
    await this.props.dispatch(getTransactionAxios())
    await this.setState({
      isLoadingBtn: false
    })
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
    tglUpdateBaru = `${tgl}/${bln}/${thn}`
    return tglUpdateBaru
  }
  render() {
    const tglJSON = this.props.item.updatedAt
    const tglUpdateBaru = this.convertTgl(tglJSON)
    return (
      <View style={[Styles.cardSimpleContainer, StylesLocal.TouchBtnListTrans, {
        alignItems: 'flex-start',
        marginVertical: wp(0.5)
      }]}>
        <View style={{
          flex: 1
        }}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ marginRight: wp(1) }}>
              <Text style={StylesLocal.hurufLabel}>ID Trans. </Text>
              <Text style={StylesLocal.hurufLabel}>No Table </Text>
              <Text style={StylesLocal.hurufLabel}>Date </Text>
            </View>
            <View>
              <Text style={[StylesLocal.hurufLabel, { fontWeight: '100' }]}>
                {this.props.item.id}
              </Text>
              <Text style={[StylesLocal.hurufLabel, { fontWeight: '100' }]}>
                {this.props.item.noMeja}
              </Text>
              <Text style={[StylesLocal.hurufLabel, { fontWeight: '100' }]}>
                {tglUpdateBaru}
              </Text>
            </View>
          </View>
        </View>
        <View style={{
          flex: 1.2
        }}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ marginRight: wp(1.5) }}>
              <Text style={StylesLocal.hurufLabel}>Bill </Text>
              <Text style={StylesLocal.hurufLabel}>Pay </Text>
              <Text style={StylesLocal.hurufLabel}>Items </Text>
            </View>
            <View>
              <Text style={[StylesLocal.hurufLabel, { fontWeight: '100' }]}>
                {convertToRupiah(this.props.item.grandTotal)}
              </Text>
              <Text style={[StylesLocal.hurufLabel, { fontWeight: '100' }]}>
                {convertToRupiah(this.props.item.cash)}
              </Text>
              <Text style={[StylesLocal.hurufLabel, { fontWeight: '100' }]}>
                {this.props.item.transactionDetails.length.toString()} 
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={[StylesLocal.btnAksi, { top: hp(1) }]}
          onPress={() => this.detailItem(this.props.item.id)}
        >
          <IconFA name='arrow-right' size={wp(6)} color={Color.darkPrimaryColor}></IconFA>
        </TouchableOpacity>
        <TouchableOpacity style={[StylesLocal.btnAksi, { bottom: hp(1) }]}
          onPress={() => {
            Alert.alert(
              'Confirm Delete',
              'Are you sure to delete this item ?',
              [
                {
                  text: 'No',
                  style: 'cancel',
                },
                {
                  text: 'Yes', onPress: () => {
                    this.removeItem(this.props.item.id)
                  }
                },
              ],
              { cancelable: false },
            )
          }}
        >
          <IconFA name='trash' size={wp(6)} color={Color.errorColor}></IconFA>
        </TouchableOpacity>
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
    marginBottom: hp(1)
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
  btnAksi: {
    position: 'absolute',
    right: wp(2.5)
  }
})
const mapStateToProps = state => {
  return {
    Transaction:state.Transaction
  }
}
export default connect(mapStateToProps)(CompListTrans)