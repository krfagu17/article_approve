import React, { useEffect } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import MainLayout from '../components/MainLayout'
import { useFocusEffect } from '@react-navigation/native'
import axios from 'axios'


const AdminHome = ({ navigation }) => {
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

       const handleApprove = async (article) => {}

      return (
       <MainLayout>
       <ScrollView>
       {articles && articles.articles && articles.articles.length > 0 ? (
        articles.articles.map((article, index) => (
          <View style={styles.articleContainer} key={index}>
            {/* Render your article content here */}
            <Text style={{color:"black"}}>{article.content}</Text>
            <TouchableOpacity onPress={async() =>{try {
                const apiUrl = "http://localhost:5000/auth/api/approveArticle";
                const response = await axios.post(apiUrl, { articleId: article._id });
                const approveResponse = response.data;
                console.log("approveResponse", approveResponse);
            } catch (error) {
                
            }} }>
                <Text style={{color:"blue"}}>Approve</Text>
            </TouchableOpacity>

          </View>
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

export default AdminHome;
