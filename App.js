import {PaperProvider} from 'react-native-paper';

import BottomTabBar from './src/navigation/BottomTabBar';
import {StatusBar} from "expo-status-bar";

const App = () => (
    // Wrap the entire app with PaperProvider to enable the use of react-native-paper components
    <PaperProvider>
        <StatusBar translucent={false} backgroundColor="white" />
        <BottomTabBar />
    </PaperProvider>
);

export default App;
