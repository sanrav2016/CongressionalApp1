import React from 'react'
import { SafeAreaView, View, Text, TouchableOpacity, Image, ImageBackground } from 'react-native'
import styles from './navbar.style';
import { ArrowLeftIcon } from 'react-native-heroicons/solid'
import { useNavigation } from '@react-navigation/native'

const Sidebar = () => {
    const navigation = useNavigation();

    return (
        <ImageBackground
            source={require('../../assets/images/navscreen.png')}
            style={styles.image}
            resizeMode="stretch" // Set resizeMode to "stretch"
        >
            <SafeAreaView>
                <View className="flex-row justify-start">
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4"
                    >
                        <ArrowLeftIcon size="20" color="black" />
                    </TouchableOpacity>
                </View>
                <View style={styles.container}>
                    <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                        <Text style={styles.link}>Home</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("Resume")}>
                        <Text style={styles.link}>Resume</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("Interview")}>
                        <Text style={styles.link}>Interview</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("qa")}>
                        <Text style={styles.link}>Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("Logout")}>
                        <Text style={styles.link}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </ImageBackground>
    )
}

export default Sidebar