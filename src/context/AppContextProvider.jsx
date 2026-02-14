import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase.js";
export const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [wishItems, setWishItems] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [itemsRes, cartRes, wishRes, ordersRes] = await Promise.all([
          fetch("http://localhost:3000/items"),
          fetch("http://localhost:3000/cart"),
          fetch("http://localhost:3000/wish"),
          fetch("http://localhost:3000/orders"),
        ]);

        const itemsData = await itemsRes.json();
        const cartData = await cartRes.json();
        const wishData = await wishRes.json();
        const ordersData = await ordersRes.json();

        setProducts(itemsData);
        setCartItems(cartData);
        setWishItems(wishData);
        setOrderItems(ordersData);
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
  }, []);

  const toggleCart = async (product) => {
    const alreadyInCart = cartItems.some((item) => item.id === product.id);

    try {
      if (alreadyInCart) {
        await fetch(`http://localhost:3000/cart/${product.id}`, {
          method: "DELETE",
        });
        setCartItems((prev) => prev.filter((item) => item.id !== product.id));
      } else {
        const response = await fetch("http://localhost:3000/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(product),
        });
        const newItem = await response.json();
        setCartItems((prev) => [...prev, newItem]);
      }
    } catch (error) {
      alert("Не удалось обновить корзину");
    }
  };

  const isInCart = (id) => cartItems.some((item) => item.id === id);

  const toggleWish = async (product) => {
    const alreadyInWish = wishItems.some((item) => item.id === product.id);
    try {
      if (alreadyInWish) {
        await fetch(`http://localhost:3000/wish/${product.id}`, {
          method: "DELETE",
        });
        setWishItems((prev) => prev.filter((item) => item.id !== product.id));
      } else {
        const response = await fetch(`http://localhost:3000/wish`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(product),
        });
        const newItem = await response.json();
        setWishItems((prev) => [...prev, newItem]);
      }
    } catch (error) {
      alert("Не удалось обновить избранные");
    }
  };

  const isInWish = (id) => wishItems.some((item) => item.id === id);

  const createOrder = async () => {
    console.log("Кнопка нажата, товары в корзине:", cartItems);

    const alreadyInOrder = orderItems.some((item) => item.id === products.id);

    const newOrder = {
      id: Date.now(),
      items: [...cartItems],
      date: new Date().toLocaleString(),
      totalPrice: cartItems.reduce((acc, curr) => acc + Number(curr.price), 0),
    };

    console.log(newOrder);

    try {
      if (alreadyInOrder) {
        const response = await fetch(
          `http://localhost:3000/orders/${product.id}`,
          {
            method: "DELETE",
          },
        );
        if (response.ok) {
          setOrderItems((prev) =>
            prev.filter((item) => item.id !== product.id),
          );
        }
      } else {
        const response = await fetch("http://localhost:3000/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newOrder),
        });

        if (response.ok) {
          await Promise.all(
            cartItems.map((item) =>
              fetch(`http://localhost:3000/cart/${item.id}`, {
                method: "DELETE",
              }),
            ),
          );
          const newItem = await response.json();
          setOrderItems((prev) => [...prev, newItem]);
          setCartItems([]);
        }
      }
    } catch (error) {
      console.error(error);
      alert("Не удалось обновить заказы");
    }
  };

  const handleLogOut = async () => {
    try {
      const clearRequests = [
        ...cartItems.map((item) =>
          fetch(`http://localhost:3000/cart/${item.id}`, { method: "DELETE" }),
        ),
        ...wishItems.map((item) =>
          fetch(`http://localhost:3000/wish/${item.id}`, { method: "DELETE" }),
        ),
      ];

      await Promise.all(clearRequests);
      await signOut(auth);
      setCartItems([]);
      setWishItems([]);
      setOrderItems([]);
    } catch (error) {
      console.err("Ошибка при выходе");
    }
  };

  return (
    <AppContext.Provider
      value={{
        products,
        cartItems,
        wishItems,
        orderItems,
        user,
        loading,
        toggleWish,
        toggleCart,
        createOrder,
        isInCart,
        isInWish,
        handleLogOut,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
