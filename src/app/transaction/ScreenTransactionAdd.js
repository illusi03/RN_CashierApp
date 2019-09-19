import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, FlatList, YellowBox,Alert } from 'react-native'
import IconFA from 'react-native-vector-icons/FontAwesome5'
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import { Tab, Tabs } from 'native-base';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';
import { Styles, Color } from '../../res/Styles'
import CompList from './CompListOrder'

import { getTransactionAxios } from '../../_actions/Transaction'
import { removeOrderBiasa } from '../../_actions/Order'


class ScreenTransactionAdd extends Component {
  deleteOrderAll = async () => {
    await this.props.dispatch(removeOrderBiasa())
    await this.props.navigation.navigate('BotNavPrivate')
  }
  render() {
    // console.disableYellowBox = true

    return (
      <View style={[Styles.container, { paddingBottom: hp(1) }]}>
        {/* For Header */}
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
            Add Transaction
          </Text>
          <TouchableOpacity style={{ flex: 1, alignContent: 'center', marginLeft: wp(1.5) }}
            onPress={() => {
              Alert.alert(
                'Confirm Delete',
                'Are you sure to delete all orders ?',
                [
                  {
                    text: 'No',
                    style: 'cancel',
                  },
                  {
                    text: 'Yes', onPress: () => {
                      this.deleteOrderAll()
                    }
                  },
                ],
                { cancelable: false },
              )
            }}
          >
            <IconMaterial name='delete-forever' color={Color.whiteColor} size={wp(6)}
              style={{ alignSelf: 'flex-end', marginRight: wp(1) }}></IconMaterial>
          </TouchableOpacity>
        </View>

        <FlatList
          data={this.props.Product.dataItem}
          extraData={this.props.Product.dataItem}
          keyExtractor={(item, index) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            return (
              <CompList
                item={item}
                editAksi={this.redirectToEdit}
              />)
          }}
        />

        {/* FAB */}
        <TouchableOpacity style={StylesLocal.fabStyle}
          onPress={() => {
            if(this.props.Order.dataItem.length >= 1){
              this.props.navigation.navigate('SWScreenViewbill')
            }else{
              alert('Order items first')
            }
          }}
        >
          <IconFA name='eye' color={Color.whiteColor} size={wp(6)}></IconFA>
        </TouchableOpacity>
      </View >
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
const mapStateToProps = (state) => {
  return {
    Product: state.Product,
    Order:state.Order
  }
}
export default connect(mapStateToProps)(ScreenTransactionAdd)