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

type FoodItem = {
  id: string;
  name: string;
  price: number;
};

type StoreContextProps = {
  foodData: FoodItem[];
  cartItems: { [key: string]: number };
  addToCart: (id: string) => void;
  removeFromCart: (id: string) => void;
  deleteFromCart: (id: string) => void;
  setInputValue: Dispatch<SetStateAction<string>>;
  setIsActive: Dispatch<SetStateAction<string>>;
  inputValue: string;
  isActive: string;
};

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
  const [loading, setLoading] = useState(false);
  const [canOrder, setCanOrder] = useState(false);

  const checkTime = () => {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();

    if (currentHour >= 9 && currentHour < 18) {
      setCanOrder(true);
    } else if (currentHour < 9) {
      setCanOrder(false);
    }
  };

  const fetchFoods = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8000/api/foods");
      setFoodData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching foods:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadCartItems = () => {
      try {
        const storedCartItems = localStorage.getItem("cartItems");
        if (storedCartItems) {
          setCartItems(JSON.parse(storedCartItems));
        }
      } catch (error) {
        setCartItems({});
      }
    };
    fetchFoods();
    checkTime();
    loadCartItems();
  }, []);

  useEffect(() => {
    const cartIsNotEmpty = Object.keys(cartItems).length > 0;

    if (cartIsNotEmpty) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    } else {
      localStorage.removeItem("cartItems");
    }
  }, [cartItems]);

  const addToCart = (id: string) => {
    if (canOrder) {
      setCartItems((prev) => ({
        ...prev,
        [id]: prev[id] ? prev[id] + 1 : 1,
      }));
    } else {
      alert("Order booking time starts at 9oclock and ends at 12oclock");
    }
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
