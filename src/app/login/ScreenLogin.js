import React, { Component } from 'react'
import { View, TextInput, Text, Button, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-community/async-storage'
import { connect } from 'react-redux'
import { Styles, Color } from '../../res/Styles'
import { CosEdit, CosButton } from '../../components/Components'
import { getCashierAxios } from '../../_actions/Cashier'
import { getProductAxios } from '../../_actions/Product'
import { getTransactionAxios } from '../../_actions/Transaction'

class ScreenLogin extends Component {
  state = {
    txtUser: '',
    txtPass: '',
    isLoading:false
  }
  aksiBtn = async () => {
    await this.setState({
      isLoading:true
    })
    const userNya = this.state.txtUser
    const passNya = this.state.txtPass
    if (userNya == '' | passNya == '') {
      await this.setState({
        isLoading:false
      })
      alert('Enter username and password correctly')
    } else {
      await this.props.dispatch(getCashierAxios(userNya, passNya))
      if (this.props.Cashier.isLogin) {
        await AsyncStorage.setItem('cashierId', `${this.props.Cashier.dataItem.id}`)
        await AsyncStorage.setItem('tax', `0`)
        await AsyncStorage.setItem('minDiscount', `0`)
        await AsyncStorage.setItem('discount', `0`)
        await this.setState({
          isLoading:false
        })
        await this.props.dispatch(getProductAxios())
        await this.props.dispatch(getTransactionAxios())
        await this.props.navigation.navigate('StackPrivate')
      } else {
        await alert('Wrong username or password')
        await this.setState({
          isLoading:false
        })
      }
    }
  }
  render() {
    return (
      <View style={[Styles.container, {
        justifyContent: 'center',
        alignItems: 'center',
        padding: wp(2.5)
      }]}>
        <View style={[Styles.content, Styles.cardSimpleContainer, {
          backgroundColor: Color.whiteColor,
          width: wp(95),
          height: hp(30),
          justifyContent: 'center',
          alignItems: 'center'
        }]}>
          <View style={StylesLocal.Conten}>
            <TextInput
              placeholder='Username'
              underlineColorAndroid={Color.accentColor}
              style={{
                fontSize: wp(4)
              }}
              onChangeText={(text) => {
                this.setState({
                  txtUser: text
                })
              }}
            />
          </View>
          <View style={StylesLocal.Conten}>
            <TextInput
              placeholder='Password'
              underlineColorAndroid={Color.accentColor}
              style={{
                fontSize: wp(4)
              }}
              onChangeText={(text) => {
                this.setState({
                  txtPass: text
                })
              }}
              secureTextEntry={true}
            />
          </View>

          <View style={StylesLocal.Conten}>
            {this.state.isLoading ?
              <ActivityIndicator></ActivityIndicator>
              :
              <Button
                title='Login'
                onPress={() => {
                  this.aksiBtn()
                }}
                Color={Color.accentColor}
              >
              </Button>
            }
          </View>
        </View>
      </View>
    )
  }
}

const StylesLocal = StyleSheet.create({
  Conten: {
    width: wp(85),
    marginBottom: wp(2.5)
  }
})
const mapStateToProps = (state) => {
  return {
    Cashier: state.Cashier
  }
}

export default connect(mapStateToProps)(ScreenLogin)