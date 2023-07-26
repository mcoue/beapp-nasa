import {CommonActions, NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BottomNavigation, PaperProvider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import TodayList from "./src/pages/TodayList";
import Home from "./src/pages/Home";
import {StatusBar} from "expo-status-bar";

const App = () => {
    const Tab = createBottomTabNavigator();

    return (
        <PaperProvider>
            <StatusBar style="auto"/>
            <NavigationContainer>
                <Tab.Navigator
                    initialRouteName='Home'
                    screenOptions={() => ({
                        headerShown: false,
                    })}
                    tabBar={({ navigation, state, descriptors, insets }) => (
                        <BottomNavigation.Bar
                            navigationState={state}
                            safeAreaInsets={insets}
                            onTabPress={({ route, preventDefault }) => {
                                const event = navigation.emit({
                                    type: 'tabPress',
                                    target: route.key,
                                    canPreventDefault: true,
                                });

                                if (event.defaultPrevented) {
                                    preventDefault();
                                } else {
                                    navigation.dispatch({
                                        ...CommonActions.navigate(route.name, route.params),
                                        target: state.key,
                                    });
                                }
                            }}
                            renderIcon={({ route, focused, color }) => {
                                const { options } = descriptors[route.key];
                                if (options.tabBarIcon) {
                                    return options.tabBarIcon({ focused, color, size: 24});
                                }

                                return null;
                            }}
                            getLabelText={({ route }) => {
                                const { options } = descriptors[route.key];
                                return options.tabBarLabel !== undefined ? options.tabBarLabel : options.title !== undefined ? options.title : route.title;
                            }}
                        />
                    )}
                >
                    <Tab.Screen
                        name="Home"
                        component={Home}
                        options={{
                            tabBarLabel: 'Home',
                            tabBarIcon: ({ color, size }) => {
                                return <Icon name="home" size={size} color={color} />;
                            },
                        }}
                    />
                    <Tab.Screen
                        name="TodayList"
                        component={TodayList}
                        options={{
                            tabBarLabel: 'Today list',
                            tabBarIcon: ({ color, size }) => {
                                return <Icon name="view-list" size={size} color={color} />;
                            },
                        }}
                    />
                </Tab.Navigator>
            </NavigationContainer>
        </PaperProvider>
    );
}

export default App;
