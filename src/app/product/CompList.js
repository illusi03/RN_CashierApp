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

class CompList extends Component {
  state = {
    isLoadingBtn: false
  }
  removeItem = async (id) => {
    await this.setState({
      isLoadingBtn: true
    })
    await this.props.dispatch(deleteProductAxios(id))
    await this.props.dispatch(getProductAxios())
    await this.setState({
      isLoadingBtn: false
    })
  }
  editItem = async (id) => {
    await this.setState({
      isLoadingBtn: true
    })
    await this.props.editAksi(id)
    await this.setState({
      isLoadingBtn: false
    })
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
              <Text style={StylesLocal.hurufLabel}>Stock </Text>
              <Text style={StylesLocal.hurufLabel}>Price </Text>
            </View>
            <View>
              <Text style={[StylesLocal.hurufLabel, { fontWeight: '100' }]}>
                {this.props.item.name}
              </Text>
              <Text style={[StylesLocal.hurufLabel, { fontWeight: '100' }]}>
                {this.props.item.stock}
              </Text>
              <Text style={[StylesLocal.hurufLabel, { fontWeight: '100' }]}>
                {this.props.item.price && convertToRupiah(this.props.item.price)}
              </Text>
            </View>
          </View>
        </View>

        {this.state.isLoadingBtn ?
          <ActivityIndicator style={
            [StylesLocal.btnAksi, { top: hp(1) }]
          } size={wp(5)}
          ></ActivityIndicator>
          :
          <TouchableOpacity style={[StylesLocal.btnAksi, { top: hp(1) }]}
            onPress={() => {
              this.editItem(this.props.item.id)
            }}
          >
            <IconFA name='edit' size={wp(5)} color={Color.darkPrimaryColor}></IconFA>
          </TouchableOpacity>
        }
        {this.state.isLoadingBtn ?
          <ActivityIndicator style={
            [StylesLocal.btnAksi, { bottom: hp(1) }]
          } size={wp(5)}
          ></ActivityIndicator>
          :
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
    right: wp(2.5)
  }
})

const mapStateToProps = state => {
  return {
    Product: state.Product
  }
}
export default connect(mapStateToProps)(CompList)