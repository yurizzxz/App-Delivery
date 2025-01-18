import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseConfig } from "./services/firebaseConfig";
import { initializeApp } from "firebase/app";
import { useRouter } from "expo-router";
import Button from "./_components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from '@expo/vector-icons'; 

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const checkRememberMe = async () => {
      const storedEmail = await AsyncStorage.getItem("email");
      const storedPassword = await AsyncStorage.getItem("password");
      if (storedEmail && storedPassword) {
        setEmail(storedEmail);
        setPassword(storedPassword);
        setRememberMe(true);
      }
    };

    checkRememberMe();
  }, []);

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      if (rememberMe) {
        await AsyncStorage.setItem("email", email);
        await AsyncStorage.setItem("password", password);
      } else {
        await AsyncStorage.removeItem("email");
        await AsyncStorage.removeItem("password");
      }

      router.push("/(tabs)");
    } catch (error) {
      console.error("Erro no login:", error);
      Alert.alert("Erro", "Não foi possível realizar o login.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Olá Novamente!</Text>

      <View style={{ gap: 10 }}>
        <View style={styles.inputContainer}>
          <AntDesign name="mail" size={20} color="#d30000" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputContainer}>
          <AntDesign name="lock" size={20} color="#d30000" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
      </View>

      <View style={styles.rememberMeContainer}>
        <TouchableOpacity onPress={() => setRememberMe(!rememberMe)} style={styles.checkboxContainer}>
          <View style={[styles.checkbox, rememberMe && styles.checkedCheckbox]} />
          <Text style={styles.rememberMeText}>Lembrar de mim</Text>
        </TouchableOpacity>
      </View>

      <Button title="Entrar" onPress={handleLogin} />

      <View style={{ alignItems: "center" }}>
        <TouchableOpacity onPress={() => router.push("/cadastro")}>
          <Text>Não possui uma conta? <Text style={{ color: "#d30000" }}>Cadastre-se</Text></Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 15,
    gap: 20,
    backgroundColor: "#F5f5f5",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ECECEC",
    borderRadius: 5,
  },
  icon: {
    left: 15,
    zIndex: 1,
  },
  input: {
    height: 60,
    flex: 1,
    backgroundColor: "#ECECEC",
    paddingHorizontal: 30,
    borderRadius: 5,
    fontSize: 17,
  },
  rememberMeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "#d30000",
    borderRadius: 5,
    marginRight: 10,
  },
  checkedCheckbox: {
    backgroundColor: "#d30000",
  },
  rememberMeText: {
    fontSize: 16,
    color: "#000",
  },
});
