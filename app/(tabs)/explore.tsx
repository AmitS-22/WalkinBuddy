import * as Location from "expo-location";

import * as Notifications from "expo-notifications";

import { useEffect, useRef, useState } from "react";

import MapView, { Circle, Marker } from "react-native-maps";

import {
  Alert,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

import { collection, doc, onSnapshot, setDoc } from "firebase/firestore";

import { auth, db } from "../../firebaseConfig";

/* SAFE ZONE */
const SAFE_ZONE = {
  latitude: 30.3165,

  longitude: 78.0322,

  radius: 0.003,
};

export default function ExploreScreen() {
  const [location, setLocation] = useState<any>(null);

  const [familyLocations, setFamilyLocations] = useState<any[]>([]);

  /* FIX WARNING */
  const [, setErrorMsg] = useState("");

  /* SAFE ALERT */
  const hasAlertedRef = useRef(false);

  /* USER LIVE LOCATION */
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setErrorMsg("Permission denied");

        return;
      }

      await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,

          timeInterval: 3000,

          distanceInterval: 1,
        },

        async (newLocation) => {
          setLocation(newLocation);

          /* GEOFENCING */
          const latitudeDiff = Math.abs(
            newLocation.coords.latitude - SAFE_ZONE.latitude,
          );

          const longitudeDiff = Math.abs(
            newLocation.coords.longitude - SAFE_ZONE.longitude,
          );

          /* SAFE ZONE ALERT */
          if (
            latitudeDiff > SAFE_ZONE.radius ||
            longitudeDiff > SAFE_ZONE.radius
          ) {
            if (hasAlertedRef.current === false) {
              hasAlertedRef.current = true;

              console.log("USER LEFT SAFE ZONE 🚨");

              Alert.alert(
                "⚠️ Safe Zone Alert",
                "You moved outside the safe zone.",
              );

              await Notifications.scheduleNotificationAsync({
                content: {
                  title: "🚨 Safe Zone Breach",

                  body: "User moved outside the safe area.",

                  sound: true,
                },

                trigger: null,
              });
            }
          } else {
            hasAlertedRef.current = false;
          }

          /* SAVE LOCATION */
          if (auth.currentUser) {
            await setDoc(doc(db, "locations", auth.currentUser.uid), {
              latitude: newLocation.coords.latitude,

              longitude: newLocation.coords.longitude,

              updatedAt: Date.now(),
            });
          }
        },
      );
    })();
  }, []);

  /* FAMILY REALTIME TRACKING */
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "locations"),

      (snapshot) => {
        const users: any[] = [];

        snapshot.forEach((doc) => {
          users.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        setFamilyLocations(users);
      },
    );

    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      {/* HERO */}
      <ImageBackground
        source={{
          uri: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200",
        }}
        style={styles.heroImage}
      >
        {/* TOP BAR */}
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="scan" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* CARD */}
        <View style={styles.navigationCard}>
          <View style={styles.directionRow}>
            <View style={styles.directionIcon}>
              <Ionicons name="arrow-up" size={30} color="#fff" />
            </View>

            <View>
              <Text style={styles.directionTitle}>Walk Straight</Text>

              <Text style={styles.directionDistance}>20 meters</Text>
            </View>
          </View>
        </View>
      </ImageBackground>

      {/* CONTENT */}
      <ScrollView style={styles.bottomSheet}>
        {/* MAP */}
        <View style={styles.mapContainer}>
          {location && (
            <MapView
              style={styles.map}
              showsUserLocation
              followsUserLocation
              initialRegion={{
                latitude: location.coords.latitude,

                longitude: location.coords.longitude,

                latitudeDelta: 0.005,

                longitudeDelta: 0.005,
              }}
            >
              {/* USER */}
              <Marker
                coordinate={{
                  latitude: location.coords.latitude,

                  longitude: location.coords.longitude,
                }}
                title="You"
              />

              {/* SAFE ZONE */}
              <Circle
                center={{
                  latitude: SAFE_ZONE.latitude,

                  longitude: SAFE_ZONE.longitude,
                }}
                radius={300}
                strokeWidth={3}
                strokeColor="rgba(0,255,100,0.8)"
                fillColor="rgba(0,255,100,0.15)"
              />

              {/* FAMILY */}
              {familyLocations.map((member) => (
                <Marker
                  key={member.id}
                  coordinate={{
                    latitude: member.latitude,

                    longitude: member.longitude,
                  }}
                  title="Family Member"
                  pinColor="#8B5CF6"
                />
              ))}
            </MapView>
          )}
        </View>

        {/* STATUS */}
        <View style={styles.liveCard}>
          <View style={styles.greenDot} />

          <Text style={styles.liveText}>Live Indoor Navigation Active</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050816",
  },

  heroImage: {
    height: 250,
    justifyContent: "space-between",
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },

  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  iconBtn: {
    width: 52,
    height: 52,
    borderRadius: 18,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
  },

  navigationCard: {
    backgroundColor: "rgba(0,0,0,0.55)",
    borderRadius: 28,
    padding: 22,
  },

  directionRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  directionIcon: {
    width: 70,
    height: 70,
    borderRadius: 24,
    backgroundColor: "#00BFFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 18,
  },

  directionTitle: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",
  },

  directionDistance: {
    color: "#ddd",
    marginTop: 6,
    fontSize: 16,
  },

  bottomSheet: {
    flex: 1,
    backgroundColor: "#0F172A",
    borderTopLeftRadius: 34,
    borderTopRightRadius: 34,
    marginTop: -20,
    paddingHorizontal: 20,
    paddingTop: 24,
  },

  mapContainer: {
    height: 400,
    borderRadius: 28,
    overflow: "hidden",
  },

  map: {
    flex: 1,
  },

  liveCard: {
    marginTop: 20,
    backgroundColor: "#0B3B2E",
    borderRadius: 22,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 100,
  },

  greenDot: {
    width: 12,
    height: 12,
    borderRadius: 10,
    backgroundColor: "#00FF66",
    marginRight: 10,
  },

  liveText: {
    color: "#00FF66",
    fontWeight: "700",
  },
});
