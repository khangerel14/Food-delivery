"use client";

import { Carousel, Foods, Footer, ManageMent, Navbar } from "@/components";
import { createContext, useRef } from "react";
import StoreContextProvider from "@/context/StoreContext";

export const inputContext =
  createContext<React.MutableRefObject<string> | null>({ current: "" });

const Page = () => {
  const inputRef = useRef("");
  return (
    <inputContext.Provider value={inputRef}>
      <StoreContextProvider>
        <Navbar />
      </StoreContextProvider>
      <Carousel />
      <ManageMent />
      <Foods />
      <Footer />
    </inputContext.Provider>
  );
};

export default Page;
