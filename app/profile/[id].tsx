import React from "react";
import { View, TextInput, Image, TouchableOpacity } from "react-native";
import Constants from "expo-constants";
import { useLocalSearchParams } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import Button from "../_components/Button";
import Header from "../_components/Header";
import { useRouter } from "expo-router";
import { useProfileDetails } from "../_hooks/useProfileDetails"; 

const statusBarHeight: number = Constants.statusBarHeight;

export default function ProfileDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const {
    userName,
    userEmail,
    newEmail,
    newPassword,
    newName,
    profilePhoto,
    setNewEmail,
    setNewPassword,
    setNewName,
    handleUpdateProfile,
    handlePhotoPick,
  } = useProfileDetails(id);

  const router = useRouter();

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
