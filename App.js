import {PaperProvider} from 'react-native-paper';
import {StatusBar} from "expo-status-bar";

import BottomTabBar from './src/navigation/BottomTabBar';

const App = () => (
    // Wrap the entire app with PaperProvider to enable the use of react-native-paper components
    <PaperProvider>
        <StatusBar style="auto"/>
        <BottomTabBar />
    </PaperProvider>
);

export default App;
