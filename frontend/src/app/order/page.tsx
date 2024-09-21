"use client";

import { Footer, Navbar, Order } from "@/components";
import StoreContextProvider from "@/context/StoreContext";

const Page = () => {
  return (
    <StoreContextProvider>
      <Navbar />
      <Order />
      <Footer />
    </StoreContextProvider>
  );
};

export default Page;
