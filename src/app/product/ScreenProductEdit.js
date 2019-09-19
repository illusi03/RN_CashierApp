import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet, Picker, ActivityIndicator } from 'react-native'
import IconFA from 'react-native-vector-icons/FontAwesome5'
import IconMaterial from 'react-native-vector-icons/MaterialIcons'

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';
import { Styles, Color } from '../../res/Styles'
import { getProductAxios, editProductAxios } from '../../_actions/Product'

import { Tab, Tabs } from 'native-base';


class ScreenProductEdit extends Component {
  state = {
    txtName: '',
    txtPrice: '',
    txtStock: '',
    txtDescription: '',
    //Nambah category
    txtCategory: 1,
    isLoadingBtn: false,
    productId: 0,
    dataEditLama: null
  }
  aksiSubmit = async () => {
    await this.setState({
      isLoadingBtn: true
    })
    if (
      this.state.txtName == '' |
      this.state.txtPrice == '' |
      this.state.txtStock == '' |
      this.state.txtDescription == ''
    ) {
      await alert('Please enter correctly field')
    } else {
      const cashierId = await this.props.Cashier.dataItem.id
      const dataEditBaru = {
        categoryId: this.state.txtCategory,
        cashierId: cashierId,
        name: this.state.txtName,
        price: this.state.txtPrice,
        stock: this.state.txtStock,
        description: this.state.txtDescription
      }
      await this.props.dispatch(editProductAxios(this.state.productId, dataEditBaru))
      await this.props.dispatch(getProductAxios())
      await this.props.navigation.navigate('BotNavPrivate')      
    }
    await this.setState({
      isLoadingBtn: false
    })
  }
  getInitData = async () => {
    const productId = await this.props.navigation.getParam('productId')
    let dataEditLama = await this.props.Product.dataItem.filter((item) => {
      if (item.id == productId) {
        return item
      }
    })
    await this.setState({
      productId,
      dataEditLama
    })
    await this.setState({
      dataEditLama: this.state.dataEditLama[0]
    })
    await this.setState({
      txtName: this.state.dataEditLama.name,
      txtPrice: this.state.dataEditLama.price,
      txtStock: this.state.dataEditLama.stock,
      txtDescription: this.state.dataEditLama.description,
      txtCategory: this.state.dataEditLama.categoryId
    })
  }
  componentDidMount() {
    this.getInitData()
  }
  render() {
    return (
      this.state.dataEditLama != null ?
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
              Edit Product
          </Text>
            <View style={{ flex: 1 }}></View>
          </View>
          <View style={{
            height: hp(5)
          }}>
          </View>
          <ScrollView>
            <View style={{
              width: wp(95),
              alignSelf: 'center',
              marginBottom: hp(1.5)
            }}>
              <TextInput
                placeholder='Name'
                underlineColorAndroid={Color.accentColor}
                style={{
                  fontSize: wp(4)
                }}
                value={this.state.txtName}
                onChangeText={(text) => {
                  this.setState({
                    txtName: text
                  })
                }}
              />
            </View>
            <View style={{
              width: wp(95),
              alignSelf: 'center',
              marginBottom: hp(1.5)
            }}>
              <Picker
                selectedValue={this.state.txtCategory}
                style={{ height: hp(3), width: '100%' }}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({ txtCategory: itemValue })
                }>
                <Picker.Item label="Makanan" value="1" />
                <Picker.Item label="Minuman" value="2" />
              </Picker>
            </View>
            <View style={{
              width: wp(95),
              alignSelf: 'center',
              marginBottom: hp(1.5)
            }}>
              <TextInput
                placeholder='Price'
                underlineColorAndroid={Color.accentColor}
                style={{
                  fontSize: wp(4)
                }}
                keyboardType='numeric'
                value={this.state.txtPrice && this.state.txtPrice.toString()}
                onChangeText={(text) => {
                  this.setState({
                    txtPrice: text
                  })
                }}
              />
            </View>
            <View style={{
              width: wp(95),
              alignSelf: 'center',
              marginBottom: hp(1.5)
            }}>
              <TextInput
                placeholder='Stock'
                underlineColorAndroid={Color.accentColor}
                style={{
                  fontSize: wp(4)
                }}
                keyboardType='numeric'
                value={this.state.txtStock && this.state.txtStock.toString()}
                onChangeText={(text) => {
                  this.setState({
                    txtStock: text
                  })
                }}
              />
            </View>
            <View style={{
              width: wp(95),
              alignSelf: 'center',
              marginBottom: hp(1.5)
            }}>
              <TextInput
                placeholder='Description'
                underlineColorAndroid={Color.accentColor}
                style={{
                  fontSize: wp(4)
                }}
                value={this.state.txtDescription}
                onChangeText={(text) => {
                  this.setState({
                    txtDescription: text
                  })
                }}
              />
            </View>
          </ScrollView>
          {this.state.isLoadingBtn ?
            <ActivityIndicator style={StylesLocal.fabStyle} color={Color.whiteColor} size={wp(6)}></ActivityIndicator>
            :
            <TouchableOpacity style={StylesLocal.fabStyle}
              onPress={() => {
                this.aksiSubmit()
              }}
            >
              <IconFA name='save' color={Color.whiteColor} size={wp(6)}></IconFA>
            </TouchableOpacity>
          }
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
    Product: state.Product,
    Cashier: state.Cashier
  }
}
export default connect(mapStateToProps)(ScreenProductEdit)