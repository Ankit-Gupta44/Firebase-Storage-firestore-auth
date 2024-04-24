import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Notification from '../Screens/Notification';
import PhotoScreen from '../Screens/PhotoScreen';
import TextScreen from '../Screens/TextScreen';
import Calculator from '../Screens/Calculator';

const Tab = createBottomTabNavigator();

export default function StackScreen() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Notification" component={Notification} />
        <Tab.Screen name="TextScreen" component={TextScreen} />
        <Tab.Screen name="PhotoScreen" component={PhotoScreen} />
        <Tab.Screen name="Calculator" component={Calculator} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}