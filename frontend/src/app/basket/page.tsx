"use client";

import { Basket, Footer, Navbar } from "@/components";
import BasketContextProvider from "@/context/BasketContext";
import StoreContextProvider from "@/context/StoreContext";

const Page = () => {
  return (
    <StoreContextProvider>
      <Navbar />
      <BasketContextProvider>
        <Basket />
      </BasketContextProvider>
      <Footer />
    </StoreContextProvider>
  );
};

export default Page;
