import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Entry from '../screens/Entry';
import Parking from '../screens/Parking';
import AsyncStorage from '@react-native-community/async-storage';
import { set } from 'react-native-reanimated';

const Tab = createBottomTabNavigator();

export const MyContext = React.createContext();

const TabNav = () => {

    const [array, setArray] = React.useState([]);

    const saveCarLocal = async (car) => {
        try {            
            await AsyncStorage.setItem('carList', car);
            console.log('guardando');
        } catch (error) {
            console.log(error);
		}
    }
    
    const saveCar = async (car) => {     
        const newCar = [...array, car];
        setArray(newCar); 
        saveCarLocal(JSON.stringify(newCar)); 
    }  
    
    const deleteCar = (id) => {
		const newCarList = array.filter((car) => car.id !== id); 
        setArray(newCarList);
        saveCarLocal(JSON.stringify(newCarList));    
    }

    return(
        <NavigationContainer>
            <MyContext.Provider value = {{array, setArray, saveCar, deleteCar }}>
                <Tab.Navigator initialRouteName = 'Entrada'>
                    <Tab.Screen name="Entrada" component={Entry} />
                    <Tab.Screen name="Parking" component={Parking} />
                </Tab.Navigator>
            </MyContext.Provider>
            
        </NavigationContainer>
    );
}

export default TabNav;