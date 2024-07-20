import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
const Register = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleRegister = async () => {
    // Handle register logic here
   try {
    const apiUrl="http://localhost:5000/auth/api/register";
    const userData = {
      fullName: username,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    };
    const response = await axios.post(apiUrl, userData);
    console.log('Response:', response);

   } catch (error) {

    console.error('Registration error:', error);
   }
    Alert.alert('Registration Info', `Username: ${username}\nEmail: ${email}`);
  };

  return (
    <View style={styles.form}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
      </View>
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
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
      </View>
      <TouchableOpacity style={styles.submitButton} onPress={handleRegister}>
        <Text style={styles.submitButtonText}>Register</Text>
      </TouchableOpacity>
      <View style={styles.signUpContainer}>
        <Text style={styles.text}>Already have an account?</Text>
        <TouchableOpacity onPress={()=>{navigation.navigate("Login")}}>
          <Text style={styles.linkText}>Log in</Text>
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
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
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
  linkText: {
    color: '#58bc82', // var(--clr)
  },
});

export default Register;
