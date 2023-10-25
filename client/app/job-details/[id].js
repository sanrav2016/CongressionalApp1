import { useNavigation, useRoute } from '@react-navigation/native'; // Import useNavigation and useRoute
import React from 'react';
import { useCallback, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity
} from "react-native";
import {
  Company,
  JobAbout,
  JobFooter,
  JobTabs,
  ScreenHeaderBtn,
  Specifics,
} from "../../components";
import { COLORS, icons, SIZES } from "../../constants";
import { ArrowLeftIcon } from 'react-native-heroicons/solid'
import useFetch from '../../hook/useFetch';
import { WebView } from 'react-native-webview';

const JobDetails = () => {
  const navigation = useNavigation();
  const route = useRoute(); // Get the route object
  const { data, isLoading, error, refetch } = useFetch("job-details", {
    job_id: route.params?.id || null, // Retrieve query parameter from route
  });

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => { }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <View style={{ marginLeft: 15 }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4"
        >
          <ArrowLeftIcon size="20" color="black" />
        </TouchableOpacity>
      </View>
      <>
        <ScrollView showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          {isLoading ? (
            <ActivityIndicator size='large' color={COLORS.primary} />
          ) : error ? (
            <Text>Something went wrong</Text>
            , console.log(error)
          ) : data.length === 0 ? (
            <Text>No data available</Text>
          ) : (
            <>
            <View style={{ padding: SIZES.medium, paddingBottom: 30 }}>
              <Company
                companyLogo={data[0].employer_logo}
                jobTitle={data[0].job_title}
                companyName={data[0].employer_name}
                location={data[0].job_country}
              />
            </View>
            <WebView
              source={{ uri: data[0].job_google_link }}
              style={{ height: 500 }}
            />
            </>
          )}
        </ScrollView>
      </>
    </SafeAreaView>
  );
};

export default JobDetails;
