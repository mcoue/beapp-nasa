import {CommonActions} from "@react-navigation/native";
import {BottomNavigation} from "react-native-paper";

// Custom TabBar component
const TabBar = (props) => {

    // Function to handle tab press events
    const handleTabPress = (route, preventDefault) => {
        // Emit a tabPress event
        const event = props.navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
        });

        // If the event is prevented, prevent the default action
        if (event.defaultPrevented) {
            preventDefault();
        } else {
            // Dispatch a navigation action to navigate to the selected tab
            props.navigation.dispatch({
                ...CommonActions.navigate(route.name, route.params),
                target: props.state.key,
            });
        }
    };

    // Function to render the tab icon
    const handleRenderIcon = (route, focused, color) => {
        const {options} = props.descriptors[route.key];
        // Check if the tab has a custom tabBarIcon, and if so, render it
        if (options.tabBarIcon) {
            return options.tabBarIcon({focused, color, size: 24});
        }

        // If no custom tabBarIcon is provided, return null
        return null;
    };

    // Function to get the text label for the tab
    const handleLabelText = (route) => {
        const {options} = props.descriptors[route.key];
        // Return the tabBarLabel if it's defined, otherwise return the title of the route
        return options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.title;
    };

    // Render the BottomNavigation.Bar with custom settings and callbacks
    return (
        <BottomNavigation.Bar
            navigationState={props.state}
            safeAreaInsets={props.insets}
            onTabPress={({route, preventDefault}) => handleTabPress(route, preventDefault)}
            renderIcon={({route, focused, color}) => handleRenderIcon(route, focused, color)}
            getLabelText={({route}) => handleLabelText(route)}
        />
    )
};

export default TabBar;