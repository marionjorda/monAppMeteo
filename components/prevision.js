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
              <Image style={styles.logo} source={{uri : `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}}></Image>
              <Text style={styles.description}>{item.weather[0].description ? item.weather[0].description : 'Aucune desription'}</Text>
            </View>
          </View>
        }
        />
    )
}

const styles = StyleSheet.create({
    container: {
        width: 130,
      },
    logo: {
        width: 50,
        height: 50,
        backgroundColor: '#009FFD',
        padding: 2,
        borderRadius: 10,
        alignSelf: 'center',
      },
      description: {
        color: '#232528',
        alignSelf: 'center',
        padding: 5,
        textAlign: 'center',
        textTransform: 'capitalize',
      },
      prevision: {
        backgroundColor: '#8C8CDC',
        padding: 10,
        borderRadius: 10,
        borderColor: '#000000',
        border: 10,
        textAlign: 'center',
        text: {
          fontSize: 15,
          textAlign: 'center',
        },
      },
      itemHour: {
        width: 300,
        padding: 15,
        backgroundColor: '#EAF6FF',
        borderRadius: 10,
        marginVertical: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        container : {
            flexDirection: 'column',
            date: {
                fontSize: 20, 
                fontWeight: 'bold',
                textTransform: 'capitalize',
            },
            hour: {
                fontSize: 15, 
                fontStyle: 'italic',
            }

        }
      }
})

export default Prevision;