import React from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View,Dimensions } from 'react-native';

import { Colors, DebugInstructions, Header, LearnMoreLinks, ReloadInstructions } from 'react-native/Libraries/NewAppScreen';
import Login from './Pages/Login';
import MainLayout from './components/MainLayout';
import Navigation from './Navigation';


function App() {


  return (
   <Navigation/>
  );
}



export default App;
