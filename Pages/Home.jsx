import React, { useEffect,useState } from 'react'
import { StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View,Dimensions } from 'react-native'
import MainLayout from '../components/MainLayout'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

const width=Dimensions.get("screen").width
const Home = ({route,navigation}) => {

  

  const [articleText, setArticleText] = useState('');
  const [data, setData] = useState(null);

  useEffect(() => {
    try {
      const getToken = async () => {
        const token = await AsyncStorage.getItem('userToken');
        const userData =JSON.parse(await AsyncStorage.getItem('userData'))
      setData(userData);
      

        // console.log("userData from AsyncStorage:", userData);
        // console.log("Token from AsyncStorage:", token);
        // You can now use the token for API calls or other purposes
        const apiUrl = "http://localhost:5000/auth/api/validateToken";
        const response = await axios.post(apiUrl, { token:token });
        const tokenData = response.data;
        if (!tokenData.bool) {
          // Redirect to login page
          navigation.navigate('Login');
          ;}
        console.log("Token Data:", tokenData);
      };
      getToken();
    } catch (error) {
      console.log("token error", error);
    }
  }, [navigation])

  const handleLogout = async () => {

    try {
      await AsyncStorage.removeItem('userToken');
      console.log("token after removing",AsyncStorage.getItem('userToken'))
      navigation.navigate('Login');
    } catch (error) {
      console.log("error while logout", error);
    }
  
  }

  const postArticle =async () => {
    // Implement the logic to post the article
    console.log("Article posted:", articleText);
    // Reset the input field after posting
  
    
    try {
      const articleUrl="http://localhost:5000/auth/api/articlePost";
      
      const articleData = {
        content: articleText,
        author: JSON.parse(await AsyncStorage.getItem('userData')).id,
      };

      const response = await axios.post(articleUrl, articleData);
      const articleResponse = response.data;
      console.log("Article Response:", articleResponse);
    } catch (error) {
      
    }
    setArticleText('');
  };
  console.log("userData",data && data)
  
  return (
  <MainLayout>
    {data ? (
      <Text>{data.name}</Text>
    ) : (
      <Text>Loading user data...</Text> // Placeholder text or any other fallback UI
    )}


    <View>
    <TextInput
        style={styles.input}
        onChangeText={setArticleText}
        value={articleText}
        placeholder="Write your article here..."
        multiline
        numberOfLines={4}
      />
      <TouchableOpacity onPress={postArticle} style={styles.button}>
        <Text style={{color:"black"}}>Post Article</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>navigation.navigate('Article')} style={styles.button}>
        <Text style={{color:"black"}}>Go to Article Page</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleLogout}><Text style={{color:"black"}}>Logout</Text></TouchableOpacity>
    </View>
    
  </MainLayout>
  )
}

const styles = StyleSheet.create({
  input: {
    height: 300,
    padding:5,
    width:width-100,
    backgroundColor:"#0FA97D",
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius:10,
    textAlignVertical: 'top', // Align text at the top
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    margin: 12,
    color:"black"
  },
});

export default Home