import {FlatList, View, ActivityIndicator} from "react-native";
import {useEffect, useState} from "react";

import * as nasaService from "../api/services/nasaService";
import * as DateUtils from "../utils/DateUtils";
import * as Styles from "../styles";
import PictureItem from "../components/PictureItem";
import DatePicker from "../components/DatePicker";


const TodayList = ({navigation}) => {
    // State to store the current date and the list of fetched pictures.
    let [currentDate, setCurrentDate] = useState(new Date());
    let [lastPictures, setLastPictures] = useState([]);
    // Picture fetch from the search
    let [searchPicture, setSearchPicture] = useState(null);

    // Imported styles
    const loaderStyle = Styles.loaderStyle();
    const containerStyle = Styles.container();

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

    // Function to render the loading indicator at the end of the list.
    const renderLoader = () => {
        if (!searchPicture) {
            return (
                <View style={loaderStyle}>
                    <ActivityIndicator size="small" color="#aaa"/>
                </View>
            );
        } else {
            return null;
        }
    };

    // Function to load more pictures by updating the currentDate state to the last month.
    const loadMoreItem = () => {
        if (searchPicture) {
            setCurrentDate(DateUtils.getLastMonth(currentDate));
        }
    };

    // Function to handle item click and navigate to the PictureDetails screen with the selected picture's date.
    const handleItemClicked = (pictureDate) => {
        navigation.navigate('PictureDetails', {pictureDate: pictureDate});
    };

    // Function to handle the search for the picture based on the selected date.
    const handleSearchPicture = (date) => {
        const params = {
            api_key: process.env.EXPO_PUBLIC_API_KEY,
            date: DateUtils.transformDate(date)
        }

        nasaService.getPictureByDate(params).then(data => {
            setSearchPicture(data);
        });
    };

    // Function to handle clearing the search and reset to the original list of pictures.
    const handleCleanSearch = () => {
        setSearchPicture(null);
    }

    // If the lastPictures array is empty, show the loading indicator.
    if (lastPictures.length === 0) {
        return renderLoader();
    }

    // If lastPictures data is available, render the component with the fetched pictures in a FlatList.
    return (
        <View style={containerStyle.container}>
            <DatePicker
                handleSearchPicture={handleSearchPicture}
                handleCleanSearch={handleCleanSearch}
                searchPicture={searchPicture}
            />
            <FlatList
                data={searchPicture ? [searchPicture] : lastPictures}
                renderItem={({item}) => (
                    <PictureItem item={item} onItemClicked={handleItemClicked} />
                )}
                keyExtractor={item => item.date}
                ListFooterComponent={renderLoader}
                onEndReached={loadMoreItem}
                onEndReachedThreshold={0}
            />
        </View>
    )
};

export default TodayList;