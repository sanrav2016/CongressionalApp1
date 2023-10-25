import { useState, useEffect } from 'react'
import { TextInput, View, SafeAreaView, Text, TouchableOpacity, ScrollView, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard } from 'react-native';
import Animated, { withTiming, useAnimatedStyle, Easing } from 'react-native-reanimated';
import { ArrowLeftIcon, EyeIcon, EyeSlashIcon, MagnifyingGlassIcon, ArrowDownTrayIcon } from 'react-native-heroicons/solid'
import DOMParser from 'react-native-html-parser';
import socket from '../utils/socket'
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import { useNavigation } from '@react-navigation/native'

import ResumeMessages from '../components/resume/Messages';
import DocumentViewer from '../components/resume/DocumentViewer'

import resume1 from '../resume_templates/template1/index.json'

const Resume = () => {
    const [text, setText] = useState("")
    const [messages, setMessages] = useState([])
    const [jsonData, setJsonData] = useState({
        "candidateName": "",
        "candidateEmail": "",
        "jobTitle": "",
        "personalStatement": "",
        "experienceBlurb": []
    })
    const [displayHTML, setDisplayHTML] = useState(resume1.body)
    const [resumeShown, toggleResume] = useState(true)
    const [keyboardScroll, setKeyboardScroll] = useState(false)
    const navigation = useNavigation();

    const style = useAnimatedStyle(() => {
        return {
            "flex": withTiming(resumeShown ? "1" : "0", {
                duration: 500,
                easing: Easing.bezier(0.5, 0.01, 0, 1),
            }),
        };
    });

    const parser = new DOMParser.DOMParser();
    const serializer = new DOMParser.XMLSerializer()

    async function exportPDF() {
        const { uri } = await Print.printToFileAsync({ html: displayHTML });
        await FileSystem.moveAsync({
            from: uri,
            to: FileSystem.documentDirectory + "My_Resume.pdf"
        })
        await Sharing.shareAsync(FileSystem.documentDirectory + "My_Resume.pdf", { UTI: '.pdf', mimeType: 'application/pdf' });
    }

    useEffect(() => {
        socket.disconnect()
        socket.connect()
        socket.on("connect", () => {
            socket.emit("resume_user");
            socket.on("message", (msgId, msg) => {
                const obj = {};
                obj.id = msgId;
                obj.role = "assistant";
                obj.text = msg;
                obj.json = "";
                setMessages((messages) => {
                    var lastElem = messages[messages.length - 1]
                    if (lastElem.role == "assistant") {
                        if (msg == '[' || lastElem.json.length > 0) {
                            lastElem.text = lastElem.text.trim()
                            lastElem.json += msg;
                        }
                        else lastElem.text += msg;
                        return [...messages.slice(0, messages.length - 1), lastElem]
                    }
                    return [...messages, obj]
                })
            })
            socket.on("message_end", (msgId) => {
                setMessages((messages) => {
                    var lastElem = messages[messages.length - 1]
                    var json = lastElem.json.replace("[break]", "")
                    try {
                        setJsonData(JSON.parse(json));
                    } catch (e) {

                    }
                    return messages
                })
            })
        })
    }, [])

    const updateTemplate = (doc, key, value) => {
        [...doc.querySelect(`span[name="${key}"]`)].forEach((node) => {
            if (value != "") node.textContent = value;
        })
    }

    const changeTemplate = () => {

    }

    useEffect(() => {
        const doc = parser.parseFromString(displayHTML, 'text/html')
        Object.keys(jsonData).forEach((x) => {
            updateTemplate(doc, x, jsonData[x])
        })
        const displayText = serializer.serializeToString(doc)
        setDisplayHTML(displayText)
    }, [jsonData])

    const sendMessage = () => {
        socket.emit("message", text)
        const obj = {};
        obj.role = "user";
        obj.text = text;
        setMessages((messages) => [...messages, obj])
        setText("")
    }

    return (
        <>
            <KeyboardAvoidingView behavior="padding" style={{ "flex": 1 }}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <SafeAreaView className="relative justify-end">
                        <View className="flex-col w-full h-[625px]">
                            <Animated.View style={[{ "flex": "1" }, style]}>
                                <DocumentViewer body={displayHTML} />
                            </Animated.View>
                            <View className="flex-1 bg-slate-100">
                                <ResumeMessages messages={messages} />
                            </View>
                        </View>
                        <View className="flex-row w-full h-20 justify-center">
                            <TextInput
                                placeholder="Send message"
                                className="bg-white p-5 flex-1 h-full"
                                onChangeText={setText}
                                value={text}
                            />
                            <TouchableOpacity
                                className="w-24 h-full bg-red-400 justify-center items-center"
                                onPress={sendMessage}
                            ><Text>Send</Text></TouchableOpacity>
                        </View>
                    </SafeAreaView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
            <SafeAreaView className="flex-row justify-start p-2">
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4"
                >
                    <ArrowLeftIcon size="20" color="black" />
                </TouchableOpacity>
                <View className="ml-auto mr-4">
                    <View className="flex flex-row gap-3">
                        <TouchableOpacity
                            onPress={changeTemplate}
                            className="bg-cyan-400 p-2 rounded-3xl"
                        >
                            <MagnifyingGlassIcon size="20" color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={exportPDF}
                            className="bg-pink-400 p-2 rounded-3xl"
                        >
                            <ArrowDownTrayIcon size="20" color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => { toggleResume(!resumeShown) }}
                            className="bg-black p-2 rounded-3xl"
                        >
                            {resumeShown ? <EyeSlashIcon size="20" color="white" /> : <EyeIcon size="20" color="white" />}
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </>
    )
}

export default Resume