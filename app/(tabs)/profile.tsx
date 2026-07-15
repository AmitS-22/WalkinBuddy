import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useState } from "react";

import * as ImagePicker from "expo-image-picker";

import Ionicons from "@expo/vector-icons/Ionicons";

import { signOut } from "firebase/auth";

import { doc, setDoc } from "firebase/firestore";

import { auth, db } from "../../firebaseConfig";

import { router } from "expo-router";

export default function ProfileScreen() {
  const user = auth.currentUser;

  const [name, setName] = useState("Premium User");

  const [image, setImage] = useState("https://i.pravatar.cc/300");

  const [darkMode, setDarkMode] = useState(true);

  /* PICK IMAGE */
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,

      allowsEditing: true,

      aspect: [1, 1],

      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  /* SAVE PROFILE */
  const saveProfile = async () => {
    if (!auth.currentUser) return;

    await setDoc(doc(db, "profiles", auth.currentUser.uid), {
      name,

      image,

      darkMode,

      email: auth.currentUser.email,
    });

    Alert.alert("Profile Updated ✅");
  };

  /* LOGOUT */
  const handleLogout = async () => {
    try {
      await signOut(auth);

      router.replace("/login");
    } catch {
      Alert.alert("Logout failed");
    }
  };

  return (
    <View
      style={[
        styles.container,

        {
          backgroundColor: darkMode ? "#050816" : "#F4F4F5",
        },
      ]}
    >
      {/* HEADER */}
      <Text
        style={[
          styles.title,

          {
            color: darkMode ? "#fff" : "#111",
          },
        ]}
      >
        My Profile
      </Text>

      {/* PROFILE CARD */}
      <View
        style={[
          styles.profileCard,

          {
            backgroundColor: darkMode ? "#111827" : "#fff",
          },
        ]}
      >
        {/* AVATAR */}
        <TouchableOpacity onPress={pickImage}>
          <Image
            source={{
              uri: image,
            }}
            style={styles.avatar}
          />
        </TouchableOpacity>

        {/* EDITABLE NAME */}
        <TextInput
          value={name}
          onChangeText={setName}
          style={[
            styles.nameInput,

            {
              color: darkMode ? "#fff" : "#111",
            },
          ]}
          placeholder="Your Name"
          placeholderTextColor="#888"
        />

        <Text style={styles.email}>{user?.email}</Text>
      </View>

      {/* MENU */}
      <View
        style={[
          styles.menuCard,

          {
            backgroundColor: darkMode ? "#111827" : "#fff",
          },
        ]}
      >
        <MenuItem icon="shield-checkmark" title="Privacy & Security" />

        <MenuItem icon="notifications" title="Notifications" />

        <MenuItem icon="location" title="Location Settings" />

        <MenuItem icon="help-circle" title="Help & Support" />
      </View>

      {/* THEME TOGGLE */}
      <View
        style={[
          styles.themeCard,

          {
            backgroundColor: darkMode ? "#111827" : "#fff",
          },
        ]}
      >
        <Text
          style={[
            styles.themeText,

            {
              color: darkMode ? "#fff" : "#111",
            },
          ]}
        >
          Dark Mode
        </Text>

        <TouchableOpacity
          style={[
            styles.toggleBtn,

            {
              backgroundColor: darkMode ? "#8B5CF6" : "#444",
            },
          ]}
          onPress={() => setDarkMode(!darkMode)}
        >
          <Ionicons name={darkMode ? "moon" : "sunny"} size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* SAVE BUTTON */}
      <TouchableOpacity style={styles.saveBtn} onPress={saveProfile}>
        <Text style={styles.saveText}>Save Profile</Text>
      </TouchableOpacity>

      {/* LOGOUT */}
      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Ionicons name="log-out" size={22} color="#fff" />

        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

/* MENU ITEM */
function MenuItem({ icon, title }: any) {
  return (
    <TouchableOpacity style={styles.menuItem}>
      <View style={styles.menuLeft}>
        <View style={styles.iconBox}>
          <Ionicons name={icon} size={22} color="#fff" />
        </View>

        <Text style={styles.menuText}>{title}</Text>
      </View>

      <Ionicons name="chevron-forward" size={22} color="#888" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 34,
    fontWeight: "700",
  },

  profileCard: {
    marginTop: 30,
    borderRadius: 32,
    padding: 30,
    alignItems: "center",
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 60,
  },

  nameInput: {
    fontSize: 26,

    fontWeight: "700",

    marginTop: 18,

    textAlign: "center",
  },

  email: {
    color: "#94A3B8",
    marginTop: 8,
    fontSize: 16,
  },

  menuCard: {
    marginTop: 30,
    borderRadius: 30,
    padding: 10,
  },

  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },

  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 18,
    backgroundColor: "#8B5CF6",
    justifyContent: "center",
    alignItems: "center",
  },

  menuText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
    marginLeft: 16,
  },

  themeCard: {
    marginTop: 30,

    borderRadius: 24,

    padding: 20,

    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",
  },

  themeText: {
    fontSize: 18,

    fontWeight: "700",
  },

  toggleBtn: {
    width: 56,

    height: 56,

    borderRadius: 20,

    justifyContent: "center",

    alignItems: "center",
  },

  saveBtn: {
    marginTop: 30,

    height: 64,

    borderRadius: 24,

    backgroundColor: "#8B5CF6",

    justifyContent: "center",

    alignItems: "center",
  },

  saveText: {
    color: "#fff",

    fontSize: 18,

    fontWeight: "700",
  },

  logoutBtn: {
    marginTop: 20,
    height: 64,
    borderRadius: 24,
    backgroundColor: "#FF3131",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },

  logoutText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    marginLeft: 10,
  },
});
