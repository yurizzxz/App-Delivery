import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  DocumentData,
  QuerySnapshot,
} from "firebase/firestore";

export const  firebaseConfig = {
  apiKey: "AIzaSyCHF3maIC0GwDLJTF9fY0Bh5QrFvnVJCj8",
  authDomain: "andrelanchesepizzas.firebaseapp.com",
  projectId: "andrelanchesepizzas",
  storageBucket: "andrelanchesepizzas.firebasestorage.app",
  messagingSenderId: "1082406936540",
  appId: "1:1082406936540:web:76ba7ab8eacf2a68783919",
  measurementId: "G-XJFSZ822J5",
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
