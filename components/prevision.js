import React from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import moment from 'moment';
import 'moment/locale/fr';

const Prevision = (props) => {
    moment.locale('fr');
    return (
        <FlatList 
        data={props.data} 
        renderItem={({item}) => 
          <View style={styles.itemHour}>
            <View style={styles.itemHour.container}>
              <Text style={styles.itemHour.container.date}>{moment.unix(item.dt).format('dddd D MMMM')}</Text>
              <Text style={styles.itemHour.container.hour}>{moment.unix(item.dt).format('HH[h]mm')}</Text>
              <Text style={styles.prevision.text}>{props.data.main ? props.data.main.temp : 'Pas de température'}°C</Text>
            </View>
            <View style={styles.container}>
              <Image style={styles.tinyLogo} source={{uri : `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}}></Image>
              <Text>{item.weather[0].description ? item.weather[0].description : 'Aucune desription'}</Text>
            </View>
          </View>
        }
        />
    )
}

const styles = StyleSheet.create({
    tinyLogo: {
        width: 50,
        height: 50,
        backgroundColor: '#009FFD',
        padding: 2,
        borderRadius: 10,
        alignSelf: 'center',
      },
      prevision: {
        backgroundColor: '#F1F1F1',
        padding: 10,
        borderRadius: 10,
        borderColor: '#000000',
        border: 10,
        textAlign: 'center',
      },
      itemHour: {
        padding: 10,
        backgroundColor: '#F1F1F1',
        borderRadius: 10,
        marginVertical: 5,
        justifyContent: 'space-between',
        textAlign: 'center',
        container : {
            flexDirection: 'column',
            textAlign: 'center',
            date: {
                fontSize: 13, 
                fontWeight: '500', 
                fontStyle: 'italic',
                textAlign: 'center'
            },
            hour: {
                fontSize: 20, 
                fontWeight: 'bold',
                textAlign: 'center'
            }

        }
      }
})

export default Prevision;