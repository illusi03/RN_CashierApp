import React from 'react'
import { createStackNavigator,createSwitchNavigator } from 'react-navigation'
import { createBottomTabNavigator } from "react-navigation";
import IconFa from 'react-native-vector-icons/FontAwesome5'
import IconAnt from 'react-native-vector-icons/AntDesign'

import { Styles, Color } from '../res/Styles'
import ScreenProfile from '../app/profile/ScreenProfile'
import ScreenTransaction from '../app/transaction/ScreenTransaction'
import ScreenTransactionDetail from '../app/transaction/ScreenTransactionDetail'
import ScreenTransactionAdd from '../app/transaction/ScreenTransactionAdd'
import ScreenProduct from '../app/product/ScreenProduct'
import ScreenProductAdd from '../app/product/ScreenProductAdd'
import ScreenProductEdit from '../app/product/ScreenProductEdit'
import ScreenViewbill from '../app/viewbill/ScreenViewbill'

const BotNavPrivate = createBottomTabNavigator(
  {
    Transactions: {
      screen: ScreenTransaction,
      navigationOptions: {
        tabBarLabel: 'Transactions',
        tabBarIcon: ({ tintColor }) => (
          <IconAnt name="shoppingcart" color={tintColor} size={25} />
        )
      }
    },
    Products: {
      screen: ScreenProduct,
      navigationOptions: {
        tabBarLabel: 'Products',
        tabBarIcon: ({ tintColor }) => (
          <IconAnt name="appstore-o" color={tintColor} size={25} />
        )
      }
    },
    Profile: {
      screen: ScreenProfile,
      navigationOptions: {
        tabBarLabel: 'Profile',
        tabBarIcon: ({ tintColor }) => (
          <IconAnt name="solution1" color={tintColor} size={25} />
        )
      }
    },
  }, {
    tabBarOptions: {
      activeTintColor: Color.whiteColor,
      inactiveTintColor: Color.lightPrimaryColor,
      style: {
        backgroundColor: Color.darkPrimaryColor,
        borderTopWidth: 1,
        borderColor: Color.deviderColor,
        shadowOffset: { width: 6, height: 6 },
        shadowColor: 'black',
        shadowOpacity: 0.5,
        elevation: 6,
        paddingTop: 10
      }
    }
  }
)

const tempSwProduct = createSwitchNavigator(
  {
    SWScreenProductAdd:ScreenProductAdd,
    SWScreenProductEdit:ScreenProductEdit,
    SWScreenViewbill:ScreenViewbill
  },{
    initialRouteName:"SWScreenProductAdd"
  }
)
export default StackPrivate = createStackNavigator(
  {
    BotNavPrivate,
    ScreenTransactionDetail,
    ScreenTransactionAdd:ScreenTransactionAdd,
    tempSwProduct
  }, {
    initialRouteName: "BotNavPrivate",
    headerMode: 'none'
  }
);
