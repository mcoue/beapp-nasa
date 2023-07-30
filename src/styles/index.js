import {StyleSheet} from "react-native";

export function container() {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: 'white',
        },
        gravity_center: {
            alignItems: 'center',
            justifyContent: 'center'
        }
    });
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
            borderTopWidth: 1,
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

export function datePickerStyle() {
    const style = StyleSheet.create({
        datePickerStyle: {
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 20,
        },
    });

    return style.datePickerStyle;
}