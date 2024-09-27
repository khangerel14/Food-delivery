"use client";

import axios from "axios";
import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";

type FoodItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  imgUrl: string;
  assessment: number;
  menu?: string;
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
  loading: boolean;
  fetchFoods: (page: number, limit: number) => Promise<void>;
  totalItems: number;
};

export const StoreContext = createContext<StoreContextProps | undefined>(
  undefined
);

type StoreProviderProps = {
  children: ReactNode;
};

const StoreContextProvider = ({ children }: StoreProviderProps) => {
  const [cartItems, setCartItems] = useState<{ [key: string]: number }>({});
  const [foodData, setFoodData] = useState<FoodItem[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [isActive, setIsActive] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [canOrder, setCanOrder] = useState(false);

  const checkTime = () => {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    setCanOrder(currentHour >= 9 && currentHour < 18);
  };

  useEffect(() => {
    const loadCartItems = () => {
      try {
        const storedCartItems = localStorage.getItem("cartItems");
        if (storedCartItems) {
          setCartItems(JSON.parse(storedCartItems));
        }
      } catch (error) {
        console.error("Failed to load cart items:", error);
        setCartItems({});
      }
    };
    loadCartItems();
    checkTime();
  }, []);

  useEffect(() => {
    if (Object.keys(cartItems).length > 0) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    } else {
      localStorage.removeItem("cartItems");
    }
  }, [cartItems]);

  const fetchFoods = async (page: number = 1, limit: number = 4) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8000/api/foods?page=${page}&limit=${limit}`
      );

      if (response.data.success) {
        setFoodData(response.data.foods);
        setTotalItems(response.data.totalCount);
      } else {
        console.error("Failed to fetch foods:", response.data.message);
        setFoodData([]);
      }
    } catch (error) {
      console.error("Error fetching foods:", error);
      setFoodData([]);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (id: string) => {
    if (canOrder) {
      setCartItems((prev) => ({
        ...prev,
        [id]: prev[id] ? prev[id] + 1 : 1,
      }));
    } else {
      alert("you missed! Booking time is between at 9 to 18.");
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
    loading,
    fetchFoods,
    totalItems,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
