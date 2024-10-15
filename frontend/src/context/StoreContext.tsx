"use client";

import axios from "axios";
import { useUser } from "@auth0/nextjs-auth0/client";
import { usePathname } from "next/navigation";
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
  categoryId: number;
};

type User = {
  sub: string;
};

type StoreContextProps = {
  cartItems: { [key: string]: number };
  foodData: FoodItem[];
  setInputValue: Dispatch<SetStateAction<string>>;
  inputValue: string;
  setIsActive: Dispatch<SetStateAction<number>>;
  isActive: number;
  addToCart: (id: number) => void;
  loading: boolean;
  fetchFoods: (
    page: number,
    limit: number,
    categoryId?: number
  ) => Promise<void>;
  totalItems: number;
  getCategoryIdByName: (category: number) => string;
  errorMessage: string | null;
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
  const [isActive, setIsActive] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [canOrder, setCanOrder] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { user } = useUser() as { user: User };
  const path = usePathname();

  const checkTime = () => {
    const currentHour = new Date().getHours();
    setCanOrder(currentHour >= 9 && currentHour < 23);
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

  const fetchFoods = async (page = 1, limit = 6, categoryId?: number) => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const url = `http://localhost:8000/api/foods?page=${page}&limit=${limit}${
        categoryId !== undefined ? `&categoryId=${categoryId}` : ""
      }`;
      const response = await axios.get(url);

      if (response.data.success) {
        setFoodData(response.data.foods);
        setTotalItems(response.data.totalCount);
      } else {
        setFoodData([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setFoodData([]);
      setErrorMessage("Failed to fetch food items. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getCategoryIdByName = (category: number) => {
    const categoryMap: { [key: number]: string } = {
      1: "Breakfast",
      2: "Soup",
      3: "Main Course",
      4: "Dessert",
    };

    return categoryMap[category] || "Breakfast";
  };

  const addToCart = (id: number) => {
    setCartItems((prev) => ({
      ...prev,
      [id]: prev[id] ? prev[id] + 1 : 1,
    }));
  };

  const contextValue: StoreContextProps = {
    cartItems,
    foodData,
    setInputValue,
    inputValue,
    setIsActive,
    isActive,
    loading,
    fetchFoods,
    totalItems,
    addToCart,
    getCategoryIdByName,
    errorMessage,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
