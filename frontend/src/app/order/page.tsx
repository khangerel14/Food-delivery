"use client";

import { Footer, Navbar, Order } from "@/components";
import StoreContextProvider from "@/context/StoreContext";
import BasketContextProvider from "@/context/BasketContext";

const Page = () => {
  return (
    <StoreContextProvider>
      <Navbar />
      <BasketContextProvider>
        <Order />
      </BasketContextProvider>
      <Footer />
    </StoreContextProvider>
  );
};

export default Page;
