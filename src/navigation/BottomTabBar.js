import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {NavigationContainer} from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import Home from "../pages/Home";
import TodayList from "../pages/TodayList";
import PictureDetails from "../pages/PictureDetails";
import TabBar from "./components/TabBar";

const BottomTabBar = () => {
    // Create a bottom tab navigator instance
    const Tab = createBottomTabNavigator();

    // Create a stack navigator instance for TodayList and PictureDetails screens
    const TodayListStack = createNativeStackNavigator();
    function TodayListStackScreen() {
        return (
            <TodayListStack.Navigator>
                <TodayListStack.Screen name='Nasa pictures' component={TodayList} />
                <TodayListStack.Screen name='PictureDetails' component={PictureDetails} />
            </TodayListStack.Navigator>
        );
    }

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
                    name="TodayListStackScreen"
                    component={TodayListStackScreen}
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