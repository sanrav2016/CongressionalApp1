import { useEffect, useRef } from 'react'
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import M3DModel from '../components/interview/M3DModel';
import Textbox from '../components/interview/Textbox';
import MCamera from '../components/interview/MCamera';
import { DeviceMotion } from 'expo-sensors';

const Interview = () => {
    const speaking = useRef(false)
    const deviceRotation = useRef({ alpha: 0, beta: 0, gamma: 0 })

    useEffect(() => {
        DeviceMotion.addListener(onDeviceMotionChange);
        return () => {
            DeviceMotion.removeListener(onDeviceMotionChange);
        };
    }, []);

    const onDeviceMotionChange = (event) => {
        const rot = event.rotation;
        deviceRotation.current = rot;
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{ display: "flex", flex: 1, flexDirection: "row" }}>
                <M3DModel speakingRef={speaking} gyroscopeRef={deviceRotation} />
                <View style={{ flex: 1 }}>
                    <MCamera />
                </View>
            </View>
            <Textbox speakingRef={speaking} />
        </View>
    )
}

export default Interview;