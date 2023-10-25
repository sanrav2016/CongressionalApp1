import React, { useRef } from 'react'
import { View, Text, ScrollView } from 'react-native';

const Messages = ({ messages }) => {
  const scrollViewRef = useRef();

  return messages.length > 0 ?
    <>
      <ScrollView
        contentContainerStyle={{ justifyContent: "flex-end" }}
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}>
        <View className="flex flex-col gap-2 p-2">
          {
            messages.map((x) => {
              const color_str = (x.role == "user") ? 'bg-slate-200' : 'bg-emerald-300'
              const border_str = (x.role == "user") ? 'rounded-br-none' : 'rounded-bl-none'
              const align_str = (x.role == 'user') ? 'justify-end right-0' : 'justify-start left-0'
              return <View className={`flex flex-row ${align_str}`}><View className={`p-5 ${color_str} rounded-xl ${border_str} max-w-72 left-0`}><Text>{x.text}</Text></View></View>
            })
          }
        </View>
      </ScrollView>
    </>
    :
    <View className="flex flex-1 flex-row w-full h-full justify-center items-center p-8">
      <View>
        <Text className="tracking-tighter text-center text-slate-400 font-bold text-4xl">Create your resume with AI.</Text>
        <Text className="tracking-tight text-center text-slate-400 text-xl">Get started by saying hello.</Text>
      </View>
    </View>
}

export default Messages