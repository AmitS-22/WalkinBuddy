import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

export default function ServicesScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Hotel Services</Text>

          <Text style={styles.subtitle}>Smart concierge assistance</Text>
        </View>

        <TouchableOpacity style={styles.profileBtn}>
          <Ionicons name="person" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* AI CONCIERGE */}
      <View style={styles.aiCard}>
        <View style={styles.aiTop}>
          <View style={styles.aiIcon}>
            <Ionicons name="sparkles" size={28} color="#fff" />
          </View>

          <View style={{ marginLeft: 14 }}>
            <Text style={styles.aiTitle}>AI Concierge</Text>

            <Text style={styles.aiSub}>Ask anything about the hotel</Text>
          </View>
        </View>

        {/* INPUT */}
        <View style={styles.searchBox}>
          <Ionicons name="search" size={20} color="#999" />

          <TextInput
            placeholder="Ask for services..."
            placeholderTextColor="#999"
            style={styles.input}
          />

          <Ionicons name="mic" size={20} color="#999" />
        </View>
      </View>

      {/* QUICK SERVICES */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Services</Text>

        <View style={styles.grid}>
          <ServiceCard
            icon="restaurant"
            title="Room Dining"
            subtitle="Order food"
            color="#8B5CF6"
          />

          <ServiceCard
            icon="bed"
            title="Housekeeping"
            subtitle="Clean room"
            color="#00C2FF"
          />

          <ServiceCard
            icon="car"
            title="Taxi Booking"
            subtitle="Airport pickup"
            color="#FF9500"
          />

          <ServiceCard
            icon="shirt"
            title="Laundry"
            subtitle="Wash clothes"
            color="#00C853"
          />

          <ServiceCard
            icon="calendar"
            title="Reservations"
            subtitle="Book activities"
            color="#FF5A5A"
          />

          <ServiceCard
            icon="fitness"
            title="Spa & Wellness"
            subtitle="Relaxation"
            color="#9C27B0"
          />
        </View>
      </View>

      {/* ACTIVE REQUESTS */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Active Requests</Text>

        <RequestCard title="Room Cleaning" status="In Progress" eta="10 mins" />

        <RequestCard
          title="Dinner Reservation"
          status="Confirmed"
          eta="7:30 PM"
        />
      </View>

      {/* SMART SUGGESTIONS */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recommended For You</Text>

        <SuggestionCard
          icon="wine"
          title="Wine Tasting Event"
          subtitle="Tonight at Sky Lounge"
        />

        <SuggestionCard
          icon="musical-notes"
          title="Live Music"
          subtitle="Beach Deck • 8 PM"
        />

        <SuggestionCard
          icon="sunny"
          title="Morning Yoga"
          subtitle="Poolside • 6 AM"
        />
      </View>
    </ScrollView>
  );
}

/* SERVICE CARD */
function ServiceCard({ icon, title, subtitle, color }: any) {
  return (
    <TouchableOpacity style={styles.serviceCard}>
      <View style={[styles.iconCircle, { backgroundColor: color }]}>
        <Ionicons name={icon} size={26} color="#fff" />
      </View>

      <Text style={styles.serviceTitle}>{title}</Text>

      <Text style={styles.serviceSub}>{subtitle}</Text>
    </TouchableOpacity>
  );
}

/* REQUEST CARD */
function RequestCard({ title, status, eta }: any) {
  return (
    <View style={styles.requestCard}>
      <View>
        <Text style={styles.requestTitle}>{title}</Text>

        <Text style={styles.requestEta}>ETA: {eta}</Text>
      </View>

      <View style={styles.statusBadge}>
        <Text style={styles.statusText}>{status}</Text>
      </View>
    </View>
  );
}

/* SUGGESTION CARD */
function SuggestionCard({ icon, title, subtitle }: any) {
  return (
    <TouchableOpacity style={styles.suggestionCard}>
      <View style={styles.suggestionIcon}>
        <Ionicons name={icon} size={24} color="#fff" />
      </View>

      <View style={{ marginLeft: 14 }}>
        <Text style={styles.suggestionTitle}>{title}</Text>

        <Text style={styles.suggestionSub}>{subtitle}</Text>
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

  profileBtn: {
    width: 50,
    height: 50,
    borderRadius: 20,
    backgroundColor: "#111827",
    justifyContent: "center",
    alignItems: "center",
  },

  aiCard: {
    marginTop: 30,
    backgroundColor: "#10182E",
    borderRadius: 30,
    padding: 22,
  },

  aiTop: {
    flexDirection: "row",
    alignItems: "center",
  },

  aiIcon: {
    width: 58,
    height: 58,
    borderRadius: 20,
    backgroundColor: "#8B5CF6",
    justifyContent: "center",
    alignItems: "center",
  },

  aiTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
  },

  aiSub: {
    color: "#94A3B8",
    marginTop: 4,
  },

  searchBox: {
    marginTop: 24,
    height: 58,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.06)",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },

  input: {
    flex: 1,
    color: "#fff",
    marginHorizontal: 10,
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

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  serviceCard: {
    width: "48%",
    backgroundColor: "#111827",
    borderRadius: 26,
    padding: 20,
    marginBottom: 18,
  },

  iconCircle: {
    width: 58,
    height: 58,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  serviceTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    marginTop: 18,
  },

  serviceSub: {
    color: "#94A3B8",
    marginTop: 8,
  },

  requestCard: {
    backgroundColor: "#111827",
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  requestTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },

  requestEta: {
    color: "#94A3B8",
    marginTop: 6,
  },

  statusBadge: {
    backgroundColor: "#00C853",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 14,
  },

  statusText: {
    color: "#fff",
    fontWeight: "700",
  },

  suggestionCard: {
    backgroundColor: "#111827",
    borderRadius: 24,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },

  suggestionIcon: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: "#8B5CF6",
    justifyContent: "center",
    alignItems: "center",
  },

  suggestionTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },

  suggestionSub: {
    color: "#94A3B8",
    marginTop: 6,
  },
});
