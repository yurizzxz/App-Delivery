import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

interface UserProfile {
  userName: string | null;
  userEmail: string | null;
  userId: string | null;
}

const useUserProfile = () => {
  const [profile, setProfile] = useState<UserProfile>({
    userName: null,
    userEmail: null,
    userId: null,
  });

  useEffect(() => {
    const getUserData = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        setProfile((prevState) => ({
          ...prevState,
          userId: user.uid,
        }));

        const db = getFirestore();
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setProfile({
            userName: userDoc.data().name,
            userEmail: userDoc.data().email,
            userId: user.uid,
          });
        }
      }
    };

    getUserData();
  }, []);

  return profile;
};

export default useUserProfile;
