import React from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native'
import { COLORS, SIZES } from '../../../constants';
import styles from '../../home/welcome/welcome.style';
import styles2 from "../../home/popular/popularjobs.style";
import styles3 from "../../home/popular/popularjobs.style";
import PopularJobCard from "../../common/cards/popular/PopularJobCard";
import NearbyJobCard from "../../common/cards/nearby/NearbyJobCard";
import useFetch from '../../../hook/useFetch';

const jobTypes = ["Full-time", "Part-time", "Contractor"];

const Jobs = ({ key, activeJobType, searchQuery }) => {
    const [selectedJob, setSelectedJob] = React.useState();
    const { data, isLoading, error } = useFetch('search', { query: searchQuery + " " + activeJobType, num_pages: 1 })

    return (
        <>
            <View style={[styles2.container, { marginRight: 15, marginLeft: 15, marginTop: 20 }]}>
                <View style={styles2.header}>
                    <Text style={styles2.headerTitle}>Popular jobs</Text>
                    <TouchableOpacity>
                        <Text style={styles2.headerBtn}>Show all</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles2.cardContainer}></View>
                <View style={[styles.cardsContainer, { marginTop: 10 }]}>
                    {isLoading ? (
                        <ActivityIndicator size='large' color={COLORS.primary} />
                    ) : error ? (
                        <Text>Something went wrong</Text>
                    ) : (
                        <FlatList
                            data={data}
                            renderItem={({ item }) => (
                                <PopularJobCard
                                    item={item}
                                    selectedJob={selectedJob}
                                />
                            )}
                            keyExtractor={(item) => item.job_id}
                            contentContainerStyle={{ columnGap: SIZES.medium }}
                            horizontal
                        />
                    )}
                </View>
            </View>
            <View style={[styles3.container, { marginRight: 15, marginLeft: 15, marginTop: 20 }]}>
                <View style={styles3.header}>
                    <Text style={styles3.headerTitle}>Nearby jobs</Text>
                    <TouchableOpacity>
                        <Text style={styles3.headerBtn}>Show all</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles3.cardsContainer}>
                    {isLoading ? (
                        <ActivityIndicator size='large' color={COLORS.primary} />
                    ) : error ? (
                        <Text>{JSON.stringify(error)}</Text>
                    ) : (
                        data?.map((job) => (
                            <NearbyJobCard
                                job={job}
                                key={`nearby-job-${job.job_id}`}
                            />
                        ))
                    )}
                </View>
            </View>
        </>
    )
}

export default Jobs