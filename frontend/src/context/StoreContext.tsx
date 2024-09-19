"use client";

import axios from "axios";
import { createContext, useEffect, useState, ReactNode } from "react";

interface StoreContextProps {
  foodData: any[];
  cartItems: { [key: string]: number };
  addToCart: (id: any) => void;
  removeFromCart: (id: any) => void;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  inputValue: string;
}

export const StoreContext = createContext<StoreContextProps | undefined>(
  undefined
);

interface StoreProviderProps {
  children: ReactNode;
}

const StoreContextProvider = ({ children }: StoreProviderProps) => {
  const [cartItems, setCartItems] = useState<{ [key: string]: number }>({});
  const [foodData, setFoodData] = useState<any[]>([]);
  const [inputValue, setInputValue] = useState("");

  const fetchFoods = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/foods");
      setFoodData(response.data);
    } catch (error) {
      console.error("Error fetching foods:", error);
    }
  };

  const storedCartItems = localStorage.getItem("cartItems");
  useEffect(() => {
    if (storedCartItems) {
      try {
        setCartItems(JSON.parse(storedCartItems) || {});
      } catch (error) {
        console.error("Error parsing cartItems from localStorage", error);
        setCartItems({});
      }
    }
    fetchFoods();
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (id: any) => {
    try {
      setCartItems((prev) => ({
        ...prev,
        [id]: (prev[id] || 0) + 1,
      }));
    } catch (error) {
      console.log("Couldn't add to cart");
    }
  };

  const removeFromCart = (id: any) => {
    setCartItems((prev) => {
      if (prev[id] > 1) {
        return { ...prev, [id]: prev[id] - 1 };
      } else {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
    });
  };

  const contextValue: StoreContextProps = {
    foodData,
    cartItems,
    addToCart,
    removeFromCart,
    setInputValue,
    inputValue,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
