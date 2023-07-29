import {useEffect, useState} from "react";
import {View} from "react-native";

import {container} from "../styles";
import CardItem from "../components/CardItem";
import * as nasaService from "../api/services/nasaService";

const Home = () => {
    // State to store the fetched todayPicture data
    let [todayPicture, setTodayPicture] = useState({});

    // useEffect to fetch today's picture data when the component mounts
    useEffect(() => {
        const params = {
            api_key: process.env.EXPO_PUBLIC_API_KEY
        }

        nasaService.getTodayPicture(params).then(data => {
            setTodayPicture(data);
        }).catch(err => console.log(err));
    }, []);

    // If the todayPicture data is not available yet, return null (to show a loading screen)
    if (Object.keys(todayPicture).length === 0) {
        return null;
    }

    // If todayPicture data is available, render the component
    return (
        <View style={container()}>
            <CardItem picture={todayPicture} />
        </View>
    )
};

export default Home;