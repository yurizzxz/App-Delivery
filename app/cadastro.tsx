import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { firebaseConfig } from "./services/firebaseConfig";
import { initializeApp } from "firebase/app";
import { useRouter } from "expo-router";
import Button from "./_components/Button";
import { AntDesign } from "@expo/vector-icons";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export default function CadastroScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const router = useRouter();

  const handleSignup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userId = userCredential.user.uid;

      await setDoc(doc(db, "users", userId), {
        email,
        name,
      });

      Alert.alert("Cadastro bem-sucedido!", "Você foi registrado com sucesso.");
      router.push("/(tabs)");
    } catch (error) {
      console.error("Erro no cadastro:", error);
      Alert.alert("Erro", "Não foi possível realizar o cadastro.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <Image
        
          source={require("@/assets/images/andree.png")}
          style={styles.reactLogo}
        />
        <Text style={styles.title}>Crie uma conta já!</Text>
      </View>

      <View style={{ gap: 10 }}>
        <View style={styles.inputContainer}>
          <AntDesign
            name="user"
            size={20}
            color="#d30000"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Nome"
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.inputContainer}>
          <AntDesign
            name="mail"
            size={20}
            color="#d30000"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputContainer}>
          <AntDesign
            name="lock"
            size={20}
            color="#d30000"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
      </View>

      <Button title="Cadastrar" onPress={handleSignup} />

      <View style={{ alignItems: "center" }}>
        <TouchableOpacity onPress={() => router.push("./login")}>
          <Text>
            Já possui uma conta?
            <Text style={{ color: "#d30000" }}> Entre já!</Text>
          </Text>
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
    paddingBottom: 40,
    backgroundColor: "#F5f5f5",
  },
  reactLogo: {
    height: 100,
    width: 150,
    resizeMode: "contain",
    marginBottom: 20,
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
});
