import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

export default function FamilyScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Family Tracking</Text>

          <Text style={styles.subtitle}>Live location updates</Text>
        </View>

        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="person-add" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* MINI MAP */}
      <View style={styles.mapCard}>
        <View style={styles.fakeMap}>
          {/* USER 1 */}
          <View style={[styles.memberDot, { top: 70, left: 80 }]}>
            <Image
              source={{
                uri: "https://randomuser.me/api/portraits/men/32.jpg",
              }}
              style={styles.dotAvatar}
            />
          </View>

          {/* USER 2 */}
          <View style={[styles.memberDot, { top: 160, right: 70 }]}>
            <Image
              source={{
                uri: "https://randomuser.me/api/portraits/women/44.jpg",
              }}
              style={styles.dotAvatar}
            />
          </View>

          {/* USER 3 */}
          <View style={[styles.memberDot, { bottom: 50, left: 140 }]}>
            <Image
              source={{
                uri: "https://randomuser.me/api/portraits/kids/12.jpg",
              }}
              style={styles.dotAvatar}
            />
          </View>
        </View>

        {/* LIVE BADGE */}
        <View style={styles.liveBadge}>
          <View style={styles.greenDot} />

          <Text style={styles.liveText}>Live Tracking Enabled</Text>
        </View>
      </View>

      {/* MEMBERS */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Family Members</Text>

        <MemberCard
          name="Rahul"
          location="Near Pool Area"
          status="Safe"
          image="https://randomuser.me/api/portraits/men/32.jpg"
        />

        <MemberCard
          name="Mom"
          location="Spa Reception"
          status="Safe"
          image="https://randomuser.me/api/portraits/women/44.jpg"
        />

        <MemberCard
          name="Aarav"
          location="Kids Zone"
          status="Attention Needed"
          danger
          image="https://randomuser.me/api/portraits/kids/12.jpg"
        />
      </View>

      {/* SAFETY ALERT */}
      <View style={styles.alertCard}>
        <View style={styles.alertIcon}>
          <Ionicons name="warning" size={28} color="#fff" />
        </View>

        <View style={{ marginLeft: 16 }}>
          <Text style={styles.alertTitle}>Child Safety Alert</Text>

          <Text style={styles.alertText}>
            Aarav moved away from the family group.
          </Text>
        </View>
      </View>

      {/* ACTION BUTTONS */}
      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.primaryButton}>
          <Ionicons name="navigate" size={22} color="#fff" />

          <Text style={styles.primaryButtonText}>Navigate to Family</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton}>
          <Ionicons name="call" size={22} color="#8B5CF6" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

/* MEMBER CARD */
function MemberCard({ name, location, status, image, danger }: any) {
  return (
    <TouchableOpacity style={styles.memberCard}>
      <View style={styles.memberLeft}>
        <Image source={{ uri: image }} style={styles.memberAvatar} />

        <View style={{ marginLeft: 14 }}>
          <Text style={styles.memberName}>{name}</Text>

          <Text style={styles.memberLocation}>{location}</Text>
        </View>
      </View>

      <View style={[styles.statusBadge, danger && styles.dangerBadge]}>
        <Text style={styles.statusText}>{status}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050816",
    paddingTop: 60,
    paddingHorizontal: 20,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "700",
  },

  subtitle: {
    color: "#94A3B8",
    marginTop: 6,
  },

  addButton: {
    width: 52,
    height: 52,
    borderRadius: 20,
    backgroundColor: "#8B5CF6",
    justifyContent: "center",
    alignItems: "center",
  },

  mapCard: {
    marginTop: 30,
    backgroundColor: "#10182E",
    borderRadius: 30,
    padding: 20,
  },

  fakeMap: {
    height: 260,
    borderRadius: 24,
    backgroundColor: "#172036",
    overflow: "hidden",
  },

  memberDot: {
    position: "absolute",
    width: 52,
    height: 52,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: "#fff",
    overflow: "hidden",
  },

  dotAvatar: {
    width: "100%",
    height: "100%",
  },

  liveBadge: {
    marginTop: 18,
    flexDirection: "row",
    alignItems: "center",
  },

  greenDot: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: "#00FF66",
    marginRight: 8,
  },

  liveText: {
    color: "#00FF66",
    fontWeight: "600",
  },

  section: {
    marginTop: 40,
  },

  sectionTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
  },

  memberCard: {
    backgroundColor: "#111827",
    borderRadius: 24,
    padding: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },

  memberLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  memberAvatar: {
    width: 60,
    height: 60,
    borderRadius: 22,
  },

  memberName: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },

  memberLocation: {
    color: "#94A3B8",
    marginTop: 6,
  },

  statusBadge: {
    backgroundColor: "#0F9D58",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 14,
  },

  dangerBadge: {
    backgroundColor: "#FF5A5A",
  },

  statusText: {
    color: "#fff",
    fontWeight: "600",
  },

  alertCard: {
    marginTop: 30,
    backgroundColor: "#2A0C14",
    borderRadius: 28,
    padding: 20,
    flexDirection: "row",
    alignItems: "flex-start",
  },

  alertIcon: {
    width: 58,
    height: 58,
    borderRadius: 20,
    backgroundColor: "#FF3131",
    justifyContent: "center",
    alignItems: "center",
  },

  alertTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },

  alertText: {
    color: "#FFB4B4",
    marginTop: 8,
    width: 220,
    lineHeight: 20,
  },

  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
    marginBottom: 120,
  },

  primaryButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#8B5CF6",
    paddingHorizontal: 24,
    paddingVertical: 18,
    borderRadius: 22,
    flex: 1,
    marginRight: 16,
    justifyContent: "center",
  },

  primaryButtonText: {
    color: "#fff",
    fontWeight: "700",
    marginLeft: 10,
  },

  secondaryButton: {
    width: 64,
    height: 64,
    borderRadius: 22,
    backgroundColor: "#111827",
    justifyContent: "center",
    alignItems: "center",
  },
});
