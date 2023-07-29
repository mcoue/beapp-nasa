import {Card} from "react-native-paper";
import {forwardRef} from "react";
import ViewShot from "react-native-view-shot";
import {Text} from "react-native";

import {cardStyles} from "../styles";

const CardItem = forwardRef(({picture}, ref) => {
    // Define the styles for the card
    const styles = cardStyles();

    return (
        <Card style={styles.card_container}>
            <Card.Title title={picture.date} titleStyle={styles.card_title}/>
            <ViewShot ref={ref}>
                <Card.Cover source={{ uri: picture.url }} />
            </ViewShot>
            <Card.Content style={styles.card_content}>
                <Text variant="titleMedium">{picture.title}</Text>
                <Text variant="bodySmall" numberOfLines={10} style={styles.card_content_description}>{picture.explanation}</Text>
            </Card.Content>
        </Card>
    )
});

export default CardItem;