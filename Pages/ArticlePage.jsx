import React from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import MainLayout from '../components/MainLayout'
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';

const ArticlePage = () => {
    const [articles, setArticles] = React.useState({});
    useFocusEffect(React.useCallback(() => {
        const apiUrl = "http://localhost:5000/auth/api/getArticle";
        const getArticle = async () => {
            const response = await axios.post(apiUrl);
            const articles = response.data;

            setArticles(articles);

        } 
        try {
            getArticle();
        } catch (error) {
            console.log("error while getting articles", error)
        }


      }, [])
    );
  return (
   <MainLayout>
    <ScrollView>
       {articles && articles.articles && articles.articles.length > 0 ? (
        articles.articles.map((article, index) => (
        article.isPublished ? (<View style={styles.articleContainer} key={index}>
            <Text style={{color:"black"}}>{article.content}</Text>
            </View>):(null)
        ))
      ) : (
        <Text>No articles found</Text>
      )}
            </ScrollView>
   </MainLayout>
  )
}

const styles = StyleSheet.create({
    articleContainer: {
        padding: 10,
        margin: 10,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: 'white',
    }
})

export default ArticlePage