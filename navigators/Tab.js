import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Entry from '../screens/Entry';
import Parking from '../screens/Parking';
import AsyncStorage from '@react-native-community/async-storage';

const Tab = createBottomTabNavigator();

export const MyContext = React.createContext();

const TabNav = () => {

    const [array, setArray] = React.useState([]);

    return(
        <NavigationContainer>
            <MyContext.Provider value = {{array, setArray}}>
                <Tab.Navigator initialRouteName = 'Entrada'>
                    <Tab.Screen name="Entrada" component={Entry} />
                    <Tab.Screen name="Parking" component={Parking} />
                </Tab.Navigator>
            </MyContext.Provider>
            
        </NavigationContainer>
    );
}

export default TabNav;