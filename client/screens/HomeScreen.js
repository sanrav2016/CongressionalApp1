import { View, Text, TouchableOpacity, Image, TextInput, FlatList } from 'react-native'
import React from 'react'
import { SIZES } from '../constants';
import { SafeAreaView } from 'react-native-safe-area-context'
import { ArrowLeftIcon } from 'react-native-heroicons/solid'
import { useNavigation } from '@react-navigation/native'
import { icons, images } from '../constants';
import { ScrollView } from 'react-native-gesture-handler';
import styles from '../components/home/welcome/welcome.style';
import { useState } from 'react';
import Jobs from '../components/home/jobs/Jobs';

const jobTypes = ["Full-time", "Part-time", "Contractor"];

export default function HomeScreen() {
  const navigation = useNavigation();
  const [activeJobType, setActiveJobType] = useState("Full-time");
  const [searchQuery, setSearchQuery] = useState("");
  const [flipFlop, setFlipFlop] = useState(true);

  React.useEffect(() => setFlipFlop(!flipFlop), [activeJobType]);

  return (
    <>
      <SafeAreaView className="relative">
        <View className="flex-row justify-start">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4"
          >
            <ArrowLeftIcon size="20" color="black" />
          </TouchableOpacity>
        </View>
        <View style={{ marginLeft: 10, marginTop: -35, marginHorizontal: 80, marginLeft: 80 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('qa')}
            style={{
              paddingVertical: 12,
              paddingHorizontal: 0, // Adjust the horizontal padding to decrease the button's length
              backgroundColor: '#fca311',
              borderRadius: 18,
              alignItems: 'center', // Center the content horizontally
            }}
          >
            <Text style={{ textAlign: 'center', color: 'white' }}>Take your Profile Quiz Now!</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("NavScreen")}
          className="z-30"
        >
          <Image
            source={images.profile} // Assuming 'iconUrl' is the source of your image
            style={{ width: 50, height: 50, borderRadius: 10, marginLeft: 350, marginTop: -40 }}
          />
        </TouchableOpacity>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ marginRight: 15, marginLeft: 15, marginTop: 10 }}>
            <View style={styles.container}>
              <Text style={styles.userName}>Hello, Adrian!</Text>
              <Text style={styles.welcomeMessage}>Find your perfect job.</Text>
            </View>

            <View style={styles.searchContainer}>
              <View style={styles.searchWrapper}>
                <TextInput
                  style={styles.searchInput}
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  placeholder='What are you looking for?'
                />
              </View>

              <TouchableOpacity style={styles.searchBtn} onPress={() => setFlipFlop(!flipFlop)}>
                <Image
                  source={icons.search}
                  resizeMode='contain'
                  style={styles.searchBtnImage}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.tabsContainer}>
              <FlatList
                data={jobTypes}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.tab(activeJobType, item)}
                    onPress={() => {
                      setActiveJobType(item);
                    }}
                  >
                    <Text style={styles.tabText(activeJobType, item)}>{item}</Text>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item}
                contentContainerStyle={{ columnGap: SIZES.small }}
                horizontal
              />
            </View>
            <Jobs key={flipFlop} activeJobType={activeJobType} searchQuery={searchQuery} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  )
}