import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Entry from '../screens/Entry';
import Parking from '../screens/Parking';

const Tab = createBottomTabNavigator();

const TabNav = () => {
    return(
        <NavigationContainer>
            <Tab.Navigator initialRouteName = 'Entrada'>
                <Tab.Screen name="Entrada" component={Entry} />
                <Tab.Screen name="Parking" component={Parking} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default TabNav;