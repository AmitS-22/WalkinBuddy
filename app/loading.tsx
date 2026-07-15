import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function LoadingScreen() {
  return (
    <View style={styles.container}>
      {/* APP LOGO */}
      <Text style={styles.logo}>WalkinBuddy</Text>

      {/* SUBTITLE */}
      <Text style={styles.subtitle}>Smart Hospitality Navigation</Text>

      {/* LOADER */}
      <ActivityIndicator
        size="large"
        color="#8B5CF6"
        style={{ marginTop: 40 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050816",

    justifyContent: "center",

    alignItems: "center",
  },

  logo: {
    color: "#fff",

    fontSize: 42,

    fontWeight: "800",
  },

  subtitle: {
    color: "#94A3B8",

    marginTop: 14,

    fontSize: 16,
  },
});
