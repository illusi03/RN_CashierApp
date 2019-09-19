import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, TextInput, ActivityIndicator } from 'react-native'
import IconFA from 'react-native-vector-icons/FontAwesome5';
import IconFA2 from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';
import { Styles, Color } from '../../res/Styles'
import { cashierLogout } from '../../_actions/Cashier'

class ScreenProfile extends Component {
  state = {
    tax: 0,
    minDiscount: 0,
    discount: 0,
    isLoadingSetting: false
  }
  updateSetting = async () => {
    await this.setState({
      isLoadingSetting: true
    })
    const tax = this.state.tax
    const minDiscount = this.state.minDiscount
    const discount = this.state.discount
    await AsyncStorage.setItem('tax', tax)
    await AsyncStorage.setItem('minDiscount', minDiscount)
    await AsyncStorage.setItem('discount', discount)
    await this.setState({
      isLoadingSetting: false
    })
  }
  aksiLogout = async () => {
    await AsyncStorage.clear()
    await this.props.dispatch(cashierLogout())
    await this.props.navigation.navigate('StackPublic')
  }
  getInitData = async () => {
    const tax = await AsyncStorage.getItem('tax')
    const minDiscount = await AsyncStorage.getItem('minDiscount')
    const discount = await AsyncStorage.getItem('discount')
    await this.setState({
      tax, minDiscount, discount
    })
  }
  componentDidMount() {
    this.getInitData()
  }
  render() {
    return (
      this.props.Cashier.dataItem != null ?
        <View style={[Styles.container]}>

          <ScrollView>
            <View style={{
              backgroundColor: Color.darkPrimaryColor,
              flex: 1,
              position: 'relative',
              borderBottomRightRadius: wp(10),
              borderBottomLeftRadius: wp(10),
              paddingBottom: hp(1.5),
              paddingTop: hp(15),
              elevation: 10
            }}>
              <View style={{
                position: 'absolute',
                marginTop: hp(10),
                left: wp(50),
                marginLeft: -50,
                width: wp(22),
                height: wp(22),
                borderRadius: wp(6),
                backgroundColor: Color.darkPrimaryColor,
                borderColor: Color.whiteColor,
                borderWidth: 3
              }}>
                <Image source={require('../../assets/avatar.png')}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: wp(5)
                  }}></Image>
              </View>
            </View>

            <View style={{
              flex: 3,
              alignItems: 'center',
              marginBottom: wp(4)
            }}>
              <View style={[Styles.cardSimpleContainer, StylesLocal.ContentHead]}>
                <Text style={[Styles.hurufKonten], {
                  fontSize: wp(3.7)
                }}>Selamat Datang, Bambang</Text>
                <Text style={Styles.hurufKonten}>Level Cashier</Text>
              </View>
              <View style={[Styles.cardSimpleContainer, StylesLocal.ContentHead, {
                alignItems: 'flex-start',
                marginTop: hp(1),
                height: hp(47)
              }]}>

                <View style={{ flexDirection: 'row', marginBottom: wp(2) }}>
                  <IconFA2 name='user-circle-o' size={20} color={Color.darkPrimaryColor}
                    style={{ marginRight: wp(2) }}></IconFA2>
                  <Text style={Styles.hurufKonten}>Personal Detail</Text>
                </View>

                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                  <Text style={[Styles.hurufKonten]}>Username</Text>
                  <Text style={[Styles.hurufKonten, { marginRight: wp(5) }]}>{this.props.Cashier.dataItem.username}</Text>
                </View>
                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', marginTop: wp(1) }}>
                  <Text style={[Styles.hurufKonten]}>Password</Text>
                  <Text style={[Styles.hurufKonten, { marginRight: wp(5) }]}>{this.props.Cashier.dataItem.password}</Text>
                </View>
                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', marginTop: wp(1) }}>
                  <Text style={[Styles.hurufKonten]}>Name</Text>
                  <Text style={[Styles.hurufKonten, { marginRight: wp(5) }]}>{this.props.Cashier.dataItem.name}</Text>
                </View>
                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', marginTop: wp(1) }}>
                  <Text style={[Styles.hurufKonten]}>No Telp</Text>
                  <Text style={[Styles.hurufKonten, { marginRight: wp(5) }]}>{this.props.Cashier.dataItem.noTelp}</Text>
                </View>

                {/* Setting Session */}
                <View style={{ flexDirection: 'row', marginTop: wp(2) }}>
                  <IconFA name='cog' size={20} color={Color.darkPrimaryColor}
                    style={{ marginRight: wp(2) }}></IconFA>
                  <Text style={Styles.hurufKonten}>Settings</Text>
                </View>
                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'flex-start' }}>
                  <Text style={[Styles.hurufKonten, { flex: 1, marginRight: wp(2), textAlignVertical: 'center' }]}>Tax (%)</Text>
                  <TextInput
                    placeholder='Tax'
                    underlineColorAndroid={Color.accentColor}
                    style={{
                      fontSize: wp(3.5),
                      flex: 1,
                    }}
                    keyboardType='numeric'
                    value={this.state.tax.toString()}
                    onChangeText={(text) => {
                      this.setState({
                        tax: text
                      })
                    }}
                  />
                </View>
                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'flex-start' }}>
                  <Text style={[Styles.hurufKonten, { flex: 1, marginRight: wp(2), textAlignVertical: 'center' }]}>Min Discount (Rp.)</Text>
                  <TextInput
                    placeholder='Min Discount'
                    underlineColorAndroid={Color.accentColor}
                    style={{
                      fontSize: wp(3.5),
                      flex: 1,
                    }}
                    keyboardType='numeric'
                    value={this.state.minDiscount.toString()}
                    onChangeText={(text) => {
                      this.setState({
                        minDiscount: text
                      })
                    }}
                  />
                </View>
                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'flex-start' }}>
                  <Text style={[Styles.hurufKonten, { flex: 1, marginRight: wp(2), textAlignVertical: 'center' }]}>Discount (%)</Text>
                  <TextInput
                    placeholder='Discount'
                    underlineColorAndroid={Color.accentColor}
                    style={{
                      fontSize: wp(3.5),
                      flex: 1
                    }}
                    keyboardType='numeric'
                    value={this.state.discount.toString()}
                    onChangeText={(text) => {
                      this.setState({
                        discount: text
                      })
                    }}
                  />
                </View>
                <View style={{
                  width: '100%',
                  alignItems: 'center',
                  marginTop: wp(1.5)
                }}>
                  {this.state.isLoadingSetting ?
                    <ActivityIndicator></ActivityIndicator>
                    :
                    <TouchableOpacity
                      onPress={() => {
                        this.updateSetting()
                      }}
                      style={{
                        width:wp(20),
                        height:hp(3.8),
                        backgroundColor:Color.darkPrimaryColor,
                        borderRadius:2,
                        justifyContent:'center',
                        alignItems:'center'
                      }}
                      activeOpacity={0.8}
                    >
                      <Text style={[Styles.hurufKonten,{color:Color.whiteColor}]}>UPDATE</Text>
                    </TouchableOpacity>
                  }
                </View>
              </View>

              <TouchableOpacity style={[Styles.cardSimpleContainer, StylesLocal.TouchBtnContent]}
                onPress={() =>
                  this.aksiLogout()
                }
                activeOpacity={0.8}
              >
                <IconFA name='power-off' size={20} color={Color.darkPrimaryColor}
                  style={{ marginRight: wp(2) }}></IconFA>
                <Text style={Styles.hurufKonten}>Logout</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
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
  TouchBtnContent: {
    marginTop: 15,
    width: wp(90),
    marginHorizontal: wp(5),
    height: hp(6),
    borderRadius: wp(2),
    padding: wp(4),
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row'
  }
})
const mapStateToProps = state => {
  return {
    Cashier: state.Cashier
  }
}
export default connect(mapStateToProps)(ScreenProfile)