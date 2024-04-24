import { View, Text } from 'react-native'
import React from 'react'
import StackScreen from './Utilss/StackScreen';
import SignUpScreen from './Utilss/Authentication';

const App = () => {
  return (
    <View style={{flex:1}}>
      <SignUpScreen/>
    </View>
  )
}

export default App