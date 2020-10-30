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

    const localInfo = async () => {
		const value = await AsyncStorage.getItem('car');
		if (value !== null) {
			// We have data!!
			console.log(value);
		}
	}

    return(
        <NavigationContainer>
            <MyContext.Provider value = {{array, setArray, localInfo }}>
                <Tab.Navigator initialRouteName = 'Entrada'>
                    <Tab.Screen name="Entrada" component={Entry} />
                    <Tab.Screen name="Parking" component={Parking} />
                </Tab.Navigator>
            </MyContext.Provider>
            
        </NavigationContainer>
    );
}

export default TabNav;