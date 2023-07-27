import {useEffect, useState} from "react";
import {Card, Text} from "react-native-paper";
import {StyleSheet, View} from "react-native";

import * as nasaService from "../api/services/nasaService";
import * as Styles from "../style";

// Define the styles of the card
const styles = StyleSheet.create({
    card_container: {
        margin: 20,
    },
    card_title: {
        textAlign: "center"
    },
    card_content: {
        marginTop: 10
    },
    card_content_description: {
        textAlign: "justify",
        marginTop: 10,
        marginBottom: 10
    }
})

const Home = () => {
    // State to store the fetched todayPicture data
    let [todayPicture, setTodayPicture] = useState({});

    // useEffect to fetch today's picture data when the component mounts
    useEffect(() => {
        nasaService.getTodayPicture().then(data => {
            setTodayPicture(data);
        }).catch(err => console.log(err));
    }, []);

    // If the todayPicture data is not available yet, return null (to show a loading screen)
    if (Object.keys(todayPicture).length === 0) {
        return null;
    }

    // If todayPicture data is available, render the component
    return (
        <View style={Styles.container()}>
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