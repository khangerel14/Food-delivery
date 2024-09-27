"use client";

import { createContext, ReactNode, useState, useEffect } from "react";
import axios from "axios";

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
  addToCart: (id: number) => void;
  removeFromCart: (id: number) => void;
  deleteFromCart: (id: number) => void;
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

  const addToCart = (id: number) => {
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

  const deleteFromCart = (id: number) => {
    setCartItems((prev) => {
      const { [id]: _, ...rest } = prev;
      return rest;
    });
  };

  const totalItems = Object.values(cartItems).reduce(
    (acc, qty) => acc + qty,
    0
  );

  const contextValue: BasketContextProps = {
    foodData,
    cartItems,
    addToCart,
    removeFromCart,
    deleteFromCart,
    totalItems,
  };

  return (
    <BasketContext.Provider value={contextValue}>
      {children}
    </BasketContext.Provider>
  );
};

export default BasketContextProvider;