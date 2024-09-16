"use client";

import { Foods, Footer, MenuBar, Navbar } from "@/components";
import { useState, createContext } from "react";

export const FoodProvider = createContext("");

const Page = () => {
  const [isActive, setIsActive] = useState("");

  return (
    <div>
      <FoodProvider.Provider value={isActive}>
        <Navbar />
        <MenuBar setIsActive={setIsActive} isActive={isActive} />
        <Foods />
        <Footer />
      </FoodProvider.Provider>
    </div>
  );
};

export default Page;
