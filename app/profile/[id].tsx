import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, Image } from "react-native";
import Constants from "expo-constants";
import { useLocalSearchParams } from "expo-router";
import { getFirestore, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { getAuth, updateEmail, updatePassword } from "firebase/auth";
import Button from "../_components/Button";
import Header from "../_components/Header";
import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

const statusBarHeight: number = Constants.statusBarHeight;

interface UserData {
  name: string;
  email: string;
}

export default function ProfileDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [userName, setUserName] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [newEmail, setNewEmail] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [newName, setNewName] = useState<string>("");
  const auth = getAuth();
  const router = useRouter();

  useEffect(() => {
    const getUserData = async () => {
      if (id) {
        const db = getFirestore();
        const userDocRef = doc(db, "users", id);

        const unsubscribe = onSnapshot(userDocRef, (docSnap) => {
          if (docSnap.exists()) {
            setUserName(docSnap.data().name);
            setUserEmail(docSnap.data().email);
            setNewName(docSnap.data().name);
            setNewEmail(docSnap.data().email);
          }
        });

        return () => unsubscribe();
      }
    };

    if (id) {
      getUserData();
    }
  }, [id]);

  const handleUpdateProfile = async () => {
    const user = auth.currentUser;

    if (user) {
      if (newName) {
        const db = getFirestore();
        const userDocRef = doc(db, "users", id);
        await updateDoc(userDocRef, {
          name: newName,
        });
        setUserName(newName);
      }

      if (newEmail && newEmail !== user.email) {
        await updateEmail(user, newEmail);
        setUserEmail(newEmail);
      }

      if (newPassword) {
        await updatePassword(user, newPassword);
      }
    }
  };

  return (
    <View style={[styles.container, { marginTop: statusBarHeight }]}>
      <View style={styles.header}>
        <AntDesign
          name="arrowleft"
          onPress={() => router.back()}
          size={24}
          color="#000"
          style={styles.arrowIcon}
        />
        <Header title="Editar informações" />
      </View>

      <View style={{ gap: 10, justifyContent: "center", flex: 1 }}>
        <TextInput
          style={styles.input}
          placeholder="Novo nome"
          value={newName}
          onChangeText={setNewName}
        />
        <TextInput
          style={styles.input}
          placeholder="Novo e-mail"
          value={newEmail}
          onChangeText={setNewEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Nova senha"
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <Button title="Atualizar" onPress={handleUpdateProfile} />
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("@/assets/images/andree.png")}
            style={{ width: 100, height: 100, resizeMode: "contain" }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 15,
  },
  username: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
  },
  input: {
    height: 60,
    backgroundColor: "#ECECEC",
    paddingHorizontal: 30,
    borderRadius: 5,
    fontSize: 17,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 10,
  },
  arrowIcon: {
    marginRight: 20,
    marginTop: 5,
  },
});
