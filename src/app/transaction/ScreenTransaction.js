import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import IconFA from 'react-native-vector-icons/FontAwesome5';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';
import { Styles, Color } from '../../res/Styles'
import CompListTrans from './CompListTrans'

class ScreenTransaction extends Component {
  redirectToDetail = (id) => {
    this.props.navigation.navigate('ScreenTransactionDetail', { transactionId: id })
  }
  render() {
    // console.disableYellowBox = true

    return (
      <View style={[Styles.container, { paddingBottom: hp(1) }]}>
        {/* For Header */}
        <View style={StylesLocal.headerStyle}>
          <Text style={[Styles.hurufKonten], { color: Color.whiteColor, fontSize: wp(4.6), fontWeight: 'bold' }}>
            List Transactions
          </Text>
        </View>

        <FlatList
          data={this.props.Transaction.dataItem}
          extraData={this.props.Transaction.dataItem}
          keyExtractor={(item, index) => item.id.toString()}
          renderItem={({ item }) => {
            return (
              <CompListTrans
                detailAksi={this.redirectToDetail}
                item={item}
              />)
          }}
        />

        {/* FAB */}
        <TouchableOpacity style={StylesLocal.fabStyle}
          onPress={() => {
            this.props.navigation.navigate('ScreenTransactionAdd')
          }}
        >
          <IconFA name='plus' color={Color.whiteColor} size={wp(6)}></IconFA>
        </TouchableOpacity>
      </View>
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
    Transaction: state.Transaction
  }
}
export default connect(mapStateToProps)(ScreenTransaction)