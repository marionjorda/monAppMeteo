import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';


const Today = (props) => {
    return (
        <View style={styles.today}>
            <Text style={styles.today.title}>Météo du jour :</Text>
            <Text style={styles.today.text}>{props.data.name} : {props.data.main ? props.data.main.temp : 'Pas de température'}°C</Text>
            <View style={styles.today.container}>
              <Image style={styles.today.image} source={{uri : `https://openweathermap.org/img/wn/${props.data.weather && props.data.weather[0] ? props.data.weather[0].icon : 'default_icon'}@2x.png`}}></Image>
              <Text style={styles.today.description}>{props.data.weather && props.data.weather[0] ? props.data.weather[0].description : 'Aucune description'}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    today: {
        backgroundColor: '#B1F1F1',
        padding: 10,
        borderRadius: 10,
        borderColor: '#000000',
        border: 10,
        title: {
          fontSize: 20,
          fontWeight: 'bold',
        },
        text: {
          fontSize: 15,
        },
        description: {
          fontSize: 13,
          fontStyle: 'italic',
          textAlign: 'center',
        },
        image: {
          width: 50,
          height: 50,
          backgroundColor: '#199F67',
          padding: 2,
          borderRadius: 10,
          alignSelf: 'center',
        },
        container : {
            margintTop: 10,
        }
      },
})


export default Today;