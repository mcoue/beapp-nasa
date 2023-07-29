import {Image, Text, TouchableOpacity, View} from "react-native";
import {todayListStyles} from "../styles";

const PictureItem = ({item, onItemClicked}) => {
    // Define the styles of the list
    const styles= todayListStyles();

    return (
        <TouchableOpacity
            style={styles.itemWrapperStyle}
            onPress={() => onItemClicked(item.date)}
        >
            <Image style={styles.itemImageStyle} source={{uri: item.url}}/>
            <View style={styles.contentWrapperStyle}>
                <Text style={styles.txtNameStyle}>{item.title}</Text>
                <Text style={styles.dateStyle}>{item.date}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default PictureItem;