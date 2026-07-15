import { Linking, StyleSheet, Text, View } from "react-native";

import { useEffect, useState } from "react";

import MapView, { Marker } from "react-native-maps";

import { collection, onSnapshot } from "firebase/firestore";

import { db } from "../../firebaseConfig";

export default function AlertsScreen() {
  const [alerts, setAlerts] = useState<any[]>([]);

  const navigateToUser = (latitude: number, longitude: number) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

    Linking.openURL(url);
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "sos_alerts"),

      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setAlerts(data);
      },
    );

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Live Emergency Alerts</Text>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 30.3165,
          longitude: 78.0322,

          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {alerts.map((alert) => (
          <Marker
            onPress={() => navigateToUser(alert.latitude, alert.longitude)}
            key={alert.id}
            coordinate={{
              latitude: alert.latitude,
              longitude: alert.longitude,
            }}
            title="Emergency SOS"
            description="User needs help"
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050816",
  },

  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",

    marginTop: 60,

    marginLeft: 20,
  },

  map: {
    flex: 1,
    marginTop: 20,
  },
});
