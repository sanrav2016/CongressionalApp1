import { useState, useEffect } from 'react';
import { View, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import socket from '../../utils/socket'
import * as FileSystem from 'expo-file-system';
import { ArrowLeftIcon } from 'react-native-heroicons/solid'
import { useNavigation } from '@react-navigation/native'
import { Audio } from 'expo-av';
import { Buffer } from 'buffer';
global.Buffer = Buffer;

const Textbox = ({ speakingRef }) => {
    const navigation = useNavigation();
    const [audioQueue, setAudioQueue] = useState([])
    const [sound, setSound] = useState();
    const [recording, setRecording] = useState();
    const [generatingResponse, setGeneratingResponse] = useState(false);
    const [speaking, setSpeaking] = useState(false);

    async function playSound() {
        if (audioQueue.length == 0) return setSpeaking(false);
        if (speakingRef.current == true) return;
        const x = FileSystem.documentDirectory + audioQueue[0].id + '.mp3';
        const { sound } = await Audio.Sound.createAsync({
            uri: x
        }, {
            shouldPlay: true
        });
        setSound(sound);
        sound.setOnPlaybackStatusUpdate((s) => {
            if (s.isLoaded && s.didJustFinish && !s.isLooping) {
                speakingRef.current = false;
                audioQueue.shift();
                playSound();
            }
        });
        setSpeaking(true);
        await sound.playAsync();
        speakingRef.current = true;
    }

    useEffect(() => {
        return sound
            ? () => {
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);

    async function startRecording() {
        try {
            await Audio.requestPermissionsAsync();
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });

            const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY
            );
            setRecording(recording);
        } catch (err) {
            console.error('Failed to start recording', err);
        }
    }

    async function stopRecording() {
        setRecording(undefined);
        await recording.stopAndUnloadAsync();
        await Audio.setAudioModeAsync(
            {
                allowsRecordingIOS: false,
            }
        );
        const uri = recording.getURI();
        const audioString = await FileSystem.readAsStringAsync(uri, { encoding: "base64" })
        socket.emit("speechtotextaudio", audioString)
        setGeneratingResponse(true)
    }

    useEffect(() => {
        socket.disconnect()
        socket.connect()
        socket.on("connect", () => {
            socket.emit("interview_user")
            socket.on("beginaudiodata", (i) => {
                audioQueue.push({ id: i, buffer: [] })
            })
            socket.on("audiodata", (x, i) => {
                y = JSON.parse(x).data;
                audioQueue.find((x) => x.id == i).buffer.push(...y)
            })
            socket.on("endaudiodata", async (i) => {
                await FileSystem.writeAsStringAsync(FileSystem.documentDirectory + i + '.mp3', Buffer.from(audioQueue.find((x) => x.id == i).buffer).toString("base64"), { encoding: "base64" })
                setGeneratingResponse(false)
                await playSound()
            })
        })
    }, [])

    return (
        <SafeAreaView className="flex-row justify-start m-2">
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4"
            >
                <ArrowLeftIcon size="20" color="black" />
            </TouchableOpacity>
            <View className="ml-auto mr-4">
                <TouchableOpacity
                    onPress={recording ? stopRecording : ((generatingResponse || speaking) ? null : startRecording)}
                    style={{
                        padding: 12,
                        backgroundColor: recording ? 'red' : ((generatingResponse || speaking) ? 'grey' : '#fca311'),
                        borderRadius: 18,
                        alignItems: 'center',
                    }}
                >
                    <Text style={{ textAlign: 'center', color: 'white' }}>{recording ? 'Tap to stop speaking' : ((generatingResponse || speaking) ? 'Generating response...' : 'Tap to start speaking')}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default Textbox