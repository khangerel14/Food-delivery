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

// Define specific types for foodData and cartItems
interface FoodItem {
  id: string;
  name: string;
  price: number;
  // other properties of your food item
}

interface StoreContextProps {
  foodData: FoodItem[];
  cartItems: { [key: string]: number };
  addToCart: (id: string) => void;
  removeFromCart: (id: string) => void;
  deleteFromCart: (id: string) => void;
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
  const [foodData, setFoodData] = useState<FoodItem[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [isActive, setIsActive] = useState<string>("");

  const fetchFoods = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/foods");
      setFoodData(response.data);
    } catch (error) {
      console.error("Error fetching foods:", error);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      try {
        const parsedCartItems = JSON.parse(storedCartItems);
        setCartItems(parsedCartItems || {});
        console.log("Loaded cart items from localStorage:", parsedCartItems);
      } catch (error) {
        console.error("Error parsing cartItems from localStorage", error);
        setCartItems({});
      }
    } else {
      console.log("No cart items found in localStorage");
    }

    if (isMounted) {
      fetchFoods();
    }

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (Object.keys(cartItems).length > 0) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const addToCart = (id: string) => {
    setCartItems((prev) => ({
      ...prev,
      [id]: prev[id] ? prev[id] + 1 : 1,
    }));
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => {
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
