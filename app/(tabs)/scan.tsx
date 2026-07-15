import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

export default function ScanScreen() {
  return (
    <View style={styles.container}>
      {/* CAMERA BACKGROUND */}
      <View style={styles.cameraView}>
        {/* TOP BAR */}
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="close" size={26} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="flash" size={22} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* AR CENTER CONTENT */}
        <View style={styles.centerContent}>
          {/* GLOWING ARROW */}
          <View style={styles.arrowGlow}>
            <Ionicons name="arrow-forward" size={80} color="#00E5FF" />
          </View>

          <Text style={styles.directionText}>Turn Right</Text>

          <Text style={styles.distanceText}>25 meters ahead</Text>
        </View>

        {/* BOTTOM INFO CARD */}
        <View style={styles.bottomCard}>
          <View style={styles.destinationRow}>
            <View>
              <Text style={styles.smallText}>Destination</Text>

              <Text style={styles.destinationTitle}>Ocean Restaurant</Text>
            </View>

            <View style={styles.timeBadge}>
              <Text style={styles.timeText}>1 MIN</Text>
            </View>
          </View>

          {/* STEP INFO */}
          <View style={styles.stepContainer}>
            <View style={styles.stepLeft}>
              <Ionicons name="navigate" size={22} color="#8B5CF6" />

              <View style={{ marginLeft: 12 }}>
                <Text style={styles.stepTitle}>Continue Straight</Text>

                <Text style={styles.stepSub}>Walk past the lobby</Text>
              </View>
            </View>

            <Text style={styles.stepDistance}>20m</Text>
          </View>

          {/* MINI CONTROLS */}
          <View style={styles.controlsRow}>
            <ControlButton icon="map" />
            <ControlButton icon="volume-high" />
            <ControlButton icon="layers" />
            <ControlButton icon="information-circle" />
          </View>
        </View>
      </View>
    </View>
  );
}

/* CONTROL BUTTON */
function ControlButton({ icon }: any) {
  return (
    <TouchableOpacity style={styles.controlBtn}>
      <Ionicons name={icon} size={22} color="#fff" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  cameraView: {
    flex: 1,
    backgroundColor: "#050816",
    justifyContent: "space-between",
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  iconButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(255,255,255,0.1)",
    justifyContent: "center",
    alignItems: "center",
  },

  centerContent: {
    alignItems: "center",
  },

  arrowGlow: {
    width: 180,
    height: 180,
    borderRadius: 100,
    backgroundColor: "rgba(0,229,255,0.12)",
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#00E5FF",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.8,
    shadowRadius: 30,

    elevation: 20,
  },

  directionText: {
    color: "#fff",
    fontSize: 36,
    fontWeight: "700",
    marginTop: 30,
  },

  distanceText: {
    color: "#00E5FF",
    fontSize: 18,
    marginTop: 10,
  },

  bottomCard: {
    backgroundColor: "#0F172A",
    borderRadius: 32,
    padding: 24,
  },

  destinationRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  smallText: {
    color: "#94A3B8",
    fontSize: 14,
  },

  destinationTitle: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "700",
    marginTop: 6,
  },

  timeBadge: {
    backgroundColor: "#8B5CF6",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 18,
  },

  timeText: {
    color: "#fff",
    fontWeight: "700",
  },

  stepContainer: {
    marginTop: 26,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.05)",
    padding: 18,
    borderRadius: 22,
  },

  stepLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  stepTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  stepSub: {
    color: "#94A3B8",
    marginTop: 4,
  },

  stepDistance: {
    color: "#00E5FF",
    fontWeight: "700",
    fontSize: 16,
  },

  controlsRow: {
    marginTop: 24,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  controlBtn: {
    width: 58,
    height: 58,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.08)",
    justifyContent: "center",
    alignItems: "center",
  },
});
