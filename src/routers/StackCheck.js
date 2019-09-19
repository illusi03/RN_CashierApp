import React, { Component } from 'react'
import { View, ActivityIndicator, Text } from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';
import { connect } from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage'
import { getCashierAxiosById } from '../_actions/Cashier'
import { getProductAxios } from '../_actions/Product'
import { getTransactionAxios } from '../_actions/Transaction'

class StackCheck extends Component {
  state = {
    isLogin: false
  }
  componentDidMount() {
    this._bootstrapAsync();
  }
  _bootstrapAsync = async () => {
    try {
      const x = await AsyncStorage.getItem('cashierId');
      if (x != null) {
        const cashierId = await AsyncStorage.getItem('cashierId')
        await this.props.dispatch(getCashierAxiosById(cashierId))
        await this.props.dispatch(getProductAxios())
        await this.props.dispatch(getTransactionAxios())
        await this.props.navigation.navigate('StackPrivate')
      } else {
        await this.props.navigation.navigate('StackPublic')
      }
    } catch (e) {
      alert(`Check your connection, ${e}`)
    }
  }

  render() {
    return (
      <View style={{
        height: hp(100),
        width: wp(100),
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
      }}>
        <Text style={{
          fontSize: wp(4),
          fontWeight: 'bold',
        }}>HARAP TUNGGU...</Text>
        <ActivityIndicator size={50} color="#0000ff" />
      </View>
    )
  }
}
const mapStateToProps = state => {
  return {
    Cashier: state.Cashier
  }
}
export default connect(mapStateToProps)(StackCheck)