import {View, Text, StyleSheet} from "react-native";

const TodayList = () => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
        },
    });

    return(
        <View style={styles.container}>
            <Text>Our list of today picture!</Text>
        </View>
    )
};

export default TodayList;