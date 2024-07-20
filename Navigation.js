import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Home from './Pages/Home';
import AdminLogin from './Pages/AdminLogin';
import AdminHome from './Pages/AdminHome';
import ArticlePage from './Pages/ArticlePage';


const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="signup" component={Register} />
        <Stack.Screen name="Article" component={ArticlePage} />
        <Stack.Screen name="adminHome" component={AdminHome}  options={{
          headerShown: false, }} />
        <Stack.Screen name="Home" component={Home}  options={{
          headerShown: false, // This hides the header for the Home screen
        }}/>
       
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation