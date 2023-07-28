import {useEffect, useState} from "react";
import {Card, Text} from "react-native-paper";
import {View} from "react-native";

import {homeStyles} from "../styles";
import * as nasaService from "../api/services/nasaService";

const Home = () => {
    // Define the styles of the card
    const styles = homeStyles();

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
        <View style={styles.container}>
            <Card style={styles.card_container}>
                <Card.Title title={todayPicture.date} titleStyle={styles.card_title}/>
                <Card.Cover source={{ uri: todayPicture.url }} />
                <Card.Content style={styles.card_content}>
                    <Text variant="titleMedium">{todayPicture.title}</Text>
                    <Text variant="bodySmall" numberOfLines={10} style={styles.card_content_description}>{todayPicture.explanation}</Text>
                </Card.Content>
            </Card>
        </View>
    )
};

export default Home;