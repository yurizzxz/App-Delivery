import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, onSnapshot, updateDoc, arrayRemove, arrayUnion } from "firebase/firestore";

type CartItem = {
  id: string;
  number: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  imageSrc: string;
};

const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      console.error("Usuário não está autenticado.");
      setLoading(false);
      return;
    }

    const db = getFirestore();
    const userCartRef = doc(db, "carts", user.uid);

    const unsubscribe = onSnapshot(userCartRef, (snapshot) => {
      if (snapshot.exists()) {
        const cartData = snapshot.data();
        setCartItems(cartData?.items || []);
      } else {
        console.warn("Nenhum produto adicionado ao carrinho.");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleRemoveItem = async (id: string) => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const db = getFirestore();
      const userCartRef = doc(db, "carts", user.uid);

      const itemToRemove = cartItems.find((item) => item.id === id);
      if (itemToRemove) {
        await updateDoc(userCartRef, {
          items: arrayRemove(itemToRemove),
        });
      }
    }
  };

  const handleIncreaseQuantity = async (id: string) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCartItems);

    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const db = getFirestore();
      const userCartRef = doc(db, "carts", user.uid);

      const itemToUpdate = updatedCartItems.find((item) => item.id === id);
      if (itemToUpdate) {
        await updateDoc(userCartRef, {
          items: arrayRemove(cartItems.find((item) => item.id === id)),
        });

        await updateDoc(userCartRef, {
          items: arrayUnion(itemToUpdate),
        });
      }
    }
  };

  const handleDecreaseQuantity = async (id: string) => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) return;

    const db = getFirestore();
    const userCartRef = doc(db, "carts", user.uid);

    const itemToUpdate = cartItems.find((item) => item.id === id);

    if (!itemToUpdate) return;

    if (itemToUpdate.quantity > 1) {
      const updatedCartItems = cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      );
      setCartItems(updatedCartItems);

      await updateDoc(userCartRef, {
        items: arrayRemove(itemToUpdate),
      });

      await updateDoc(userCartRef, {
        items: arrayUnion({
          ...itemToUpdate,
          quantity: itemToUpdate.quantity - 1,
        }),
      });
    } else {
      const updatedCartItems = cartItems.filter((item) => item.id !== id);
      setCartItems(updatedCartItems);

      await updateDoc(userCartRef, {
        items: arrayRemove(itemToUpdate),
      });
    }
  };

  const totalAmount: string = cartItems
    .reduce(
      (sum: number, item: CartItem): number =>
        sum + parseFloat(item.price as unknown as string) * item.quantity,
      0
    )
    .toFixed(2);

  return {
    cartItems,
    loading,
    handleRemoveItem,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
    totalAmount,
  };
};

export default useCart;
