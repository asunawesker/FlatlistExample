import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity  } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import ListParking from '../components/ListParking';

const Parking = () => {
	
	const [carList, setCarList] = useState([]);
	const [carValues, setCarValues] = useState();

	const deleteCar = (id) => {
		const newCarList = carList.filter((car) => car.id !== id); 
		setCarList(newCarList);
	}

	const getStorage = async () => {
		const newCar = await AsyncStorage.getItem('car');
		const car = JSON.parse(newCar);
		console.log(car);
		setCarList([...carList,car]);
	}

	const localStorage = async () => {
		const newLocalList = await AsyncStorage.getItem('car');
		const car = JSON.parse(newLocalList);
		setCarListLocal([...carListLocal,car]);
		console.log('Local storage '+carListLocal);
	}

	const saveExitData = async ({ item }) => {
		const currentDay = new Date();
		const date = String(currentDay);
		const dateSlice = date.slice(4, -15);
		const exitDate = String(dateSlice);

		const values = {
			issuedDate: item.issuedDate,
			exitDate: exitDate,
			type: item.type,
			color: item.color,
			plates: item.plates,
			automobile: item.automobile,
        	service: item.service,
		};
		
		sendDataExit({values});
	}

	const sendDataExit = async ({values}) => {
		const exitCar = JSON.stringify(values);
		
		try {
			await AsyncStorage.setItem('exitCar', exitCar);
			navigation.navigate('ExitTicket', { values	});
		} catch (e) {
			console.log(e);
		}
	}

	const renderItem = ({ item }) => {
		return(
			<ListParking 
				car = { item }
				onPress = {() => {
						saveExitData({ item });
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
			<View>
                <TouchableOpacity 
                    style   = {styles.btnEntrada} 
                    onPress = {() => {
							getStorage();
						}
					}
                >
                    <Text style = {styles.textBtnEntrada}>Obtener datos actualizados</Text>
                </TouchableOpacity> 
            </View>
			<FlatList
				data = {carList}
				keyExtractor = {car => car.id}
				renderItem = {renderItem}
				style = {styles.flat}
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
