import { StatusBar } from 'expo-status-bar';
import React, { useState, useCallback } from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import ListParking from '../components/ListParking';

const Parking = () => {
	
	const [carList, setCarList] = useState([]);
	const [refreshing, setRefreshing] = useState(false);

	const wait = (timeout) => {
		return new Promise((resolve) => {
			setTimeout(resolve, timeout);
		});
	}

	const deleteCar = (id) => {
		const newCarList = carList.filter((car) => car.id !== id); 
		setCarList(newCarList);
	}

	const onRefresh = useCallback(() => {
		setRefreshing(true);

		wait(200).then(() => {
			setRefreshing(false);
			getStorage();
		})
    }, [refreshing]);

	const getStorage = async () => {
		const newCar = await AsyncStorage.getItem('car');
		const car = JSON.parse(newCar);
		console.log(car);
		setCarList([...carList,car]);
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
			{/* <View>
                <TouchableOpacity 
                    style   = {styles.btnEntrada} 
                    onPress = {() => {
							getStorage();
						}
					}
                >
                    <Text style = {styles.textBtnEntrada}>Obtener datos actualizados</Text>
                </TouchableOpacity> 
            </View> */}
			<FlatList
				data = {carList}
				keyExtractor = {car => car.id}
				renderItem = {renderItem}
				refreshControl = {
					<RefreshControl refreshing = {refreshing} onRefresh = {onRefresh}/>
				}
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
