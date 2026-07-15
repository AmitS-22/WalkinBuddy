import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";

import * as Notifications from "expo-notifications";

import { Stack } from "expo-router";

import { StatusBar } from "expo-status-bar";

import "react-native-reanimated";

import { useEffect, useState } from "react";

import {
  ActivityIndicator,
  Animated,
  StyleSheet,
  Text
} from "react-native";

import { useColorScheme } from "@/hooks/use-color-scheme";

import { onAuthStateChanged, User } from "firebase/auth";

import { auth } from "../firebaseConfig";

/* NOTIFICATIONS */
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,

    shouldShowList: true,

    shouldPlaySound: true,

    shouldSetBadge: false,
  }),
});

/* LOADING SCREEN */
function LoadingScreen() {
  const fadeAnim = new Animated.Value(0);

  const scaleAnim = new Animated.Value(0.7);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,

        duration: 1200,

        useNativeDriver: true,
      }),

      Animated.spring(scaleAnim, {
        toValue: 1,

        friction: 4,

        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.loadingContainer,

        {
          opacity: fadeAnim,

          transform: [
            {
              scale: scaleAnim,
            },
          ],
        },
      ]}
    >
      <Text style={styles.logo}>WalkinBuddy</Text>

      <Text style={styles.subtitle}>Smart Hospitality Navigation</Text>

      <ActivityIndicator
        size="large"
        color="#8B5CF6"
        style={{ marginTop: 40 }}
      />
    </Animated.View>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState<User | null>(null);

  /* AUTH CHECK */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,

      (currentUser) => {
        setUser(currentUser);

        setLoading(false);
      },
    );

    return unsubscribe;
  }, []);

  /* NOTIFICATION PERMISSION */
  useEffect(() => {
    Notifications.requestPermissionsAsync();
  }, []);

  /* LOADING */
  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        {!user ? (
          <>
            <Stack.Screen name="login" />

            <Stack.Screen name="signup" />
          </>
        ) : (
          <Stack.Screen name="(tabs)" />
        )}
      </Stack>

      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
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
