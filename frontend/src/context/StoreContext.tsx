"use client";

import axios from "axios";
import {
  createContext,
  useEffect,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface StoreContextProps {
  foodData: any[];
  cartItems: { [key: string]: number };
  addToCart: (id: any) => void;
  removeFromCart: (id: any) => void;
  deleteFromCart: (id: any) => void;
  setInputValue: Dispatch<SetStateAction<string>>;
  setIsActive: Dispatch<SetStateAction<string>>;
  inputValue: string;
  isActive: string;
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
  const [inputValue, setInputValue] = useState<string>("");
  const [isActive, setIsActive] = useState<string>("");
  console.log(inputValue);

  const fetchFoods = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/foods");
      setFoodData(response.data);
    } catch (error) {
      console.error("Error fetching foods:", error);
    }
  };

  useEffect(() => {
    console.log("Fetching cart items and food data");

    const storedCartItems = localStorage.getItem("cartItems");
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
    if (cartItems) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const addToCart = (id: any) => {
    setCartItems((prev) => ({
      ...prev,
      [id]: prev ? (prev[id] || 0) + 1 : 1,
    }));
  };

  const removeFromCart = (id: any) => {
    setCartItems((prev) => {
      if (!prev || !prev[id]) return prev;
      if (prev[id] > 1) {
        return { ...prev, [id]: prev[id] - 1 };
      } else {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
    });
  };

  const deleteFromCart = (id: string) => {
    setCartItems((prev) => {
      if (!prev || !prev[id]) return prev;

      const { [id]: _, ...rest } = prev;
      return rest;
    });
  };

  const contextValue: StoreContextProps = {
    foodData,
    cartItems,
    addToCart,
    removeFromCart,
    deleteFromCart,
    setInputValue,
    setIsActive,
    inputValue,
    isActive,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
