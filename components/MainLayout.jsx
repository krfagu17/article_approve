import React from 'react'
import { Dimensions, ScrollView, StatusBar, StyleSheet, useColorScheme, View } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import Login from '../Pages/Login'
import { Colors, DebugInstructions, Header, LearnMoreLinks, ReloadInstructions } from 'react-native/Libraries/NewAppScreen';

const MainLayout = ({children}) => {

    const isDarkMode = useColorScheme() === 'dark';
    const screenHeight = Dimensions.get('window').height; // Get screen height
    console.log("screenHeight", screenHeight)

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
        display: 'flex',
        flex: 1,

    };
    return (
        <SafeAreaView style={backgroundStyle}>
            <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor={backgroundStyle.backgroundColor}
            />
            <ScrollView contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
                <View
                    style={{
                        backgroundColor: isDarkMode ? Colors.black : Colors.white,
                        display: 'flex',
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: screenHeight,

                    }}
                >
                    {children}

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
});
export default MainLayout