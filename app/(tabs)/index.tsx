import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* HERO SECTION */}
      <ImageBackground
        source={{
          uri: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1400",
        }}
        style={styles.hero}
      >
        <View style={styles.overlay}>
          {/* HEADER */}
          <View style={styles.topRow}>
            <View>
              <Text style={styles.logo}>Walkin Buddy</Text>
              <Text style={styles.greeting}>Good Morning,</Text>
              <Text style={styles.username}>Ananya 👋</Text>
            </View>

            <TouchableOpacity style={styles.bellButton}>
              <Ionicons name="notifications-outline" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* SEARCH BAR */}
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color="#999" />

            <TextInput
              placeholder="Search for places..."
              placeholderTextColor="#999"
              style={styles.input}
            />

            <Ionicons name="mic" size={20} color="#999" />
          </View>

          {/* LOCATION CARD */}
          <View style={styles.locationCard}>
            <Text style={styles.locationSmall}>You are at</Text>

            <Text style={styles.locationBig}>Main Lobby</Text>

            <View style={styles.liveRow}>
              <View style={styles.greenDot} />

              <Text style={styles.liveText}>Live Location</Text>
            </View>
          </View>
        </View>
      </ImageBackground>

      {/* QUICK ACCESS */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Quick Access</Text>

          <Text style={styles.seeAll}>See All</Text>
        </View>

        <View style={styles.grid}>
          <QuickButton icon="restaurant" label="Restaurants" />
          <QuickButton icon="flower" label="Spa" />
          <QuickButton icon="water" label="Pool" />
          <QuickButton icon="calendar" label="Events" />
          <QuickButton icon="barbell" label="Gym" />
          <QuickButton icon="happy" label="Kids Zone" />
          <QuickButton icon="bag" label="Shops" />
          <QuickButton icon="settings" label="Services" />
        </View>
      </View>

      {/* HIGHLIGHTS */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Today Highlights</Text>

        <View style={styles.highlightRow}>
          <View style={styles.highlightCard}>
            <Text style={styles.highlightTitle}>Live Music Night</Text>

            <Text style={styles.highlightSub}>8:00 PM onwards</Text>

            <Text style={styles.highlightSub}>At Ocean Deck</Text>
          </View>

          <View style={styles.highlightCardPurple}>
            <Text style={styles.highlightTitle}>Spa Offer</Text>

            <Text style={styles.highlightSub}>20% off on</Text>

            <Text style={styles.highlightSub}>all massages</Text>
          </View>
        </View>
      </View>

      {/* FAMILY + SOS */}
      <View style={styles.doubleRow}>
        <View style={styles.familyCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>My Family</Text>

            <Text style={styles.seeAll}>Add Member</Text>
          </View>

          <View style={styles.memberRow}>
            <Image
              source={{
                uri: "https://randomuser.me/api/portraits/men/32.jpg",
              }}
              style={styles.avatar}
            />

            <View>
              <Text style={styles.memberName}>Rahul</Text>

              <Text style={styles.memberPlace}>Near Kids Zone</Text>
            </View>
          </View>

          <View style={styles.memberRow}>
            <Image
              source={{
                uri: "https://randomuser.me/api/portraits/women/44.jpg",
              }}
              style={styles.avatar}
            />

            <View>
              <Text style={styles.memberName}>Mom</Text>

              <Text style={styles.memberPlace}>Near Spa</Text>
            </View>
          </View>
        </View>

        {/* SOS CARD */}
        <View style={styles.sosCard}>
          <Text style={styles.sosTitle}>Emergency Alert</Text>

          <TouchableOpacity style={styles.sosButton}>
            <Text style={styles.sosText}>SOS</Text>
          </TouchableOpacity>

          <Text style={styles.sosSub}>Tap to Send Alert</Text>
        </View>
      </View>

      {/* RECOMMENDATIONS */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recommended for You</Text>

        <RecommendationCard
          title="Sunset Grill"
          subtitle="Multi-cuisine Restaurant"
        />

        <RecommendationCard title="Aroma Spa" subtitle="Relax and Rejuvenate" />

        <RecommendationCard
          title="Poolside Fun"
          subtitle="Activities & Games"
        />
      </View>
    </ScrollView>
  );
}

/* QUICK BUTTON */
function QuickButton({ icon, label }: any) {
  return (
    <TouchableOpacity style={styles.quickButton}>
      <Ionicons name={icon} size={28} color="#8B5CF6" />

      <Text style={styles.quickText}>{label}</Text>
    </TouchableOpacity>
  );
}

/* RECOMMEND CARD */
function RecommendationCard({ title, subtitle }: any) {
  return (
    <TouchableOpacity style={styles.recommendCard}>
      <View style={styles.recommendImage} />

      <View style={{ marginLeft: 14 }}>
        <Text style={styles.recommendTitle}>{title}</Text>

        <Text style={styles.recommendSub}>{subtitle}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050816",
  },

  hero: {
    height: 380,
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    paddingHorizontal: 20,
    paddingTop: 60,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  logo: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "700",
  },

  greeting: {
    color: "#ccc",
    fontSize: 18,
    marginTop: 20,
  },

  username: {
    color: "#fff",
    fontSize: 34,
    fontWeight: "700",
  },

  bellButton: {
    width: 44,
    height: 44,
    borderRadius: 30,
    backgroundColor: "rgba(255,255,255,0.15)",
    justifyContent: "center",
    alignItems: "center",
  },

  searchBar: {
    marginTop: 28,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 18,
    height: 58,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },

  input: {
    flex: 1,
    color: "#fff",
    marginHorizontal: 10,
  },

  locationCard: {
    marginTop: 30,
    width: 180,
    backgroundColor: "rgba(0,0,0,0.55)",
    borderRadius: 24,
    padding: 20,
  },

  locationSmall: {
    color: "#aaa",
    fontSize: 14,
  },

  locationBig: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",
    marginTop: 8,
  },

  liveRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 14,
  },

  greenDot: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: "#00FF66",
    marginRight: 8,
  },

  liveText: {
    color: "#fff",
  },

  section: {
    paddingHorizontal: 20,
    marginTop: 30,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },

  sectionTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
  },

  seeAll: {
    color: "#8B5CF6",
    fontWeight: "600",
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  quickButton: {
    width: "23%",
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 22,
    paddingVertical: 20,
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  quickText: {
    color: "#fff",
    marginTop: 10,
    fontSize: 12,
    textAlign: "center",
  },

  highlightRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  highlightCard: {
    width: "48%",
    backgroundColor: "#151C36",
    borderRadius: 24,
    padding: 20,
  },

  highlightCardPurple: {
    width: "48%",
    backgroundColor: "#2D1B3D",
    borderRadius: 24,
    padding: 20,
  },

  highlightTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },

  highlightSub: {
    color: "#ccc",
    marginTop: 8,
  },

  doubleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 30,
  },

  familyCard: {
    width: "48%",
    backgroundColor: "#10182E",
    borderRadius: 26,
    padding: 18,
  },

  sosCard: {
    width: "48%",
    backgroundColor: "#2A0C14",
    borderRadius: 26,
    padding: 18,
    alignItems: "center",
  },

  memberRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 30,
    marginRight: 12,
  },

  memberName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  memberPlace: {
    color: "#aaa",
    marginTop: 4,
  },

  sosTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },

  sosButton: {
    width: 120,
    height: 120,
    borderRadius: 100,
    backgroundColor: "#FF3131",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },

  sosText: {
    color: "#fff",
    fontSize: 38,
    fontWeight: "700",
  },

  sosSub: {
    color: "#fff",
    marginTop: 20,
  },

  recommendCard: {
    backgroundColor: "#10182E",
    borderRadius: 24,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },

  recommendImage: {
    width: 70,
    height: 70,
    borderRadius: 18,
    backgroundColor: "#333",
  },

  recommendTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },

  recommendSub: {
    color: "#aaa",
    marginTop: 6,
  },
});
