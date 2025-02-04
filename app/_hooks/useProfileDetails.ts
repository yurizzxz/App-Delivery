import { useState, useEffect } from "react";
import { getFirestore, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { getAuth, updateEmail, updatePassword, } from "firebase/auth";

interface UserData {
  name: string;
  email: string;
  photo: string | null;
}

export const useProfileDetails = (id: string | undefined) => {
  const [userName, setUserName] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [newEmail, setNewEmail] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [newName, setNewName] = useState<string>("");
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);

  const auth = getAuth();

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
        await updateDoc(userDocRef, { name: newName });
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
        await updateDoc(userDocRef, { photo: profilePhoto });
      }
    }
  };

  const handlePhotoPick = () => {
    setProfilePhoto("dummy-photo-url");
  };

  return {
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
  };
};
