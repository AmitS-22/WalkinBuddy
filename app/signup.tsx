import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { useState } from "react";

import { createUserWithEmailAndPassword } from "firebase/auth";

import { auth } from "../firebaseConfig";

import { router } from "expo-router";

export default function SignupScreen() {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      Alert.alert("Account Created");

      router.replace("/login");
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <Text style={styles.subtitle}>Signup to continue</Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#888"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="#888"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.signupBtn} onPress={handleSignup}>
        <Text style={styles.signupBtnText}>Signup</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/login")}>
        <Text style={styles.loginText}>Already have account? Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050816",
    justifyContent: "center",
    paddingHorizontal: 24,
  },

  title: {
    color: "#fff",
    fontSize: 38,
    fontWeight: "700",
  },

  subtitle: {
    color: "#94A3B8",
    marginTop: 10,
    marginBottom: 40,
  },

  input: {
    height: 58,
    backgroundColor: "#111827",
    borderRadius: 18,
    paddingHorizontal: 18,
    color: "#fff",
    marginBottom: 18,
  },

  signupBtn: {
    height: 58,
    backgroundColor: "#8B5CF6",
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },

  signupBtnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },

  loginText: {
    color: "#8B5CF6",
    marginTop: 30,
    textAlign: "center",
    fontWeight: "600",
  },
});
