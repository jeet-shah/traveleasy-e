import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import {StackNavigator} from './component/StackNavigator'

export default function App() {
  return (
      <AppContainer />
  );
}

const SwitchNavigator = createSwitchNavigator({
  Stack: { screen:StackNavigator }
});

const AppContainer = createAppContainer(SwitchNavigator)