import {StyleSheet} from "react-native";

export function container() {
    const style =  StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
        },
    });

    return style.container;
}

export function cardStyles() {
    return StyleSheet.create({
        card_container: {
            margin: 20,
        },
        card_title: {
            textAlign: "center",
        },
        card_content: {
            marginTop: 10,
        },
        card_content_description: {
            textAlign: "justify",
            marginTop: 10,
            marginBottom: 10,
        },
    });
}

export function todayListStyles() {
    return StyleSheet.create({
        itemWrapperStyle: {
            flexDirection: "row",
            paddingHorizontal: 16,
            paddingVertical: 16,
            borderBottomWidth: 1,
            backgroundColor: "white",
            borderColor: "#ddd",
        },
        itemImageStyle: {
            width: 50,
            height: 50,
            marginRight: 16,
        },
        contentWrapperStyle: {
            justifyContent: 'space-around',
            maxWidth: 250,
        },
        txtNameStyle: {
            fontSize: 16,
        },
        dateStyle: {
            color: '#777',
        },
    });
}

export function loaderStyle() {
    const style = StyleSheet.create({
        loaderStyle: {
            marginVertical: 16,
            alignItems: "center",
        },
    });

    return style.loaderStyle;
}