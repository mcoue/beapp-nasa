import {Text} from "react-native";
import {useEffect} from "react";

const PictureDetails = ({route, navigation}) => {
    const {id} = route.params;

    useEffect(() => {
        navigation.setOptions({title: id});
    }, [])

    return (
        <Text>{id}</Text>
    );
}

export default PictureDetails;