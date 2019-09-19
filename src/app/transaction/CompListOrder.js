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
import { deleteProductAxios, getProductAxios } from '../../_actions/Product'
import { setOrderBiasa } from '../../_actions/Order'

class CompListOrder extends Component {
  state = {
    isLoadingBtn: false,
    isOrdered: false,
    dataProductLocal: null,
    dataOrderLocal: null
  }
  addItem = async (id) => {
    await this.setState({
      isLoadingBtn: true,
      isOrdered: true
    })
    const indexItem = await this.props.Order.dataItem.findIndex((item) => {
      return (item.productId == id)
    })
    let dataBefore = this.props.Order.dataItem
    if (indexItem >= 0) {
      let tmpOrderQtyTambah = {
        ...dataBefore[indexItem],
        qty: dataBefore[indexItem].qty + 1
      }
      dataBefore[indexItem] = tmpOrderQtyTambah
      this.props.dispatch(setOrderBiasa(
        dataBefore
      ))
      await this.setState({
        dataOrderLocal: dataBefore[indexItem]
      })
    } else {
      const dataBungkus = {
        transactionId:null,
        productId: id,
        qty: 1,
        price: this.state.dataProductLocal.price,
        product:this.state.dataProductLocal
      }
      this.props.dispatch(setOrderBiasa([
        ...dataBefore,
        dataBungkus
      ]))
      await this.setState({
        dataOrderLocal: dataBungkus
      })
    }
    await this.setState({
      isLoadingBtn: false
    })
  }

  removeItem = async (id) => {
    await this.setState({
      isLoadingBtn: true
    })
    const indexItem = await this.props.Order.dataItem.findIndex((item) => {
      return (item.productId == id)
    })
    let dataBefore = this.props.Order.dataItem
    if (indexItem >= 0) {
      if (dataBefore[indexItem].qty > 1) {
        let tmpOrderQtyTambah = {
          ...dataBefore[indexItem],
          qty: dataBefore[indexItem].qty - 1
        }
        dataBefore[indexItem] = tmpOrderQtyTambah
        this.props.dispatch(setOrderBiasa(
          dataBefore
        ))
        await this.setState({
          dataOrderLocal: dataBefore[indexItem]
        })
      } else {
        //Splice arr
        dataBefore.splice(indexItem, 1)
        this.setState({
          isOrdered: false
        })
        this.props.dispatch(setOrderBiasa(
          dataBefore
        ))
        await this.setState({
          dataOrderLocal: null
        })
      }
    }
    await this.setState({
      isLoadingBtn: false
    })
  }

  getInit = async () => {
    const indexItem = await this.props.Order.dataItem.findIndex((item) => {
      return (item.productId == this.props.item.id)
    })
    let tmpProduct = this.props.Product.dataItem.filter((item) => {
      if (item.id == this.props.item.id) {
        return item
      }
    })
    tmpProduct = tmpProduct[0]
    await this.setState({
      dataProductLocal: tmpProduct
    })
    if (indexItem >= 0) {
      let temporerOrder = await this.props.Order.dataItem[indexItem]
      await this.setState({
        dataOrderLocal: temporerOrder,
        isOrdered: true
      })
    }
  }
  componentDidMount() {
    this.getInit()
  }
  render() {
    return (
      <View style={[Styles.cardSimpleContainer, StylesLocal.TouchBtnListTrans, {
        alignItems: 'flex-start',
        marginVertical: wp(0.5)
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
              <Text style={StylesLocal.hurufLabel}>SubTotal </Text>
              <Text style={StylesLocal.hurufLabel}>Price/pcs </Text>
            </View>
            <View>
              <Text style={[StylesLocal.hurufLabel, { fontWeight: '100' }]}>
                {this.props.item.name}
              </Text>
              <Text style={[StylesLocal.hurufLabel, { fontWeight: '100' }]}>
                {this.state.dataOrderLocal != null ? 
                  convertToRupiah(this.state.dataOrderLocal.qty*this.props.item.price) :
                  convertToRupiah(0)
                }
              </Text>
              <Text style={[StylesLocal.hurufLabel, { fontWeight: '100' }]}>
                {this.props.item.price && convertToRupiah(this.props.item.price)}
              </Text>
            </View>
          </View>
        </View>

        {this.state.isOrdered ?
          <View style={[Styles.cardSimpleContainer, StylesLocal.btnAksi, {
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexDirection: 'row'
          }]}>
            <TouchableOpacity
              style={{ flex: 1, alignItems: 'flex-start', marginLeft: wp(1.5) }}
              onPress={() =>
                this.removeItem(this.props.item.id)
              }
            >
              <IconFA name='minus' color={Color.darkPrimaryColor} size={wp(4)}></IconFA>
            </TouchableOpacity>
            <Text style={[Styles.hurufKonten], { flex: 1, textAlign: 'center' }}>
              {this.state.dataOrderLocal != null && this.state.dataOrderLocal.qty}
            </Text>
            <TouchableOpacity
              style={{ flex: 1, alignItems: 'flex-end', marginRight: wp(1.5) }}
              onPress={() =>
                this.addItem(this.props.item.id)
              }
            >
              <IconFA name='plus' color={Color.darkPrimaryColor} size={wp(4)}></IconFA>
            </TouchableOpacity>
          </View>
          :
          <TouchableOpacity style={[StylesLocal.btnAksi, {
            backgroundColor: Color.darkPrimaryColor,
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingLeft: wp(2),
            flexDirection: 'row'
          }]}
            onPress={() =>
              this.addItem(this.props.item.id)
            }
          >
            <Text style={[Styles.hurufKonten, { color: Color.whiteColor, fontSize: wp(3.5), marginRight: wp(8) }]}>Add</Text>
            <IconFA name='plus' color={Color.whiteColor} size={wp(4)}></IconFA>
          </TouchableOpacity>
        }
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
    padding: wp(3),
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'row'
  },
  btnAksi: {
    position: 'absolute',
    right: wp(3.8),
    bottom: hp(2),
    width: wp(22),
    height: hp(4),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(1)
  }
})

const mapStateToProps = state => {
  return {
    Product: state.Product,
    Order: state.Order
  }
}
export default connect(mapStateToProps)(CompListOrder)