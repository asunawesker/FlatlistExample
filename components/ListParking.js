import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ListParking = ({ car, onPress}) => {

    return(
        <TouchableOpacity style = {styles.car} onPress = {onPress}>
            <Ionicons 
              name= 'ios-timer'
              size = {34}   
              color = {'#DD2D2D'}
            />
            <View>
                <Text style = {styles.tipoCarro}>{car.type}</Text>
            </View>

            <View>
                <Text style = {styles.label}>Modelo: </Text>
                <Text style = {styles.texto}>{car.color}</Text>
            </View>
            
            <View>
                <Text style = {styles.label}>Entrada: </Text>
                <Text style = {styles.texto}>{String(car.issuedDate)}</Text>
            </View>           
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    car: {
        backgroundColor: '#fff',
        borderBottomColor: '#e1e1e1',
        paddingVertical: 20,
        paddingHorizontal: 15,
        marginHorizontal: 30,
        marginVertical: 10,
        borderRadius: 30,
    },
    tipoCarro: {
      marginTop: -36,
      fontWeight: 'bold',
      fontSize: 28,
      paddingLeft: 40
    },  
    label: {
        fontWeight: "bold",
        fontSize: 18,
        marginTop: 4,
        paddingLeft: 40
    },
    texto: {
        fontSize: 15,
        paddingLeft: 40,
        marginTop: -24,
        marginLeft: 75,
    },
    salida: {
        marginTop: 15,
        height: 30,
        alignContent: 'center',
        justifyContent: 'center',
        borderBottomColor: '#eee',
        backgroundColor: '#fff',
        borderRadius: 30,
    },
    textSalida: {
        textAlign: 'center',
        fontSize: 18,
        color: 'black',
        fontWeight: 'bold',
    }
});
export default ListParking;
