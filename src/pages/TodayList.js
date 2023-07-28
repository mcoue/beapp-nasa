import {FlatList, Image, View, Text, ActivityIndicator} from "react-native";
import {useEffect, useState} from "react";

import {todayListStyles} from "../styles";
import * as nasaService from "../api/services/nasaService";
import * as DateUtils from "../utils/DateUtils";


const TodayList = () => {
    // Define the styles of the list
    const styles= todayListStyles();

    // State to store the current date and the list of fetched pictures.
    let [currentDate, setCurrentDate] = useState(new Date());
    let [lastPictures, setLastPictures] = useState([]);

    // useEffect to fetch pictures of the last month when the component mounts or when currentDate changes.
    useEffect(() => {
        // Create a new Date object based on currentDate to avoid modifying the original date.
        const startDate = new Date(currentDate);
        // Calculate the start date by subtracting one month from the current date.
        startDate.setMonth(startDate.getMonth() -1);

        const params = {
            api_key: process.env.EXPO_PUBLIC_API_KEY,
            start_date: DateUtils.transformDate(startDate),
            end_date: DateUtils.transformDate(currentDate),
        }

        nasaService.getLastPictures(params).then(data => {
            const sortList = data.sort((a, b) => {
                return new Date(b.date) - new Date(a.date);
            });
            setLastPictures([...lastPictures, ...sortList]);
        }).catch(err => console.log(err));
    }, [currentDate]);

    // Function to render each item in the FlatList.
    const renderItem = ({ item }) => (
        <View style={styles.itemWrapperStyle}>
            <Image style={styles.itemImageStyle} source={{uri: item.url }} />
            <View style={styles.contentWrapperStyle}>
                <Text style={styles.txtNameStyle}>{item.title}</Text>
                <Text style={styles.dateStyle}>{item.date}</Text>
            </View>
        </View>
    )

    // Function to render the loading indicator at the end of the list.
    const renderLoader = () => (
        <View style={styles.loaderStyle}>
            <ActivityIndicator size="small" color="#aaa" />
        </View>
    );

    // Function to load more pictures by updating the currentDate state to the last month.
    const loadMoreItem = () => {
        setCurrentDate(DateUtils.getLastMonth(currentDate));
    };

    // If the lastPictures array is empty, show the loading indicator.
    if (lastPictures.length === 0) {
        return renderLoader();
    }

    // If lastPictures data is available, render the component with the fetched pictures in a FlatList.
    return (
        <FlatList
            data={lastPictures}
            renderItem={renderItem}
            keyExtractor={item => item.date}
            ListFooterComponent={renderLoader}
            onEndReached={loadMoreItem}
            onEndReachedThreshold={0}
        />
    )
};

export default TodayList;