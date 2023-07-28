import {FlatList, Image, View, Text, ActivityIndicator, StyleSheet} from "react-native";
import {useEffect, useState} from "react";

import * as nasaService from "../api/services/nasaService";
import * as DateUtils from "../utils/DateUtils";

const TodayList = () => {
    let [currentDate, setCurrentDate] = useState(new Date());
    let [lastPictures, setLastPictures] = useState([]);

    useEffect(() => {
        const startDate = new Date(currentDate);
        startDate.setDate(-1);

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

    const renderItem = ({ item }) => (
        <View style={styles.itemWrapperStyle}>
            <Image style={styles.itemImageStyle} source={{uri: item.url }} />
            <View style={styles.contentWrapperStyle}>
                <Text style={styles.txtNameStyle}>{item.title}</Text>
                <Text style={styles.dateStyle}>{item.date}</Text>
            </View>
        </View>
    )

    const renderLoader = () => (
        <View style={styles.loaderStyle}>
            <ActivityIndicator size="small" color="#aaa" />
        </View>
    );

    const loadMoreItem = () => {
        const newDate = new Date(currentDate);
        newDate.setMonth(newDate.getMonth() -1);
        newDate.setDate(newDate.getDate() - 1);
        setCurrentDate(newDate);
    };

    if (lastPictures.length === 0) {
        return renderLoader();
    }

    return(
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

const styles = StyleSheet.create({
    itemWrapperStyle: {
        flexDirection: "row",
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderBottomWidth: 1,
        backgroundColor: "white",
        borderColor: "#ddd",
    },
    itemImageStyle: {
        width: 50,
        height: 50,
        marginRight: 16,
    },
    contentWrapperStyle: {
        justifyContent: 'space-around',
        maxWidth: 250
    },
    txtNameStyle: {
        fontSize: 16
    },
    dateStyle: {
        color: '#777'
    },
    loaderStyle: {
        marginVertical: 16,
        alignItems: "center"
    }
});

export default TodayList;