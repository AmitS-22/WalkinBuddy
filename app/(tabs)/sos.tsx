import {
    Alert,
    StyleSheet,
    Text,
    TouchableOpacity,
    Vibration,
    View,
} from "react-native";

import { useState } from "react";

import * as Notifications from "expo-notifications";

import Ionicons from "@expo/vector-icons/Ionicons";

import * as Location from "expo-location";

import { doc, setDoc } from "firebase/firestore";

import { auth, db } from "../../firebaseConfig";

export default function SOSScreen() {
  const [sending, setSending] = useState(false);

  const [buttonText, setButtonText] = useState("HOLD SOS");

  const sendSOS = async () => {
    Vibration.vibrate(1000);

    setSending(true);

    setButtonText("SENDING...");

    console.log("SOS CLICKED");

    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert("Location permission denied");

        setSending(false);

        setButtonText("HOLD SOS");

        return;
      }

      const location = await Location.getCurrentPositionAsync({});

      if (auth.currentUser) {
        await setDoc(doc(db, "sos_alerts", auth.currentUser.uid), {
          latitude: location.coords.latitude,

          longitude: location.coords.longitude,

          active: true,

          createdAt: Date.now(),
        });

        setButtonText("SOS SENT 🚨");

        Alert.alert("Emergency Alert Sent Successfully 🚨");

        await Notifications.scheduleNotificationAsync({
          content: {
            title: "🚨 Emergency SOS",

            body: "Your live location has been shared.",

            sound: true,
          },

          trigger: null,
        });
      } else {
        Alert.alert("User not logged in");
      }
    } catch (error) {
      console.log(error);

      Alert.alert("Something went wrong");

      setButtonText("HOLD SOS");
    }

    setSending(false);
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <Text style={styles.title}>Emergency SOS</Text>

      <Text style={styles.subtitle}>
        Hold the button for 2 seconds to send emergency alert
      </Text>

      {/* SOS BUTTON */}
      <TouchableOpacity
        style={[
          styles.sosButton,

          sending && {
            transform: [{ scale: 0.95 }],
          },
        ]}
        onPress={() => Alert.alert("Hold SOS button for 2 seconds")}
        onLongPress={sendSOS}
        delayLongPress={2000}
        activeOpacity={0.9}
      >
        <Ionicons name="warning" size={72} color="#fff" />

        <Text style={styles.sosText}>{buttonText}</Text>
      </TouchableOpacity>

      {/* STATUS CARD */}
      <View style={styles.infoCard}>
        <View style={styles.statusRow}>
          <View style={styles.greenDot} />

          <Text style={styles.liveText}>Emergency System Active</Text>
        </View>

        <Text style={styles.infoText}>
          Your live location will be instantly shared with:
        </Text>

        <View style={styles.pointRow}>
          <Ionicons name="people" size={20} color="#8B5CF6" />

          <Text style={styles.pointText}>Family Members</Text>
        </View>

        <View style={styles.pointRow}>
          <Ionicons name="shield-checkmark" size={20} color="#8B5CF6" />

          <Text style={styles.pointText}>Hotel Security</Text>
        </View>

        <View style={styles.pointRow}>
          <Ionicons name="location" size={20} color="#8B5CF6" />

          <Text style={styles.pointText}>Live GPS Tracking</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050816",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },

  title: {
    color: "#fff",
    fontSize: 40,
    fontWeight: "800",
  },

  subtitle: {
    color: "#94A3B8",
    textAlign: "center",
    marginTop: 14,
    lineHeight: 24,
    fontSize: 15,
  },

  sosButton: {
    width: 250,
    height: 250,
    borderRadius: 140,
    backgroundColor: "#FF3131",

    justifyContent: "center",
    alignItems: "center",

    marginTop: 50,

    shadowColor: "#FF3131",
    shadowOpacity: 0.6,
    shadowRadius: 25,

    elevation: 25,
  },

  sosText: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "800",
    marginTop: 16,
    textAlign: "center",
  },

  infoCard: {
    width: "100%",

    marginTop: 50,

    backgroundColor: "#111827",

    borderRadius: 30,

    padding: 24,
  },

  statusRow: {
    flexDirection: "row",
    alignItems: "center",
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
    fontSize: 16,
  },

  infoText: {
    color: "#fff",
    marginTop: 20,
    lineHeight: 24,
    fontSize: 16,
  },

  pointRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },

  pointText: {
    color: "#fff",
    marginLeft: 12,
    fontSize: 16,
  },
});
