import {FlatList, View, ActivityIndicator, StyleSheet} from "react-native";
import {Button} from "react-native-paper";
import {useEffect, useState} from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import DateTimePicker from "@react-native-community/datetimepicker"

import * as nasaService from "../api/services/nasaService";
import * as DateUtils from "../utils/DateUtils";
import {loaderStyle} from "../styles";
import PictureItem from "../components/PictureItem";


const TodayList = ({navigation}) => {
    // State to store the current date and the list of fetched pictures.
    let [currentDate, setCurrentDate] = useState(new Date());
    let [lastPictures, setLastPictures] = useState([]);
    let [filteredPictures, setFilteredPictures] = useState([]);

    let [datePicker, setDatePicker] = useState(new Date());
    let [showPicker, setShowPicker] = useState(false);

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
        if (filteredPictures.length === 0) {
            return (
                <View style={loaderStyle()}>
                    <ActivityIndicator size="small" color="#aaa"/>
                </View>
            );
        } else {
            return null;
        }
    };

    // Function to load more pictures by updating the currentDate state to the last month.
    const loadMoreItem = () => {
        if (filteredPictures.length === 0) {
            setCurrentDate(DateUtils.getLastMonth(currentDate));
        }
    };

    // Function to handle item click and navigate to the PictureDetails screen with the selected picture's date.
    const handleItemClicked = (pictureDate) => {
        navigation.navigate('PictureDetails', {pictureDate: pictureDate});
    };

    const handleSearchPicture = (date) => {
        const params = {
            api_key: process.env.EXPO_PUBLIC_API_KEY,
            date: DateUtils.transformDate(date)
        }

        nasaService.getPictureByDate(params).then(data => {
            setFilteredPictures([data]);
        });
    }

    const onChangeDatePicker = ({ type }, selectedDate) => {
        if (type === "set") {
            setDatePicker(selectedDate);
            handleSearchPicture(selectedDate);
        }
        setShowPicker(false);
    };

    // If the lastPictures array is empty, show the loading indicator.
    if (lastPictures.length === 0) {
        return renderLoader();
    }

    // If lastPictures data is available, render the component with the fetched pictures in a FlatList.
    return (
        <View style={styles.wrapperBgColor}>
            <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center", marginVertical: 20 }}>
                <Button
                    mode="contained"
                    style={{marginEnd: 5}}
                    onPress={() => setShowPicker(true)}
                >Search picture</Button>
                <Button
                    mode="contained"
                    disabled={filteredPictures.length === 0}
                    style={{marginStart: 5}}
                    onPress={() => setFilteredPictures([])}
                ><Icon name="trash-can" size={17}/></Button>
            </View>
            {showPicker && (
                <DateTimePicker
                    mode="date"
                    display="spinner"
                    value={datePicker}
                    onChange={onChangeDatePicker}
                    maximumDate={new Date()}
                />
            )}
            <FlatList
                data={filteredPictures.length > 0 ? filteredPictures : lastPictures}
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

const styles = StyleSheet.create({
    wrapperBgColor: {
        backgroundColor: 'white',
        flex: 1,
    },
    searchButtonStyle: {
        marginVertical: 40,
        marginHorizontal: 20,
    },
});

export default TodayList;