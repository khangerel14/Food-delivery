"use client";

import { Card, Footer, MenuBar, Navbar } from "@/components";
import StoreContextProvider from "@/context/StoreContext";

const Page = () => {
  return (
    <StoreContextProvider>
      <Navbar />
      <MenuBar />
      <Card />
      <Footer />
    </StoreContextProvider>
  );
};

export default Page;
