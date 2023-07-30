import {useEffect, useState} from "react";
import {View} from "react-native";

import CardItem from "../components/CardItem";
import * as nasaService from "../api/services/nasaService";
import * as Styles from "../styles";

const Home = () => {
    // State to store the fetched todayPicture data
    let [todayPicture, setTodayPicture] = useState({});

    // Imported styles
    const styles = Styles.container();

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
        <View style={[styles.container, styles.gravity_center]}>
            <CardItem picture={todayPicture} />
        </View>
    )
};

export default Home;