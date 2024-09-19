"use client";

import { Basket, Footer, Navbar } from "@/components";
import StoreContextProvider from "@/context/StoreContext";

const Page = () => {
  return (
    <div>
      <StoreContextProvider>
        <Navbar />
        <Basket />
      </StoreContextProvider>
      <Footer />
    </div>
  );
};

export default Page;
