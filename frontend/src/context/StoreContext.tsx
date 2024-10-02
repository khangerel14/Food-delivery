"use client";

import axios from "axios";
import { useUser } from "@auth0/nextjs-auth0/client";
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
  loading: boolean;
  fetchFoods: (
    page: number,
    limit: number,
    categoryId?: number
  ) => Promise<void>;
  totalItems: number;
  addToCart: (foodId: string, quantity: number) => Promise<void>;
  getCategoryIdByName: (category: string) => number;
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

  const fetchFoods = async (page = 1, limit = 8, categoryId?: number) => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const response = await axios.get(
        `http://localhost:8000/api/foods?page=${page}&limit=${limit}${
          categoryId !== undefined ? `&categoryId=${categoryId}` : ""
        }`
      );

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

  const categoryMap: { [key: string]: number } = {
    Breakfast: 1,
    Soup: 2,
    "Main Course": 3,
    Dessert: 4,
  };

  const getCategoryIdByName = (category: string) => {
    return categoryMap[category] || -1;
  };
  const addToCart = async (foodId: string, quantity: number) => {
    try {
      if (user && user.sub) {
        await axios.post("http://localhost:8000/api/cart", {
          foodId,
          quantity,
          auth0Id: user.sub,
        });
        setCartItems((prev) => ({
          ...prev,
          [foodId]: (prev[foodId] || 0) + quantity,
        }));
      } else {
        console.error("User is not authenticated");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
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
