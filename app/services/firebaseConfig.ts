// firebaseConfig.ts

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  DocumentData,
  QuerySnapshot,
} from "firebase/firestore";

const apiKey = process.env.FIREBASE_API_KEY;
const authDomain = process.env.FIREBASE_AUTH_DOMAIN;
const projectId = process.env.FIREBASE_PROJECT_ID;
const storageBucket = process.env.FIREBASE_STORAGE_BUCKET;
const messagingSenderId = process.env.FIREBASE_MESSAGING_SENDER_ID;
const appId = process.env.FIREBASE_APP_ID;
const measurementId = process.env.FIREBASE_MEASUREMENT_ID;

const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

interface Card {
  id: string;
  imageSrc: string;
  name: string;
  description: string;
  price: string;
  category: string;
}

export const fetchCards = async (): Promise<Card[]> => {
  try {
    const cardSnapshot: QuerySnapshot<DocumentData> = await getDocs(
      collection(db, "alimentos")
    );
    const fetchedCards: Card[] = [];
    cardSnapshot.forEach((doc) => {
      const data = doc.data();
      fetchedCards.push({
        id: doc.id,
        imageSrc: data.imagemUrl,
        name: data.titulo,
        description: data.descricao,
        price: data.preco || "Preço não disponível",
        category: data.categoria || "Categoria não disponível",
      });
    });
    return fetchedCards;
  } catch (error) {
    console.error("Erro ao buscar cards do Firestore:", error);
    return [];
  }
};
