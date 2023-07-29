import {Card, Text} from "react-native-paper";

import {cardStyles} from "../styles";

const CardItem = ({picture}) => {
    // Define the styles for the card
    const styles = cardStyles();

    return (
        <Card style={styles.card_container}>
            <Card.Title title={picture.date} titleStyle={styles.card_title}/>
            <Card.Cover source={{ uri: picture.url }} />
            <Card.Content style={styles.card_content}>
                <Text variant="titleMedium">{picture.title}</Text>
                <Text variant="bodySmall" numberOfLines={10} style={styles.card_content_description}>{picture.explanation}</Text>
            </Card.Content>
        </Card>
    )
}

export default CardItem;