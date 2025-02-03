import React, { useState, useEffect } from "react";
import { View, TextInput, Image, TouchableOpacity } from "react-native";
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
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);

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
            setProfilePhoto(docSnap.data().photo);
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

      if (profilePhoto) {
        const db = getFirestore();
        const userDocRef = doc(db, "users", id);
        await updateDoc(userDocRef, {
          photo: profilePhoto,
        });
      }
    }
  };

  const handlePhotoPick = () => {
    setProfilePhoto("dummy-photo-url");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F5F5F5", padding: 15, marginTop: statusBarHeight }}>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-start", marginBottom: 10 }}>
        <AntDesign
          name="arrowleft"
          onPress={() => router.back()}
          size={24}
          color="#000"
          style={{ marginRight: 20, marginTop: 5 }}
        />
        <Header title="Editar informações" />
      </View>

      <View style={{ gap: 10, justifyContent: "center", paddingBottom: 150, flex: 1 }}>
        <View style={{ alignItems: "center", marginBottom: 15 }}>
          <TouchableOpacity onPress={handlePhotoPick} style={{ backgroundColor: "#ECECEC", borderRadius: 100, padding: 20, alignItems: "center", justifyContent: "center", width: 150, height: 150 }}>
            {profilePhoto ? (
              <Image source={{ uri: profilePhoto }} style={{ width: "100%", height: "100%", borderRadius: 100 }} />
            ) : (
              <AntDesign name="camera" size={40} color="#ccc" />
            )}
          </TouchableOpacity>
        </View>

        <TextInput
          style={{ height: 60, backgroundColor: "#ECECEC", paddingHorizontal: 30, borderRadius: 5, fontSize: 17 }}
          placeholder="Novo nome"
          value={newName}
          onChangeText={setNewName}
        />
        <TextInput
          style={{ height: 60, backgroundColor: "#ECECEC", paddingHorizontal: 30, borderRadius: 5, fontSize: 17 }}
          placeholder="Novo e-mail"
          value={newEmail}
          onChangeText={setNewEmail}
        />
        <TextInput
          style={{ height: 60, backgroundColor: "#ECECEC", paddingHorizontal: 30, borderRadius: 5, fontSize: 17 }}
          placeholder="Nova senha"
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <Button title="Atualizar" onPress={handleUpdateProfile} />
      </View>
    </View>
  );
}
