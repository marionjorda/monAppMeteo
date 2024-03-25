import React from "react";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import * as Location from "expo-location";
import Today from "./components/today";
import Prevision from "./components/prevision";
import { API_KEY } from '@env';

export default function App() {
  const APIkey = API_KEY;
  const [location, setLocation] = React.useState();
  const [errorMsg, setErrorMsg] = React.useState();
  const [data, setData] = React.useState([]);
  const [prevision, setPrevision] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  const [reload, setReload] = React.useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);

      let worked = true;

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=${APIkey}&units=metric&lang=fr`
        );
        const data = await response.json();
        setData(data);
      } catch (error) {
        worked = false;
        console.error("Error with API :", error);
      }

      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=${APIkey}&units=metric&lang=fr`
        );
        const data = await response.json();
        setPrevision(data);
      } catch (error) {
        worked = false;
        console.error("Error with API :", error);
      }

      if (worked) {
        setLoading(false);
      }
    })();
  }, [reload]);

  const reloadData = () => {
    setReload(!reload);
  };

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = "Localisation détectée";
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.paragraph}>{text}</Text>
      </View>

      {isLoading ? (
        <View>
          <Text style={styles.loading}>Data is loading...</Text>
        </View>
      ) : (
        <View>
          <TouchableOpacity style={styles.button} onPress={reloadData}>
            <Text style={styles.button.text}>Reload</Text>
          </TouchableOpacity>
          <Today data={data} />
          <Prevision data={prevision.list} />
        </View>
      )}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 100,
    marginHorizontal: 50,
  },
  paragraph : {
    fontStyle: 'italic',
    fontSize: 15,
    color: "#111BBB",
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  button : {
    marginVertical: 10,
    backgroundColor: '#11FF8F',
    padding: 10,
    borderRadius: 10,
    width: 100,
    alignSelf: 'center',
    text: {
      fontSize: 20,
      fontWeight: 'bold',
      alignSelf: 'center',
    }
  },
  loading: {
    fontSize: 25, 
    fontWeight: 'bold'
  }
});
