import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { ScrollView, TextInput, Alert } from 'react-native-gesture-handler';
import shortid from 'shortid';
import AsyncStorage from '@react-native-community/async-storage';

import useForm from '../hooks/useForm';

const Entry =  ({ navigation }) => {	

	const [selectedAutomobile, setSelectedAutomobile] = useState();
	const [selectedService, setSelectedService] = useState();

    const initialState = {
        issuedDate: '',
		type: '',
		color: '',
	}
	
	const entryVehicleLocal = async ({values}) => {
        const token = await AsyncStorage.getItem("accessToken");

		const currentDay = new Date();
		const date = String(currentDay);
		const dateSlice = date.slice(4, -15);
        const issuedDate = String(dateSlice);
		values.issuedDate = issuedDate;
		
		// entryVehicle({values, token});
		
		const id = shortid.generate();

        const valuesLocal = {
			id: id,
			issuedDate: issuedDate,
			type: values.type,
        }

		saveCar(JSON.stringify(valuesLocal));
		
	}

	const saveCar = async (carJSON) => {
        try {
			await AsyncStorage.setItem('car', carJSON);
			console.log('Logrado');
        } catch (error) {
            console.log(error);
        }
	}
	
	const onSubmit = async (values) => {
		try {
			entryVehicleLocal({values});
		} catch (e) {
			console.log(e);
		}
	}

	const { subscribe, inputs, handleSubmit } = useForm(initialState, onSubmit);

	return (
	<View style = {styles.entrada}>
		
		<Text style = {styles.textEntrada}>ENTRADA</Text>

		<StatusBar style="auto" />

		<ScrollView>

            <View style = {styles.viewDatos}>
                <Text style = {styles.label}>Tipo</Text>
                <TextInput 
                    placeholder  = 'Ingresa el tipo de automóvil'
                    style 		 = {styles.input}
                    value 		 = {inputs.type}
                    onChangeText = {subscribe('type')}
                />
            </View>

            <View style = {styles.viewDatos}>
                <Text style = {styles.label}>Color</Text>
                <TextInput 
                    placeholder  = 'Ingresa el color'
                    style 	 	 = {styles.input}
                    value 		 = {inputs.color}
                    onChangeText = {subscribe('color')}
                />
            </View>

            <View>
                <TouchableOpacity 
                    style   = {styles.btnEntrada} 
                    onPress = {() => {handleSubmit()}}
                >
                    <Text style = {styles.textBtnEntrada}>ENTRADA</Text>
                </TouchableOpacity> 
            </View>

		</ScrollView>

	</View>
    );
}

const styles = StyleSheet.create({
  entrada: {
    marginTop: 30,
    flex: 1, 
    justifyContent: 'flex-start', 
    alignItems: 'stretch',
    backgroundColor: '#E5E5E5'
  },
  textEntrada: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'left',
    paddingHorizontal: 30,
    paddingVertical: 30,
  },
  	viewDatos: {
		backgroundColor: '#fff',
		marginHorizontal: 25,
		paddingVertical: 20,
		paddingHorizontal: 20,
		borderRadius: 20,
		marginBottom: 20,
	},  
	label: {
		fontWeight: 'bold',
		fontSize: 25,
	},
	input: {
		fontSize: 18
	},
	textBtnFechaHora: {
		textAlign: 'center',
		color: 'black',
		fontSize: 18,
		fontWeight: '600',
		marginTop: 15
	},
	textFecha: {
		textAlign: 'center',
		fontSize: 18,
		marginTop: 10
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

export default Entry;