"use client";

import { Basket, Footer, Navbar } from "@/components";
import StoreContextProvider from "@/context/StoreContext";

const Page = () => {
  return (
    <StoreContextProvider>
      <Navbar />
      <Basket />
      <Footer />
    </StoreContextProvider>
  );
};

export default Page;
