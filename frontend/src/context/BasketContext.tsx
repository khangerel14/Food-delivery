"use client";

import {
  createContext,
  ReactNode,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import axios from "axios";
import { useUser } from "@auth0/nextjs-auth0/client";

type FoodItem = {
  id: number;
  name: string;
  description: string;
  price: number;
  imgUrl: string;
  assessment: number;
  menu?: string;
};

type BasketContextProps = {
  foodData: FoodItem[];
  cartItems: { [key: string]: number };
  setCartItems: Dispatch<SetStateAction<{ [key: string]: number }>>;
  addToCart: (foodId: string, quantity: number) => Promise<void>;
  addToQty: (id: number) => void;
  deleteFromCart: (id: number) => void;
  removeFromCart: (id: number) => void;
  totalItems: number;
};

export const BasketContext = createContext<BasketContextProps | undefined>(
  undefined
);

type BasketProviderProps = {
  children: ReactNode;
};

const BasketContextProvider = ({ children }: BasketProviderProps) => {
  const [cartItems, setCartItems] = useState<{ [key: string]: number }>({});
  const [foodData, setFoodData] = useState<FoodItem[]>([]);
  const { user }: any = useUser();

  const foodById = async (ids: string[]) => {
    if (ids.length === 0) return;

    try {
      const response = await axios.get(
        `http://localhost:8000/api/foods/multiple?ids=${ids.join(",")}`
      );
      setFoodData(response.data.foods);
    } catch (error) {
      console.error("Error fetching foods:", error);
    }
  };

  useEffect(() => {
    const ids = Object.keys(cartItems);
    foodById(ids);
  }, [cartItems]);

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    } else {
      localStorage.removeItem("cartItems");
    }
  }, []);

  useEffect(() => {
    if (Object.keys(cartItems).length > 0) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  useEffect(() => {
    const ids = Object.keys(cartItems);
    foodById(ids);
  }, [cartItems]);

  const addToCart = async (foodId: string, quantity: number) => {
    try {
      if (user && user.sub) {
        await axios.post("http://localhost:8000/api/cart", {
          foodId,
          quantity,
          auth0Id: user.sub,
          name: user.nickname,
        });
      } else {
        console.error("User is not authenticated");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const addToQty = (id: number) => {
    setCartItems((prev) => ({
      ...prev,
      [id]: prev[id] ? prev[id] + 1 : 1,
    }));
  };

  const removeFromCart = (id: number) => {
    setCartItems((prev) => {
      if (prev[id] > 1) {
        return { ...prev, [id]: prev[id] - 1 };
      } else {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
    });
  };

  const deleteFromCart = async (id: number) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/cart/${user.sub}/${id}`
      );

      if (response.status === 200) {
        setCartItems((prev) => {
          const { [id]: _, ...rest } = prev;

          if (Object.keys(rest).length === 0) {
            localStorage.removeItem("cartItems");
          } else {
            localStorage.setItem("cartItems", JSON.stringify(rest));
          }

          return rest;
        });
      } else {
        console.error("Error removing item from cart:", response.data);
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const totalItems = Object.values(cartItems).reduce(
    (acc, qty) => acc + qty,
    0
  );

  const contextValue: BasketContextProps = {
    foodData,
    cartItems,
    setCartItems,
    addToCart,
    addToQty,
    deleteFromCart,
    removeFromCart,
    totalItems,
  };

  return (
    <BasketContext.Provider value={contextValue}>
      {children}
    </BasketContext.Provider>
  );
};

export default BasketContextProvider;
