import {View} from "react-native";
import {useEffect, useState} from "react";

import * as nasaService from "../api/services/nasaService";
import {container} from "../styles";
import CardItem from "../components/CardItem";

const PictureDetails = ({route, navigation}) => {
    // Extract the pictureDate from the route params
    const {pictureDate} = route.params;

    // State to store the fetched picture data
    let [picture, setPicture] = useState({});

    useEffect(() => {
        const params = {
            api_key: process.env.EXPO_PUBLIC_API_KEY,
            date: pictureDate
        }

        nasaService.getPictureByDate(params).then(data => {
            setPicture(data);
            navigation.setOptions({title: data.title});
        });
    }, [pictureDate])

    // If the picture data is not available yet, return null (to show a loading screen)
    if (Object.keys(picture).length === 0) {
        return null;
    }

    return (
        <View style={container()}>
            <CardItem picture={picture} />
        </View>
    );
}

export default PictureDetails;