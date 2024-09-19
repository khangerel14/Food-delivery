"use client";

import { Foods, Footer, MenuBar, Navbar } from "@/components";
import StoreContextProvider from "@/context/StoreContext";
import { useState, createContext } from "react";

export const FoodProvider = createContext("");

const Page = () => {
  const [isActive, setIsActive] = useState("");

  return (
    <div>
      <FoodProvider.Provider value={isActive}>
        <StoreContextProvider>
          <Navbar />
        </StoreContextProvider>
        <MenuBar setIsActive={setIsActive} isActive={isActive} />
        <Foods />
        <Footer />
      </FoodProvider.Provider>
    </div>
  );
};

export default Page;
