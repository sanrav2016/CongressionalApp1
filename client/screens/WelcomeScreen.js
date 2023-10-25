import { React } from 'react'
import { Image, View, SafeAreaView, ImageBackground, Text, TextInput, ScrollView, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { themeColors } from '../theme'
import { useNavigation } from '@react-navigation/native'

export default function WelcomeScreen() {
    const navigation = useNavigation();
    return (
        <ImageBackground
            source={require('../assets/images/b.jpg')}
            style={styles.image}
            resizeMode="stretch" // Set resizeMode to "stretch"
        >
            <SafeAreaView className="flex-1">
                <View className="flex-1 flex justify-around my-4">
                    <Text
                        style={{
                            color: '#f6fff8', // Replace 'your-desired-color-here' with the color you want
                            fontSize: 34, // You can adjust the font size here
                            fontWeight: 'bold', // You can specify the font weight here
                            textAlign: 'center', // You can set the text alignment here
                            fontFamily: 'Georgia'
                        }}>
                        Let's Get Started
                    </Text>
                    <View className="flex-row justify-center">
                        <Image source={require("../assets/images/welcome.png")}
                            style={{ width: 250, height: 250 }} />
                    </View>
                    <View className="space-y-4" style={{ marginHorizontal: 15 }}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('SignUp')}
                            style={{
                                paddingVertical: 12,
                                backgroundColor: '#fca311',
                                marginHorizontal: 7,
                                borderRadius: 18,
                            }}>
                            <Text
                                className="text-xl font-bold text-center text-gray-700"
                            >
                                Sign Up
                            </Text>
                        </TouchableOpacity>
                        <View className="flex-row justify-center">
                            <Text className="text-white font-semibold">Already have an account?</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                                <Text className="font-semibold text-yellow-400"> Log In</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </ImageBackground>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        justifyContent: 'center',
    }
})
