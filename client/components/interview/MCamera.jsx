import { useState, useEffect } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { Camera, CameraType } from 'expo-camera'

const MCamera = () => {
    const [startCamera, setStartCamera] = useState(false);

    const _startCamera = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync()
        if (status === 'granted') {
            setStartCamera(true)
        } else {
            Alert.alert('Access denied')
        }
    }

    useEffect(() => {
        _startCamera()
    }, [])

    return (
        startCamera ? <Camera className="w-full h-full" type={CameraType.front} /> :
            <ActivityIndicator />
    )
}

export default MCamera