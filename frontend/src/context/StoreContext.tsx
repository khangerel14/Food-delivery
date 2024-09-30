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
  menu?: string;
};

type StoreContextProps = {
  foodData: FoodItem[];
  cartItems: { [key: string]: number };
  setInputValue: Dispatch<SetStateAction<string>>;
  setIsActive: Dispatch<SetStateAction<string>>;
  inputValue: string;
  isActive: string;
  loading: boolean;
  fetchFoods: (page: number, limit: number) => Promise<void>;
  totalItems: number;
  addToCart: (foodId: number, quantity: number) => Promise<void>;
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
  const { user }: any = useUser();

  const checkTime = () => {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
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

  const fetchFoods = async (page: number = 1, limit: number = 8) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8000/api/foods?page=${page}&limit=${limit}`
      );
      console.log(response.data, "response.data");

      if (response.data.success) {
        setFoodData(response.data.foods);
        setTotalItems(response.data.totalCount);
      } else {
        setFoodData([]);
      }
    } catch (error) {
      console.error("Error fetching foods:", error);
      setFoodData([]);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (foodId: number, quantity: number) => {
    try {
      if (user && user.sub) {
        await axios.post("http://localhost:8000/api/cart", {
          foodId,
          quantity,
          auth0Id: user.sub,
        });
        setCartItems((prev) => ({
          ...prev,
          [foodId]: prev[foodId] ? prev[foodId] + quantity : quantity,
        }));
      } else {
        console.error("User is not authenticated");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const contextValue: StoreContextProps = {
    foodData,
    cartItems,
    addToCart,
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
