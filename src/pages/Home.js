import {View, Text, StyleSheet} from "react-native";

const Home = () => {
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
            <Text>Our home page!</Text>
        </View>
    )
};

export default Home;