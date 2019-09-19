import React from 'react'
import { createStackNavigator } from 'react-navigation'
import { createBottomTabNavigator } from "react-navigation"
import IconFa from 'react-native-vector-icons/FontAwesome5'

import { Styles, Color } from '../res/Styles'
import ScreenLogin from '../app/login/ScreenLogin'

export default StackPublic = createStackNavigator(
  {
    ScreenLogin,
  }, {
    initialRouteName: "ScreenLogin",
    headerMode: 'none'
  }
);
