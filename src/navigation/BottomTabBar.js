import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {NavigationContainer} from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import Home from "../pages/Home";
import TodayList from "../pages/TodayList";
import TabBar from "./components/TabBar";

const BottomTabBar = () => {
    // Create a bottom tab navigator instance
    const Tab = createBottomTabNavigator();

    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName='Home'
                screenOptions={() => ({
                    headerShown: false,
                })}
                tabBar={TabBar}
            >
                <Tab.Screen
                    name="Home"
                    component={Home}
                    options={{
                        tabBarLabel: 'Home',
                        tabBarIcon: ({color, size}) => {
                            return <Icon name="home" size={size} color={color}/>;
                        },
                    }}
                />
                <Tab.Screen
                    name="TodayList"
                    component={TodayList}
                    options={{
                        tabBarLabel: 'Today list',
                        tabBarIcon: ({color, size}) => {
                            return <Icon name="view-list" size={size} color={color}/>;
                        },
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
};

export default BottomTabBar;