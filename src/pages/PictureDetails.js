import {TouchableOpacity, View} from "react-native";
import { Button } from 'react-native-paper';
import {useEffect, useRef, useState} from "react";
import {captureRef} from "react-native-view-shot";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as Sharing from "expo-sharing";

import * as nasaService from "../api/services/nasaService";
import {container} from "../styles";
import CardItem from "../components/CardItem";

const PictureDetails = ({route, navigation}) => {
    // Extract the pictureDate from the route params
    const {pictureDate} = route.params;
    // Create a ref to capture the CardItem component
    const cardItemRef = useRef();

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

    // Function to handle the share button press
    const handleShare = async () => {
        try {
            const uri = await captureRef(cardItemRef, {
                format: 'png',
                quality: 0.8,
            });

            await Sharing.shareAsync(uri)
        } catch (error) {
            console.log("Error while capturing image:", error);
        }
    };

    // If the picture data is not available yet, return null (to show a loading screen)
    if (Object.keys(picture).length === 0) {
        return null;
    }

    return (
        <View style={container()}>
            <CardItem picture={picture} ref={cardItemRef}/>
            <TouchableOpacity onPress={handleShare}>
                <Button mode="contained"><Icon name="share" size={17}/> Share Photo</Button>
            </TouchableOpacity>
        </View>
    );
}

export default PictureDetails;