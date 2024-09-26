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
  fetchFoods: (newPage: number, itemsPerPage: number) => void;
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
  const [canOrder, setCanOrder] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  const checkTime = () => {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    setCanOrder(currentHour >= 9 && currentHour < 18);
  };

  const fetchFoods = async (newPage: number, itemsPerPage: number) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8000/api/foods?page=${newPage}&limit=${itemsPerPage}`
      );
      setFoodData(response?.data?.foods);
    } catch (error) {
      console.error("Error fetching foods:", error);
    } finally {
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
        console.error("Failed to load cart items:", error);
        setCartItems({});
      }
    };

    fetchFoods(currentPage, itemsPerPage);
    checkTime();
    loadCartItems();
  }, []);

  useEffect(() => {
    if (Object.keys(cartItems).length > 0) {
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
      alert("Order booking time starts at 9 o'clock and ends at 18 o'clock.");
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
    fetchFoods,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
