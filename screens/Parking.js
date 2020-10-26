import { StatusBar } from 'expo-status-bar';
import React, { useState, useCallback } from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import ListParking from '../components/ListParking';

import { MyContext } from '../navigators/Tab';

const Parking = () => {
	
	const { array, setArray } = React.useContext(MyContext);
	
	const deleteCar = (id) => {
		const newCarList = array.filter((car) => car.id !== id); 
		setArray(newCarList);
	}

	const renderItem = ({ item }) => {
		return(
			<ListParking 
				car = { item }
				onPress = {() => {
						deleteCar(item.id);
					}
				}
				ticketInfo = {() => {
						navigation.navigate('TicketInfo', { item });
					}
				}
			/>
		);
	}

	return (
		<View style = {styles.estacionamiento}>
			<StatusBar style = "auto" />
			<Text style = {styles.textEstacionamiento}>
				ESTACIONAMIENTO
			</Text>
			<FlatList
				data = {array}
				keyExtractor = {car => car.id}
				renderItem = {renderItem}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
    estacionamiento: {
      marginTop: 30,
      flex: 1, 
      justifyContent: 'flex-start', 
      alignItems: 'stretch',
      backgroundColor: '#E5E5E5'
    },
    textEstacionamiento: {
      fontSize: 30,
      fontWeight: 'bold',
      textAlign: 'left',
      paddingHorizontal: 30,
      paddingVertical: 30,
    },
    btnEntrada: {
        backgroundColor: 'black',
        paddingVertical: 10,
        marginBottom: 35,
        marginHorizontal: 40,
        borderRadius: 15,
    },
      textBtnEntrada: {
        textAlign: 'center',
        color: 'white'
    }, 
});

export default Parking;
