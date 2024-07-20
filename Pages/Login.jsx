import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [Data,setData]=useState(null)

  useFocusEffect(
    React.useCallback(() => {
      const getToken = async () => {
        const token = await AsyncStorage.getItem('userToken');
        // console.log("token from login page", token);
        if (token !== null) {
          // Redirect to home page
          navigation.navigate('Home');
        }
      };
      getToken();
    }, [navigation])
  );
  const handleLogin = async() => {
    // Handle login logic here
    try {
      const apiUrl="http://localhost:5000/auth/api/login";
    const userData = {
      email:email,
      password:password,
    };

    const response= await axios.post(apiUrl,userData)
    const loggedInData=response.data
    setData(loggedInData)
    //  console.log("setdata",loggedInData)
    // console.log("data logged in data",loggedInData)
    if(loggedInData.bool){
      await AsyncStorage.setItem('userToken',loggedInData.token)
      await AsyncStorage.setItem('userData',JSON.stringify(loggedInData.userData))
      if(loggedInData.userData.admin==true){
        navigation.navigate('adminHome')}else{
          navigation.navigate('Home')
        }
    }else{
      Alert.alert(loggedInData.message)
    }

    } catch (error) {
      console.log("error ",error)
    }
  };

  return (
    <View style={styles.form}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      <TouchableOpacity style={styles.forgotPassword}>
        <Text style={styles.linkText}>Forgot password?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.submitButton} onPress={handleLogin}>
        <Text style={styles.submitButtonText}>Log in</Text>
      </TouchableOpacity>
      <View style={styles.signUpContainer}>
        
        <Text style={styles.text}>Don't have an account?</Text>
        <TouchableOpacity  onPress={() => navigation.navigate('signup')}>
          <Text style={styles.linkText}>Sign up</Text>
        </TouchableOpacity>

        <TouchableOpacity  onPress={() => navigation.navigate('adminLogin')}>
          <Text style={styles.linkText}>Admin Login</Text>
        </TouchableOpacity>
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    backgroundColor: '#efefef', // var(--bg-light)
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    width: '100%',
    
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 16,
  },
  input: {
    borderRadius: 8, // 0.5rem in pixels
    padding: 16, // 1rem in pixels
    width: '100%',
    borderWidth: 0,
    backgroundColor: '#9c9c9c60', // var(--clr-alpha)
  },
  label: {
    alignSelf: 'flex-start',
    color: '#58bc82', // var(--clr)
    fontWeight: '600',
    marginBottom: 8,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 16,
  },
  linkText: {
    color: '#58bc82', // var(--clr)
  },
  submitButton: {
    padding: 16, // 1rem in pixels
    width: '100%',
    alignItems: 'center',
    borderRadius: 24, // 3rem in pixels
    backgroundColor: '#707070', // var(--bg-dark)
    transitionDuration: 300,
  },
  submitButtonText: {
    color: '#efefef', // var(--bg-light)
    fontWeight: '600',
    fontSize: 16,
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  text: {
    fontSize: 14, // 0.9rem in pixels
    color: '#707070', // var(--bg-dark)
  },
});

export default Login;
